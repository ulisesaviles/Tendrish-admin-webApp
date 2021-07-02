// React imports
import { useState, useEffect } from "react";

// Navigation-related imports
import { Link, useHistory } from "react-router-dom";

// Pages
import * as Pages from "../pages";

// Styles
import "../App.css";

const Root = ({ location }) => {
  // Constants
  const [user, setUser] = useState(null);
  const history = useHistory();

  // Functions
  const currentTab = (tab) => {
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
  };

  // Logic
  // Get current tab from url
  let tab = new URLSearchParams(location.search).get("tab");
  useEffect(() => {
    if (tab === null || user === null) {
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
      {tab !== null && tab !== "Login" && user !== null ? (
        <div className="nav-container">
          <div className="nav-profile-container">
            <p className="nav-user-rol">{user.personalInfo.rol}</p>
            <p className="nav-user-name">{user.personalInfo.name}</p>
          </div>
          <ul>
            <li>
              <Link
                className="nav-item-link"
                to="/Tendrish-admin-webApp?tab=Agenda"
              >
                Agenda
              </Link>
            </li>
            <li>
              <Link
                className="nav-item-link"
                to="/Tendrish-admin-webApp?tab=CreateAd"
              >
                Create Ad
              </Link>
            </li>
            <li>
              <Link
                className="nav-item-link"
                to="/Tendrish-admin-webApp?tab=CreateEvent"
              >
                Create Event
              </Link>
            </li>
            <li>
              <Link
                className="nav-item-link"
                to="/Tendrish-admin-webApp?tab=CreateIngredient"
              >
                Create Ingredient
              </Link>
            </li>
            <li>
              <Link
                className="nav-item-link"
                to="/Tendrish-admin-webApp?tab=CreateRecipe"
              >
                Create Recipe
              </Link>
            </li>
            <li>
              <Link
                className="nav-item-link"
                to="/Tendrish-admin-webApp?tab=EditUser"
              >
                Edit User
              </Link>
            </li>
            <li>
              <Link
                className="nav-item-link"
                to="/Tendrish-admin-webApp?tab=Login"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                className="nav-item-link"
                to="/Tendrish-admin-webApp?tab=Profiles"
              >
                Profiles
              </Link>
            </li>
            <li>
              <Link
                className="nav-item-link"
                to="/Tendrish-admin-webApp?tab=Recipe"
              >
                Recipe
              </Link>
            </li>
            <li>
              <Link
                className="nav-item-link"
                to="/Tendrish-admin-webApp?tab=Stats"
              >
                Stats
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
      {currentTab(tab)}
    </div>
  );
};

export default Root;
