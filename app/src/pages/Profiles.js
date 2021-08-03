// React imports
import { useState } from "react";

// Local imports
import { profiles as strings } from "../config/text";

// Style
import "../App.css";
import { getTheme } from "../config/theme";

// Icons
import { MdClose } from "react-icons/md";

// Http
import axios from "axios";

function Createingredient() {
  // Constants
  const theme = getTheme();
  const [popupIsDisplayed, setPopupIsDisplayed] = useState(false);
  const [popupType, setPopupType] = useState(null);
  const [adminToEditIndex, setAdminToEditIndex] = useState(0);
  const [admins, setAdmins] = useState([
    {
      name: "Ulises Aviles",
      recipesCreated: 354,
      likesRatio: 34.2,
      appointments: 29,
      date: "2 - 10 - 2021",
      email: "avilesulises1@gmail.com",
      disponibilityRanges: [
        {
          from: 9,
          to: 14,
        },
        {
          from: 15,
          to: 17,
        },
      ],
      rol: "Super admin",
    },
    {
      name: "Daniela Navarro",
      recipesCreated: 354,
      likesRatio: 34.2,
      appointments: 29,
      date: "2 - 10 - 2021",
      email: "daniela@gmail.com",
      disponibilityRanges: [
        {
          from: 9,
          to: 14,
        },
        {
          from: 15,
          to: 17,
        },
      ],
      rol: "Admin",
    },
    {
      name: "Natalia Maldonado",
      recipesCreated: 354,
      likesRatio: 34.2,
      appointments: 29,
      date: "2 - 10 - 2021",
      email: "Natalia@gmail.com",
      disponibilityRanges: [
        {
          from: 9,
          to: 14,
        },
        {
          from: 15,
          to: 17,
        },
      ],
      rol: "Admin",
    },
  ]);
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    password: {
      hidden: true,
      value: "",
    },
    disponibilityRanges: [
      {
        from: 9,
        to: 14,
      },
      {
        from: 15,
        to: 17,
      },
    ],
    rol: "Admin",
  });

  // Functions
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
      });
    else
      setNewAdmin({
        name: "",
        email: "",
        password: {
          hidden: true,
          value: "",
        },
        disponibilityRanges: [
          {
            from: 9,
            to: 14,
          },
          {
            from: 15,
            to: 17,
          },
        ],
        rol: "Admin",
      });
    setAdminToEditIndex(adminToEditIndex);
  };

  // Render
  return (
    <div className="tab-container">
      {/* Popup */}
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
                  placeholder={strings.popups.add.email.placeHolder[theme.lang]}
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
            {/* Availability range */}
            <>
              {/* Map days */}
              {/* From - to */}
              {/* Add range */}
            </>
            {/* Submit */}
            <></>
          </div>
        </div>
      ) : null}
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
            <div className="profiles-superRow-container">
              <h4 className="profiles-row-index">{adminIndex + 1}</h4>
              <div className="profiles-row-container">
                {strings.headers.map((column) => (
                  <p className="profiles-row-text">
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
      </div>
    </div>
  );
}

export default Createingredient;
