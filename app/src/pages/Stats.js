// React imports
import { useState } from "react";

// Local imports
import { stats as strings, langs } from "../config/text";

// Style
import "../App.css";
import { getTheme } from "../config/theme";

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
      { key: "globalUsers", num: 1000 },
      { key: "usersWPayPlan", num: 1000 },
      { key: "activeUsers", num: 1000 },
      { key: "recipesCreated", num: 1000 },
    ],
    newUsers: [
      {
        key: "2021",
        users: [
          {
            key: "jan",
            users: [
              {
                key: "1",
                users: 0,
              },
            ],
          },
        ],
      },
    ],
    favoriteRecipes: [
      {
        name: {
          es: "Galletas de avena",
          en: "Cookies",
        },
        likes: 2680,
      },
    ],
    usersPerGender: [
      {
        key: "female",
        users: 11000,
      },
    ],
    usersPerCountry: [
      {
        country: {
          key: "mexico",
          name: {
            es: "México",
            en: "Mexico",
          },
        },
        users: 0,
      },
    ],
    usersPerBirthYear: {
      2001: 1,
      2002: 2,
      2015: 3,
    },
    usersPerAgeRange: [{ range: "0 - 9", users: 0 }],
  });

  // Functions
  const correctLang = (multiLangObj) => {
    if (multiLangObj[theme.lang] === undefined) {
      return multiLangObj[langs.default];
    }
    return multiLangObj[theme.lang];
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

  const getStats = async () => {
    let response = await axios({
      method: "post",
      url: "https://us-central1-tendrishh.cloudfunctions.net/server",
      data: {
        method: "getStats",
        admin,
      },
    });
    if (response.status === 200) {
      setStats({
        ...response.data,
        usersPerAgeRange: usersPerAgeRange(response.data.usersPerBirthYear),
      });
      console.log({
        ...response.data,
        usersPerAgeRange: usersPerAgeRange(response.data.usersPerBirthYear),
      });
    } else {
      alert("Error de la base de datos, vuelve a intentarlo más tarde.");
    }
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

  if (firstLoad) {
    setFirstLoad(false);
    getStats();
  }

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
                <div className="toggle">
                  {strings.newUsers.toggle.map((item) => (
                    <div
                      className={`toggle-item ${
                        item.key === toggleValue ? "toggle-item-selected" : null
                      }`}
                      onClick={() => setToggleValue(item.key)}
                    >
                      {item[theme.lang]}
                    </div>
                  ))}
                </div>
              </div>
              <div className="stats-newUsers-graph-container">(Graph)</div>
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
