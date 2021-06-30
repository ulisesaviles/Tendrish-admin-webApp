// Navigation-related imports
import { Link } from "react-router-dom";

// Pages
import * as Pages from "../pages";

// Styles
import "../App.css";

const Root = ({ location }) => {
  // Get current tab from url
  let tab = new URLSearchParams(location.search).get("tab");

  // Constants

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
    } else if (tab === null) {
      return <Pages.Login />;
    } else if (tab === "Profiles") {
      return <Pages.Profiles />;
    } else if (tab === "Recipe") {
      return <Pages.Recipe />;
    } else if (tab === "Stats") {
      return <Pages.Stats />;
    }
  };

  // Render
  return (
    <div>
      <div>
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
      {currentTab(tab)}
    </div>
  );
};

export default Root;
