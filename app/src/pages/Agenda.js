// React imports
import { useState } from "react";

// Local imports
import { agenda as strings, adminTypes } from "../config/text";

// Icons
import {
  MdChevronLeft as LeftArrow,
  MdChevronRight as RightArrow,
} from "react-icons/md";

// Style
import "../App.css";
import { getTheme } from "../config/theme";

// Http
import axios from "axios";

const Agenda = () => {
  // Constants
  // Global
  const theme = getTheme();
  const [firstLoad, setFirstLoad] = useState(true);
  const admin = JSON.parse(localStorage.getItem("user"));
  // MonthsSection
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
  const [schedule, setSchedule] = useState(null);
  const [admins, setAdmins] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(admin.id);
  const [agenda, setAgenda] = useState(null);
  // Appointments
  const [currentAppointment, setCurrentAppointment] = useState(null);

  // Functions
  const appointmentsForHour = async (hour, appointments) => {
    const keys = Object.keys(appointments);
    let res = [];
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const start = {
        hour: parseInt(key.split("_")[0].split(":")[0]),
        minute: parseInt(key.split("_")[0].split(":")[1]),
      };
      const end = {
        hour: parseInt(key.split("_")[1].split(":")[0]),
        minute: parseInt(key.split("_")[1].split(":")[1]),
      };
      if (start.hour === hour) {
        console.log(
          `Get user identity of ${appointments[key].userId} at ${start.hour}`
        );
        res.push({
          ...appointments[key],
          userData: await getUserData(appointments[key].userId),
          start,
          end,
        });
      }
    }
    return res;
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

  const getFirtsDayOfMonth = (monthIndex, year) => {
    let res = new Date(`${monthIndex + 1}/1/${year}`).getDay() - 1;
    if (res === -1) {
      res = 6;
    }
    return res;
  };

  const getSchedule = async (thirdUserId, selectedDay_) => {
    const requestOffset = new Date().getTimezoneOffset();
    setAppointments(null);
    const tempDate = selectedDay_ === undefined ? selectedDay : selectedDay_;
    let response = await axios({
      method: "post",
      url: "https://us-central1-tendrishh.cloudfunctions.net/server",
      data: {
        method: "agendasQuery",
        admin: {
          id: "avilesulises1@gmail.com",
          password: "123456tendrish",
        },
        thirdUserId,
        date: { ...tempDate, month: tempDate.month + 1 },
        requestOffset,
      },
    });
    if (response.status === 200) {
      //console.log(response.data);
      await putAppointmentsInAgenda(
        response.data.schedule,
        response.data.appointments
      );
    } else {
      alert("Error de la base de datos, vuelve a intentarlo más tarde.");
    }
  };

  const getUserData = async (userId) => {
    let response = await axios({
      method: "post",
      url: "https://us-central1-tendrishh.cloudfunctions.net/server",
      data: {
        method: "getUserIdentity",
        userId: userId,
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      alert("Error de la base de datos, vuelve a intentarlo más tarde.");
      return "No user foud";
    }
  };

  const handleAdminsQuery = async () => {
    const requestOffset = new Date().getTimezoneOffset();
    let response = await axios({
      method: "post",
      url: "https://us-central1-tendrishh.cloudfunctions.net/server",
      data: {
        method: "agendasQuery",
        admin: {
          id: "avilesulises1@gmail.com",
          password: "123456tendrish",
        },
        date: { ...selectedDay, month: selectedDay.month + 1 },
        requestOffset,
      },
    });
    if (response.status === 200) {
      setAdmins(response.data.admins);
      await putAppointmentsInAgenda(
        response.data.schedule,
        response.data.appointments
      );
      // console.log(response.data);
    } else {
      alert("Error de la base de datos, vuelve a intentarlo más tarde.");
    }
  };

  const putAppointmentsInAgenda = async (schedules, appointments) => {
    let agenda = [];
    // Iterate schdules
    for (
      let schduleIndex = 0;
      schduleIndex < schedules.length;
      schduleIndex++
    ) {
      const schedule = schedules[schduleIndex];
      // Iterate hours
      for (
        let currentHour = schedule.from;
        currentHour < schedule.to;
        currentHour++
      ) {
        agenda.push({
          hour: currentHour,
          appointments: await appointmentsForHour(currentHour, appointments),
        });
      }
    }
    setSchedule(schedules);
    setAppointments(appointments);
    setAgenda(agenda);
  };

  const handleDateChange = async (date, month, year) => {
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
    await getSchedule(selectedUserId, tempSelectedDay);
  };

  const handleSetup = async () => {
    putMonths();
    putWeek(selectedDay.date, selectedDay.month, selectedDay.year);
    await handleAdminsQuery();
  };

  const handleUserChange = async (event) => {
    const userId = event.target.value;
    setSelectedUserId(userId);
    await getSchedule(userId);
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
        `${currentDate.month + 1}/${currentDate.date}/${currentDate.year}`
      ).getDay();
      // Push into week
      week.push({
        day: strings.days[weekDayIndex == 0 ? 6 : weekDayIndex - 1],
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

  const readableHour = (hour, minutes) => {
    return `${hour > 12 ? hour - 12 : hour}${
      minutes !== undefined ? `:${minutes}` : ""
    } ${hour >= 12 ? "p" : "a"}m`;
  };

  const timestampToDateStr = (timestamp) => {
    const date = new Date(timestamp);
    let day = date.getDay();
    day = day === 0 ? 6 : day - 1;
    return strings.factorDate[theme.lang](
      strings.days[day][theme.lang],
      date.getDate(),
      strings.months[date.getMonth()][theme.lang],
      date.getFullYear()
    );
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
          {/* Map months */}
          <div className="agenda-monthsSection-months-container">
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
                        date === selectedDay.date;
                      const isToday =
                        month.monthIndex === todaysDate.month &&
                        date === todaysDate.date;
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
          {/* Current admin selector */}
          <>
            {admins !== null &&
            adminTypes.super.includes(admin.personalInfo.rol) ? (
              <select
                className="agenda-daysSection-dropdown"
                onChange={handleUserChange}
              >
                {admins.map((tempAdmin) => (
                  <option
                    className="agenda-daysSection-dropdown-option"
                    selected={tempAdmin.id === selectedUserId}
                    value={tempAdmin.id}
                  >{`${tempAdmin.rol}: ${tempAdmin.name}`}</option>
                ))}
              </select>
            ) : null}
          </>
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
                <>
                  {/* Content */}
                  <div className="agenda-daysSection-daysContainner">
                    {agenda !== null ? (
                      <>
                        {agenda.map((hour) => (
                          <div className="agenda-daysSection-hour-superContainer">
                            {/* Hour */}
                            <div className="agenda-daysSection-hour-container">
                              <p className="agenda-daysSection-hour">
                                {readableHour(hour.hour)}
                              </p>
                              <div className="agenda-daysSection-hour-separator" />
                            </div>
                            {/* Map appointments */}
                            <div className="agenda-daysSection-appointment-superContainer">
                              {hour.appointments.map((appointment) => (
                                <div
                                  className={`agenda-daysSection-appointment-container ${
                                    appointment === currentAppointment
                                      ? "agenda-daysSection-appointment-container-selected"
                                      : ""
                                  }`}
                                  style={{
                                    top:
                                      hour.appointments.indexOf(appointment) *
                                        -40 +
                                      (appointment.start.minute / 60) * 80,
                                  }}
                                  onClick={() =>
                                    setCurrentAppointment(appointment)
                                  }
                                >
                                  <div>
                                    <p className="agenda-daysSection-appointment-name">
                                      {appointment.userData.name}
                                    </p>
                                    <p
                                      className={`agenda-daysSection-appointment-id ${
                                        appointment === currentAppointment
                                          ? "agenda-daysSection-appointment-id-selected"
                                          : ""
                                      }`}
                                    >
                                      {appointment.userId}
                                    </p>
                                  </div>
                                  <RightArrow className="agenda-daysSection-appointment-arrow" />
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </>
                    ) : null}
                  </div>
                </>
              )}
            </>
          )}
        </div>

        {/* Appointment */}
        <div className="subsection agenda-appointmentSection-container">
          <h1 className="section-title">
            {strings.appointment.title[theme.lang]}
          </h1>
          {currentAppointment === null ? (
            <div className="agenda-appointmentSection-empty-container">
              <p>{strings.appointment.empty[theme.lang]}</p>
            </div>
          ) : (
            <div className="agenda-appointmentSection-content-container">
              {/* Header */}
              <div className="agenda-appointmentSection-header-container">
                <h3 className="agenda-appointmentSection-header-title">
                  {strings.appointment.user[theme.lang]}
                </h3>
                <div className="agenda-appointmentSection-header-img-container">
                  <img
                    alt="agenda-appointmentSection-header-img"
                    className="agenda-appointmentSection-header-img"
                    src={currentAppointment.userData.profilePhoto}
                  />
                </div>
                <h2 className="agenda-appointmentSection-header-name">
                  {currentAppointment.userData.name}
                </h2>
                <p className="agenda-appointmentSection-header-id">
                  {currentAppointment.userId}
                </p>
              </div>
              {/* Date */}
              <div className="agenda-appintmentSection-field-container">
                <p className="agenda-appintmentSection-fieldName">
                  {strings.appointment.date[theme.lang]}
                </p>
                <p className="agenda-appointmentSection-field">
                  {strings.factorDate[theme.lang](
                    selectedDay.day[theme.lang],
                    selectedDay.date,
                    strings.months[selectedDay.month][theme.lang],
                    selectedDay.year
                  )}
                </p>
              </div>
              {/* Hour */}
              <div className="agenda-appintmentSection-field-container">
                <p className="agenda-appintmentSection-fieldName">
                  {strings.appointment.hour[theme.lang]}
                </p>
                <p className="agenda-appointmentSection-field">
                  {readableHour(
                    currentAppointment.start.hour,
                    currentAppointment.start.minute
                  )}
                </p>
              </div>
              {/* Phone */}
              <div className="agenda-appintmentSection-field-container">
                <p className="agenda-appintmentSection-fieldName">
                  {strings.appointment.phone[theme.lang]}
                </p>
                <p className="agenda-appointmentSection-field">
                  {currentAppointment.userData.phoneNumber}
                </p>
              </div>
              {/* AppointmentNum */}
              <div className="agenda-appintmentSection-field-container">
                <p className="agenda-appintmentSection-fieldName">
                  {strings.appointment.appointmentNum[theme.lang]}
                </p>
                <p className="agenda-appointmentSection-field">
                  {currentAppointment.userData.appointmentsData.counter}
                </p>
              </div>
              {/* Las appointment */}
              <div className="agenda-appintmentSection-field-container">
                <p className="agenda-appintmentSection-fieldName">
                  {strings.appointment.lastAppointment.title[theme.lang]}
                </p>
                <div className="agenda-appointmentSection-field-horizontal-container">
                  <p className="agenda-appointmentSection-field agenda-appointmentSection-field-subName">
                    {strings.appointment.lastAppointment.admin[theme.lang]}
                  </p>
                  <p className="agenda-appointmentSection-field">
                    {
                      currentAppointment.userData.appointmentsData
                        .lastAppointment.admin
                    }
                  </p>
                </div>
                <div className="agenda-appointmentSection-field-horizontal-container">
                  <p className="agenda-appointmentSection-field agenda-appointmentSection-field-subName">
                    {strings.appointment.lastAppointment.date[theme.lang]}
                  </p>
                  <p className="agenda-appointmentSection-field">
                    {timestampToDateStr(
                      currentAppointment.userData.appointmentsData
                        .lastAppointment.date
                    )}
                  </p>
                </div>
              </div>
              {/* Zoom link */}
              <div className="agenda-appintmentSection-field-container">
                <p className="agenda-appintmentSection-fieldName">
                  {strings.appointment.link[theme.lang]}
                </p>
                <p className="agenda-appointmentSection-field">
                  {currentAppointment.videoCallLink}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Agenda;
