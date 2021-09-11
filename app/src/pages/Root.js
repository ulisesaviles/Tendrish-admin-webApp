// React imports
import { useState, useEffect } from "react";

// Navigation-related imports
import { Link, useHistory } from "react-router-dom";

// Pages
import * as Pages from "../pages";

// Styles
import "../App.css";

// Icons
import { MdKeyboardArrowDown } from "react-icons/md";

// Local imports
import lightLogo from "../assets/logos/light.jpg";
import darkLogo from "../assets/logos/dark.jpg";
import { allowedTabs, tabs, navBar as strings } from "../config/text";
import { SetTheme } from "../config/theme";

const Root = ({ location }) => {
  // Constants
  const [user, setUser] = useState(null);
  const history = useHistory();
  const [logo, setLogo] = useState(lightLogo);
  const url = new URLSearchParams(location.search);
  let theme = {
    lang: url.get("lang"),
    colorScheme: url.get("colorScheme"),
    tab: url.get("tab"),
  };
  theme = SetTheme(theme);
  const [dropdownIsDisplayed, setDropdownIsDisplayed] = useState(false);

  // Functions
  const getUser = () => {
    let tempUser = localStorage.getItem("user");
    if (tempUser !== null) {
      tempUser = JSON.parse(tempUser);
      if (user === null || tempUser.id !== user.id) {
        console.log("Setting user");
        setUser(tempUser);
      }
    }
  };

  const handleDropdown = () => {
    setDropdownIsDisplayed(!dropdownIsDisplayed);
  };

  const renderCurrentTab = (tab) => {
    if (tab === "Agenda") {
      return <Pages.Agenda />;
    } else if (tab === "CreateAd") {
      return <Pages.CreateAd />;
    } else if (tab === "CreateEvent") {
      return <Pages.CreateEvent />;
    } else if (tab === "CreateIngredient") {
      return <Pages.CreateIngredient />;
    } else if (tab === "CreateRecipe") {
      return <Pages.CreateRecipe />;
    } else if (tab === "EditUser") {
      return <Pages.EditUser />;
    } else if (tab === "Login") {
      return <Pages.Login />;
    } else if (tab === "Profiles") {
      return <Pages.Profiles />;
    } else if (tab === "Recipe") {
      return <Pages.Recipe />;
    } else if (tab === "Stats") {
      return <Pages.Stats />;
    } else {
      history.replace("?tab=Login");
    }
  };

  const signOut = () => {
    handleDropdown();
    history.push("?tab=Login");
  };

  // Logic
  // Get current tab from url
  useEffect(() => {
    if (theme.tab === null || user === null) {
      history.replace("?tab=Login");
    }
    getUser();
    // eslint-disable-next-line
  }, [history, theme.tab, user]);
  if (theme.colorScheme === "dark" && logo !== darkLogo) {
    setLogo(darkLogo);
  } else if (theme.colorScheme === "light" && logo === darkLogo) {
    setLogo(lightLogo);
  }
  // Get user
  if (user === null) {
    getUser();
  }

  // Render
  return (
    <div className={`app-container app-${theme.colorScheme}`}>
      {theme.tab !== null && theme.tab !== "Login" && user !== null ? (
        <div className="nav-container">
          <div className="nav-profile-container">
            <p className="nav-user-rol">{user.personalInfo.rol}</p>
            <div className="nav-name-container">
              <p className="nav-user-name">{user.personalInfo.name}</p>
              <MdKeyboardArrowDown
                className="nav-v-icon"
                onClick={handleDropdown}
              />
            </div>
            <>
              {dropdownIsDisplayed ? (
                <div className="signOut-dropdown">
                  <p className="signOut" onClick={signOut}>
                    {strings.signOut[theme.lang]}
                  </p>
                </div>
              ) : null}
            </>
          </div>
          <img src={logo} alt="Logo" className="nav-logo" />
          <div className="nav-items">
            {tabs.map((tab) => (
              <>
                {user !== null &&
                allowedTabs[user.personalInfo.rol.toLowerCase()].includes(
                  tab.key
                ) ? (
                  <Link
                    className={
                      theme.tab === tab.key
                        ? "nav-item nav-item-selected"
                        : "nav-item"
                    }
                    to={`?tab=${tab.key}&lang=${theme.lang}&colorScheme=${theme.colorScheme}`}
                  >
                    <div
                      className={
                        theme.tab === tab.key ? "" : "nav-item-icon-container"
                      }
                    >
                      {tab.icon}
                    </div>
                    {tab.name[theme.lang]}
                  </Link>
                ) : null}
              </>
            ))}
          </div>
          <div className="toggles-container">
            {/* Lang toggle */}
            <div className="toggle-container">
              <p className="toggle-name">Idioma</p>
              <div className="toggle">
                <Link
                  className={
                    theme.lang === "es"
                      ? "toggle-item toggle-item-selected"
                      : "toggle-item"
                  }
                  to={`?tab=${theme.tab}&lang=es&colorScheme=${theme.colorScheme}`}
                >
                  ES
                </Link>
                <Link
                  className={
                    theme.lang !== "es"
                      ? "toggle-item toggle-item-selected"
                      : "toggle-item"
                  }
                  to={`?tab=${theme.tab}&lang=en&colorScheme=${theme.colorScheme}`}
                >
                  EN
                </Link>
              </div>
            </div>
            {/* Color toggle */}
            <div className="toggle-container">
              <p className="toggle-name">Color</p>
              <div className="toggle">
                <Link
                  className={
                    theme.colorScheme !== "dark"
                      ? "toggle-item toggle-item-selected"
                      : "toggle-item"
                  }
                  to={`?tab=${theme.tab}&lang=${theme.lang}&colorScheme=light`}
                >
                  Claro
                </Link>
                <Link
                  className={
                    theme.colorScheme === "dark"
                      ? "toggle-item toggle-item-selected"
                      : "toggle-item"
                  }
                  to={`?tab=${theme.tab}&lang=${theme.lang}&colorScheme=dark`}
                >
                  Oscuro
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {renderCurrentTab(theme.tab)}
    </div>
  );
};

export default Root;
