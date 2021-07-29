// React imports
import { useState } from "react";

// Local imports
import { viewRecipe as strings } from "../config/text";

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
  // Search
  const [searchResults, setSearchResults] = useState(null);
  const [searchHidden, setSearchHidden] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(null);
  // Recipe
  const [currentRecipe, setCurrentRecipe] = useState(null);

  // Functions
  const capitilize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const deleteRecipe = () => {
    if (window.confirm(strings.recipe.deleteConfirmation[theme.lang]("Sample")))
      console.log("Delete");
    else console.log("Cancelled");
  };

  const handleRecipeClick = (index) => {
    setCurrentRecipeIndex(index);
    setCurrentRecipe(searchResults[index]);
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
    setCurrentRecipe(null);
    if (response.status === 200) setSearchResults(response.data);
  };

  // Render
  return (
    <div className="tab-container">
      <div className="content-container">
        {/* Recipe finder */}
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
                        alt="recipe-search-recipe-img"
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
                            searchResults.indexOf(recipe) === currentRecipeIndex
                              ? " btn"
                              : ""
                          }`}
                          onClick={() =>
                            handleRecipeClick(searchResults.indexOf(recipe))
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
        {/* Recipe */}
        <div className="subsection recipe-recipeSection-container">
          <h1 className="section-title">{strings.recipe.title[theme.lang]}</h1>
          <div
            className={`recipe-recipeSection-content-container${
              currentRecipe === null ? "-empty" : ""
            }`}
          >
            {currentRecipe === null ? (
              <p>{strings.recipe.empty[theme.lang]}</p>
            ) : (
              <>
                <div className="recipe-recipeSection-recipe-container">
                  {JSON.stringify(currentRecipe)}
                </div>
                <div className="recipe-recipeSection-options-container">
                  {/* Visibility toggle */}
                  <div className="toggle recipe-search-visibility-toggle">
                    <div
                      className={`toggle-item${
                        !currentRecipe.published ? " toggle-item-selected" : ""
                      }`}
                      onClick={() =>
                        setCurrentRecipe({ ...currentRecipe, published: false })
                      }
                    >
                      <p style={{ margin: 0 }}>
                        {strings.recipe.options.visibility.hidden[theme.lang]}
                      </p>
                    </div>
                    <div
                      className={`toggle-item${
                        currentRecipe.published ? " toggle-item-selected" : ""
                      }`}
                      onClick={() =>
                        setCurrentRecipe({ ...currentRecipe, published: true })
                      }
                    >
                      <p style={{ margin: 0 }}>
                        {strings.recipe.options.visibility.shown[theme.lang]}
                      </p>
                    </div>
                  </div>
                  {/* Free toggle */}
                  <div className="toggle recipe-search-visibility-toggle">
                    <div
                      className={`toggle-item${
                        currentRecipe.free ? " toggle-item-selected" : ""
                      }`}
                      onClick={() =>
                        setCurrentRecipe({ ...currentRecipe, free: true })
                      }
                    >
                      <p style={{ margin: 0 }}>
                        {strings.recipe.options.isInFreeTrial.true[theme.lang]}
                      </p>
                    </div>
                    <div
                      className={`toggle-item${
                        !currentRecipe.free ? " toggle-item-selected" : ""
                      }`}
                      onClick={() =>
                        setCurrentRecipe({ ...currentRecipe, free: false })
                      }
                    >
                      <p style={{ margin: 0 }}>
                        {strings.recipe.options.isInFreeTrial.false[theme.lang]}
                      </p>
                    </div>
                  </div>
                  {/* Edit btn */}
                  <div className="btn recipe-recipeSection-options-editRecipeBtn">
                    {strings.recipe.options.editBtn[theme.lang]}
                  </div>
                  {/* Delete btn */}
                  <div
                    className="recipe-recipeSection-options-deleteRecipeBtn"
                    onClick={deleteRecipe}
                  >
                    {strings.recipe.options.deleteRecipe[theme.lang]}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Createingredient;
