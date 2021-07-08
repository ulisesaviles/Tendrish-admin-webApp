// React imports
import { useState, useRef } from "react";

// Local imports
import { createRecipe as strings, langs } from "../config/text";

// Icons
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdKeyboardArrowDown,
  MdAdd,
  MdRemove,
  MdRemoveCircle,
} from "react-icons/md";

// Style
import "../App.css";
import { getTheme } from "../config/theme";

// Http
import axios from "axios";

function Createingredient() {
  // Constants
  // Global
  const theme = getTheme();
  const [firstLoad, setFirstLoad] = useState(true);
  const [queryCounter, setQueryCounter] = useState(0);
  const [defaultValues, setDefaultValues] = useState({
    categories: [],
    ingredients: [],
    tags: [],
    creators: [],
  });
  // General
  let defaultLangObj = {};
  defaultLangObj[langs.default] = "";
  const [usedLangs, setUsedLangs] = useState([langs.default]);
  const imgInputRef = useRef();
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState(defaultLangObj);
  const [description, setDescription] = useState(defaultLangObj);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [displayCreateCat, setDisplayCreateCat] = useState(false);
  // Prep
  const [servings, setServings] = useState(1);
  const [time, setTime] = useState({ prep: 10, cook: 0 });
  const [focusedInputIndex, setFocusedInputIndex] = useState(null);
  const defaultIngredient = {
    name: "",
    id: null,
    cuantity: {
      numerator: 1,
      denominator: 1,
    },
    unit: "",
  };
  const [ingredients, setIngredients] = useState([defaultIngredient]);
  const [instructions, setInstructions] = useState([defaultLangObj]);

  // Functions
  const addIngredient = () => {
    setIngredients([...ingredients, defaultIngredient]);
  };

  const addInstruction = () => {
    setInstructions([...instructions, defaultLangObj]);
  };

  const getSuggestions = (ingredientName, ingredientIndex) => {
    let suggestions = [];
    let tempIngredients = [...ingredients];
    let id = null;
    for (let i = 0; i < defaultValues.ingredients.length; i++) {
      if (
        defaultValues.ingredients[i].name[theme.lang]
          .substring(0, ingredientName.length)
          .toLowerCase() === ingredientName.toLowerCase()
      ) {
        suggestions.push(defaultValues.ingredients[i].name[theme.lang]);
      }
      if (
        defaultValues.ingredients[i].name[theme.lang].toLowerCase() ===
        ingredientName.toLowerCase()
      ) {
        id = defaultValues.ingredients[i].id;
      }
    }
    tempIngredients[ingredientIndex].id = id;
    if (JSON.stringify(tempIngredients) !== JSON.stringify(ingredients)) {
      setIngredients(tempIngredients);
    }
    return suggestions;
  };

  const handleDecriptionChange = (value, lang) => {
    let tempDescription = { ...description };
    tempDescription[lang] = value;
    setDescription(tempDescription);
  };

  const handleIngredientQuantityChange = (index, isNumerator, changeType) => {
    let tempIngredients = [...ingredients];
    tempIngredients[index].cuantity[
      isNumerator ? "numerator" : "denominator"
    ] +=
      changeType === "sum"
        ? 1
        : tempIngredients[index].cuantity[
            isNumerator ? "numerator" : "denominator"
          ] === 1
        ? 0
        : -1;
    setIngredients(tempIngredients);
  };

  const handleIngredientsChange = (changeType, index, value) => {
    let tempIngredients = [...ingredients];
    if (changeType === "name") {
      tempIngredients[index].name = value;
    }
    setIngredients(tempIngredients);
  };

  const handleInstructionsChange = (value, lang, index) => {
    let tempInstructions = [...instructions];
    tempInstructions[index][lang] = value;
    setInstructions(tempInstructions);
  };

  const handleLangClick = (lang) => {
    let tempLangs = [...usedLangs];
    if (lang !== langs.default) {
      if (tempLangs.includes(lang)) {
        tempLangs.splice(tempLangs.indexOf(lang), 1);
        setUsedLangs(tempLangs);
      } else {
        tempLangs.push(lang);
        setUsedLangs(tempLangs);
      }
    }
  };

  const handleNameChange = (value, lang) => {
    let tempNames = { ...name };
    tempNames[lang] = value;
    setName(tempNames);
  };

  const handleServingsChange = (type) => {
    if (type === "sum") {
      setServings(servings + 1);
    } else {
      setServings(servings <= 1 ? servings : servings - 1);
    }
  };

  const handleSetupQuery = async () => {
    setQueryCounter(queryCounter + 1);
    if (queryCounter > 3) {
      alert("Llevas 3 perro.");
      return;
    }
    console.log("I will make a query");
    let response = await axios({
      method: "post",
      url: "https://us-central1-tendrishh.cloudfunctions.net/server",
      data: {
        method: "createRecipeSetup",
        rol: "Developer",
      },
    });
    if (response.status === 200) {
      setDefaultValues(response.data);
    } else {
      alert("Error de la base de datos, vuelve a intentarlo más tarde.");
    }
  };

  const handleSuggestionClick = (suggestion) => {
    console.log(`Clicked ${suggestion}`);
    let tempIngredients = [...ingredients];
    tempIngredients[focusedInputIndex].name = suggestion;
    setIngredients(tempIngredients);
  };

  const handleTimeChange = (valueToChange, type) => {
    if (valueToChange === "prep") {
      if (type === "sum") {
        setTime({
          ...time,
          prep: time.prep + 1,
        });
      } else {
        setTime({
          ...time,
          prep: time.prep <= 0 ? time.prep : time.prep - 1,
        });
      }
    } else {
      if (type === "sum") {
        setTime({
          ...time,
          cook: time.cook + 1,
        });
      } else {
        setTime({
          ...time,
          cook: time.cook <= 0 ? time.cook : time.cook - 1,
        });
      }
    }
  };

  const imageWasSelected = (event) => {
    if (event.target.files.length > 0) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    } else {
      setSelectedImage(null);
    }
  };

  const removeIngredient = (index) => {
    let tempIngredients = [...ingredients];
    tempIngredients.splice(index, 1);
    setIngredients(tempIngredients);
  };

  const removeInstruction = (index) => {
    let tempInstructions = [...instructions];
    tempInstructions.splice(index, 1);
    setInstructions(tempInstructions);
  };

  // Logic
  if (firstLoad) {
    setFirstLoad(false);
    handleSetupQuery();
  }

  // Render
  return (
    <div className="tab-container">
      <div className="content-container">
        {/* General */}
        <div className="subsection createRecipe-general-container">
          <h1 className="section-title">{strings.general.title[theme.lang]}</h1>
          <div className="input-section">
            {/* Langs */}
            <h3 className="input-name">{strings.general.langs[theme.lang]}</h3>
            {langs.available.map((lang) => (
              <div
                className="ingredient-lang-container"
                onClick={() => {
                  handleLangClick(lang.key);
                }}
              >
                {usedLangs.includes(lang.key) ? (
                  <MdCheckBox className="ingredient-lang-checkbox" />
                ) : (
                  <MdCheckBoxOutlineBlank className="ingredient-lang-checkbox" />
                )}
                <p className="ingredient-lang">{lang.name[theme.lang]}</p>
              </div>
            ))}
          </div>

          {/* Photo */}
          <div className="input-section">
            <div className="createRecipe-img-header-container">
              <h3 className="input-name">
                {strings.general.img.title[theme.lang]}
              </h3>
              <div
                className="btn recipe-img-input"
                onClick={() => imgInputRef.current.click()}
              >
                {strings.general.img.btn[theme.lang]}
              </div>
            </div>
            <input
              ref={imgInputRef}
              type="file"
              onChange={imageWasSelected}
              accept="image/*"
              style={{ display: "none" }}
            />
            {selectedImage !== null ? (
              <img src={selectedImage} alt="" className="createRecipe-image" />
            ) : (
              <div className="createRecipe-image">
                {strings.general.img.placeholder[theme.lang]}
              </div>
            )}
          </div>

          {/* Name */}
          <div className="input-section">
            <h3 className="input-name">
              {strings.general.name.title[theme.lang]}
            </h3>
            {usedLangs.map((lang) => (
              <div className="input-container">
                <p className="input-lang">{`${lang.toUpperCase()}: `}</p>
                <input
                  className="input"
                  placeholder={strings.general.name.placeholder[lang]}
                  value={name[lang]}
                  onChange={(event) =>
                    handleNameChange(event.target.value, lang)
                  }
                />
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="input-section">
            <h3 className="input-name">
              {strings.general.description.title[theme.lang]}
            </h3>
            {usedLangs.map((lang) => (
              <div className="input-container">
                <p className="input-lang">{`${lang.toUpperCase()}: `}</p>
                <input
                  className="input"
                  placeholder={strings.general.description.placeholder[lang]}
                  value={description[lang]}
                  onChange={(event) =>
                    handleDecriptionChange(event.target.value, lang)
                  }
                />
              </div>
            ))}
          </div>

          {/* Category */}
          <div className="input-section">
            <h3 className="input-name">
              {strings.general.category.title[theme.lang]}
            </h3>
            {defaultValues.categories.map((category) => (
              <div
                className="ingredient-lang-container"
                onClick={() => {
                  setSelectedCategoryIndex(
                    defaultValues.categories.indexOf(category)
                  );
                }}
              >
                {defaultValues.categories.indexOf(category) ===
                selectedCategoryIndex ? (
                  <MdCheckBox className="ingredient-lang-checkbox" />
                ) : (
                  <MdCheckBoxOutlineBlank className="ingredient-lang-checkbox" />
                )}
                <p className="ingredient-lang">{category.name[theme.lang]}</p>
              </div>
            ))}
            <div
              onClick={() => setDisplayCreateCat(!displayCreateCat)}
              className="createCat-title-container"
            >
              <p className="createCat">
                {strings.general.category.create.title[theme.lang]}{" "}
              </p>
              <MdKeyboardArrowDown
                className={
                  displayCreateCat
                    ? "dropdown-icon dropdown-icon-selected"
                    : "dropdown-icon"
                }
              />
            </div>
            {displayCreateCat ? (
              <div className="createCat-container">
                {langs.available.map((lang) => (
                  <div className="input-container">
                    <p className="input-lang">{`${lang.key.toUpperCase()}: `}</p>
                    <input
                      className="input"
                      placeholder={
                        strings.general.category.create.placeholder[lang.key]
                      }
                      // value={names[lang]}
                      // onChange={(event) =>
                      //   handleChangeNames(lang, event.target.value)
                      // }
                    />
                  </div>
                ))}
                <div className="btn create-category-btn">
                  {strings.general.category.create.btn[theme.lang]}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Preparation */}
        <div className="subsection createRecipe-prep-container">
          <h1 className="section-title">{strings.prep.title[theme.lang]}</h1>

          {/* Servings */}
          <div className="input-section">
            <h3 className="input-name">{strings.prep.servings[theme.lang]}</h3>
            <div className="createRecepy-quantity-input-container">
              <div
                className="createRecepy-add-btn btn"
                onClick={() => handleServingsChange("substraction")}
              >
                <MdRemove />
              </div>
              {servings}
              <div
                className="createRecepy-add-btn btn"
                onClick={() => handleServingsChange("sum")}
              >
                <MdAdd />
              </div>
            </div>
          </div>

          {/* Time */}
          <div className="input-section">
            <h3 className="input-name">
              {strings.prep.time.title[theme.lang]}
            </h3>
            <p className="createRecipe-timeType">
              {strings.prep.time.prep[theme.lang]}
            </p>
            <div className="createRecepy-quantity-input-container">
              <div
                className="createRecepy-add-btn btn"
                onClick={() => handleTimeChange("prep", "substraction")}
              >
                <MdRemove />
              </div>
              {time.prep}
              <div
                className="createRecepy-add-btn btn"
                onClick={() => handleTimeChange("prep", "sum")}
              >
                <MdAdd />
              </div>
            </div>
            <p className="createRecipe-timeType">
              {strings.prep.time.cook[theme.lang]}
            </p>
            <div className="createRecepy-quantity-input-container">
              <div
                className="createRecepy-add-btn btn"
                onClick={() => handleTimeChange("cook", "substraction")}
              >
                <MdRemove />
              </div>
              {time.cook}
              <div
                className="createRecepy-add-btn btn"
                onClick={() => handleTimeChange("cook", "sum")}
              >
                <MdAdd />
              </div>
            </div>
            <p className="createRecipe-timeType createRecipe-totalTime">
              {strings.prep.time.total[theme.lang](time.cook + time.prep)}
            </p>
          </div>

          {/* Ingredients */}
          <div className="input-section">
            <h3 className="input-name">
              {strings.prep.ingredients.title[theme.lang]}
            </h3>
            {ingredients.map((ingredient) => (
              <div className="createRecipe-ingredient-container">
                <div>
                  <h1 className="createRecipe-ingredient-bullet">•</h1>
                  {ingredients.length > 1 ? (
                    <MdRemoveCircle
                      className="createRecipe-deleteIcon"
                      onClick={() =>
                        removeIngredient(ingredients.indexOf(ingredient))
                      }
                    />
                  ) : null}
                </div>
                <div className="createRecipe-ingredient-inputs-container">
                  <div className="createRecipe-ingredient-input-container">
                    <input
                      className={`input${
                        ingredient.id === null ? " input-error" : ""
                      }`}
                      placeholder={
                        strings.prep.ingredients.placeholder[theme.lang]
                      }
                      value={ingredient.name}
                      onChange={(event) =>
                        handleIngredientsChange(
                          "name",
                          ingredients.indexOf(ingredient),
                          event.target.value
                        )
                      }
                      onFocus={() =>
                        setFocusedInputIndex(ingredients.indexOf(ingredient))
                      }
                      onBlur={() =>
                        setTimeout(() => setFocusedInputIndex(null), 200)
                      }
                    />
                    {focusedInputIndex === ingredients.indexOf(ingredient) ? (
                      <div className="hide-overflow-y">
                        <div className="suggestions-container">
                          {getSuggestions(
                            ingredient.name,
                            ingredients.indexOf(ingredient)
                          ).map((suggestion) => (
                            <div
                              className="suggestion-container"
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              {suggestion}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div className="input-container">
                    <p className="input-lang">{`${
                      strings.prep.ingredients.unit.title[theme.lang]
                    }: `}</p>
                    <input
                      className="input"
                      placeholder={
                        strings.prep.ingredients.unit.placeholder[theme.lang]
                      }
                      // value={names[lang]}
                      // onChange={(event) =>
                      //   handleChangeNames(lang, event.target.value)
                      // }
                    />
                  </div>
                  <div className="createRecipe-cuantity-container">
                    <p className="input-lang">{`${
                      strings.prep.ingredients.quantity[theme.lang]
                    }: `}</p>
                    <div className="fraction-container">
                      <div className="createRecepy-quantity-input-container createRecepy-quantity-input-container-mini">
                        <div
                          className="createRecepy-add-btn btn createRecepy-add-btn-mini"
                          onClick={() =>
                            handleIngredientQuantityChange(
                              ingredients.indexOf(ingredient),
                              true,
                              "subs"
                            )
                          }
                        >
                          <MdRemove />
                        </div>
                        {ingredient.cuantity.numerator}
                        <div
                          className="createRecepy-add-btn btn createRecepy-add-btn-mini"
                          onClick={() =>
                            handleIngredientQuantityChange(
                              ingredients.indexOf(ingredient),
                              true,
                              "sum"
                            )
                          }
                        >
                          <MdAdd />
                        </div>
                      </div>
                      <div className="dividedBy" />
                      <div className="createRecepy-quantity-input-container createRecepy-quantity-input-container-mini">
                        <div
                          className="createRecepy-add-btn btn createRecepy-add-btn-mini"
                          onClick={() =>
                            handleIngredientQuantityChange(
                              ingredients.indexOf(ingredient),
                              false,
                              "subs"
                            )
                          }
                        >
                          <MdRemove />
                        </div>
                        {ingredient.cuantity.denominator}
                        <div
                          className="createRecepy-add-btn btn createRecepy-add-btn-mini"
                          onClick={() =>
                            handleIngredientQuantityChange(
                              ingredients.indexOf(ingredient),
                              false,
                              "sum"
                            )
                          }
                        >
                          <MdAdd />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="btn add-ingredient-btn" onClick={addIngredient}>
              {strings.prep.ingredients.btn[theme.lang]}
            </div>
          </div>

          {/* Instructions */}
          <div className="input-section">
            <h3 className="input-name">
              {strings.prep.instructions.title[theme.lang]}
            </h3>
            {instructions.map((instruction) => (
              <div className="createRecipe-ingredient-container">
                <div>
                  <h1 className="createRecipe-ingredient-bullet createRecipe-instructions-num">
                    {instructions.indexOf(instruction) + 1}
                  </h1>
                  {instructions.length > 1 ? (
                    <MdRemoveCircle
                      className="createRecipe-deleteIcon"
                      onClick={() =>
                        removeInstruction(instructions.indexOf(instruction))
                      }
                    />
                  ) : null}
                </div>
                <div className="input-section">
                  {usedLangs.map((lang) => (
                    <div className="input-container">
                      <p className="input-lang">{`${lang.toUpperCase()}: `}</p>
                      <input
                        className="input"
                        placeholder={
                          strings.prep.instructions.placeHolder[theme.lang]
                        }
                        value={
                          instructions[instructions.indexOf(instruction)][lang]
                        }
                        onChange={(event) =>
                          handleInstructionsChange(
                            event.target.value,
                            lang,
                            instructions.indexOf(instruction)
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="btn add-ingredient-btn" onClick={addInstruction}>
              {strings.prep.instructions.btn[theme.lang]}
            </div>
          </div>
        </div>

        {/* Optionals */}
        <div className="subsection createRecipe-opc-container">
          <h1 className="section-title">{strings.Opc.title[theme.lang]}</h1>
        </div>
      </div>
    </div>
  );
}

export default Createingredient;
