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
import { tabs } from "../config/text";

const Root = ({ location }) => {
  // Constants
  const [user, setUser] = useState(null);
  const history = useHistory();
  const [logo, setLogo] = useState(lightLogo);
  const [theme, setTheme] = useState({
    lang: "es",
    colorScheme: "light",
  });

  // Functions
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

  const getUser = () => {
    let tempUser = localStorage.getItem("user");
    if (tempUser !== null) {
      tempUser = JSON.parse(tempUser);
      setUser(tempUser);
    }
    if (theme.colorScheme === "dark") {
      setLogo(darkLogo);
    }
  };

  // Logic
  // Get current tab from url
  let currentTab = new URLSearchParams(location.search).get("tab");
  useEffect(() => {
    if (currentTab === null || user === null) {
      history.replace("?tab=Login");
    }
  }, []);
  // Get user
  if (user === null) {
    console.log("User is null");
    getUser();
  }

  // Render
  return (
    <div className="app-container">
      {currentTab !== null && currentTab !== "Login" && user !== null ? (
        <div className="nav-container">
          <div className="nav-profile-container">
            <p className="nav-user-rol">{user.personalInfo.rol}</p>
            <div className="nav-name-container">
              <p className="nav-user-name">{user.personalInfo.name}</p>
              <MdKeyboardArrowDown className="nav-v-icon" />
            </div>
          </div>
          <img src={logo} alt="Logo" className="nav-logo" />
          <div className="nav-items">
            {tabs.map((tab) => (
              <Link
                className={
                  currentTab === tab.key
                    ? "nav-item nav-item-selected"
                    : "nav-item"
                }
                to={tab.to}
              >
                <div
                  className={
                    currentTab === tab.key ? "" : "nav-item-icon-container"
                  }
                >
                  {tab.icon}
                </div>
                {tab.name[theme.lang]}
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      {renderCurrentTab(currentTab)}
    </div>
  );
};

export default Root;
