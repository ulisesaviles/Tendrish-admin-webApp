// React imports
import { useState } from "react";

// Local imports
import { editUser as strings, langs } from "../config/text";

// Icons
import {
  MdChevronLeft as LeftArrow,
  MdChevronRight as RightArrow,
  MdAdd,
  MdRemove,
  MdCheckBoxOutlineBlank,
  MdCheckBox,
} from "react-icons/md";
import { IoSearch } from "react-icons/io5";

// Style
import "../App.css";
import { getTheme } from "../config/theme";

// Http
import axios from "axios";
import { query } from "../config/queries";

const EditUser = () => {
  // Constants
  // Global
  const theme = getTheme();
  const mealPlanLength = 30;

  // User finder
  const [userSearchInput, setUserSearchInput] = useState("");
  const [users, setUsers] = useState(null);
  const [errorName, setErrorName] = useState("");
  const [hoveredUSer, setHoveredUSer] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const admin = JSON.parse(localStorage.getItem("user"));
  const [loadingUser, setLoadingUser] = useState(false);

  // User plan
  const getTodaysDate = () => {
    let todaysDate = {
      date: new Date(Date.now()).getDate(), // starts at 1
      month: new Date(Date.now()).getMonth(), // Starts at 0
      year: new Date(Date.now()).getFullYear(),
      day: null,
    };
    todaysDate.day =
      strings.days[
        new Date(Date.now()).getDay() - 1 < 0
          ? 6
          : new Date(Date.now()).getDay() - 1
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
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [selectedMealType, setSelectedMealType] = useState(null);
  const meals = ["breakfast", "snack1", "lunch", "snack2", "dinner"];
  const [dateIsValid, setDateIsValid] = useState(true);

  // Third section
  const [thirdSection, setThirdSection] = useState(null);
  const [recipeFinderInputValue, setRecipeFinderInputValue] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [hoveredResultIndex, setHoveredResultIndex] = useState(null);
  const [notes, setNotes] = useState(null);
  const [newNote, setNewNote] = useState("");
  const [servings, setServings] = useState(null);
  const [updater, setUpdater] = useState(0);
  const [ingredientsForExclusions, setIngredientsForExclusions] =
    useState(null);
  const [loadingRecipe, setLoadingRecipe] = useState(false);
  const [excludedIngredients, setExcludedIngredients] = useState(null);
  const recipesToGetEachSearch = 30;
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedTypeOfMealPlan, setSelectedTypeOfMealPlan] = useState(null);

  // Functions
  const capitilize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const changeThirdSection = async (newSection) => {
    setThirdSection(newSection);
    if (newSection === "recipeFinder") {
      resetNotes();
      resetSettings();
    } else if (newSection === "userSettings") {
      resetMealPlan();
      resetNotes();
      await getUserSettings(selectedUserId);
    } else if (newSection === "notes") {
      resetMealPlan();
      resetSettings();
      const notes = await getNotes(selectedUserId);
      setNotes(notes);
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

  const getNotes = async (userId) => {
    const response = await axios({
      method: "post",
      url: "https://us-central1-tendrishh.cloudfunctions.net/server",
      data: {
        method: "getNotesOnUser",
        userId,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    return [];
  };

  const getRecipesByMealType = async (start, end) => {
    const response = await axios({
      method: "post",
      url: "https://us-central1-tendrishh.cloudfunctions.net/server",
      data: {
        method: "recipesSearch",
        filters: {
          lang: theme.lang,
          name: recipeFinderInputValue.toLowerCase(),
          published: true,
          category: null,
          mealType: ["snack1", "snack2"].includes(selectedMealType)
            ? "snack"
            : selectedMealType,
          tags: [],
          includedIngredients: [],
        },
        start,
        end,
      },
    });
    if (response.status === 200) return response.data;
    else return [];
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
      setMealPlan(response.data);
    }
  };

  const getUserSettings = async (userId) => {
    if (!ingredientsForExclusions) getIngredientsToExclude();
    const response = await axios({
      method: "post",
      url: "https://us-central1-tendrishh.cloudfunctions.net/server",
      data: {
        method: "getUserSettings",
        userId,
      },
    });
    if (response.status === 200) {
      setExcludedIngredients(
        response.data.mealPlanDetails
          ? response.data.mealPlanDetails.ingredientsToExclude
          : undefined
      );
      setServings(response.data.servings);
      setSelectedTypeOfMealPlan(response.data.mealPlanDetails.typeOfMealplan);
    }
  };

  const handleDateChange = async (date, month, year, userId) => {
    // If invalid date, display it
    setSelectedMeal(null);
    setSelectedMealType(null);
    setMealPlan(null);
    if (date === " ") return;
    let weekDayIndex = new Date(`${month + 1}/${date}/${year}`).getDay();
    const tempSelectedDay = {
      date,
      month: month,
      year: year,
      day: strings.days[weekDayIndex - 1 < 0 ? 6 : weekDayIndex - 1],
    };
    setSelectedDay(tempSelectedDay);
    putWeek(date, month, year);
    const timestamp = new Date(`${month + 1}/${date}/${year}`).getTime();
    const todaysTimestamp = new Date(
      `${todaysDate.month + 1}/${todaysDate.date}/${todaysDate.year}`
    ).getTime();
    const milisecondsInADay = 1000 * 60 * 60 * 24;
    if (
      todaysTimestamp > timestamp ||
      Math.round((timestamp - todaysTimestamp) / milisecondsInADay + 0.5) >=
        mealPlanLength
    ) {
      setDateIsValid(false);
      return;
    } else {
      setDateIsValid(true);
    }
    await getUserMealPlan(tempSelectedDay, userId ? userId : selectedUserId);
  };

  const getIngredientsToExclude = async () => {
    const response = await axios({
      method: "post",
      url: "https://us-central1-tendrishh.cloudfunctions.net/server",
      data: {
        method: "getIngredientsToExclude",
      },
    });
    if (response.status === 200) {
      setIngredientsForExclusions(response.data);
      return;
    }
  };

  const handlenewIngredientSelection = (ingredientId) => {
    let temp = [...excludedIngredients];
    if (temp.includes(ingredientId)) {
      temp.splice(temp.indexOf(ingredientId), 1);
    } else {
      temp.push(ingredientId);
    }
    setExcludedIngredients(temp);
    updateDom();
  };

  const handleNewNote = async (note) => {
    const currentNotes = notes;
    setNotes(null);
    const response = await axios({
      method: "post",
      url: "https://us-central1-tendrishh.cloudfunctions.net/server",
      data: {
        method: "writeNotesOnUser",
        userId: selectedUserId,
        admin: {
          id: admin.id,
          password: admin.personalInfo.password,
        },
        notes: note,
      },
    });
    if (response.status === 200) {
      setNewNote("");
      setNotes(await getNotes(selectedUserId));
      return;
    }
    setNotes(currentNotes);
  };

  const handleRecipeSwap = async (index) => {
    const selectedRecipe = searchResults[index];
    if (
      selectedMeal !== null &&
      selectedMeal.id != null &&
      !window.confirm(
        `Change '${capitilize(
          correctLang(selectedMeal.name)
        )}' for '${capitilize(correctLang(selectedRecipe.general.name))}'`
      )
    ) {
      return;
    }
    const response = await axios({
      method: "post",
      url: "https://us-central1-tendrishh.cloudfunctions.net/server",
      data: {
        method: "editUserMealPlan",
        userId: selectedUserId,
        date: { ...selectedDay, month: selectedDay.month + 1 },
        dishToChange: selectedMealType,
        newRecipe: {
          id: selectedRecipe.id,
          category: selectedRecipe.general.category,
        },
      },
    });
    if (response.status === 200) {
      setSearchResults(null);
      setMealPlan(null);
      await getUserMealPlan(selectedDay, selectedUserId);
    }
  };

  const handleServingsChange = (isNumerator, newValue) => {
    if (newValue === "" || parseInt(newValue) < 0) {
      newValue = 0;
    }
    if (isNumerator) {
      setServings({
        ...servings,
        numerator: parseInt(newValue),
      });
    } else {
      setServings({
        ...servings,
        denominator: parseInt(newValue),
      });
    }
  };

  const handleTypeOfMealPlanChange = async () => {
    let temp = selectedTypeOfMealPlan;
    setSelectedTypeOfMealPlan(null);

    // Make request
    const { status } = await query("updateUserMealPlanType", {
      userId: selectedUserId,
      typeOfMealplan: selectedTypeOfMealPlan,
      admin: {
        ...admin,
        password: admin.personalInfo.password,
      },
    });
    setSelectedTypeOfMealPlan(temp);

    // Handle response
    if (status === 200) {
      alert(strings.responses.update.success[theme.lang]);
      handleUserSelection(selectedUserId);
      return;
    }
    alert(strings.responses.update.fail[theme.lang]);
  };

  const handleUserSeach = async (userName) => {
    setErrorName(userName);
    setLoadingUser(true);
    const response = await axios({
      method: "post",
      url: "https://us-central1-tendrishh.cloudfunctions.net/server",
      data: {
        method: "searchUserByName",
        userName: userName,
      },
    });
    if (response.status === 200) {
      setUsers(response.data);
    }
    setLoadingUser(false);
  };

  const handleUserSelection = async (userId) => {
    handleDateChange(
      todaysDate.date,
      todaysDate.month,
      todaysDate.year,
      userId
    );
    setSelectedUserId(userId);
    setThirdSection(null);
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
        `${currentDate.month + 1}/${currentDate.date}/${currentDate.year}`
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

  const readableDate = (timestamp) => {
    const date = new Date(timestamp);
    let day = date.getDay();
    day = day === 0 ? 6 : day - 1;
    return strings.factorDate[theme.lang](
      [strings.days[day][theme.lang]],
      date.getDate(),
      strings.months[date.getMonth()][theme.lang],
      date.getFullYear()
    );
  };

  const removeRecipe = async (meal, recipeName) => {
    if (
      !window.confirm(
        strings.userPlan.removeConfirmation[theme.lang](recipeName)
      )
    )
      return;

    let temp = mealPlan;
    temp[meal].id = null;
    setMealPlan(temp);
    updateDom();

    await axios({
      method: "post",
      url: "https://us-central1-tendrishh.cloudfunctions.net/server",
      data: {
        method: "editUserMealPlan",
        userId: selectedUserId,
        date: { ...selectedDay, month: selectedDay.month + 1 },
        dishToChange: meal,
        newRecipe: {
          id: null,
        },
      },
    });
  };

  const resetMealPlan = () => {
    setSelectedMeal(null);
    setSelectedMealType(null);
  };

  const resetNotes = () => {
    setNotes(null);
  };

  const resetSettings = () => {
    setServings(null);
  };

  const searchForRecipe = async () => {
    setLoadingRecipe(true);
    setSearchResults(await getRecipesByMealType(0, recipesToGetEachSearch));
    setLoadingRecipe(false);
  };

  const searchMore = async () => {
    setLoadingMore(true);
    const res = [
      ...searchResults,
      ...(await getRecipesByMealType(
        searchResults.length,
        recipesToGetEachSearch + searchResults.length
      )),
    ];
    setSearchResults(res);
    setLoadingMore(false);
  };

  const startMealChange = (meal) => {
    changeThirdSection("recipeFinder");
    setSearchResults(null);
    setSelectedMeal(mealPlan[meal]);
    setSelectedMealType(meal);
  };

  const updateDom = () => {
    setUpdater(updater + 1);
  };

  const updateServings = async () => {
    const response = await axios({
      method: "post",
      url: "https://us-central1-tendrishh.cloudfunctions.net/server",
      data: {
        method: "changeUserServings",
        userId: selectedUserId,
        servings,
      },
    });
    if (response.status === 200) {
      return alert(strings.userSettings.servings.success[theme.lang]);
    }
  };

  const updateUserExclusions = async () => {
    let temp = [...excludedIngredients];
    setExcludedIngredients(null);
    // Make request
    const response = await axios({
      method: "post",
      url: "https://us-central1-tendrishh.cloudfunctions.net/server",
      data: {
        method: "updateUserExclusions",
        userId: selectedUserId,
        ingredientsToExclude: excludedIngredients,
        admin: {
          ...admin,
          password: admin.personalInfo.password,
        },
      },
    });
    setExcludedIngredients(temp);
    if (response.status === 200) {
      alert(strings.responses.update.success[theme.lang]);
      return;
    }
    alert(strings.responses.update.fail[theme.lang]);
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
            {loadingUser ? (
              <div
                className="editUser-userFinder-empty-container"
                style={{ opacity: "50%" }}
              >
                {strings.userFinder.loading[theme.lang]}
              </div>
            ) : users === null || users.length === 0 ? (
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
                      key={index}
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
                              {/* {JSON.stringify(day)} */}
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
                  {!dateIsValid ? (
                    <div
                      className="editUser-userFinder-empty-container"
                      style={{ opacity: "50%" }}
                    >
                      {strings.userPlan.dateIsNotValid[theme.lang]}
                    </div>
                  ) : mealPlan === null ? (
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
                          className={`editUSer-userFinder-meal-container ${
                            selectedMealType === meal
                              ? "editUSer-userFinder-meal-container-selected"
                              : ""
                          }`}
                        >
                          <div className="editUSer-userFinder-meal-text-container">
                            <p
                              className={`editUSer-userFinder-meal-mealType ${
                                selectedMealType === meal
                                  ? "editUSer-userFinder-meal-mealType-selected"
                                  : ""
                              }`}
                            >
                              {mealPlan[meal] == null ||
                              mealPlan[meal].id == null
                                ? ""
                                : correctLang(strings.userPlan.meals[meal])}
                            </p>
                            <p
                              className="editUSer-userFinder-meal-name"
                              style={{
                                opacity:
                                  (mealPlan[meal] &&
                                    mealPlan[meal].id != null) ||
                                  selectedMealType === meal
                                    ? "100%"
                                    : "50%",
                              }}
                            >
                              {mealPlan[meal] == null ||
                              mealPlan[meal].id == null
                                ? strings.userPlan.empty[theme.lang]
                                : capitilize(correctLang(mealPlan[meal].name))}
                            </p>
                          </div>
                          {selectedMealType === meal ? (
                            <RightArrow className="editUSer-userFinder-meal-arrow" />
                          ) : (
                            <div>
                              <p
                                className="editUSer-userFinder-meal-switchBtn"
                                onClick={() => startMealChange(meal)}
                              >
                                {mealPlan[meal] && mealPlan[meal].id != null
                                  ? strings.userPlan.switchBtn[theme.lang]
                                  : strings.userPlan.add[theme.lang]}
                              </p>
                              {mealPlan[meal] && mealPlan[meal].id != null ? (
                                <p
                                  className="editUSer-userFinder-meal-switchBtn"
                                  onClick={() =>
                                    removeRecipe(
                                      meal,
                                      capitilize(
                                        correctLang(mealPlan[meal].name)
                                      )
                                    )
                                  }
                                >
                                  {strings.userPlan.removeRecipe[theme.lang]}
                                </p>
                              ) : null}
                            </div>
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

        {/* Third section */}
        <div className="subsection editUSer-thirdSection-container">
          <h1 className="section-title">
            {thirdSection !== null
              ? strings[thirdSection].title[theme.lang]
              : null}
          </h1>
          {/* Updater */}
          <>
            <p style={{ fontSize: 0.1, opacity: 0 }}>{updater}</p>
          </>
          {thirdSection === "recipeFinder" ? (
            // RecipeFinder
            <>
              {/* Search box*/}
              <div className="recipe-search-container">
                <input
                  className="input"
                  placeholder={
                    strings.recipeFinder.searchPlaceholder[theme.lang]
                  }
                  value={recipeFinderInputValue}
                  onChange={(event) =>
                    setRecipeFinderInputValue(event.target.value)
                  }
                />
                <div
                  className="recipe-search-btn btn"
                  onClick={searchForRecipe}
                >
                  <IoSearch />
                </div>
              </div>
              {/* Search results */}
              <div
                className={`editUSer-recipeFinder-results-container${
                  searchResults === null ||
                  (typeof searchResults === "object" &&
                    searchResults.length === 0)
                    ? "-empty"
                    : ""
                }`}
              >
                {loadingRecipe ? (
                  <div
                    className="editUser-userFinder-empty-container"
                    style={{ opacity: "50%" }}
                  >
                    {strings.userFinder.loading[theme.lang]}
                  </div>
                ) : searchResults === null ? (
                  <div
                    className="editUser-userFinder-empty-container"
                    style={{ opacity: "50%" }}
                  >
                    {strings.recipeFinder.states.undone[theme.lang]}
                  </div>
                ) : typeof searchResults === "object" &&
                  searchResults.length === 0 ? (
                  <div
                    className="editUser-userFinder-empty-container"
                    style={{ opacity: "50%" }}
                  >
                    {strings.recipeFinder.states.empty[theme.lang]}
                  </div>
                ) : (
                  // Search results
                  <>
                    {searchResults.map((recipe) => {
                      const index = searchResults.indexOf(recipe);
                      return (
                        <div
                          className="recipe-search-recipe-container"
                          onMouseEnter={() => setHoveredResultIndex(index)}
                          onMouseLeave={() => setHoveredResultIndex(null)}
                          onClick={() => handleRecipeSwap(index)}
                        >
                          <div className="recipe-search-recipe-img-container">
                            <img
                              src={recipe.general.img}
                              className="recipe-search-recipe-img"
                              alt="recipe-search-recipe-img"
                            />
                          </div>
                          <div className="recipe-search-recipe-txt-container">
                            <p className="recipe-search-recipe-name">
                              {capitilize(correctLang(recipe.general.name))}
                            </p>
                            <p className="recipe-search-recipe-category">
                              {capitilize(
                                recipe[`search-category-${theme.lang}`] !==
                                  undefined
                                  ? recipe[`search-category-${theme.lang}`]
                                  : recipe[`search-category-${langs.default}`]
                              )}
                            </p>
                            <div className="recipe-search-recipe-view-container">
                              <div
                                className={`recipe-search-recipe-view ${
                                  index === hoveredResultIndex ? "btn" : ""
                                }`}
                              >
                                {strings.recipeFinder.switchBtn[theme.lang]}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    {loadingMore ? (
                      <div
                        style={{
                          opacity: 0.5,
                          alignSelf: "center",
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        {strings.userFinder.loading[theme.lang]}
                      </div>
                    ) : searchResults != null &&
                      searchResults.length % recipesToGetEachSearch === 0 ? (
                      <p
                        className="btn editUser-userFinder-settingsBtn"
                        onClick={searchMore}
                      >
                        {strings.recipeFinder.seachMore[theme.lang]}
                      </p>
                    ) : null}
                  </>
                )}
              </div>
            </>
          ) : thirdSection === "userSettings" ? (
            // User settings
            <>
              {excludedIngredients === null ||
              servings === null ||
              selectedTypeOfMealPlan === null ? (
                <div
                  className="editUser-userFinder-empty-container"
                  style={{ opacity: "50%" }}
                >
                  {strings.userPlan.loading[theme.lang]}
                </div>
              ) : (
                <>
                  {/* Servings */}
                  <div className="input-section">
                    <p className="input-name" style={{ marginBottom: 20 }}>
                      {strings.userSettings.servings.title[theme.lang]}
                    </p>
                    <div className="fraction-container">
                      {/* Numarator */}
                      <>
                        <div className="createRecepy-quantity-input-container createRecepy-quantity-input-container-mini">
                          <div
                            className="createRecepy-add-btn btn createRecepy-add-btn-mini"
                            onClick={() =>
                              handleServingsChange(true, servings.numerator - 1)
                            }
                          >
                            <MdRemove />
                          </div>
                          <input
                            className="createRecipe-cuantity-input"
                            value={servings.numerator}
                            onChange={(e) =>
                              handleServingsChange(true, e.target.value)
                            }
                          />
                          <div
                            className="createRecepy-add-btn btn createRecepy-add-btn-mini"
                            onClick={() =>
                              handleServingsChange(true, servings.numerator + 1)
                            }
                          >
                            <MdAdd />
                          </div>
                        </div>
                      </>
                      <div className="dividedBy" />
                      {/* Denominator */}
                      <>
                        <div className="createRecepy-quantity-input-container createRecepy-quantity-input-container-mini">
                          <div
                            className="createRecepy-add-btn btn createRecepy-add-btn-mini"
                            onClick={() =>
                              handleServingsChange(
                                false,
                                servings.denominator - 1
                              )
                            }
                          >
                            <MdRemove />
                          </div>
                          <input
                            className="createRecipe-cuantity-input"
                            value={servings.denominator}
                            onChange={(e) =>
                              handleServingsChange(false, e.target.value)
                            }
                          />
                          <div
                            className="createRecepy-add-btn btn createRecepy-add-btn-mini"
                            onClick={() =>
                              handleServingsChange(
                                false,
                                servings.denominator + 1
                              )
                            }
                          >
                            <MdAdd />
                          </div>
                        </div>
                      </>
                    </div>
                    <p
                      className="btn editUser-servings-saveBtn"
                      onClick={updateServings}
                    >
                      {strings.userSettings.servings.saveBtn[theme.lang]}
                    </p>
                  </div>

                  {/* Type of meal plan */}
                  {selectedTypeOfMealPlan !== "free" ? (
                    <div className="input-section">
                      <p className="input-name">
                        {strings.userSettings.typeOfMealPlan.title[theme.lang]}
                      </p>
                      <>
                        {strings.userSettings.typeOfMealPlan.options.map(
                          (option) => (
                            <div
                              key={option.key}
                              className="editUser-exlusion-container"
                              onClick={() =>
                                setSelectedTypeOfMealPlan(option.key)
                              }
                            >
                              {selectedTypeOfMealPlan === option.key ? (
                                <MdCheckBox className="ingredient-lang-checkbox" />
                              ) : (
                                <MdCheckBoxOutlineBlank className="ingredient-lang-checkbox" />
                              )}
                              {capitilize(correctLang(option.name))}
                            </div>
                          )
                        )}
                      </>

                      {/* Save btn */}
                      <div
                        className="editUSer-exclusions-save-btn btn"
                        onClick={handleTypeOfMealPlanChange}
                      >
                        {strings.userSettings.saveBtn[theme.lang]}
                      </div>
                    </div>
                  ) : null}

                  {/* Exclusions */}
                  {excludedIngredients !== undefined ? (
                    <div className="input-section">
                      <p className="input-name">
                        {strings.userSettings.exclusions.title[theme.lang]}
                      </p>
                      <>
                        {ingredientsForExclusions === null ? (
                          <>
                            <div
                              className="editUser-userFinder-empty-container"
                              style={{ opacity: "50%" }}
                            >
                              {strings.userPlan.loading[theme.lang]}
                            </div>
                          </>
                        ) : (
                          ingredientsForExclusions.map((ingredient) => (
                            <div
                              key={ingredient.id}
                              className="editUser-exlusion-container"
                              onClick={() =>
                                handlenewIngredientSelection(ingredient.id)
                              }
                            >
                              {excludedIngredients.includes(ingredient.id) ? (
                                <MdCheckBox className="ingredient-lang-checkbox" />
                              ) : (
                                <MdCheckBoxOutlineBlank className="ingredient-lang-checkbox" />
                              )}
                              {capitilize(correctLang(ingredient.name))}
                            </div>
                          ))
                        )}
                      </>

                      {/* Save btn */}
                      <div
                        className="editUSer-exclusions-save-btn btn"
                        onClick={updateUserExclusions}
                      >
                        {strings.userSettings.saveBtn[theme.lang]}
                      </div>
                    </div>
                  ) : null}
                </>
              )}
            </>
          ) : thirdSection === "notes" ? (
            // Notes
            <>
              {notes === null ? (
                <div
                  className="editUser-userFinder-empty-container"
                  style={{ opacity: "50%" }}
                >
                  {strings.userPlan.loading[theme.lang]}
                </div>
              ) : (
                <div className="editUser-notesSection-container">
                  <div className="editUser-notes-container">
                    {notes.map((note) => (
                      <div className="editUser-note-container">
                        <div className="editUser-notes-note-header-container">
                          <p className="editUser-notes-note-author">
                            {note.admin.name}
                          </p>
                          <p className="editUser-notes-note-date">
                            ( {readableDate(note.date)} )
                          </p>
                        </div>
                        <p className="editUser-notes-note">{note.notes}</p>
                      </div>
                    ))}
                  </div>
                  <div className="editUser-notes-createNote-container">
                    <p className="editUser-notes-createNote">
                      {strings.notes.createNote[theme.lang]}
                    </p>
                    <input
                      className="input"
                      placeholder={strings.notes.inputPlaceholder[theme.lang]}
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                    />
                    <div
                      className="editUser-notes-createNote-btn btn"
                      onClick={() => handleNewNote(newNote)}
                    >
                      {strings.notes.createNoteBtn[theme.lang]}
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default EditUser;
