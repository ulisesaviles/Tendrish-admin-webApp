// React imports
import { useState } from "react";

// Local imports
import { viewRecipe as strings, langs } from "../config/text";

// Icons
import { MdSearch } from "react-icons/md";

// Style
import "../App.css";
import { getTheme } from "../config/theme";

// Http
import axios from "axios";

function Createingredient() {
  // Constants
  const theme = getTheme();
  const [searchResults, setSearchResults] = useState(null);
  const [searchHidden, setSearchHidden] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedResultIndex, setSelectedResultIndex] = useState(null);

  // Functions
  const capitilize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const search = async () => {
    const response = await axios({
      method: "post",
      url: "https://us-central1-tendrishh.cloudfunctions.net/server",
      data: {
        method: "recipesSearch",
        filters: {
          lang: theme.lang,
          name: inputValue.toLowerCase(),
          published: !searchHidden,
          category: null,
          tags: [],
          includedIngredients: [],
        },
        start: 0,
        end: 10,
      },
    });
    setSelectedResultIndex(null);
    if (response.status === 200) setSearchResults(response.data);
  };

  // Render
  return (
    <div className="tab-container">
      <div className="content-container">
        {/* General */}
        <div className="subsection recipe-finder-container">
          <h1 className="section-title">{strings.search.title[theme.lang]}</h1>
          {/* Search */}
          <div className="recipe-search-supercontainer">
            <div className="recipe-search-container">
              <input
                className="input"
                placeholder={strings.search.placeholder[theme.lang]}
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
              />
              <div className="recipe-search-btn btn" onClick={search}>
                <MdSearch />
              </div>
            </div>
            <div className="toggle recipe-search-visibility-toggle">
              <div
                className={`toggle-item${
                  searchHidden ? " toggle-item-selected" : ""
                }`}
                onClick={() => setSearchHidden(true)}
              >
                <p style={{ margin: 0 }}>
                  {strings.search.visibility.hidden[theme.lang]}
                </p>
              </div>
              <div
                className={`toggle-item${
                  !searchHidden ? " toggle-item-selected" : ""
                }`}
                onClick={() => setSearchHidden(false)}
              >
                <p style={{ margin: 0 }}>
                  {strings.search.visibility.shown[theme.lang]}
                </p>
              </div>
            </div>
          </div>
          {/* Search results */}
          <div
            className={`recipe-search-results-container${
              searchResults === null ||
              (typeof searchResults === "object" && searchResults.length === 0)
                ? "-empty"
                : ""
            }`}
          >
            {searchResults === null ? (
              <p>{strings.search.states.undone[theme.lang]}</p>
            ) : typeof searchResults === "object" &&
              searchResults.length === 0 ? (
              <p>{strings.search.states.empty[theme.lang]}</p>
            ) : (
              // Search results
              <>
                {searchResults.map((recipe) => (
                  <div className="recipe-search-recipe-container">
                    <div className="recipe-search-recipe-img-container">
                      <img
                        src={recipe.general.img}
                        className="recipe-search-recipe-img"
                      />
                    </div>
                    <div className="recipe-search-recipe-txt-container">
                      <p className="recipe-search-recipe-name">
                        {capitilize(recipe.general.name[theme.lang])}
                      </p>
                      <p className="recipe-search-recipe-category">
                        {capitilize(recipe[`search-category-${theme.lang}`])}
                      </p>
                      <div className="recipe-search-recipe-view-container">
                        <div
                          className={`recipe-search-recipe-view${
                            searchResults.indexOf(recipe) ===
                            selectedResultIndex
                              ? " btn"
                              : ""
                          }`}
                          onClick={() =>
                            setSelectedResultIndex(
                              searchResults.indexOf(recipe)
                            )
                          }
                        >
                          {strings.search.viewBtn[theme.lang]}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        {/* Nutrivalues */}
        <div className="subsection recipe-recipeSection-container">
          <h1 className="section-title">{strings.recipe.title[theme.lang]}</h1>
          <p style={{ width: 10 }}>
            {selectedResultIndex !== null
              ? JSON.stringify(searchResults[selectedResultIndex])
              : null}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Createingredient;
