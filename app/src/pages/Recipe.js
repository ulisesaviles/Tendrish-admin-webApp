// React imports
import { useState } from "react";

// Local imports
import { langs, viewRecipe as strings } from "../config/text";

// Icons
import { MdSearch } from "react-icons/md";

// Style
import "../App.css";
import { getTheme } from "../config/theme";

// Http
import axios from "axios";

// Navigation
import { useHistory } from "react-router-dom";

function Createingredient() {
  // Constants
  const theme = getTheme();
  const admin = JSON.parse(localStorage.getItem("user"));
  let history = useHistory();
  // Search
  const [searchResults, setSearchResults] = useState(null);
  const [searchHidden, setSearchHidden] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(null);
  const [queriedIndexes, setQueriedIndexes] = useState([]);
  // Recipe
  const [currentRecipe, setCurrentRecipe] = useState(null);

  // Functions
  const capitilize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const changeRecipeVisibility = (visibility) => {
    setCurrentRecipe({ ...currentRecipe, published: visibility });
    let admin = JSON.parse(localStorage.getItem("user"));
    axios({
      method: "post",
      url: "https://us-central1-tendrishh.cloudfunctions.net/server",
      data: {
        method: "changeRecipeVisibility",
        admin: {
          email: admin.id,
          password: admin.personalInfo.password,
        },
        recipeId: currentRecipe.general.name.en.toLowerCase(),
        published: visibility,
      },
    }).then((response) => {
      if (response.status === 200) {
        let temp = searchResults;
        temp[currentRecipeIndex] = {
          ...temp[currentRecipeIndex],
          published: visibility,
        };
      } else {
        setCurrentRecipe({
          ...currentRecipe,
          published: searchResults[currentRecipeIndex].published,
        });
      }
    });
  };

  const changeRecipeCost = (isFree) => {
    setCurrentRecipe({ ...currentRecipe, free: isFree });
    let admin = JSON.parse(localStorage.getItem("user"));
    axios({
      method: "post",
      url: "https://us-central1-tendrishh.cloudfunctions.net/server",
      data: {
        method: "changeRecipeCost",
        admin: {
          email: admin.id,
          password: admin.personalInfo.password,
        },
        recipeId: currentRecipe.general.name.en.toLowerCase(),
        free: isFree,
      },
    }).then((response) => {
      if (response.status === 200) {
        console.log(
          `The server succesfully changed recipe's free to ${isFree}`
        );
        let temp = searchResults;
        temp[currentRecipeIndex] = {
          ...temp[currentRecipeIndex],
          free: isFree,
        };
      } else {
        setCurrentRecipe({
          ...currentRecipe,
          free: searchResults[currentRecipeIndex].free,
        });
      }
    });
  };

  const correctLang = (multiLangObj) => {
    if (multiLangObj[theme.lang] === undefined) {
      return multiLangObj[langs.default];
    }
    return multiLangObj[theme.lang];
  };

  const deleteRecipe = async () => {
    if (
      window.confirm(
        strings.recipe.deleteConfirmation[theme.lang](
          correctLang(currentRecipe.general.name)
        )
      )
    ) {
      await axios({
        method: "post",
        url: "https://us-central1-tendrishh.cloudfunctions.net/server",
        data: {
          method: "deleteRecipe",
          admin: {
            email: admin.id,
            password: admin.personalInfo.password,
          },
          recipeId: currentRecipe.general.name.en.toLowerCase(),
        },
      });
      setValuesToDefault();
    } else console.log("Cancelled");
  };

  const editRecipe = () => {
    // Save recipe in storage
    localStorage.setItem(
      "recipeToEdit",
      JSON.stringify({
        ...currentRecipe,
        id: currentRecipe.general.name.en.toLowerCase(),
      })
    );
    // Navigate to editRecipe
    history.replace(
      `?tab=CreateRecipe&lang=${theme.lang}&colorScheme=${theme.colorScheme}`
    );
  };

  const getFullRecipe = async (recipe) => {
    // Get ingredients
    recipe.prep.ingredients = await getRecipeIngredients(
      recipe.prep.ingredients
    );
    // Get accompaniments
    recipe.opc.accompaniments = await getRecipeAccompaniments(
      recipe.opc.accompaniments
    );
    // Get nutrivalues
    recipe.nutrivalues = await getNutrivalues(
      recipe.general.name.en.toLowerCase()
    );
    return recipe;
  };

  const getNutrivalues = async (recipeId) => {
    return (
      await axios({
        method: "post",
        url: "https://us-central1-tendrishh.cloudfunctions.net/server",
        data: {
          method: "getRecipeNutrifacts",
          recipeId,
        },
      })
    ).data;
  };

  const getRecipeAccompaniments = async (accompanimentsList) => {
    for (let i = 0; i < accompanimentsList.length; i++) {
      accompanimentsList[i] = (
        await axios({
          method: "post",
          url: "https://us-central1-tendrishh.cloudfunctions.net/server",
          data: {
            method: "getRecipeById",
            recipeId: accompanimentsList[i],
          },
        })
      ).data;
    }
    return accompanimentsList;
  };

  const getRecipeIngredients = async (ingredientsList) => {
    for (let i = 0; i < ingredientsList.length; i++) {
      ingredientsList[i].name = (
        await axios({
          method: "post",
          url: "https://us-central1-tendrishh.cloudfunctions.net/server",
          data: {
            method: "getIngredientName",
            ingredientId: ingredientsList[i].id,
          },
        })
      ).data;
    }
    return ingredientsList;
  };

  const handleRecipeClick = async (index) => {
    setCurrentRecipeIndex(index);
    if (!queriedIndexes.includes(index)) {
      setQueriedIndexes([...queriedIndexes, index]);
      let recipe = await getFullRecipe(searchResults[index]);
      let temp = searchResults;
      temp[index] = recipe;
      setSearchResults(temp);
      setCurrentRecipe(recipe);
    } else {
      setCurrentRecipe(searchResults[index]);
    }
  };

  const search = async () => {
    setValuesToDefault();
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

  const setValuesToDefault = () => {
    setCurrentRecipe(null);
    setCurrentRecipeIndex(null);
    setSearchResults(null);
    setQueriedIndexes([]);
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
                        {capitilize(correctLang(recipe.general.name))}
                      </p>
                      <p className="recipe-search-recipe-category">
                        {capitilize(
                          recipe[`search-category-${theme.lang}`] !== undefined
                            ? recipe[`search-category-${theme.lang}`]
                            : recipe[`search-category-${langs.default}`]
                        )}
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
                {/* Recipe */}
                <div className="recipe-recipeSection-recipe-container">
                  {/* Img */}
                  <div className="recipe-recipeSection-recipe-img-container">
                    <img
                      src={currentRecipe.general.img}
                      alt="recipe-recipeSection-recipe-img"
                      className="recipe-recipeSection-recipe-img"
                    />
                  </div>
                  {/* Content  */}
                  <div className="recipe-recipeSection-recipe-content-container">
                    {/* Details */}
                    <div className="recipe-recipeSection-recipe-details-container">
                      <p className="recipe-recipeSection-recipe-category">
                        {capitilize(
                          currentRecipe[`search-category-${theme.lang}`] !==
                            undefined
                            ? currentRecipe[`search-category-${theme.lang}`]
                            : currentRecipe[`search-category-${langs.default}`]
                        )}
                      </p>
                      <p className="recipe-recipeSection-recipe-name">
                        {capitilize(correctLang(currentRecipe.general.name))}
                      </p>
                      <p className="recipe-recipeSection-recipe-description">
                        {capitilize(
                          correctLang(currentRecipe.general.description)
                        )}
                      </p>
                    </div>
                    <div className="recipe-recipeSection-recipe-separator" />
                    {/* Ingredients */}
                    <>
                      <p className="recipe-recipeSection-recipe-category">
                        {strings.recipe.recipe.ingredients.title[theme.lang]}
                      </p>
                      {currentRecipe.prep.ingredients.map((ingredient) => (
                        <div className="recipe-recipeSection-recipe-ingredient-container">
                          <p className="recipe-recipeSection-recipe-ingredient-bullet">
                            •
                          </p>
                          <p className="recipe-recipeSection-recipe-ingredient-cuantity">
                            {ingredient.cuantity.denominator === 1
                              ? ingredient.cuantity.numerator
                              : `${ingredient.cuantity.numerator}/${ingredient.cuantity.denominator}`}
                            {
                              strings.recipe.recipe.units[
                                ingredient.measuredBy
                              ][ingredient.unit][theme.lang]
                            }
                          </p>
                          <p style={{ margin: 0 }}>
                            {correctLang(ingredient.name)}
                          </p>
                        </div>
                      ))}
                    </>
                    <div className="recipe-recipeSection-recipe-separator" />
                    {/* Instructions */}
                    <>
                      <p className="recipe-recipeSection-recipe-category">
                        {strings.recipe.recipe.instructions[theme.lang]}
                      </p>
                      {currentRecipe.prep.instructions.map((instruction) => (
                        <div className="recipe-recipeSection-recipe-ingredient-container">
                          <p className="recipe-recipeSection-recipe-ingredient-bullet">
                            {currentRecipe.prep.instructions.indexOf(
                              instruction
                            ) + 1}
                          </p>
                          <p className="recipe-recipeSection-recipe-instruction">
                            {correctLang(instruction)}
                          </p>
                        </div>
                      ))}
                    </>
                    <div className="recipe-recipeSection-recipe-separator" />
                    {/* Accompaniments */}
                    <>
                      {currentRecipe.opc.accompaniments.length > 0 ? (
                        <>
                          <p className="recipe-recipeSection-recipe-category">
                            {
                              strings.recipe.recipe.accompaniments.title[
                                theme.lang
                              ]
                            }
                          </p>
                          <div className="recipe-recipeSection-recipe-accompaniments-container">
                            {currentRecipe.opc.accompaniments.map(
                              (accompaniment) => (
                                <div className="recipe-recipeSection-recipe-accompaniment-container">
                                  <img
                                    alt="recipe-recipeSection-recipe-accompaniment-img"
                                    className="recipe-recipeSection-recipe-accompaniment-img"
                                    src={accompaniment.general.img}
                                  />
                                  <p className="recipe-recipeSection-recipe-accompaniment-name">
                                    {correctLang(accompaniment.general.name)}
                                  </p>
                                  <p className="recipe-recipeSection-recipe-accompaniment-view">
                                    {strings.search.viewBtn[theme.lang]}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                          <div className="recipe-recipeSection-recipe-separator" />
                        </>
                      ) : null}
                    </>
                    {/* Nutrifacts */}
                    <>
                      <p className="recipe-recipeSection-recipe-category">
                        {strings.recipe.recipe.nutrivalues.title[theme.lang]}
                      </p>
                      <div className="recipe-recipeSection-recipe-nutrivalues-container">
                        {/* Calories */}
                        <div className="recipe-recipeSection-recipe-nutrivalues-row-container">
                          <p
                            className={
                              strings.recipe.recipe.nutritionalInfo[0].className
                            }
                          >
                            {
                              strings.recipe.recipe.nutritionalInfo[0].name[
                                theme.lang
                              ]
                            }
                          </p>
                          <p
                            className={
                              strings.recipe.recipe.nutritionalInfo[0].className
                            }
                          >
                            {currentRecipe.nutrivalues[
                              strings.recipe.recipe.nutritionalInfo[0].key
                            ] %
                              1 !==
                            0
                              ? currentRecipe.nutrivalues[
                                  strings.recipe.recipe.nutritionalInfo[0].key
                                ].toFixed(2)
                              : currentRecipe.nutrivalues[
                                  strings.recipe.recipe.nutritionalInfo[0].key
                                ]}
                          </p>
                        </div>
                        {/* Other nutrivalues */}
                        {strings.recipe.recipe.nutritionalInfo.map(
                          (nutrifact) => {
                            if (
                              strings.recipe.recipe.nutritionalInfo.indexOf(
                                nutrifact
                              ) !== 0
                            )
                              return (
                                <div className="recipe-recipeSection-recipe-nutrivalues-row-container">
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                    }}
                                  >
                                    <p className={nutrifact.className}>
                                      {nutrifact.name[theme.lang]}
                                    </p>
                                    <p style={{ margin: 0, fontSize: 14 }}>
                                      {currentRecipe.nutrivalues[
                                        nutrifact.key
                                      ] %
                                        1 !==
                                      0
                                        ? currentRecipe.nutrivalues[
                                            nutrifact.key
                                          ].toFixed(2)
                                        : currentRecipe.nutrivalues[
                                            nutrifact.key
                                          ]}
                                      {nutrifact.unit}
                                    </p>
                                  </div>
                                  <div>
                                    {nutrifact.dailyValue !== null ? (
                                      <p
                                        style={{ margin: 0 }}
                                        className="nutrifact"
                                      >
                                        {Math.round(
                                          (currentRecipe.nutrivalues[
                                            nutrifact.key
                                          ] *
                                            100) /
                                            nutrifact.dailyValue
                                        )}{" "}
                                        %
                                      </p>
                                    ) : null}
                                  </div>
                                </div>
                              );
                          }
                        )}
                      </div>
                      <p className="dailyvalue">
                        {
                          strings.recipe.recipe.nutrivalues.dailyValue[
                            theme.lang
                          ]
                        }
                      </p>
                    </>
                    {/* Notes */}
                    <>
                      {currentRecipe.opc.notes[theme.lang] != null ? (
                        <>
                          <div className="recipe-recipeSection-recipe-separator" />
                          <p className="recipe-recipeSection-recipe-category">
                            {strings.recipe.recipe.notes[theme.lang]}
                          </p>
                          <p className="recipe-recipeSection-recipe-notes">
                            {currentRecipe.opc.notes[theme.lang]}
                          </p>
                        </>
                      ) : null}
                    </>
                  </div>
                </div>
                {/* Options */}
                <div className="recipe-recipeSection-options-container">
                  {/* Visibility toggle */}
                  <>
                    {["Developer", "Super admin"].includes(
                      admin.personalInfo.rol
                    ) ? (
                      <div className="toggle recipe-search-visibility-toggle">
                        <div
                          className={`toggle-item${
                            !currentRecipe.published
                              ? " toggle-item-selected"
                              : ""
                          }`}
                          onClick={() => changeRecipeVisibility(false)}
                        >
                          <p style={{ margin: 0 }}>
                            {
                              strings.recipe.options.visibility.hidden[
                                theme.lang
                              ]
                            }
                          </p>
                        </div>
                        <div
                          className={`toggle-item${
                            currentRecipe.published
                              ? " toggle-item-selected"
                              : ""
                          }`}
                          onClick={() => changeRecipeVisibility(true)}
                        >
                          <p style={{ margin: 0 }}>
                            {
                              strings.recipe.options.visibility.shown[
                                theme.lang
                              ]
                            }
                          </p>
                        </div>
                      </div>
                    ) : null}
                  </>
                  {/* Free toggle */}
                  <>
                    {["Developer", "Super admin"].includes(
                      admin.personalInfo.rol
                    ) ? (
                      <div className="toggle recipe-search-visibility-toggle">
                        <div
                          className={`toggle-item${
                            currentRecipe.free ? " toggle-item-selected" : ""
                          }`}
                          onClick={() => changeRecipeCost(true)}
                        >
                          <p style={{ margin: 0 }}>
                            {
                              strings.recipe.options.isInFreeTrial.true[
                                theme.lang
                              ]
                            }
                          </p>
                        </div>
                        <div
                          className={`toggle-item${
                            !currentRecipe.free ? " toggle-item-selected" : ""
                          }`}
                          onClick={() => changeRecipeCost(false)}
                        >
                          <p style={{ margin: 0 }}>
                            {
                              strings.recipe.options.isInFreeTrial.false[
                                theme.lang
                              ]
                            }
                          </p>
                        </div>
                      </div>
                    ) : null}
                  </>
                  {/* Edit btn */}
                  <div
                    className="btn recipe-recipeSection-options-editRecipeBtn"
                    onClick={editRecipe}
                  >
                    {strings.recipe.options.editBtn[theme.lang]}
                  </div>
                  {/* Delete btn */}
                  <>
                    {["Developer", "Super admin"].includes(
                      admin.personalInfo.rol
                    ) ? (
                      <div
                        className="recipe-recipeSection-options-deleteRecipeBtn"
                        onClick={deleteRecipe}
                      >
                        {strings.recipe.options.deleteRecipe[theme.lang]}
                      </div>
                    ) : null}
                  </>
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
