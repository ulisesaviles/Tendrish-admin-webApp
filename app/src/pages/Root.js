import "../App.css";
import { Link } from "react-router-dom";
import * as Pages from "../pages";

function Root({ location }) {
  let tab = new URLSearchParams(location.search).get("tab");

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
    }
  };

  return (
    <div>
      <div>
        <ul>
          <li>
            <Link className="nav-item-link" to="/Tendrish?tab=Agenda">
              Agenda
            </Link>
          </li>
          <li>
            <Link className="nav-item-link" to="/Tendrish?tab=CreateAd">
              Create Ad
            </Link>
          </li>
          <li>
            <Link className="nav-item-link" to="/Tendrish?tab=CreateEvent">
              Create Event
            </Link>
          </li>
          <li>
            <Link className="nav-item-link" to="/Tendrish?tab=CreateIngredient">
              Create Ingredient
            </Link>
          </li>
          <li>
            <Link className="nav-item-link" to="/Tendrish?tab=CreateRecipe">
              Create Recipe
            </Link>
          </li>
          <li>
            <Link className="nav-item-link" to="/Tendrish?tab=EditUser">
              Edit User
            </Link>
          </li>
          <li>
            <Link className="nav-item-link" to="/Tendrish?tab=Login">
              Login
            </Link>
          </li>
          <li>
            <Link className="nav-item-link" to="/Tendrish?tab=Profiles">
              Profiles
            </Link>
          </li>
          <li>
            <Link className="nav-item-link" to="/Tendrish?tab=Recipe">
              Recipe
            </Link>
          </li>
          <li>
            <Link className="nav-item-link" to="/Tendrish?tab=Stats">
              Stats
            </Link>
          </li>
        </ul>
      </div>
      {currentTab(tab)}
    </div>
  );
}

export default Root;
