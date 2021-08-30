// React imports
import { useState } from "react";

// Local imports
import { editUser as strings, langs } from "../config/text";

// Icons
import {
  MdChevronLeft as LeftArrow,
  MdChevronRight as RightArrow,
} from "react-icons/md";
import { IoSearch } from "react-icons/io5";

// Style
import "../App.css";
import { getTheme } from "../config/theme";

// Http
import axios from "axios";

const EditUser = () => {
  // Constants
  // Global
  const theme = getTheme();
  // User finder
  const [userSearchInput, setUserSearchInput] = useState("");
  const [users, setUsers] = useState(null);
  const [errorName, setErrorName] = useState("");
  const [hoveredUSer, setHoveredUSer] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  // User plan
  const getTodaysDate = () => {
    let todaysDate = {
      date: new Date(Date.now()).getDate(), // starts at 1
      month: new Date(Date.now()).getMonth(), // Starts at 0
      year: new Date(Date.now()).getFullYear(),
    };
    todaysDate.day =
      strings.days[
        new Date(
          `${todaysDate.month + 1}-${todaysDate.date}-${todaysDate.year}`
        ).getDay() -
          1 <
        0
          ? 6
          : new Date(
              `${todaysDate.month + 1}-${todaysDate.date}-${todaysDate.year}`
            ).getDay() - 1
      ];
    return todaysDate;
  };
  const todaysDate = getTodaysDate();
  const [week, setWeek] = useState([
    {
      day: {
        es: "Lunes",
        en: "Monday",
      },
      date: 12,
      month: 7,
      year: 2021,
      isSelected: true,
    },
  ]);
  const [selectedDay, setSelectedDay] = useState(todaysDate);
  const [mealPlan, setMealPlan] = useState(null);
  const [mealHovered, setMealHovered] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [selectedMealType, setSelectedMealType] = useState(null);
  const meals = ["breakfast", "snack1", "lunch", "snack2", "dinner"];
  // Third section
  const [thirdSection, setThirdSection] = useState("recipeFinder");

  // Functions
  const changeThirdSection = (newSection) => {
    setThirdSection(newSection);
    if (newSection === "recipeFinder") {
    } else if (newSection === "userSettings") {
      setSelectedMeal(null);
      setSelectedMealType(null);
    } else if (newSection === "notes") {
      setSelectedMeal(null);
      setSelectedMealType(null);
    }
  };

  const correctLang = (multiLangObj) => {
    if (
      multiLangObj[theme.lang] === undefined ||
      multiLangObj[theme.lang] === ""
    ) {
      return multiLangObj[langs.default];
    }
    return multiLangObj[theme.lang];
  };

  const dayAfter = () => {
    let temp = {
      date:
        selectedDay.date + 1 > daysInMonth(selectedDay.month)
          ? 1
          : selectedDay.date + 1,
      month:
        selectedDay.date + 1 > daysInMonth(selectedDay.month)
          ? selectedDay.month + 1 >= 12
            ? 0
            : selectedDay.month + 1
          : selectedDay.month,
      year:
        selectedDay.date + 1 > daysInMonth(selectedDay.month) &&
        selectedDay.month + 1 >= 12
          ? selectedDay.year + 1
          : selectedDay.year,
    };
    handleDateChange(temp.date, temp.month, temp.year);
  };

  const dayBefore = () => {
    let temp = {
      date:
        selectedDay.date - 1 <= 0
          ? daysInMonth(
              selectedDay.month - 1 < 0 ? 11 : selectedDay.month - 1
            ) - Math.abs(selectedDay.date - 1)
          : selectedDay.date - 1,
      month:
        selectedDay.date - 1 <= 0
          ? selectedDay.month - 1 < 0
            ? 11
            : selectedDay.month - 1
          : selectedDay.month,
      year:
        selectedDay.date - 1 <= 0 && selectedDay.month - 1 < 0
          ? selectedDay.year - 1
          : selectedDay.year,
    };
    handleDateChange(temp.date, temp.month, temp.year);
  };

  const daysInMonth = (monthIndex) => {
    if ([0, 2, 4, 6, 7, 9, 11].includes(monthIndex)) return 31;
    if ([3, 5, 8, 10].includes(monthIndex)) return 30;
    if (monthIndex === 1)
      return new Date(Date.now()).getFullYear % 4 === 0 ? 29 : 28;
  };

  const getUserMealPlan = async (date, userId) => {
    date = {
      ...date,
      month: date.month + 1,
    };
    const response = await axios({
      method: "post",
      url: "https://us-central1-tendrishh.cloudfunctions.net/server",
      data: {
        method: "getUserMealPlan",
        userId,
        date,
      },
    });
    if (response.status === 200) {
      console.log("getUserMealPlan: success");
      setMealPlan(response.data);
    }
  };

  const handleDateChange = async (date, month, year) => {
    setSelectedMeal(null);
    setSelectedMealType(null);
    setMealPlan(null);
    if (date === " ") return;
    let weekDayIndex = new Date(`${month + 1}-${date}-${year}`).getDay();
    const tempSelectedDay = {
      date,
      month: month,
      year: year,
      day: strings.days[weekDayIndex - 1 < 0 ? 6 : weekDayIndex - 1],
    };
    setSelectedDay(tempSelectedDay);
    putWeek(date, month, year);
    await getUserMealPlan(tempSelectedDay, selectedUserId);
  };

  const handleUserSeach = async (userName) => {
    setErrorName(userName);
    const response = await axios({
      method: "post",
      url: "https://us-central1-tendrishh.cloudfunctions.net/server",
      data: {
        method: "searchUserByName",
        userName: userName,
      },
    });
    if (response.status === 200) {
      console.log("searchUserByName: success");
      setUsers(response.data);
    }
  };

  const handleUserSelection = async (userId) => {
    putWeek(todaysDate.date, todaysDate.month, todaysDate.year);
    setSelectedUserId(userId);
    await getUserMealPlan(todaysDate, userId);
  };

  const putWeek = (centerDate, centerMonth, centerYear) => {
    // Set initial date to iterate from there
    const initialDate = {
      date:
        centerDate - 3 <= 0
          ? daysInMonth(centerMonth - 1 < 0 ? 11 : centerMonth - 1) -
            Math.abs(centerDate - 3)
          : centerDate - 3,
      month:
        centerDate - 3 <= 0
          ? centerMonth - 1 < 0
            ? 11
            : centerMonth - 1
          : centerMonth,
      year:
        centerDate - 3 <= 0 && centerMonth - 1 < 0
          ? centerYear - 1
          : centerYear,
    };
    let currentDate = initialDate;
    // Iterate
    let week = [];
    let weekDayIndex;
    for (let counter = 0; counter < 7; counter++) {
      // Get weekday
      weekDayIndex = new Date(
        `${currentDate.month + 1}-${currentDate.date}-${currentDate.year}`
      ).getDay();
      // Push into week
      week.push({
        day: strings.days[weekDayIndex - 1 < 0 ? 6 : weekDayIndex - 1],
        date: currentDate.date,
        month: currentDate.month,
        year: currentDate.year,
        isSelected: counter === 3,
      });
      // Update currentDate
      currentDate = {
        date:
          currentDate.date + 1 > daysInMonth(currentDate.month)
            ? 1
            : currentDate.date + 1,
        month:
          currentDate.date + 1 > daysInMonth(currentDate.month)
            ? currentDate.month + 1 >= 12
              ? 0
              : currentDate.month + 1
            : currentDate.month,
        year:
          currentDate.date + 1 > daysInMonth(currentDate.month) &&
          currentDate.month + 1 >= 12
            ? currentDate.year + 1
            : currentDate.year,
      };
    }
    setWeek(week);
  };

  const startMealChange = (meal) => {
    changeThirdSection("recipeFinder");
    setSelectedMeal(mealPlan[meal]);
    setSelectedMealType(meal);
  };

  // Render
  return (
    <div className="tab-container">
      <div className="content-container">
        {/* Search users */}
        <div className="subsection editUSer-userFinder-container">
          <h1 className="section-title" style={{ marginBottom: 10 }}>
            {strings.userFinder.title[theme.lang]}
          </h1>
          {/* Search box */}
          <>
            <div className="editUser-userFinder-seach-container">
              <input
                className="input"
                placeholder={strings.userFinder.searchPlaceholder[theme.lang]}
                value={userSearchInput}
                onChange={(e) => setUserSearchInput(e.target.value)}
              />
              <IoSearch
                className="editUser-userFinder-seach btn"
                onClick={() => handleUserSeach(userSearchInput)}
              />
            </div>
          </>

          {/* Map users */}
          <>
            {users === null || users.length === 0 ? (
              <div
                className="editUser-userFinder-empty-container"
                style={{ opacity: "50%" }}
              >
                {strings.userFinder[users === null ? "null" : "empty"][
                  theme.lang
                ](errorName)}
              </div>
            ) : (
              // Map users
              <div className="editUser-userFinder-users-container">
                {users.map((user) => {
                  const index = users.indexOf(user);
                  return (
                    <div
                      className={`editUser-userFinder-user-container ${
                        selectedUserId === user.id
                          ? "editUser-userFinder-user-container-selected"
                          : ""
                      }`}
                      onMouseEnter={() => setHoveredUSer(index)}
                      onMouseLeave={() => setHoveredUSer(null)}
                      onClick={() => handleUserSelection(user.id)}
                    >
                      <div className="editUser-userFinder-user-text-container">
                        <h4
                          className={`editUser-userFinder-user-name ${
                            selectedUserId === user.id
                              ? "editUser-userFinder-user-name-selcted"
                              : ""
                          }`}
                        >
                          {user.name}
                        </h4>
                        <p
                          className={`editUser-userFinder-user-id ${
                            selectedUserId === user.id
                              ? "editUser-userFinder-user-id-selected"
                              : ""
                          }`}
                        >
                          {user.id}
                        </p>
                      </div>
                      <RightArrow
                        className="editUser-userFinder-user-arrow"
                        style={{
                          opacity:
                            hoveredUSer === index || selectedUserId === user.id
                              ? "100%"
                              : 0,
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </>
        </div>

        {/* User plan */}
        <div className="subsection editUser-userPlan-container">
          <h1 className="section-title">
            {strings.userPlan.title[theme.lang]}
          </h1>
          {/* Content */}
          <>
            {selectedUserId === null ? (
              <div
                className="editUser-userFinder-empty-container"
                style={{ opacity: "50%" }}
              >
                {strings.userFinder.null[theme.lang](errorName)}
              </div>
            ) : (
              <>
                {/* Date selector */}
                <>
                  <div className="agenda-daysSection-header-container editUser-userFinder-dateSelector-container">
                    {/* Week container */}
                    <div className="agenda-daysSection-header-week-container">
                      {/* Arrow */}
                      <LeftArrow
                        className="agenda-daysSection-header-arrow"
                        onClick={dayBefore}
                      />
                      {/* Week */}
                      <div className="agenda-daysSection-header-items-container">
                        {week.map((day) => (
                          <div
                            className="agenda-daysSection-header-item-container"
                            onClick={() =>
                              handleDateChange(day.date, day.month, day.year)
                            }
                          >
                            <p className="agenda-daysSection-header-item-day">
                              {day.day[theme.lang].charAt(0)}
                            </p>
                            <p
                              className={`agenda-daysSection-header-item-date ${
                                day.isSelected
                                  ? "agenda-daysSection-header-item-date-selected"
                                  : ""
                              }`}
                            >
                              {day.date}
                            </p>
                          </div>
                        ))}
                      </div>
                      {/* Arrow */}
                      <RightArrow
                        className="agenda-daysSection-header-arrow"
                        onClick={dayAfter}
                      />
                    </div>
                    <p className="agenda-daysSection-header-fullDate">
                      {strings.factorDate[theme.lang](
                        selectedDay.day[theme.lang],
                        selectedDay.date,
                        strings.months[selectedDay.month][theme.lang],
                        selectedDay.year
                      )}
                    </p>
                  </div>
                </>

                {/* Meals */}
                <>
                  {mealPlan === null ? (
                    <div
                      className="editUser-userFinder-empty-container"
                      style={{ opacity: "50%" }}
                    >
                      {strings.userPlan.loading[theme.lang]}
                    </div>
                  ) : (
                    <div>
                      {meals.map((meal) => (
                        <div
                          onClick={() => startMealChange(meal)}
                          className={`editUSer-userFinder-meal-container ${
                            selectedMealType === meal
                              ? "editUSer-userFinder-meal-container-selected"
                              : ""
                          }`}
                          onMouseEnter={() => setMealHovered(meal)}
                          onMouseLeave={() => setMealHovered(null)}
                        >
                          <div className="editUSer-userFinder-meal-text-container">
                            <p
                              className={`editUSer-userFinder-meal-mealType ${
                                selectedMealType === meal
                                  ? "editUSer-userFinder-meal-mealType-selected"
                                  : ""
                              }`}
                            >
                              {correctLang(strings.userPlan.meals[meal])}
                            </p>
                            <p className="editUSer-userFinder-meal-name">
                              {correctLang(mealPlan[meal].name)}
                            </p>
                          </div>
                          {selectedMealType === meal ? (
                            <RightArrow className="editUSer-userFinder-meal-arrow" />
                          ) : (
                            <p
                              className={`editUSer-userFinder-meal-switchBtn ${
                                mealHovered === meal
                                  ? "editUSer-userFinder-meal-switchBtn-hovered"
                                  : ""
                              }`}
                            >
                              {strings.userPlan.switchBtn[theme.lang]}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>

                {/* Other btns */}
                <>
                  <p
                    className="btn editUser-userFinder-settingsBtn"
                    onClick={() => changeThirdSection("userSettings")}
                  >
                    {strings.userPlan.settingsBtn[theme.lang]}
                  </p>
                  <p
                    className="btn editUser-userFinder-settingsBtn"
                    onClick={() => changeThirdSection("notes")}
                  >
                    {strings.userPlan.notesBtn[theme.lang]}
                  </p>
                </>
              </>
            )}
          </>
        </div>

        {/* Recipe search / User settings */}
        <div className="subsection editUSer-thirdSection-container">
          <h1 className="section-title">
            {strings[thirdSection].title[theme.lang]}
          </h1>
          {thirdSection === "recipeFinder" ? (
            <>
              <p>
                recipeFinder
                {selectedMeal !== null
                  ? ": " + correctLang(selectedMeal.name)
                  : null}
              </p>
            </>
          ) : thirdSection === "userSettings" ? (
            <>
              <p>userSettings</p>
            </>
          ) : thirdSection === "notes" ? (
            <>
              <p>notes</p>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default EditUser;
