// React imports
import { useState } from "react";

// Local imports
import {
  agenda as strings,
  //langs
} from "../config/text";

// Icons
import {
  MdChevronLeft as LeftArrow,
  MdChevronRight as RightArrow,
} from "react-icons/md";

// Style
import "../App.css";
import { getTheme } from "../config/theme";

// Http
// import axios from "axios";

function Createingredient() {
  // Constants
  // Global
  const theme = getTheme();
  const [firstLoad, setFirstLoad] = useState(true);
  const admin = JSON.parse(localStorage.getItem("user"));
  const [defaultValues, setDefaultValues] = useState({
    categories: [],
    ingredients: [],
    tags: [],
    creators: [],
    accompaniments: [
      {
        img: "",
        name: {
          es: "",
          en: "",
        },
        id: "",
      },
    ],
  });
  // MonthsSection
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
  let todaysDate = getTodaysDate();
  const [months, setMonths] = useState([
    {
      monthIndex: 7, // August
      days: [1, 2, 3],
      year: 2021,
    },
  ]);
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
  // DaysSection
  const [selectedDay, setSelectedDay] = useState(todaysDate);
  const [appointments, setAppointments] = useState(null);
  const [schedule, setShecule] = useState(null);

  // Functions
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

  const getFirtsDayOfMonth = (monthIndex, year) => {
    let res = new Date(`${monthIndex + 1}-1-${year}`).getDay() - 1;
    if (res === -1) {
      res = 6;
    }
    return res;
  };

  const handleDateChange = (date, month, year) => {
    if (date == " ") return;
    let weekDayIndex = new Date(`${month + 1}-${date}-${year}`).getDay();
    setSelectedDay({
      date,
      month: month,
      year: year,
      day: strings.days[weekDayIndex - 1 < 0 ? 6 : weekDayIndex - 1],
    });
    putWeek(date, month, year);
    // Make query. It should return the availabilityRange filled with the appointments
  };

  const handleSetup = async () => {
    putMonths();
    putWeek(selectedDay.date, selectedDay.month, selectedDay.year);
  };

  const handleSetupQuery = async () => {
    // let response = await axios({
    //   method: "post",
    //   url: "https://us-central1-tendrishh.cloudfunctions.net/server",
    //   data: {
    //     method: "createRecipeSetup",
    //     rol: "Developer",
    //   },
    // });
    // if (response.status === 200) {
    //   setDefaultValues(response.data);
    //   console.log(response.data);
    //   setAccompanimentsSuggestions(response.data.accompaniments);
    // } else {
    //   alert("Error de la base de datos, vuelve a intentarlo más tarde.");
    // }
  };

  const putMonths = () => {
    const limitMonth =
      todaysDate.month + 6 >= 12 ? todaysDate.month + 6 - 12 : todaysDate.month;
    let res = [];
    let monthIndex = todaysDate.month;
    let daysInCurrentMonth;
    let tempMonth;
    let firstDay;
    let currentYear = todaysDate.year;
    // While it isnt the limit month
    while (monthIndex !== limitMonth) {
      daysInCurrentMonth = daysInMonth(monthIndex);
      tempMonth = [];
      // Push spaces in the case that months 1st is not a monday
      firstDay = getFirtsDayOfMonth(monthIndex, currentYear);
      for (let i = 0; i < firstDay; i++) {
        tempMonth.push(" ");
      }
      // Push dates
      for (let day = 1; day <= daysInCurrentMonth; day++) {
        tempMonth.push(day);
      }
      // Push temp month into res
      res.push({
        days: tempMonth,
        monthIndex,
        year: currentYear,
      });
      // Iterator
      monthIndex++;
      if (monthIndex >= 12) {
        monthIndex = 0;
        currentYear++;
      }
    }
    setMonths(res);
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
    console.log(week);
  };

  // Logic
  if (firstLoad) {
    setFirstLoad(false);
    handleSetup();
  }

  // Render
  return (
    <div className="tab-container">
      <div className="content-container">
        {/* Months */}
        <div className="subsection agenda-monthsSection-container">
          <h1 className="section-title">
            {strings.monthsSection.title[theme.lang]}
          </h1>
          <div className="agenda-monthsSection-months-container">
            {/* Map months */}
            {months.map((month) => {
              const monthIsSelected = month.monthIndex === selectedDay.month;
              return (
                <div
                  className={`agenda-monthsSection-month-container ${
                    monthIsSelected
                      ? "agenda-monthsSection-month-container-selected"
                      : ""
                  }`}
                >
                  <h4
                    className={`agenda-monthsSection-month-name ${
                      monthIsSelected
                        ? "agenda-monthsSection-month-name-selected"
                        : ""
                    }`}
                  >
                    {strings.months[month.monthIndex][theme.lang]}
                  </h4>
                  {/* WeekDays */}
                  <div className="agenda-monthsSection-weekDays-container">
                    {strings.days.map((day) => (
                      <p className="agenda-monthsSection-day agenda-monthsSection-weekday">
                        {day[theme.lang].substring(0, 3)}
                      </p>
                    ))}
                  </div>
                  {/* Dates */}
                  <div className="agenda-monthsSection-dates-container">
                    {month.days.map((date) => {
                      const dayIsSelected =
                        month.monthIndex === selectedDay.month &&
                        date == selectedDay.date;
                      const isToday =
                        month.monthIndex === todaysDate.month &&
                        date == todaysDate.date;
                      return (
                        <p
                          className={`agenda-monthsSection-day ${
                            dayIsSelected
                              ? "agenda-monthsSection-day-selected"
                              : ""
                          } ${
                            isToday
                              ? `agenda-monthsSection-day-today${
                                  dayIsSelected ? "selected" : ""
                                }`
                              : ""
                          }`}
                          onClick={() =>
                            handleDateChange(date, month.monthIndex, month.year)
                          }
                        >
                          {date}
                        </p>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Days */}
        <div className="subsection agenda-daysSection-container">
          <h1 className="section-title">
            {strings.daysSection.title[theme.lang]}
          </h1>
          {/* Header */}
          <div className="agenda-daysSection-header-container">
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
          {/* Actual appointments */}
          {appointments === null ? (
            <div className="agenda-daysSection-loading-container">
              <p className="agenda-daysSection-loading">
                {strings.daysSection.loading[theme.lang]}
              </p>
            </div>
          ) : (
            <>
              {schedule === null ? (
                <div className="agenda-daysSection-loading-container">
                  <p className="agenda-daysSection-loading">
                    {strings.daysSection.noSchedule[theme.lang](
                      selectedDay.day[theme.lang],
                      selectedDay.date,
                      strings.months[selectedDay.month][theme.lang],
                      selectedDay.year
                    )}
                  </p>
                </div>
              ) : (
                <>{/* Here is where the content goes */}</>
              )}
            </>
          )}
        </div>

        {/* Appointment */}
        <div className="subsection agenda-appointmentSection-container">
          <h1 className="section-title">
            {strings.appointment.title[theme.lang]}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Createingredient;
