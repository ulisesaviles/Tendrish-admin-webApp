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
  const [usedLangs, setUsedLangs] = useState([langs.default]);
  const imgInputRef = useRef();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [displayCreateCat, setDisplayCreateCat] = useState(false);
  // Prep
  const [servings, setServings] = useState(1);
  const [time, setTime] = useState({ prep: 10, cook: 0 });
  const [ingredients, setIngredients] = useState([
    {
      ingredient: "",
      cuantity: {
        numerator: 1,
        denominator: 1,
      },
      unit: "",
    },
  ]);

  // Functions
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
  console.log(`Van ${queryCounter} consultas`);

  const handleLangClick = (lang) => {
    let tempLangs = JSON.parse(`${JSON.stringify(usedLangs)}`);
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

  const handleServingsChange = (type) => {
    if (type === "sum") {
      setServings(servings + 1);
    } else {
      setServings(servings <= 1 ? servings : servings - 1);
    }
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
              <img
                src={selectedImage}
                alt="Select an image"
                className="createRecipe-image"
              />
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
                  // value={names[lang]}
                  // onChange={(event) =>
                  //   handleChangeNames(lang, event.target.value)
                  // }
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
                  // value={names[lang]}
                  // onChange={(event) =>
                  //   handleChangeNames(lang, event.target.value)
                  // }
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
                {usedLangs.map((lang) => (
                  <div className="input-container">
                    <p className="input-lang">{`${lang.toUpperCase()}: `}</p>
                    <input
                      className="input"
                      placeholder={
                        strings.general.category.create.placeholder[theme.lang]
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
          </div>

          {/* Instructions */}
          <div className="input-section">
            <h3 className="input-name">
              {strings.prep.instructions.title[theme.lang]}
            </h3>
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
