// React imports
import { useEffect, useState } from "react";

// Local imports
import { stats as strings, langs } from "../config/text";

// Style
import "../App.css";
import { getTheme } from "../config/theme";

// Chart.js
import { Line } from "react-chartjs-2";

// Http
import axios from "axios";

function Stats() {
  // Constants
  const theme = getTheme();
  const admin = JSON.parse(localStorage.getItem("user"));
  const [firstLoad, setFirstLoad] = useState(true);
  const [toggleValue, setToggleValue] = useState(
    strings.newUsers.toggle[0].key
  );
  // Response
  const [stats, setStats] = useState({
    header: [
      { key: "globalUsers", num: null },
      { key: "usersWPayPlan", num: null },
      { key: "activeUsers", num: null },
      { key: "recipesCreated", num: null },
    ],
    newUsers: {},
    favoriteRecipes: [],
    usersPerGender: [],
    usersPerCountry: [],
    usersPerBirthYear: {},
    usersPerAgeRange: [],
  });
  const [graphData, setGraphData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        fill: false,
        borderColor: "rgb(236, 162, 69)",
        tension: 0.4,
      },
    ],
  });
  const graphOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  // Functions
  const correctLang = (multiLangObj) => {
    if (
      multiLangObj[theme.lang] === undefined ||
      multiLangObj[theme.lang] === ""
    ) {
      return multiLangObj[langs.default];
    }
    return multiLangObj[theme.lang];
  };

  const daysInMonth = (monthIndex) => {
    if ([0, 2, 4, 6, 7, 9, 11].includes(monthIndex)) return 31;
    if ([3, 5, 8, 10].includes(monthIndex)) return 31;
    if (monthIndex === 1)
      return new Date(Date.now()).getFullYear % 4 === 0 ? 29 : 28;
  };

  const formatNum = (num) => {
    if (num === null) {
      return null;
    }
    num = num.toString();
    let comasCounter = 0;
    const length = num.length;
    for (let i = 1; i < length; i++) {
      if (i % 3 === 0) {
        num =
          num.substring(0, num.length - i - comasCounter) +
          "," +
          num.substring(num.length - i - comasCounter);
        comasCounter++;
      }
    }
    return num;
  };

  const handleGraphData = (type, data = stats.newUsers) => {
    let res;
    if (type === "week") {
      res = getUsersByDays(data, 7);
    }
    if (type === "month") {
      res = getUsersByDays(data, daysInMonth(new Date(Date.now()).getMonth()));
    }
    if (type === "year") {
      res = getYearlyUsers(data);
    }
    setGraphData({
      labels: res.keys,
      datasets: [
        {
          data: res.data,
          ...graphData.datasets,
        },
      ],
    });
  };

  const handleToggle = (type) => {
    if (stats.newUsers !== {}) {
      setToggleValue(type);
      handleGraphData(type);
    }
  };

  const getStats = async () => {
    let response = await axios({
      method: "post",
      url: "https://us-central1-tendrishh.cloudfunctions.net/server",
      data: {
        method: "getStats",
        admin,
      },
    });
    console.log("Got stats");
    if (response.status === 200) {
      setStats({
        ...response.data,
        usersPerAgeRange: usersPerAgeRange(response.data.usersPerBirthYear),
      });
      handleGraphData(toggleValue, response.data.newUsers);
    } else {
      alert("Error de la base de datos, vuelve a intentarlo más tarde.");
    }
  };

  const getUsersByDays = (data, limit) => {
    let res = [];
    let keys = [];
    let day = new Date(Date.now()).getDate() - 1;
    let month = new Date(Date.now()).getMonth();
    console.log(data);
    while (res.length < limit) {
      if (data[month] === undefined) {
        // Theres no data this month
        while (day >= 0) {
          // Fill empty days with zeros
          res.unshift(0);
          keys.unshift(day + 1);
          if (res.length >= limit) {
            // break;
            return {
              keys,
              data: res,
            };
          }
          day--;
        }
        month--;
        day = daysInMonth(month) - 1;
      } else {
        // Theres data
        if (day < 0) {
          // Reset days
          month--;
          day = daysInMonth(month) - 1;
        }
        if (data[month][day] === undefined) {
          // No data that day
          res.unshift(0);
        } else {
          // Theres data that day
          res.unshift(data[month][day]);
        }
        keys.unshift(day + 1);
        day--;
      }
    }
    return {
      keys,
      data: res,
    };
  };

  const getYearlyUsers = (data) => {
    let month = new Date(Date.now()).getMonth();
    let res = [];
    let keys = [];
    let tempKeys;
    while (month >= 0) {
      if (data[month] === undefined) {
        keys.unshift(strings.newUsers.months[month][theme.lang]);
        res.unshift(0);
      } else {
        keys.unshift(strings.newUsers.months[month][theme.lang]);
        tempKeys = Object.keys(data[month]);
        res.unshift(0);
        for (let dayIndex = 0; dayIndex < tempKeys.length; dayIndex++) {
          const day = tempKeys[dayIndex];
          res[0] += data[month][day];
        }
      }
      month--;
    }
    return {
      keys,
      data: res,
    };
  };

  const usersPerAgeRange = (usersPerBirthYear) => {
    let ageRanges = {};
    let currentYear = new Date(Date.now()).getFullYear();
    // Sort by year
    let years = Object.keys(usersPerBirthYear);
    years.sort((a, b) => parseInt(a) - parseInt(b));
    // Group
    let key;
    years.forEach((year) => {
      key = `${Math.floor((currentYear - year) / 10)}0 - ${Math.floor(
        (currentYear - year) / 10
      )}9`;
      if (ageRanges[key] === undefined) {
        ageRanges[key] = usersPerBirthYear[year];
      } else {
        ageRanges[key] += usersPerBirthYear[year];
      }
    });
    // Sort ranges
    let ranges = Object.keys(ageRanges);
    for (let i = 0; i < ranges.length; i++) {
      ranges[i] = {
        range: ranges[i],
        users: ageRanges[ranges[i]],
      };
    }
    ranges.sort((a, b) => b.users - a.users);
    return ranges;
  };

  // eslint-disable-next-line
  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      getStats();
    }
  });

  // Render
  return (
    <div className="tab-container">
      <div className="stats-container">
        {/* Header */}
        <header className="stats-header">
          {stats.header.map((headerStat) => (
            <>
              <div className="stats-header-item-container">
                <h5 className="stats-header-item-name">
                  {strings.header[headerStat.key][theme.lang]}
                </h5>
                <h1 className="stats-header-item">
                  {formatNum(headerStat.num)}
                </h1>
              </div>
              {stats.header.indexOf(headerStat) < stats.header.length - 1 ? (
                <div className="stats-header-separator" />
              ) : null}
            </>
          ))}
        </header>
        {/* Content */}
        <div className="stats-content-container">
          {/* Left section */}
          <div className="stats-content-subcontainer">
            {/* New users */}
            <div className="stats-content-section-container">
              <div className="stats-newUsers-header-container">
                <p className="stats-section-title">
                  {strings.newUsers[theme.lang]}
                </p>
                {/* Toggle */}
                <div className="toggle">
                  {strings.newUsers.toggle.map((item) => (
                    <div
                      className={`toggle-item ${
                        item.key === toggleValue ? "toggle-item-selected" : null
                      }`}
                      onClick={() => handleToggle(item.key)}
                    >
                      {item[theme.lang]}
                    </div>
                  ))}
                </div>
              </div>
              <div className="stats-newUsers-graph-container">
                {/* Graph */}
                <Line data={graphData} options={graphOptions} />
              </div>
            </div>
            {/* Favorite recipes */}
            <div className="stats-content-section-container">
              <p className="stats-section-title">
                {strings.favoriteRecipes[theme.lang]}
              </p>
              {stats.favoriteRecipes.map((row) => {
                let index = stats.favoriteRecipes.indexOf(row);
                return (
                  <>
                    <div className="stats-row-container">
                      <div className="stats-row-leftSection-container">
                        <p className="stats-row-index">{index + 1}</p>
                        <p className="stats-row-text">
                          {correctLang(row.name)}
                        </p>
                      </div>
                      <p className="stats-row-text">{row.likes}</p>
                    </div>
                    {index < stats.favoriteRecipes.length - 1 ? (
                      <div className="stats-row-separator" />
                    ) : null}
                  </>
                );
              })}
            </div>
            {/* Users per gender */}
            <div className="stats-content-section-container">
              <p className="stats-section-title">
                {strings.usersPerGender[theme.lang]}
              </p>
              {stats.usersPerGender.map((row) => {
                let index = stats.usersPerGender.indexOf(row);
                return (
                  <>
                    <div className="stats-row-container">
                      <div className="stats-row-leftSection-container">
                        <p className="stats-row-index">{index + 1}</p>
                        <p className="stats-row-text">
                          {strings.usersPerGender.genders[row.key][theme.lang]}
                        </p>
                      </div>
                      <p className="stats-row-text">{row.users}</p>
                    </div>
                    {index < stats.usersPerGender.length - 1 ? (
                      <div className="stats-row-separator" />
                    ) : null}
                  </>
                );
              })}
            </div>
          </div>
          {/* Right section */}
          <div className="stats-content-subcontainer">
            {/* Users per country */}
            <div className="stats-content-section-container">
              <p className="stats-section-title">
                {strings.usersPerCountry[theme.lang]}
              </p>
              {stats.usersPerCountry.map((row) => {
                let index = stats.usersPerCountry.indexOf(row);
                return (
                  <>
                    <div className="stats-row-container">
                      <div className="stats-row-leftSection-container">
                        <p className="stats-row-index">{index + 1}</p>
                        <p className="stats-row-text">
                          {correctLang(row.country.name)}
                        </p>
                      </div>
                      <p className="stats-row-text">{row.users}</p>
                    </div>
                    {index < stats.usersPerCountry.length - 1 ? (
                      <div className="stats-row-separator" />
                    ) : null}
                  </>
                );
              })}
            </div>
            {/* Users per age range */}
            <div className="stats-content-section-container">
              <p className="stats-section-title">
                {strings.usersPerAgeRange[theme.lang]}
              </p>
              {stats.usersPerAgeRange.map((row) => {
                let index = stats.usersPerAgeRange.indexOf(row);
                return (
                  <>
                    <div className="stats-row-container">
                      <div className="stats-row-leftSection-container">
                        <p className="stats-row-index">{index + 1}</p>
                        <p className="stats-row-text">{row.range}</p>
                      </div>
                      <p className="stats-row-text">{row.users}</p>
                    </div>
                    {index < stats.usersPerAgeRange.length - 1 ? (
                      <div className="stats-row-separator" />
                    ) : null}
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
