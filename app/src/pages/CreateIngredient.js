// React imports
import { useState } from "react";

// Local imports
import {
  createIngredient as strings,
  viewIngredient as stringsView,
  langs,
} from "../config/text";

// Icons
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdAdd,
  MdRemove,
  MdSearch,
  MdChevronLeft as LeftArrow,
} from "react-icons/md";
import { IoRemoveCircle } from "react-icons/io5";

// Style
import "../App.css";
import { getTheme } from "../config/theme";

// Http
import axios from "axios";

// Tooltips
import ReactTooltip from "react-tooltip";

function Createingredient() {
  // Constants
  // General
  const theme = getTheme();
  const [selectedTab, setSelectedTab] = useState("view"); // view || create

  // ViewIngredient
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastSearchName, setLastSearchName] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [viewSelectedStateIndex, setViewSelectedStateIndex] = useState(0);
  const [cuantityForDisplay, setCuantityforDisplay] = useState(100);

  // CreateIngredient
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
  const [error, setError] = useState(null);
  const defaultCuantity =
    measuredBy === "mass" || measuredBy === "volume" ? 100 : 1;
  const [selectedAditionalInfo, setSelectedAditionalInfo] = useState([]);
  const [selectedMonths, setSelectedMonths] = useState(
    strings.general.seasons.items.map((month) => month.key)
  );
  const [states, setStates] = useState([
    {
      name: strings.states.default,
      nutriValues: initialNutriValues,
      cuantity: defaultCuantity,
    },
  ]);
  const [selectedStateIndex, setSelectedStateIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIngredientId, setEditingIngredientId] = useState(null);

  // Functions
  const arrayWith = (originalArr, itemsToAdd) => {
    for (let i = 0; i < itemsToAdd.length; i++) {
      const element = itemsToAdd[i];
      if (!originalArr.includes(element)) {
        originalArr.push(element);
      }
    }
    return originalArr;
  };

  const arrayWithout = (originalArr, itemsToRemove) => {
    for (let i = 0; i < itemsToRemove.length; i++) {
      const element = itemsToRemove[i];
      const index = originalArr.indexOf(element);
      if (index >= 0) {
        originalArr.splice(index, 1);
      }
    }
    return originalArr;
  };

  const capitilize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const cleanNameInputs = () => {
    let tempNames = { ...names };
    for (let i = 0; i < usedLangs.length; i++) {
      tempNames[usedLangs[i]] = "";
    }
    setNames(tempNames);
  };

  const clearViewTab = () => {
    setSearchInput("");
    setSearchResults(null);
    setLastSearchName("");
    setSelectedIngredient(null);
    setViewSelectedStateIndex(0);
  };

  const correctLang = (multiLangObj) => {
    if (multiLangObj[theme.lang] === undefined) {
      return multiLangObj[langs.default];
    }
    return multiLangObj[theme.lang];
  };

  const createIngredient = async () => {
    if (!nutriValuesAreValid() || !namesAreValid()) {
      alert(strings.responses.error[theme.lang]);
      return;
    }

    let response = await axios({
      method: "post",
      url: "https://us-central1-tendrishh.cloudfunctions.net/server",
      data: {
        method: "createIngredient",
        names,
        states: formatStates(),
        measuredBy,
        aditionalInfo: selectedAditionalInfo,
        seasons: selectedMonths,
      },
    });

    if (response.status !== 200) {
      return;
    }

    alert(strings.responses.success[theme.lang]);
    resetTab();

    if (isEditing) {
      setIsEditing(false);
      setSelectedTab("view");
    }
  };

  const cuantitySetter = async (value, view) => {
    try {
      if (value === "") {
        value = 0;
      } else {
        value = parseInt(value);
        if (isNaN(value)) {
          return;
        }
      }

      if (!view) {
        let temp = [...states];
        temp[selectedStateIndex].cuantity = value;
        setStates(temp);
        return;
      }

      setCuantityforDisplay(value);
    } catch (e) {
      return;
    }
  };

  const deleteIngredient = async () => {
    if (
      !window.confirm(
        stringsView.view.deleteConfirmation[theme.lang](
          correctLang(selectedIngredient.names)
        )
      )
    ) {
      return;
    }

    const response = await axios({
      method: "post",
      url: "https://us-central1-tendrishh.cloudfunctions.net/server",
      data: {
        method: "deleteIngredient",
        id: selectedIngredient.id,
      },
    });

    if (response.status !== 200) {
      alert(stringsView.view.responses.delete.error[theme.lang]);
      return;
    }

    alert(stringsView.view.responses.delete.success[theme.lang]);
    clearViewTab();
    if (isEditing) {
      setIsEditing(false);
      setSelectedTab("view");
    }
  };

  const editIngredient = async () => {
    if (nutriValuesAreValid() && namesAreValid()) {
      let response = await axios({
        method: "post",
        url: "https://us-central1-tendrishh.cloudfunctions.net/server",
        data: {
          method: "editIngredient",
          id: editingIngredientId,
          names,
          states: formatStates(),
          measuredBy,
          aditionalInfo: selectedAditionalInfo,
          seasons: selectedMonths,
        },
      });
      if (response.status === 200) {
        alert(strings.responses.editSuccess[theme.lang]);
        resetTab();
        setIsEditing(false);
        setSelectedTab("view");
      } else {
        alert(strings.responses.error[theme.lang]);
      }
    }
  };

  const formatStates = () => {
    let temp = [...states];
    for (let i = 0; i < temp.length; i++) {
      temp[i].nutriValues = nutrivaluesPerUnit(i);
    }
    return temp;
  };

  const handleAditionalInfoClick = (key) => {
    let temp = [...selectedAditionalInfo];
    if (temp.includes(key)) {
      temp = handleInfoTriggers(false, key, temp);
    } else {
      temp = handleInfoTriggers(true, key, temp);
    }
    setSelectedAditionalInfo(temp);
  };

  const handleChangeNames = (lang, value) => {
    let tempNames_ = { ...names };
    tempNames_[lang] = value;
    setNames(tempNames_);
  };

  const handleChangeNutriValue = (key, value) => {
    let temp = [...states];
    temp[selectedStateIndex].nutriValues[key] = value;
    setStates(temp);
  };

  const handleCreateOrEdit = async () => {
    if (isEditing) {
      await editIngredient();
    } else {
      await createIngredient();
    }
  };

  const handleCuantityChange = (type, view) => {
    if (!view) {
      const cuantity = states[selectedStateIndex].cuantity;
      if (type === "substraction") {
        if (cuantity > 1) {
          cuantitySetter(parseInt(cuantity) - 1);
        }
      } else {
        cuantitySetter(parseInt(cuantity) + 1);
      }
      return;
    }

    if (type === "substraction") {
      if (cuantityForDisplay > 1) {
        cuantitySetter(parseInt(cuantityForDisplay) - 1, true);
      }
    } else {
      cuantitySetter(parseInt(cuantityForDisplay) + 1, true);
    }
  };

  const handleGoToViewTab = () => {
    if (window.confirm(strings.general.backConfirmation[theme.lang])) {
      setIsEditing(false);
      setSelectedTab("view");
    }
  };

  const handleInfoTriggers = (addition, key, infoArray) => {
    if (addition) {
      if (["redMeat", "chicken", "seafood", "lactose", "egg"].includes(key)) {
        infoArray = arrayWith(infoArray, ["animalOrigin"]);
      }
      infoArray.push(key);
    } else {
      if (key === "animalOrigin") {
        infoArray = arrayWithout(infoArray, [
          "redMeat",
          "chicken",
          "seafood",
          "lactose",
          "egg",
        ]);
      }
      infoArray.splice(infoArray.indexOf(key), 1);
    }
    return infoArray;
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

  const handleMeasureChange = (key) => {
    setMeasuredBy(key);
    cuantitySetter(key === "mass" || key === "volume" ? 100 : 1);
  };

  const handleMonthClick = (key) => {
    let temp = [...selectedMonths];
    if (temp.includes(key)) {
      temp.splice(temp.indexOf(key), 1);
    } else {
      temp.push(key);
    }
    setSelectedMonths(temp);
  };

  const handleNewState = () => {
    // Create new state
    setStates([
      ...states,
      { name: {}, nutriValues: initialNutriValues, cuantity: defaultCuantity },
    ]);
    // Make it current
    setSelectedStateIndex(states.length);
  };

  const handleRemoveState = async (index) => {
    if (
      window.confirm(
        strings.states.delete[theme.lang](correctLang(states[index].name))
      )
    ) {
      setTimeout(() => {
        setSelectedStateIndex(0);
        let temp = [...states];
        temp.splice(index, 1);
        setStates(temp);
      }, 10);
    }
  };

  const handleStateNames = async (lang, value) => {
    let temp = [...states];
    temp[selectedStateIndex].name[lang] = value;
    setStates(temp);
  };

  const loadIngredientToInputs = (ingredient) => {
    setUsedLangs(Object.keys(ingredient.names));
    setNames(ingredient.names);
    setMeasuredBy(ingredient.measuredBy);
    setSelectedAditionalInfo(
      ingredient.aditionalInfo === undefined ? [] : ingredient.aditionalInfo
    );
    setStates(parseStates(ingredient.states, ingredient.measuredBy));
  };

  const namesAreValid = () => {
    for (let i = 0; i < usedLangs.length; i++) {
      if (
        names[usedLangs[i]].length === 0 ||
        names[usedLangs[i]] === undefined
      ) {
        setError(strings.error[theme.lang]);
        return false;
      }
    }

    for (let i = 0; i < states.length; i++) {
      const name = states[i].name;
      for (let j = 0; j < usedLangs.length; j++) {
        if (
          name[usedLangs[j]].length === 0 ||
          name[usedLangs[j]] === undefined
        ) {
          setError(strings.error[theme.lang]);
          return false;
        }
      }
    }

    setError(null);
    return true;
  };

  const navigateToEditIngredient = () => {
    setEditingIngredientId(selectedIngredient.id);
    loadIngredientToInputs(selectedIngredient);
    setIsEditing(true);
    clearViewTab();
    setTimeout(() => setSelectedTab("create"), 100);
  };

  const nutriValuesAreValid = () => {
    let keys = Object.keys(initialNutriValues);
    for (let j = 0; j < states.length; j++) {
      const state = states[j];
      for (let i = 0; i < keys.length; i++) {
        const nutrivalue = state.nutriValues[keys[i]];
        if (isNaN(parseInt(nutrivalue))) {
          setError(strings.error[theme.lang]);
          return false;
        }
      }
    }
    setError(null);
    return true;
  };

  const nutrivaluesPerUnit = (index) => {
    let res = {};
    for (let i = 0; i < strings.nutritionalInfo.length; i++) {
      const key = strings.nutritionalInfo[i].key;
      res[key] = parseFloat(
        parseInt(states[index].nutriValues[key]) / states[index].cuantity
      ).toFixed(4);
    }
    return res;
  };

  const parseStates = (states, measuredBy) => {
    const cuantity = {
      piece: 1,
      mass: 100,
      volume: 100,
    };
    for (let i = 0; i < states.length; i++) {
      const keys = Object.keys(states[i].nutriValues);
      for (let j = 0; j < keys.length; j++) {
        const nutriFact = keys[j];
        states[i].nutriValues[nutriFact] *= cuantity[measuredBy];
        states[i].cuantity = cuantity[measuredBy];
      }
    }
    return states;
  };

  const resetTab = () => {
    cleanNameInputs();
    setSelectedStateIndex(0);
    setStates([
      {
        name: strings.states.default,
        nutriValues: initialNutriValues,
        cuantity: defaultCuantity,
      },
    ]);
  };

  const search = async () => {
    setLastSearchName(searchInput);
    setLoading(true);
    const response = await axios.post(
      "https://us-central1-tendrishh.cloudfunctions.net/server",
      {
        method: "getIngredientsByName",
        name: searchInput,
        lang: theme.lang,
      }
    );
    setLoading(false);
    if (response.status === 200) {
      let temp = response.data;
      console.log(temp);
      temp.sort((a, b) =>
        correctLang(a.names).localeCompare(correctLang(b.names))
      );
      setSearchResults(temp);
    }
  };

  const selectIngredient = (ingredient) => {
    if (selectedIngredient !== null && ingredient.id === selectedIngredient.id)
      return;

    setViewSelectedStateIndex(0);

    let temp = { ...ingredient };
    if (temp.states === undefined) {
      temp.states = [];
    }
    if (
      temp.states.length === 0 ||
      (temp.states.length > 0 && temp.states[0].name.en !== "default")
    )
      temp.states.unshift({
        name: stringsView.view.states.default,
        nutriValues: temp.nutriValues,
      });

    delete temp.nutriValues;
    delete temp["searchName-es"];
    delete temp["searchName-en"];

    setSelectedIngredient(temp);
    setCuantityforDisplay(
      temp.measuredBy === "mass" || temp.measuredBy === "volume" ? 100 : 1
    );
  };

  // Render
  return (
    <div className="tab-container">
      <div className="content-container">
        {selectedTab === "create" ? (
          <>
            {/* General */}
            <div className="subsection ingredient-general-container">
              <div
                className="createIngredient-back-containter btn"
                onClick={handleGoToViewTab}
              >
                <LeftArrow className="createIngredient-back-arrow" />{" "}
                {strings.general.back[theme.lang]}
              </div>
              <h1 className="section-title">
                {strings.general.title[theme.lang]}
              </h1>

              {/* Langs */}
              <div className="input-section">
                <h3 className="input-name">
                  {strings.general.langs[theme.lang]}
                </h3>
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
                    onClick={() => handleMeasureChange(option.key)}
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

              {/* Aditional info */}
              <div className="input-section">
                <h3 className="input-name">
                  {strings.general.aditionalInfo.title[theme.lang]}
                </h3>
                {strings.general.aditionalInfo.items.map((item) => (
                  <div
                    className="ingredient-lang-container"
                    onClick={() => handleAditionalInfoClick(item.key)}
                    data-tip
                    data-for={`aditionalInto_toolTip_${item.key}`}
                  >
                    {selectedAditionalInfo.includes(item.key) ? (
                      <MdCheckBox className="ingredient-lang-checkbox" />
                    ) : (
                      <MdCheckBoxOutlineBlank className="ingredient-lang-checkbox" />
                    )}
                    <p className="ingredient-lang">{item.title[theme.lang]}</p>
                    <ReactTooltip
                      id={`aditionalInto_toolTip_${item.key}`}
                      place="right"
                      effect="float"
                    >
                      {item.toolTip[theme.lang]}
                    </ReactTooltip>
                  </div>
                ))}
              </div>

              {/* Seasons */}
              <div className="input-section">
                <h3
                  className="input-name"
                  data-tip
                  data-for={"seasons_toolTip"}
                >
                  {strings.general.seasons.title[theme.lang]}
                </h3>
                <ReactTooltip
                  id={"seasons_toolTip"}
                  place="right"
                  effect="float"
                >
                  {strings.general.seasons.toolTip[theme.lang]}
                </ReactTooltip>
                {strings.general.seasons.items.map((item) => (
                  <div
                    className="ingredient-lang-container"
                    onClick={() => handleMonthClick(item.key)}
                  >
                    {selectedMonths.includes(item.key) ? (
                      <MdCheckBox className="ingredient-lang-checkbox" />
                    ) : (
                      <MdCheckBoxOutlineBlank className="ingredient-lang-checkbox" />
                    )}
                    <p className="ingredient-lang">{item.name[theme.lang]}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Nutrivalues */}
            <div className="subsection ingredient-nutrivalue-container">
              <h1 className="section-title">
                {strings.nutritionalInfoTitle[theme.lang]}
              </h1>
              {/* States */}
              <div>
                <h3 className="input-name">
                  {strings.states.title[theme.lang]}
                </h3>
                <div className="ingredient-states-container">
                  {states.map((state) => {
                    const index = states.indexOf(state);
                    return (
                      <div
                        key={index}
                        className={`ingredient-state-container ${
                          index === selectedStateIndex ? "btn" : ""
                        }`}
                        onClick={() => setSelectedStateIndex(index)}
                      >
                        {correctLang(state.name)}
                        {index !== 0 ? (
                          <IoRemoveCircle
                            className="ingredient-state-delete"
                            onClick={() => handleRemoveState(index)}
                          />
                        ) : null}
                      </div>
                    );
                  })}
                  <div
                    className="ingredient-state-container"
                    onClick={handleNewState}
                  >
                    <MdAdd />
                  </div>
                </div>
              </div>

              {/* Name */}
              {selectedStateIndex !== 0 ? (
                <div className="ingredient-state-name-container">
                  <h3 className="input-name">
                    {strings.states.name.title[theme.lang]}
                  </h3>
                  {usedLangs.map((lang) => (
                    <div className="input-container">
                      <p className="input-lang">{`${lang.toUpperCase()}: `}</p>
                      <input
                        className="input"
                        placeholder={strings.states.name.placeholder[lang]}
                        value={states[selectedStateIndex].name[lang]}
                        onChange={(e) => handleStateNames(lang, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              ) : null}

              {/* Cuantity */}
              <>
                <p className="createRecipe-timeType">
                  {strings.quantity.title[theme.lang]}
                </p>
                <div
                  className="createRecepy-quantity-input-container"
                  style={{ marginBottom: 20 }}
                >
                  <div
                    className="createRecepy-add-btn btn"
                    onClick={() => handleCuantityChange("substraction")}
                  >
                    <MdRemove />
                  </div>
                  <input
                    className="createRecipe-cuantity-input"
                    value={states[selectedStateIndex].cuantity}
                    style={{ fontSize: 18 }}
                    onChange={(event) => cuantitySetter(event.target.value)}
                  />
                  <div
                    className="createRecepy-add-btn btn"
                    onClick={() => handleCuantityChange("sum")}
                  >
                    <MdAdd />
                  </div>
                </div>
                <p className="createRecipe-timeType" style={{ marginTop: -20 }}>
                  {strings.quantity.unit[measuredBy][theme.lang]}
                </p>
              </>

              {/* Nutrivalues inputs */}
              {strings.nutritionalInfo.map((nutriFact) => (
                <div>
                  <h3 className="input-name">{nutriFact.name[theme.lang]}</h3>
                  <input
                    className="input"
                    placeholder={nutriFact.placeholder[theme.lang]}
                    type={"number"}
                    value={
                      states[selectedStateIndex].nutriValues[nutriFact.key]
                    }
                    onChange={(event) =>
                      handleChangeNutriValue(nutriFact.key, event.target.value)
                    }
                  />
                </div>
              ))}

              {/* Error display */}
              <p className="ingredient-error">{error}</p>

              {/* Create btn */}
              <div
                className="btn create-ingredient-btn"
                onClick={handleCreateOrEdit}
              >
                {isEditing
                  ? strings.editBtn[theme.lang]
                  : strings.createBtn[theme.lang]}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Search */}
            <div className="subsection ingredient-general-container">
              {/* Header */}
              <div className="viewIngredient-search-header-container">
                <h1 className="section-title">
                  {stringsView.search.title[theme.lang]}
                </h1>
                ({stringsView.search.or[theme.lang]})
                <div
                  className="viewIngredient-search-header-create btn"
                  onClick={() => setSelectedTab("create")}
                >
                  {stringsView.search.create[theme.lang]}
                </div>
              </div>

              {/* Searchbox */}
              <div className="recipe-search-supercontainer">
                <div className="recipe-search-container">
                  <input
                    className="input"
                    placeholder={stringsView.search.placeholder[theme.lang]}
                    value={searchInput}
                    onChange={(event) => setSearchInput(event.target.value)}
                  />
                  <div className="recipe-search-btn btn" onClick={search}>
                    <MdSearch />
                  </div>
                </div>
              </div>

              {/* Search results */}
              <div className="ingredient-searchResults-container">
                {loading ? (
                  <div className="ingredient-searchResults-msg">
                    {stringsView.search.states.loading[theme.lang]}
                  </div>
                ) : searchResults === null ? (
                  <div className="ingredient-searchResults-msg">
                    {stringsView.search.states.null[theme.lang]}
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className="ingredient-searchResults-msg">
                    {stringsView.search.states.empty[theme.lang](
                      lastSearchName
                    )}
                  </div>
                ) : (
                  <>
                    {searchResults.map((ingredient) => (
                      <div
                        key={searchResults.indexOf(ingredient)}
                        className={
                          selectedIngredient !== null &&
                          selectedIngredient.id === ingredient.id
                            ? "ingredient-search-result-selected"
                            : "ingredient-search-result"
                        }
                        onClick={() => selectIngredient(ingredient)}
                      >
                        {capitilize(correctLang(ingredient.names))}
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>

            {/* Ingredient */}
            <div className="subsection ingredient-nutrivalue-container">
              {/* Header */}
              <h1 className="section-title">
                {stringsView.view.title[theme.lang]}
              </h1>

              {selectedIngredient === null ? (
                <div className="ingredient-searchResults-msg">
                  {stringsView.view.empty[theme.lang]}
                </div>
              ) : (
                <>
                  {/* Name */}
                  <div className="input-section">
                    <h3 className="input-name">
                      {stringsView.view.name[theme.lang]}
                    </h3>
                    {Object.keys(selectedIngredient.names).map((lang) => (
                      <div className="ingredient-view-name-container">
                        <p className="ingredient-view-name-lang">
                          {lang.toUpperCase()}:
                        </p>
                        {selectedIngredient.names[lang]}
                      </div>
                    ))}
                  </div>

                  {/* Measured by */}
                  <div className="input-section">
                    <h3 className="input-name">
                      {stringsView.view.measuredBy.title[theme.lang]}
                    </h3>
                    {
                      stringsView.view.measuredBy[
                        selectedIngredient.measuredBy
                      ][theme.lang]
                    }
                  </div>

                  {/* Aditional info */}
                  <div className="input-section">
                    <h3 className="input-name">
                      {stringsView.view.aditionalInfo.title[theme.lang]}
                    </h3>
                    {selectedIngredient.aditionalInfo === undefined ||
                    selectedIngredient.aditionalInfo.length === 0 ? (
                      <div style={{ opacity: "60%" }}>
                        {stringsView.view.aditionalInfo.empty[theme.lang]}
                      </div>
                    ) : (
                      selectedIngredient.aditionalInfo.map((info) => (
                        <div className="ingredient-view-aditionalInfo-container">
                          <p className="ingredient-view-aditionalInfo-bullet">
                            •
                          </p>
                          {stringsView.view.aditionalInfo[info][theme.lang]}
                        </div>
                      ))
                    )}
                  </div>

                  {/* States */}
                  <div className="input-section">
                    <h3 className="input-name">
                      {stringsView.view.states.title[theme.lang]}
                    </h3>
                    <div className="ingredient-states-container">
                      {selectedIngredient.states.map((state) => {
                        const index = selectedIngredient.states.indexOf(state);
                        return (
                          <div
                            className={`ingredient-state-container ${
                              index === viewSelectedStateIndex ? "btn" : ""
                            }`}
                            onClick={() => setViewSelectedStateIndex(index)}
                          >
                            {capitilize(correctLang(state.name))}
                          </div>
                        );
                      })}
                    </div>

                    {/* NutriValues */}
                    <>
                      <h3 className="input-name">
                        {stringsView.view.states.nutriValues.title[theme.lang]}
                      </h3>

                      {/* Cuantity */}
                      <>
                        <p className="createRecipe-timeType">
                          {strings.quantity.title[theme.lang]}
                        </p>
                        <div
                          className="createRecepy-quantity-input-container"
                          style={{ marginBottom: 20 }}
                        >
                          <div
                            className="createRecepy-add-btn btn"
                            onClick={() =>
                              handleCuantityChange("substraction", true)
                            }
                          >
                            <MdRemove />
                          </div>
                          <input
                            className="createRecipe-cuantity-input"
                            value={cuantityForDisplay}
                            style={{ fontSize: 18 }}
                            onChange={(event) =>
                              cuantitySetter(event.target.value, true)
                            }
                          />
                          <div
                            className="createRecepy-add-btn btn"
                            onClick={() => handleCuantityChange("sum", true)}
                          >
                            <MdAdd />
                          </div>
                        </div>
                        <p
                          className="createRecipe-timeType"
                          style={{ marginTop: -20 }}
                        >
                          {
                            strings.quantity.unit[
                              selectedIngredient.measuredBy
                            ][theme.lang]
                          }
                        </p>
                      </>

                      {/* NutriValues */}
                      <>
                        <div
                          className="recipe-recipeSection-recipe-nutrivalues-container"
                          style={{ width: "100%" }}
                        >
                          {/* Calories */}
                          <div className="recipe-recipeSection-recipe-nutrivalues-row-container">
                            <p
                              className={
                                stringsView.view.states.nutriValues.items[0]
                                  .className
                              }
                            >
                              {
                                stringsView.view.states.nutriValues.items[0]
                                  .name[theme.lang]
                              }
                            </p>
                            <p
                              className={
                                stringsView.view.states.nutriValues.items[0]
                                  .className
                              }
                            >
                              {selectedIngredient.states[viewSelectedStateIndex]
                                .nutriValues[
                                stringsView.view.states.nutriValues.items[0].key
                              ] %
                                1 !==
                              0
                                ? selectedIngredient.states[
                                    viewSelectedStateIndex
                                  ].nutriValues[
                                    stringsView.view.states.nutriValues.items[0]
                                      .key
                                  ].toFixed(2) * cuantityForDisplay
                                : selectedIngredient.states[
                                    viewSelectedStateIndex
                                  ].nutriValues[
                                    stringsView.view.states.nutriValues.items[0]
                                      .key
                                  ] * cuantityForDisplay}
                            </p>
                          </div>
                          {/* Other nutrivalues */}
                          {stringsView.view.states.nutriValues.items.map(
                            (nutrifact) => {
                              if (
                                stringsView.view.states.nutriValues.items.indexOf(
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
                                        {selectedIngredient.states[
                                          viewSelectedStateIndex
                                        ].nutriValues[nutrifact.key] %
                                          1 !==
                                        0
                                          ? selectedIngredient.states[
                                              viewSelectedStateIndex
                                            ].nutriValues[
                                              nutrifact.key
                                            ].toFixed(2) * cuantityForDisplay
                                          : selectedIngredient.states[
                                              viewSelectedStateIndex
                                            ].nutriValues[nutrifact.key] *
                                            cuantityForDisplay}
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
                                            (selectedIngredient.states[
                                              viewSelectedStateIndex
                                            ].nutriValues[nutrifact.key] *
                                              100 *
                                              cuantityForDisplay) /
                                              nutrifact.dailyValue
                                          )}{" "}
                                          %
                                        </p>
                                      ) : null}
                                    </div>
                                  </div>
                                );
                              else return null;
                            }
                          )}
                        </div>
                        <p className="dailyvalue">
                          {
                            stringsView.view.states.nutriValues.dailyValue[
                              theme.lang
                            ]
                          }
                        </p>
                      </>
                    </>
                  </div>

                  {/* Edit btn */}
                  <div
                    className="viewIngredient-editBtn btn"
                    onClick={navigateToEditIngredient}
                  >
                    {stringsView.view.edit[theme.lang]}
                  </div>

                  {/* Delete btn */}
                  <p onClick={deleteIngredient} className="ingredient-delete">
                    {stringsView.view.delete[theme.lang]}
                  </p>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Createingredient;
