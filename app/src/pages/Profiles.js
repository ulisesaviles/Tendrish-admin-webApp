// React imports
import { useEffect, useState } from "react";

// Local imports
import { adminTypes, profiles as strings } from "../config/text";

// Style
import "../App.css";
import { getTheme } from "../config/theme";

// Icons
import {
  MdClose,
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircle,
} from "react-icons/md";

// Http
import axios from "axios";

function Profiles() {
  // Constants
  const theme = getTheme();
  const admin = JSON.parse(localStorage.getItem("user"));
  const [firstLoad, setFirstLoad] = useState(true);
  // Popup
  const [popupIsDisplayed, setPopupIsDisplayed] = useState(false);
  const [popupType, setPopupType] = useState(null);
  const [adminToEditIndex, setAdminToEditIndex] = useState(0);
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    videoCallLink: "",
    email: "",
    password: {
      hidden: true,
      value: "",
    },
    disponibilityRanges: [
      {
        from: 9,
        to: 14,
        days: [],
      },
    ],
    rol: "Admin",
    locked: false,
    langs: ["es"],
  });
  const [admins, setAdmins] = useState([]);
  const [creating, setCreating] = useState(false);

  // Functions
  const createAdmin = async () => {
    setCreating(true);
    const requestOffset = new Date().getTimezoneOffset();
    let response = await axios({
      method: "post",
      url: "https://us-central1-tendrishh.cloudfunctions.net/server",
      data: {
        method: popupType === "add" ? "createAdmin" : "editAdmin",
        newAdmin: { ...newAdmin, password: newAdmin.password.value },
        admin,
        requestOffset,
      },
    });
    setCreating(false);
    if (response.status === 200) {
      alert("Success");
      setPopupIsDisplayed(false);
      await getAdmins();
    } else {
      alert("Error de la base de datos, vuelve a intentarlo más tarde.");
    }
  };

  const getAdmins = async () => {
    const requestOffset = new Date().getTimezoneOffset();
    let response = await axios({
      method: "post",
      url: "https://us-central1-tendrishh.cloudfunctions.net/server",
      data: {
        method: "getAdmins",
        admin,
        requestOffset,
      },
    });
    if (response.status === 200) {
      setAdmins(response.data);
    } else {
      alert("Error de la base de datos, vuelve a intentarlo más tarde.");
    }
  };

  const handleAddRange = () => {
    let tempNewAdmin = newAdmin;
    tempNewAdmin.disponibilityRanges.push({
      from: 9,
      to: 14,
      days: ["mon", "tue"],
    });
    setNewAdmin(tempNewAdmin);
    updateDom();
  };

  const handleAvailabilityDays = (rangeIndex, day) => {
    let tempNewAdmin = newAdmin;
    if (newAdmin.disponibilityRanges[rangeIndex].days.includes(day)) {
      tempNewAdmin.disponibilityRanges[rangeIndex].days.splice(
        tempNewAdmin.disponibilityRanges[rangeIndex].days.indexOf(day),
        1
      );
    } else {
      tempNewAdmin.disponibilityRanges[rangeIndex].days.push(day);
    }
    setNewAdmin(tempNewAdmin);
    updateDom();
  };

  const handleHourChange = (rangeIndex, newValue, type) => {
    if (newValue === "") {
      newValue = 0;
    }
    if (isNaN(newValue)) {
      return;
    }
    newValue = parseInt(newValue);
    if (newValue < 0 || newValue > 24) {
      return;
    }
    let tempNewAdmin = newAdmin;
    tempNewAdmin.disponibilityRanges[rangeIndex][type] = newValue;
    setNewAdmin(tempNewAdmin);
    updateDom();
  };

  const handlePopup = (display, type, adminToEditIndex) => {
    setPopupIsDisplayed(display);
    setPopupType(type);
    if (type === "edit")
      setNewAdmin({
        ...admins[adminToEditIndex],
        password: {
          hidden: true,
          value: "",
        },
        langs:
          admins[adminToEditIndex].langs == null
            ? []
            : admins[adminToEditIndex].langs,
      });
    else
      setNewAdmin({
        name: "",
        videoCallLink: "",
        email: "",
        password: {
          hidden: true,
          value: "",
        },
        disponibilityRanges: [
          {
            from: 9,
            to: 14,
            days: ["mon", "tue"],
          },
        ],
        rol: "Admin",
        langs: [],
      });
    setAdminToEditIndex(adminToEditIndex);
  };

  const handleSelectLang = (lang) => {
    let temp = newAdmin.langs;
    if (temp.includes(lang)) {
      temp.splice(temp.indexOf(lang), 1);
    } else {
      temp.push(lang);
    }
    setNewAdmin({ ...newAdmin, langs: temp });
  };

  const removeRange = (index) => {
    let tempNewAdmin = newAdmin;
    tempNewAdmin.disponibilityRanges.splice(index, 1);
    setNewAdmin(tempNewAdmin);
    updateDom();
  };

  const updateDom = () => {
    setNewAdmin({ ...newAdmin, rol: "temp" });
    setNewAdmin({ ...newAdmin, rol: newAdmin.rol });
  };

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      getAdmins();
    }
    // eslint-disable-next-line
  }, [firstLoad]);

  // Render
  return (
    <div className="tab-container">
      {/* Popup */}
      <>
        {popupIsDisplayed ? (
          <div className="profiles-propup-background">
            <div className="profiles-propup-container">
              {/* Close */}
              <div
                className="btn profiles-popup-closeBtn"
                onClick={() => handlePopup(false)}
              >
                <MdClose />
              </div>
              {/* Title */}
              <h2 className="profiles-popup-title">
                {strings.popups[popupType].title[theme.lang]}
              </h2>
              {/* Email */}
              <>
                <h4 className="profiles-popup-input-name">
                  {strings.popups[popupType].email.title[theme.lang]}
                </h4>
                {popupType === "add" ? (
                  <input
                    className="input profiles-popup-input"
                    placeholder={
                      strings.popups.add.email.placeHolder[theme.lang]
                    }
                    value={newAdmin.email}
                    onChange={(event) =>
                      setNewAdmin({ ...newAdmin, email: event.target.value })
                    }
                  />
                ) : (
                  <p className="profiles-popup-email">
                    {admins[adminToEditIndex].email}
                  </p>
                )}
              </>
              {/* Password */}
              <>
                <h4 className="profiles-popup-input-name">
                  {strings.popups[popupType].password.title[theme.lang]}
                </h4>
                <input
                  className="input profiles-popup-input"
                  placeholder={
                    strings.popups[popupType].password.placeHolder[theme.lang]
                  }
                  value={newAdmin.password.value}
                  type={newAdmin.password.hidden ? "password" : "text"}
                  onChange={(event) =>
                    setNewAdmin({
                      ...newAdmin,
                      password: {
                        ...newAdmin.password,
                        value: event.target.value,
                      },
                    })
                  }
                />
                <p
                  className="profiles-showPassword"
                  onClick={() =>
                    setNewAdmin({
                      ...newAdmin,
                      password: {
                        ...newAdmin.password,
                        hidden: !newAdmin.password.hidden,
                      },
                    })
                  }
                >
                  {
                    strings.popups[popupType].password[
                      !newAdmin.password.hidden ? "hide" : "show"
                    ][theme.lang]
                  }
                </p>
              </>
              {/* Name */}
              <>
                <h4 className="profiles-popup-input-name">
                  {strings.popups[popupType].name.title[theme.lang]}
                </h4>
                <input
                  className="input profiles-popup-input"
                  placeholder={
                    strings.popups[popupType].name.placeHolder[theme.lang]
                  }
                  value={newAdmin.name}
                  onChange={(event) =>
                    setNewAdmin({ ...newAdmin, name: event.target.value })
                  }
                />
              </>
              {/* Video call link */}
              <>
                <h4 className="profiles-popup-input-name">
                  {strings.popups[popupType].videoCallLink.title[theme.lang]}
                </h4>
                <input
                  className="input profiles-popup-input"
                  placeholder={
                    strings.popups[popupType].videoCallLink.placeHolder[
                      theme.lang
                    ]
                  }
                  value={newAdmin.videoCallLink}
                  onChange={(event) =>
                    setNewAdmin({
                      ...newAdmin,
                      videoCallLink: event.target.value,
                    })
                  }
                />
              </>
              {/* Rol */}
              <>
                <h4 className="profiles-popup-input-name">
                  {strings.popups[popupType].rol.title[theme.lang]}
                </h4>
                <div className="toggle recipe-search-visibility-toggle">
                  {strings.popups[popupType].rol.options.map((option) => (
                    <p
                      onClick={() => setNewAdmin({ ...newAdmin, rol: option })}
                      className={`toggle-item profiles-toggle-item ${
                        option === newAdmin.rol ? " toggle-item-selected" : null
                      }`}
                    >
                      {option}
                    </p>
                  ))}
                </div>
              </>
              {/* Lang */}
              <>
                <h4 className="profiles-popup-input-name">
                  {strings.popups[popupType].lang.title[theme.lang]}
                </h4>
                <div className="toggle recipe-search-visibility-toggle">
                  {strings.popups[popupType].lang.options.map((option) => (
                    <p
                      onClick={() => handleSelectLang(option)}
                      className={`toggle-item profiles-toggle-item ${
                        newAdmin.langs.includes(option)
                          ? " toggle-item-selected"
                          : null
                      }`}
                    >
                      {option.toUpperCase()}
                    </p>
                  ))}
                </div>
              </>
              {/* Availability range */}
              <>
                <h4 className="profiles-popup-input-name">
                  {
                    strings.popups[popupType].availabilityRange.title[
                      theme.lang
                    ]
                  }
                </h4>
                {newAdmin.disponibilityRanges.map((range) => (
                  <div className="profiles-popup-ranges-supercontainer">
                    {/* Index */}
                    <div className="profiles-popup-range-bullets-container">
                      <h1 className="profiles-popup-range-index">
                        {newAdmin.disponibilityRanges.indexOf(range) + 1}
                      </h1>
                      <MdRemoveCircle
                        className="deleteIcon"
                        onClick={() =>
                          removeRange(
                            newAdmin.disponibilityRanges.indexOf(range)
                          )
                        }
                      />
                    </div>
                    <div className="profiles-popup-ranges-container">
                      {/* Instructions */}
                      <p className="profiles-popup-ranges-instruction">
                        {
                          strings.popups[popupType].availabilityRange.days[
                            theme.lang
                          ]
                        }
                      </p>
                      {/* Days */}
                      <div className="profiles-popup-days-container">
                        {strings.popups.weekDays.map((day) => (
                          <div className="profiles-popup-day-container">
                            {range.days.includes(day.key) ? (
                              <MdCheckBox
                                className="profiles-popup-day-checkbox"
                                onClick={() =>
                                  handleAvailabilityDays(
                                    newAdmin.disponibilityRanges.indexOf(range),
                                    day.key
                                  )
                                }
                              />
                            ) : (
                              <MdCheckBoxOutlineBlank
                                className="profiles-popup-day-checkbox"
                                onClick={() =>
                                  handleAvailabilityDays(
                                    newAdmin.disponibilityRanges.indexOf(range),
                                    day.key
                                  )
                                }
                              />
                            )}
                            <p className="profiles-popup-day">
                              {day[theme.lang]}
                            </p>
                          </div>
                        ))}
                      </div>
                      {/* Hours */}
                      <div className="profiles-popup-hours-container">
                        {/* From */}
                        <>
                          <p style={{ margin: 0 }}>
                            {
                              strings.popups[popupType].availabilityRange.from[
                                theme.lang
                              ]
                            }
                          </p>
                          <input
                            className="input hour-input"
                            value={range.from}
                            onChange={(e) =>
                              handleHourChange(
                                newAdmin.disponibilityRanges.indexOf(range),
                                e.target.value,
                                "from"
                              )
                            }
                          />
                        </>
                        {/* To */}
                        <>
                          <p style={{ margin: 0 }}>
                            {
                              strings.popups[popupType].availabilityRange.to[
                                theme.lang
                              ]
                            }
                          </p>
                          <input
                            className="input hour-input"
                            value={range.to}
                            onChange={(e) =>
                              handleHourChange(
                                newAdmin.disponibilityRanges.indexOf(range),
                                e.target.value,
                                "to"
                              )
                            }
                          />
                        </>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Add range */}
                <p
                  className="btn profiles-popup-range-addBtn"
                  onClick={handleAddRange}
                >
                  {strings.popups[popupType].availabilityRange.add[theme.lang]}
                </p>
              </>
              {/* Locked */}
              <>
                {popupType === "edit" &&
                adminTypes.super.includes(admin.personalInfo.rol) ? (
                  <>
                    <h4 className="profiles-popup-input-name">
                      {strings.popups[popupType].locked.title[theme.lang]}
                    </h4>
                    <div className="toggle recipe-search-visibility-toggle">
                      <p
                        onClick={() =>
                          setNewAdmin({ ...newAdmin, locked: false })
                        }
                        className={`toggle-item profiles-toggle-item ${
                          !newAdmin.locked ? " toggle-item-selected" : null
                        }`}
                      >
                        {strings.popups.edit.locked.false[theme.lang]}
                      </p>
                      <p
                        onClick={() =>
                          setNewAdmin({ ...newAdmin, locked: true })
                        }
                        className={`toggle-item profiles-toggle-item ${
                          newAdmin.locked ? " toggle-item-selected" : true
                        }`}
                      >
                        {strings.popups.edit.locked.true[theme.lang]}
                      </p>
                    </div>
                  </>
                ) : null}
              </>
              {/* Submit */}
              <>
                {!creating ? (
                  <p
                    className="btn profiles-popup-submit"
                    onClick={createAdmin}
                  >
                    {strings.popups[popupType].submit[theme.lang]}
                  </p>
                ) : (
                  <p className="profiles-popup-loading">
                    {strings.loading[theme.lang]}
                  </p>
                )}
              </>
            </div>
          </div>
        ) : null}
      </>
      <div className="content-container profiles-content-container">
        {/* Header */}
        <header className="profiles-header-container">
          <h1 className="profiles-header">{strings.title[theme.lang]}</h1>
          <div
            className="profiles-addProfile-btn btn"
            onClick={() => handlePopup(true, "add")}
          >
            {strings.addBtn[theme.lang]}
          </div>
        </header>
        {admins.length > 1 ? (
          <>
            {/* Headers */}
            <div className="profiles-headers-container">
              {strings.headers.map((header) => (
                <>
                  {header.key !== "editBtn" ? (
                    <h6 className="profiles-headers">{header[theme.lang]}</h6>
                  ) : null}
                </>
              ))}
            </div>

            {/* Profiles info */}
            {admins.map((admin) => {
              const adminIndex = admins.indexOf(admin);
              return (
                <div className="profiles-superRow-container" key={adminIndex}>
                  <h4 className="profiles-row-index">{adminIndex + 1}</h4>
                  <div className="profiles-row-container">
                    {strings.headers.map((column) => (
                      <p
                        className={`profiles-row-text ${
                          column.key === "name"
                            ? "profiles-row-text-name"
                            : null
                        }`}
                      >
                        {admins[adminIndex][column.key]}
                      </p>
                    ))}
                  </div>
                  <div
                    className="btn profiles-editBtn"
                    onClick={() => handlePopup(true, "edit", adminIndex)}
                  >
                    <p style={{ margin: 0 }}>{strings.editBtn[theme.lang]}</p>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div className="profiles-empty-container">
            <p>{strings.loading[theme.lang]}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profiles;
