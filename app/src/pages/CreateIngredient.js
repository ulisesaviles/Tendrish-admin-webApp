// React imports
import { useState } from "react";

// Local imports
import { createIngredient as strings, langs } from "../config/text";

// Icons
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";

// Style
import "../App.css";
import { getTheme } from "../config/theme";

// Http
import axios from "axios";

function Createingredient() {
  // Constants
  const theme = getTheme();
  const [usedLangs, setUsedLangs] = useState([langs.default]);
  let tempNames = {};
  tempNames[langs.default] = "";
  const [names, setNames] = useState(tempNames);
  const [measuredBy, setMeasuredBy] = useState("piece");
  const initialNutriValues = {
    calories: "0",
    totalFat: "0",
    saturatedFat: "0",
    cholesterol: "0",
    carbohydrates: "0",
    dietaryFiber: "0",
    sugar: "0",
    protein: "0",
    sodium: "0",
    calcium: "0",
    iron: "0",
    potassium: "0",
    vitaminD: "0",
  };
  const [nutriValues, setNutriValues] = useState(initialNutriValues);
  const [error, setError] = useState(null);

  // Functions
  const cleanNameInputs = () => {
    let tempNames = { ...names };
    for (let i = 0; i < usedLangs.length; i++) {
      tempNames[usedLangs[i]] = "";
    }
    setNames(tempNames);
  };

  const handleChangeNames = (lang, value) => {
    let tempNames_ = { ...names };
    tempNames_[lang] = value;
    setNames(tempNames_);
  };

  const handleChangeNutriValue = (key, value) => {
    let tempValues = { ...nutriValues };
    tempValues[key] = value;
    setNutriValues(tempValues);
  };

  const handleCreateIngredient = async () => {
    if (nutriValuesAreValid() && namesAreValid()) {
      let response = await axios({
        method: "post",
        url: "https://us-central1-tendrishh.cloudfunctions.net/server",
        data: {
          method: "createIngredient",
          names,
          nutriValues,
          measuredBy,
        },
      });
      if (response.status === 200) {
        alert("Agregado exitosamente!");
        setNutriValues(initialNutriValues);
        cleanNameInputs();
      } else {
        alert("Error al crear ingredient");
      }
    }
  };

  const handleLangClick = (lang) => {
    let tempLangs = [...usedLangs];
    if (lang !== langs.default) {
      if (tempLangs.includes(lang)) {
        tempLangs.splice(tempLangs.indexOf(lang), 1);
        setUsedLangs(tempLangs);
        delete names[lang];
      } else {
        tempLangs.push(lang);
        setUsedLangs(tempLangs);
        names[lang] = "";
      }
    }
  };

  const namesAreValid = () => {
    for (let i = 0; i < usedLangs.length; i++) {
      if (names[usedLangs[i]].length === 0) {
        setError(strings.error[theme.lang]);
        return false;
      }
    }
    setError(null);
    return true;
  };

  const nutriValuesAreValid = () => {
    let keys = Object.keys(nutriValues);
    for (let i = 0; i < keys.length; i++) {
      if (isNaN(parseInt(nutriValues[keys[i]]))) {
        setError(strings.error[theme.lang]);
        return false;
      }
    }
    setError(null);
    return true;
  };

  // Render
  return (
    <div className="tab-container">
      <div className="content-container">
        {/* General */}
        <div className="subsection ingredient-general-container">
          <h1 className="section-title">{strings.general.title[theme.lang]}</h1>
          {/* Langs */}
          <div className="input-section">
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
          {/* Name */}
          <div className="input-section">
            <h3 className="input-name">
              {strings.general.name.title[theme.lang]}
            </h3>
            <div className="ingredient-inputs-container">
              {usedLangs.map((lang) => (
                <div className="input-container">
                  <p className="input-lang">{`${lang.toUpperCase()}: `}</p>
                  <input
                    className="input"
                    placeholder={strings.general.name.placeHolder[lang]}
                    value={names[lang]}
                    onChange={(event) =>
                      handleChangeNames(lang, event.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Measured by */}
          <div className="input-section">
            <h3 className="input-name">
              {strings.general.measuredBy.title[theme.lang]}
            </h3>
            {strings.general.measuredBy.options.map((option) => (
              <div
                className="ingredient-lang-container"
                onClick={() => {
                  setMeasuredBy(option.key);
                }}
              >
                {measuredBy === option.key ? (
                  <MdCheckBox className="ingredient-lang-checkbox" />
                ) : (
                  <MdCheckBoxOutlineBlank className="ingredient-lang-checkbox" />
                )}
                <p className="ingredient-lang">{option[theme.lang]}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Nutrivalues */}
        <div className="subsection ingredient-nutrivalue-container">
          <h1 className="section-title">
            {strings.nutritionalInfoTitle[theme.lang]}
          </h1>
          {strings.nutritionalInfo.map((nutriFact) => (
            <div>
              <h3 className="input-name">{nutriFact.name[theme.lang]}</h3>
              <input
                className="input"
                placeholder={nutriFact.placeholder[theme.lang]}
                type={"number"}
                value={nutriValues[nutriFact.key]}
                onChange={(event) =>
                  handleChangeNutriValue(nutriFact.key, event.target.value)
                }
              />
            </div>
          ))}
          <p className="ingredient-error">{error}</p>
          <div
            className="btn create-ingredient-btn"
            onClick={handleCreateIngredient}
          >
            {strings.createBtn[theme.lang]}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Createingredient;
