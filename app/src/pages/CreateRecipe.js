// React imports
import { useState, useRef, useEffect } from "react";

// Local imports
import {
  adminTypes,
  createRecipe as strings,
  langs,
  categoryNames,
  responses,
} from "../config/text";

// Icons
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdKeyboardArrowDown,
  MdAdd,
  MdRemove,
  MdRemoveCircle,
  MdClose,
} from "react-icons/md";

// Style
import "../App.css";
import { getTheme } from "../config/theme";

// Http
import axios from "axios";

// Tool tips
import ReactTooltip from "react-tooltip";

function Createingredient() {
  // Constants
  // Global
  const [firstLoad, setFirstLoad] = useState(true);
  const theme = getTheme();
  const [defaultValues, setDefaultValues] = useState({
    categories: [],
    ingredients: [],
    tags: [],
    creators: [],
    accompaniments: [
      {
        img: "",
        name: {
          es: "",
          en: "",
        },
        id: "",
      },
    ],
    states: [{ es: "", en: "" }],
  });
  const admin = JSON.parse(localStorage.getItem("user"));
  const [recipeToEdit, setRecipeToEdit] = useState(null);
  const [updater, setUpdater] = useState(0);

  // Pop up
  const [popupIsDisplayed, setPopupIsDisplayed] = useState(true);
  const [popupType, setPopupType] = useState("loading"); // Can be "loading", "createCategory" or null
  const [newCategoryTypes, setNewCategoryTypes] = useState([]);
  const [newCategoryAppearsInHome, setNewCategoryAppearsInHome] = useState(
    strings.general.category.create.appearsInHome.options[0].key
  );

  // General
  const [usedLangs, setUsedLangs] = useState([langs.default]);
  const imgInputRef = useRef();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageObj, setSelectedImageObj] = useState(null);
  const [name, setName] = useState({});
  const [description, setDescription] = useState({});
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [newCategoryName, setNewCategoryName] = useState({});
  const [loading, setLoading] = useState(false);

  // Prep
  const [servings, setServings] = useState(1);
  const [time, setTime] = useState({ prep: 10, cook: 0 });
  const [focusedInputIndex, setFocusedInputIndex] = useState(null);
  const defaultIngredient = {
    id: null,
    cuantity: {
      numerator: 1,
      denominator: 1,
    },
    unit: "",
    measuredBy: "",
    state: { es: "", en: "" },
    availableStates: [{ es: "", en: "" }],
  };
  const [ingredients, setIngredients] = useState([defaultIngredient]);
  const [ingredientsInputs, setIngredientsInputs] = useState([""]);
  const [instructions, setInstructions] = useState([{}]);

  // Opc
  const [notes, setNotes] = useState({});
  const [selectedCreatorIndex, setSelectedCreatorIndex] = useState(0);
  const [selectedTagsIds, setSelectedTagsIds] = useState([]);
  const [displayCreateTag, setDisplayCreateTag] = useState(false);
  const [newTag, setNewTag] = useState({});
  const [createTagWasClicked, setCreateTagWasClicked] = useState(false);
  const [error, setError] = useState(null);
  const [accompaniments, setAccompaniments] = useState([]);
  const [accompanimentInput, setAccompanimentInput] = useState("");
  const [accompanimentsSuggestions, setAccompanimentsSuggestions] = useState([
    {
      img: "",
      name: {
        es: "",
        en: "",
      },
      id: "",
    },
  ]);
  const [suggestions, setSuggestions] = useState([]);

  // Functions
  const addIngredient = () => {
    setIngredients([...ingredients, defaultIngredient]);
    setIngredientsInputs([...ingredientsInputs, ""]);
  };

  const addInstruction = () => {
    setInstructions([...instructions, {}]);
  };

  const capitilize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const correctLang = (multiLangObj) => {
    if (multiLangObj[theme.lang] === undefined) {
      return multiLangObj[langs.default];
    }
    return multiLangObj[theme.lang];
  };

  const createCategory = async () => {
    // Check inputs
    if (!newCategoryInputsAreValid()) {
      alert(responses.enterAllInputs[theme.lang]);
      return;
    }

    displayPopup("loading");
    try {
      console.log({
        method: "createCategory",
        category: {
          name: newCategoryName,
          types: newCategoryTypes,
          appearsInHome: newCategoryAppearsInHome,
        },
      });
      // Make request
      const response = await axios.post(
        "https://us-central1-tendrishh.cloudfunctions.net/server",
        {
          method: "createCategory",
          category: {
            name: newCategoryName,
            types: newCategoryTypes,
            appearsInHome: newCategoryAppearsInHome,
          },
        }
      );

      // Reset inputs
      setNewCategoryName(langs.multiLangObj);
      setNewCategoryTypes([]);
      setNewCategoryAppearsInHome(
        strings.general.category.create.appearsInHome.options[0].key
      );

      // Place new category to make it available
      setDefaultValues({
        ...defaultValues,
        categories: response.data.categories,
      });

      closePopup();
    } catch (e) {
      console.log(e);
      displayPopup("createCategory");
      alert(responses.serverError[theme.lang]);
    }
  };

  const createRecipe = async (publish) => {
    // Check if error in inputs and set it
    if (!inputsAreValid()) {
      setError(strings.Opc.submit.error.inputs[theme.lang]);
      return;
    }
    setError(null);
    setLoading(true);
    displayPopup("loading");

    // Manage image uploads or substitution
    let imgUrl;
    try {
      if (recipeToEdit === null) {
        imgUrl = (await uploadImgs())[0];
      } else {
        if (selectedImageObj === null) {
          imgUrl = {
            url: recipeToEdit.general.img,
            imgRef: recipeToEdit.general.imgRef,
          };
        } else {
          imgUrl = (await uploadImgs())[0];
        }
      }
    } catch (e) {
      alert(strings.messages.errors.uploadingImg[theme.lang]);
      setLoading(false);
      return;
    }

    // Create recipe Obj
    const recipe = {
      general: {
        langs: usedLangs,
        img: imgUrl.url,
        imgRef: imgUrl.ref,
        name,
        description,
        category: defaultValues.categories[selectedCategoryIndex].id,
      },
      prep: {
        servings,
        time,
        ingredients: formatIngredients(ingredients),
        instructions,
      },
      opc: {
        notes,
        tags: selectedTagsIds,
        creator: adminTypes.super.includes(admin.personalInfo.rol)
          ? defaultValues.creators[selectedCreatorIndex].id
          : admin.id,
        accompaniments: formatAccompaniments([...accompaniments]),
      },
    };

    // If it is an edit
    try {
      let response;
      if (recipeToEdit !== null) {
        response = await axios({
          method: "post",
          url: "https://us-central1-tendrishh.cloudfunctions.net/server",
          data: {
            method: "editRecipe",
            admin: {
              email: admin.id,
              password: admin.personalInfo.password,
            },
            recipeId: recipeToEdit.id,
            publish,
            recipe,
          },
        });
      } else {
        // Post the new recipe obj
        response = await axios({
          method: "post",
          url: "https://us-central1-tendrishh.cloudfunctions.net/server",
          data: { method: "createRecipe", recipe, publish },
        });
      }
      setLoading(false);

      // If success:
      if (response.status === 200) {
        alert(strings.messages.succes[theme.lang]);
        clearInputs();
        return;
      }

      // Manage errors
      alert(`${response.status}: ${response.data}`);
    } catch (e) {
      alert(strings.messages.errors.creating[theme.lang]);
      setLoading(false);
    }
    closePopup();
  };

  const createTag = async () => {
    if (
      newTag.es === undefined ||
      newTag.en === undefined ||
      createTagWasClicked
    ) {
      return;
    }
    if (newTag.es.length < 2 || newTag.en.length < 2) {
      return;
    }
    setCreateTagWasClicked(true);
    let response = await axios({
      method: "post",
      url: "https://us-central1-tendrishh.cloudfunctions.net/server",
      data: {
        method: "createTag",
        tag: newTag,
      },
    });
    setCreateTagWasClicked(false);
    if (response.status === 200) {
      setNewTag({ es: "", en: "" });
      setDefaultValues({
        ...defaultValues,
        tags: response.data.tags,
      });
    }
  };

  const clearInputs = () => {
    const multiLangObj = { es: "", en: "" };
    setUsedLangs([langs.default]);
    setSelectedImage(null);
    setSelectedImageObj(null);
    setName({ ...multiLangObj });
    setDescription({ ...multiLangObj });
    setSelectedCategoryIndex(0);
    setNewCategoryName({ ...multiLangObj });
    setServings(1);
    setTime({ prep: 10, cook: 0 });
    setIngredients([defaultIngredient]);
    setIngredientsInputs([""]);
    setInstructions([{ ...multiLangObj }]);
    setNotes({ ...multiLangObj });
    setSelectedTagsIds([]);
    setDisplayCreateTag(false);
    setNewTag({ ...multiLangObj });
    setSelectedCreatorIndex(0);
    setAccompanimentInput("");
    setAccompaniments([]);
    setAccompanimentsSuggestions([...defaultValues.accompaniments]);
    setRecipeToEdit(null);
    closePopup();
  };

  const closePopup = () => {
    setPopupIsDisplayed(false);
    setPopupType(null);
  };

  const displayPopup = (type) => {
    setPopupType(type);
    setPopupIsDisplayed(true);
  };

  const formatAccompaniments = (accompaniments) => {
    for (let i = 0; i < accompaniments.length; i++) {
      accompaniments[i] = accompaniments[i].id;
    }
    return accompaniments;
  };

  const formatIngredients = (ingredients) => {
    for (let i = 0; i < ingredients.length; i++) {
      ingredients[i].measuredBy = ingredients[i].measuredByDisplay;
      if (ingredients[i].state != null) {
        ingredients[i].state = ingredients[i].state[langs.default]
          ? ingredients[i].state
          : ingredients[i].state.name;
      }
    }
    return ingredients;
  };

  const getSuggestions = (ingredientIndex, ingredientName) => {
    let suggestions = [];
    let tempIngredients = [...ingredients];
    let id = null;
    let measuredBy = null;
    let availableStates = null;
    let aditionalInfo = null;
    let measuredByDisplay = null;
    for (let i = 0; i < defaultValues.ingredients.length; i++) {
      if (
        correctLang(defaultValues.ingredients[i].name)
          .substring(0, ingredientName.length)
          .toLowerCase()
          .trim() === ingredientName.toLowerCase().trim()
      ) {
        suggestions.push({
          name: correctLang(defaultValues.ingredients[i].name),
          ingredientIndex: i,
        });
      }
      if (
        correctLang(defaultValues.ingredients[i].name).toLowerCase().trim() ===
        ingredientName.toLowerCase().trim()
      ) {
        id = defaultValues.ingredients[i].id;
        measuredBy = defaultValues.ingredients[i].measuredBy;
        measuredByDisplay = measuredBy;
        availableStates = defaultValues.ingredients[i].states;
        aditionalInfo = defaultValues.ingredients[i].aditionalInfo;
      }
    }
    tempIngredients[ingredientIndex] = {
      ...tempIngredients[ingredientIndex],
      id,
      measuredBy,
      availableStates,
      aditionalInfo,
      measuredByDisplay,
      state: null,
      unit:
        measuredBy !== null
          ? strings.prep.ingredients.unit.suggestions[measuredBy][0].key
          : null,
    };
    setIngredients(tempIngredients);
    return suggestions;
  };

  const handleAccompanimentsChange = (type, index) => {
    let tempAccompaniments = [...accompaniments];
    if (type === "remove") {
      tempAccompaniments.splice(index, 1);
    } else {
      if (!accompaniments.includes(accompanimentsSuggestions[index])) {
        tempAccompaniments.push(accompanimentsSuggestions[index]);
      }
    }
    setAccompaniments(tempAccompaniments);
  };

  const handleAccompanimentsInputChange = (str) => {
    setAccompanimentInput(str);
    let tempSuggestions = [];
    for (let i = 0; i < defaultValues.accompaniments.length; i++) {
      if (
        defaultValues.accompaniments[i].name[theme.lang]
          .substring(0, str.length)
          .toLowerCase() === str.toLowerCase()
      ) {
        tempSuggestions.push(defaultValues.accompaniments[i]);
      }
    }
    setAccompanimentsSuggestions(tempSuggestions);
  };

  const handleClickTag = (id) => {
    let tempSelectedTags = [...selectedTagsIds];
    if (selectedTagsIds.includes(id)) {
      tempSelectedTags.splice(tempSelectedTags.indexOf(id), 1);
    } else {
      tempSelectedTags.push(id);
    }
    setSelectedTagsIds(tempSelectedTags);
  };

  const handleDecriptionChange = (value, lang) => {
    let tempDescription = { ...description };
    tempDescription[lang] = value;
    setDescription(tempDescription);
  };

  const handleIngredientQuantityChange = (index, isNumerator, newValue) => {
    let tempIngredients = [...ingredients];
    if (!isNaN(newValue) && parseInt(newValue) >= 1) {
      tempIngredients[index].cuantity[
        isNumerator ? "numerator" : "denominator"
      ] = parseInt(newValue);
    }
    if (newValue === "") {
      tempIngredients[index].cuantity[
        isNumerator ? "numerator" : "denominator"
      ] = newValue;
    }
    setIngredients(tempIngredients);
  };

  const handleIngredientsChange = (index, value) => {
    let tempIngredientInputs = [...ingredientsInputs];
    tempIngredientInputs[index] = value;
    setIngredientsInputs(tempIngredientInputs);
    setSuggestions(getSuggestions(index, value));
  };

  const handleIngredientStateChange = (index, state) => {
    let temp = [...ingredients];
    temp[index].state = temp[index].state === state ? null : state;
    if (temp[index].state) {
      temp[index].measuredByDisplay = temp[index].state.measuredBy;
    } else {
      temp[index].measuredByDisplay = temp[index].measuredBy;
    }
    temp[index].unit =
      strings.prep.ingredients.unit.suggestions[
        temp[index].measuredByDisplay
      ][0].key;
    setIngredients(temp);
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

  const handleNewCategoryNameChange = (value, lang) => {
    let tempCategory = { ...newCategoryName };
    tempCategory[lang] = value;
    setNewCategoryName(tempCategory);
  };

  const handleNewCategoryTypeClick = (type) => {
    let tempTypes = [...newCategoryTypes];
    if (tempTypes.includes(type)) tempTypes.splice(tempTypes.indexOf(type), 1);
    else tempTypes.push(type);
    setNewCategoryTypes(tempTypes);
  };

  const handleNewTagChange = (value, lang) => {
    let tempTag = { ...newTag };
    tempTag[lang] = value;
    setNewTag(tempTag);
  };

  const handleNotesChange = (value, lang) => {
    let tempNotes = { ...notes };
    tempNotes[lang] = value;
    setNotes(tempNotes);
  };

  const handleServingsChange = (type) => {
    if (type === "sum") {
      setServings(servings + 1);
    } else {
      setServings(servings <= 1 ? servings : servings - 1);
    }
  };

  const handleSetupQuery = async () => {
    let response = await axios({
      method: "post",
      url: "https://us-central1-tendrishh.cloudfunctions.net/server",
      data: {
        method: "createRecipeSetup",
        rol: admin.personalInfo.rol,
      },
    });

    if (response.status !== 200) {
      alert("Error de la base de datos, vuelve a intentarlo más tarde.");
    }

    let temp = response.data;
    temp.ingredients.sort((a, b) =>
      correctLang(a.name).localeCompare(correctLang(b.name))
    );
    setDefaultValues(temp);
    setAccompanimentsSuggestions(response.data.accompaniments);
    closePopup();

    let tempRecipeToEdit = localStorage.getItem("recipeToEdit");
    const wantsToEdit = localStorage.getItem("wantsToEdit");
    if (
      wantsToEdit === "false" ||
      wantsToEdit === null ||
      tempRecipeToEdit === null
    ) {
      return;
    }

    tempRecipeToEdit = { ...JSON.parse(tempRecipeToEdit) };
    await loadRecipeToInputs(tempRecipeToEdit, response.data);
    localStorage.setItem("wantsToEdit", "false");
  };

  const handleSuggestionClick = (suggestion, ingredientIndex) => {
    let measuredBy =
      defaultValues.ingredients[suggestion.ingredientIndex].measuredBy;
    let tempIngredients = [...ingredients];
    tempIngredients[ingredientIndex] = {
      ...tempIngredients[ingredientIndex],
      id: defaultValues.ingredients[suggestion.ingredientIndex].id,
      measuredBy,
      measuredByDisplay: measuredBy,
      availableStates:
        defaultValues.ingredients[suggestion.ingredientIndex].states,
      aditionalInfo:
        defaultValues.ingredients[suggestion.ingredientIndex].aditionalInfo,
      state: null,
      unit:
        measuredBy !== null
          ? strings.prep.ingredients.unit.suggestions[measuredBy][0].key
          : null,
    };
    setIngredients(tempIngredients);

    let tempIngredientsInputs = [...ingredientsInputs];
    tempIngredientsInputs[focusedInputIndex] = suggestion.name;
    setIngredientsInputs(tempIngredientsInputs);
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

  const handleIngredientUnitChange = (ingredientIndex, unit) => {
    let tempIngredients = [...ingredients];
    tempIngredients[ingredientIndex].unit = unit;
    setIngredients(tempIngredients);
  };

  const inputsAreValid = () => {
    try {
      if (selectedImage === null) {
        return false;
      }
      if (time.cook === 0 && time.prep === 0) {
        return false;
      }
      // Check lang-dependent inputs
      for (let i = 0; i < usedLangs.length; i++) {
        if (
          name[usedLangs[i]] === undefined ||
          name[usedLangs[i]].length <= 1
        ) {
          return false;
        }
        if (
          description[usedLangs[i]] === undefined ||
          description[usedLangs[i]].length <= 1
        ) {
          return false;
        }
        for (let j = 0; j < instructions.length; j++) {
          if (
            instructions[j][usedLangs[i]] === undefined ||
            instructions[j][usedLangs[i]].length <= 1
          ) {
            return false;
          }
        }
      }
      // Check ingredients
      for (let i = 0; i < ingredients.length; i++) {
        if (ingredients[i].id == null) {
          return false;
        }
        if (isNaN(ingredients[i].cuantity.denominator)) {
          return false;
        }
        if (isNaN(ingredients[i].cuantity.numerator)) {
          return false;
        }
      }
    } catch (e) {
      return false;
    }
    return true;
  };

  const imageWasSelected = (event) => {
    if (event.target.files.length > 0) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
      setSelectedImageObj(event.target.files[0]);
    } else {
      setSelectedImage(null);
      setSelectedImageObj(null);
    }
  };

  const ingredientsWithStates = (ingredients, defaultValues) => {
    for (let i = 0; i < defaultValues.ingredients.length; i++) {
      const ingredient = defaultValues.ingredients[i];
      for (let j = 0; j < ingredients.length; j++) {
        const recipeIngredient = ingredients[j];
        if (recipeIngredient.id === ingredient.id) {
          ingredients[j] = {
            ...recipeIngredient,
            availableStates: ingredient.states,
            // measuredBy: ingredient.measuredBy,
            // measuredByDisplay: ingredient.measuredBy,
          };
        }
      }
    }
    return ingredients;
  };

  const loadRecipeToInputs = async (recipe, defaultValues) => {
    // usedLangs
    setUsedLangs(recipe.general.langs);

    // Img
    setSelectedImage(recipe.general.img);

    // Category
    for (let i = 0; i < defaultValues.categories.length; i++) {
      if (defaultValues.categories[i].id === recipe.general.category) {
        setSelectedCategoryIndex(i);
        break;
      }
    }

    // Servings
    setServings(recipe.prep.servings);

    // Time
    setTime(recipe.prep.time);

    // Selected tags
    let tempTags = [];
    for (let i = 0; i < defaultValues.tags.length; i++) {
      for (let j = 0; j < recipe.opc.tags.length; j++) {
        if (defaultValues.tags[i].id === recipe.opc.tags[j]) {
          tempTags.push(recipe.opc.tags[j]);
        }
      }
    }
    setSelectedTagsIds(tempTags);

    // Accompaniments
    let tempAccompaniments = [];
    for (let i = 0; i < defaultValues.accompaniments.length; i++) {
      for (let j = 0; j < recipe.opc.accompaniments.length; j++) {
        if (
          defaultValues.accompaniments[i].id === recipe.opc.accompaniments[j].id
        ) {
          tempAccompaniments.push({
            id: defaultValues.accompaniments[i].id,
            img: recipe.opc.accompaniments[j].general.img,
            name: recipe.opc.accompaniments[j].general.name,
          });
        }
      }
    }
    setAccompaniments(tempAccompaniments);

    // Selected creator
    if (adminTypes.super.includes(admin.personalInfo.rol))
      for (let i = 0; i < defaultValues.creators.length; i++) {
        if (defaultValues.creators[i].id === recipe.opc.creator) {
          setSelectedCreatorIndex(i);
          break;
        }
      }

    // Ingredients
    let tempIngredients = [];
    let tempIngredientInputs = [];
    for (let i = 0; i < recipe.prep.ingredients.length; i++) {
      if (recipe.prep.ingredients[i] != null) {
        tempIngredients.push({
          ...recipe.prep.ingredients[i],
          cuantity: {
            ...recipe.prep.ingredients[i].cuantity,
            denominator: parseInt(
              recipe.prep.ingredients[i].cuantity.denominator /
                recipe.prep.servings
            ),
          },
          measuredByDisplay: recipe.prep.ingredients[i].measuredBy,
          state: recipe.prep.ingredients[i].state,
        });
        tempIngredientInputs.push(correctLang(recipe.prep.ingredients[i].name));
      }
    }
    tempIngredients = ingredientsWithStates(tempIngredients, defaultValues);
    setIngredients(tempIngredients);
    setIngredientsInputs(tempIngredientInputs);

    // Lang dependent inputs
    let tempName = {};
    let tempDescription = {};
    let tempNotes = {};
    let tempInstructions = [];
    for (
      let langIndex = 0;
      langIndex < recipe.general.langs.length;
      langIndex++
    ) {
      const lang = recipe.general.langs[langIndex];
      tempName[lang] = recipe.general.name[lang];
      tempDescription[lang] = recipe.general.description[lang];
      tempNotes[lang] =
        recipe.opc.notes[lang] != null ? recipe.opc.notes[lang] : "";
      for (let j = 0; j < recipe.prep.instructions.length; j++) {
        if (tempInstructions[j] === undefined) tempInstructions[j] = {};
        tempInstructions[j][lang] = recipe.prep.instructions[j][lang];
      }
    }
    setName(tempName);
    setDescription(tempDescription);
    setNotes(tempNotes);
    setInstructions(tempInstructions);
    setRecipeToEdit(recipe);
    updateDom();
  };

  const newCategoryInputsAreValid = () => {
    // Check name
    for (let i = 0; i < langs.available.length; i++) {
      const lang = langs.available[i].key;
      if (
        typeof newCategoryName[lang] !== "string" ||
        newCategoryName[lang].length < 2
      )
        return;
    }

    // Check type
    if (newCategoryTypes.length === 0) return;

    // Check appears in home
    if (typeof newCategoryAppearsInHome !== "boolean") return;

    // Return true if is valid
    return true;
  };

  const removeIngredient = (index) => {
    let tempIngredients = [...ingredients];
    tempIngredients.splice(index, 1);
    setIngredients(tempIngredients);
    let tempIngredientsInputs = [...ingredientsInputs];
    tempIngredientsInputs.splice(index, 1);
    setIngredientsInputs(tempIngredientsInputs);
  };

  const removeInstruction = (index) => {
    let tempInstructions = [...instructions];
    tempInstructions.splice(index, 1);
    setInstructions(tempInstructions);
  };

  const updateDom = () => {
    setUpdater(updater + 1);
  };

  const uploadImgs = async () => {
    let formData = new FormData();
    formData.append("method", "uploadImgs");
    formData.append("destination", "recipesImgs");
    formData.append("img", selectedImageObj);
    const response = await axios({
      method: "post",
      url: "https://us-central1-tendrishh.cloudfunctions.net/server",
      data: formData,
    });
    if (response.status === 200) {
      return response.data.urls;
    }
  };

  // Logic
  // eslint-disable-next-line
  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      handleSetupQuery();
    }
  });

  // Render
  return (
    <div className="tab-container">
      {popupIsDisplayed ? (
        <div className="profiles-propup-background">
          {popupType === "loading" ? (
            strings.loading[theme.lang]
          ) : popupType === "createCategory" ? (
            <div className="createCategory-popup-container">
              <button
                onClick={closePopup}
                className="createCategory-popup-closeBtn btn"
              >
                <MdClose />
              </button>
              <div className="createCategory-popup-content-container">
                {/* Title */}
                <h2 className="createCategory-popup-title">
                  {strings.general.category.create.title[theme.lang]}
                </h2>
                {/* Name */}
                <>
                  <h3 className="input-name">
                    {strings.general.category.create.name.title[theme.lang]}
                  </h3>
                  {langs.available.map((lang) => (
                    <div
                      className="input-container"
                      key={usedLangs.indexOf(lang)}
                    >
                      <p className="input-lang">{`${lang.key.toUpperCase()}: `}</p>
                      <input
                        className="input"
                        placeholder={
                          strings.general.category.create.name.placeholder[
                            lang.key
                          ]
                        }
                        value={newCategoryName[lang.key]}
                        onChange={(event) =>
                          handleNewCategoryNameChange(
                            event.target.value,
                            lang.key
                          )
                        }
                      />
                    </div>
                  ))}
                </>
                {/* Type */}
                <>
                  <h3
                    className="input-name"
                    data-for="category_toolTip"
                    data-tip
                  >
                    {strings.general.category.create.type.title[theme.lang]}
                  </h3>
                  {strings.general.category.create.type.options.map(
                    (category) => (
                      <div
                        key={category.key}
                        className="ingredient-lang-container"
                        onClick={() => handleNewCategoryTypeClick(category.key)}
                      >
                        {newCategoryTypes.includes(category.key) ? (
                          <MdCheckBox className="ingredient-lang-checkbox" />
                        ) : (
                          <MdCheckBoxOutlineBlank className="ingredient-lang-checkbox" />
                        )}
                        <p className="ingredient-lang">
                          {capitilize(category.name[theme.lang])}
                        </p>
                      </div>
                    )
                  )}
                  <ReactTooltip
                    id="category_toolTip"
                    place="bottom"
                    effect="float"
                  >
                    {strings.general.category.create.type.toolTip[theme.lang]}
                  </ReactTooltip>
                  <div style={{ height: 10 }} />
                </>
                {/* Appears in home */}
                <>
                  <h3 className="input-name">
                    {
                      strings.general.category.create.appearsInHome.title[
                        theme.lang
                      ]
                    }
                  </h3>
                  {strings.general.category.create.appearsInHome.options.map(
                    (option) => (
                      <div
                        key={JSON.stringify(option.key)}
                        className="ingredient-lang-container"
                        onClick={() => setNewCategoryAppearsInHome(option.key)}
                      >
                        {newCategoryAppearsInHome === option.key ? (
                          <MdCheckBox className="ingredient-lang-checkbox" />
                        ) : (
                          <MdCheckBoxOutlineBlank className="ingredient-lang-checkbox" />
                        )}
                        <p className="ingredient-lang">
                          {capitilize(option.name[theme.lang])}
                        </p>
                      </div>
                    )
                  )}
                </>
                {/* Btn */}
                <>
                  <button
                    className="btn createCategory-popup-btn"
                    onClick={createCategory}
                  >
                    {strings.general.category.create.btn[theme.lang]}
                  </button>
                </>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
      <div className="content-container">
        {/* General */}
        <div className="subsection createRecipe-general-container">
          <h1 className="section-title">{strings.general.title[theme.lang]}</h1>
          {/* Updater */}
          <>
            <p style={{ fontSize: 0.1, opacity: 0 }}>{updater}</p>
          </>

          {/* Langs */}
          <div className="input-section">
            <h3 className="input-name">{strings.general.langs[theme.lang]}</h3>
            {langs.available.map((lang) => (
              <div
                className="ingredient-lang-container"
                onClick={() => {
                  handleLangClick(lang.key);
                }}
                key={langs.available.indexOf(lang)}
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
              <div className="input-container" key={usedLangs.indexOf(lang)}>
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
              <div className="input-container" key={usedLangs.indexOf(lang)}>
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
                key={defaultValues.categories.indexOf(category)}
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
                <p className="ingredient-lang">
                  {capitilize(
                    categoryNames[category.name[langs.default].toLowerCase()]
                      ? categoryNames[
                          category.name[langs.default].toLowerCase()
                        ][theme.lang]
                      : category.name[theme.lang].toLowerCase()
                  )}
                </p>
              </div>
            ))}
            <div
              onClick={() => displayPopup("createCategory")}
              className="createCat-btn btn"
            >
              <p className="createCat">
                {strings.general.category.create.title[theme.lang]}
              </p>
            </div>
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
            {ingredients.map((ingredient) => {
              const index = ingredients.indexOf(ingredient);
              return (
                <div className="createRecipe-ingredient-container" key={index}>
                  {/* Bullets */}
                  <div>
                    <h1 className="createRecipe-ingredient-bullet">•</h1>
                    <MdRemoveCircle
                      className="deleteIcon"
                      onClick={() => removeIngredient(index)}
                    />
                    {ingredients.length > 1 ? null : null}
                  </div>
                  <div className="createRecipe-ingredient-inputs-container">
                    {/* Ingredient name */}
                    <div className="createRecipe-ingredient-input-container">
                      <input
                        className={`input${
                          ingredient.id === null ? " input-error" : ""
                        }`}
                        placeholder={
                          strings.prep.ingredients.placeholder[theme.lang]
                        }
                        value={ingredientsInputs[index]}
                        onChange={(event) =>
                          handleIngredientsChange(index, event.target.value)
                        }
                        onFocus={() => {
                          setFocusedInputIndex(index);
                          if (ingredientsInputs[index] === "")
                            handleIngredientsChange(index, "");
                        }}
                        onBlur={() =>
                          setTimeout(() => setFocusedInputIndex(null), 300)
                        }
                      />
                      {focusedInputIndex === index ? (
                        <div className="hide-overflow-y">
                          <div className="suggestions-container">
                            {suggestions.map((suggestion) => (
                              <div
                                key={suggestion}
                                className="suggestion-container"
                                onClick={() =>
                                  handleSuggestionClick(suggestion, index)
                                }
                              >
                                {suggestion.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>

                    {/* Unit section */}
                    <div style={{ width: "100%", marginBottom: 10 }}>
                      <p className="input-lang">{`${
                        strings.prep.ingredients.unit.title[theme.lang]
                      }: `}</p>
                      <div style={{ marginLeft: 15 }}>
                        {ingredient.id != null
                          ? strings.prep.ingredients.unit.suggestions[
                              ingredient.measuredByDisplay
                            ].map((suggestion) => (
                              <div
                                className="ingredient-lang-container"
                                onClick={() => {
                                  handleIngredientUnitChange(
                                    index,
                                    suggestion.key
                                  );
                                }}
                                key={strings.prep.ingredients.unit.suggestions[
                                  ingredient.measuredByDisplay
                                ].indexOf(suggestion)}
                              >
                                {suggestion.key === ingredient.unit ? (
                                  <MdCheckBox className="ingredient-lang-checkbox" />
                                ) : (
                                  <MdCheckBoxOutlineBlank className="ingredient-lang-checkbox" />
                                )}
                                <p className="ingredient-lang">
                                  {suggestion[theme.lang]}
                                </p>
                              </div>
                            ))
                          : null}
                      </div>
                    </div>

                    {/* States */}
                    <>
                      {ingredient.id != null &&
                      ingredient.availableStates != null &&
                      ingredient.availableStates.length > 0 ? (
                        <div style={{ width: "100%", marginBottom: 10 }}>
                          <p className="input-lang">{`${
                            strings.prep.ingredients.states[theme.lang]
                          }: `}</p>
                          <div style={{ marginLeft: 15 }}>
                            {ingredient.id != null
                              ? ingredient.availableStates.map((state) => (
                                  <div
                                    className="ingredient-lang-container"
                                    onClick={() => {
                                      handleIngredientStateChange(index, state);
                                    }}
                                    key={index}
                                  >
                                    {ingredient.state != null &&
                                    (JSON.stringify(state) ===
                                      JSON.stringify(ingredient.state) ||
                                      correctLang(ingredient.state) ===
                                        correctLang(state.name)) ? (
                                      <MdCheckBox className="ingredient-lang-checkbox" />
                                    ) : (
                                      <MdCheckBoxOutlineBlank className="ingredient-lang-checkbox" />
                                    )}
                                    <p className="ingredient-lang">
                                      {correctLang(state.name)}
                                    </p>
                                  </div>
                                ))
                              : null}
                          </div>
                        </div>
                      ) : null}
                    </>

                    {/* Cuantity */}
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
                                index,
                                true,
                                ingredient.cuantity.numerator - 1
                              )
                            }
                          >
                            <MdRemove />
                          </div>
                          <input
                            className="createRecipe-cuantity-input"
                            value={ingredient.cuantity.numerator}
                            onChange={(event) =>
                              handleIngredientQuantityChange(
                                index,
                                true,
                                event.target.value
                              )
                            }
                          />
                          <div
                            className="createRecepy-add-btn btn createRecepy-add-btn-mini"
                            onClick={() =>
                              handleIngredientQuantityChange(
                                index,
                                true,
                                ingredient.cuantity.numerator + 1
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
                                index,
                                false,
                                ingredient.cuantity.denominator - 1
                              )
                            }
                          >
                            <MdRemove />
                          </div>
                          <input
                            className="createRecipe-cuantity-input"
                            value={ingredient.cuantity.denominator}
                            onChange={(event) =>
                              handleIngredientQuantityChange(
                                index,
                                false,
                                event.target.value
                              )
                            }
                          />
                          <div
                            className="createRecepy-add-btn btn createRecepy-add-btn-mini"
                            onClick={() =>
                              handleIngredientQuantityChange(
                                index,
                                false,
                                ingredient.cuantity.denominator + 1
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
              );
            })}
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
              <div
                className="createRecipe-ingredient-container"
                key={instructions.indexOf(instruction)}
              >
                <div>
                  <h1 className="createRecipe-ingredient-bullet createRecipe-instructions-num">
                    {instructions.indexOf(instruction) + 1}
                  </h1>
                  <MdRemoveCircle
                    className="deleteIcon"
                    onClick={() =>
                      removeInstruction(instructions.indexOf(instruction))
                    }
                  />
                  {instructions.length > 1 ? null : null}
                </div>
                <div className="input-section">
                  {usedLangs.map((lang) => (
                    <div
                      className="input-container"
                      key={usedLangs.indexOf(lang)}
                    >
                      <p className="input-lang">{`${lang.toUpperCase()}: `}</p>
                      <input
                        className="input"
                        placeholder={
                          strings.prep.instructions.placeHolder[lang]
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
          {/* Notes */}
          <div className="input-section">
            <h3 className="input-name">
              {strings.Opc.notes.title[theme.lang]}
            </h3>
            {usedLangs.map((lang) => (
              <div className="input-container" key={usedLangs.indexOf(lang)}>
                <p className="input-lang">{`${lang.toUpperCase()}: `}</p>
                <input
                  className="input"
                  placeholder={strings.Opc.notes.placeholder[lang]}
                  value={notes[lang]}
                  onChange={(event) =>
                    handleNotesChange(event.target.value, lang)
                  }
                />
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="input-section">
            <h3 className="input-name">
              {strings.Opc.hashtags.title[theme.lang]}
            </h3>
            <div className="createRecipe-tags-container">
              {defaultValues.tags.map((tag) => (
                <div
                  key={defaultValues.tags.indexOf(tag)}
                  onClick={() => handleClickTag(tag.id)}
                  className={`tagContainer btn${
                    selectedTagsIds.includes(tag.id) ? "" : " unselected-tag"
                  }`}
                >
                  {capitilize(tag.name[theme.lang])}
                </div>
              ))}
            </div>
            <div
              onClick={() => setDisplayCreateTag(!displayCreateTag)}
              className="createCat-title-container"
            >
              <p className="createCat">
                {strings.Opc.hashtags.create.title[theme.lang]}{" "}
              </p>
              <MdKeyboardArrowDown
                className={
                  displayCreateTag
                    ? "dropdown-icon dropdown-icon-selected"
                    : "dropdown-icon"
                }
              />
            </div>
            {displayCreateTag ? (
              <div className="createCat-container">
                {langs.available.map((lang) => (
                  <div
                    className="input-container"
                    key={langs.available.indexOf(lang)}
                  >
                    <p className="input-lang">{`${lang.key.toUpperCase()}: `}</p>
                    <input
                      className="input"
                      placeholder={
                        strings.Opc.hashtags.create.placeholder[lang.key]
                      }
                      value={newTag[lang.key]}
                      onChange={(event) =>
                        handleNewTagChange(event.target.value, lang.key)
                      }
                    />
                  </div>
                ))}
                <div
                  className={`btn create-category-btn create-tag-btn${
                    createTagWasClicked ? " submited" : ""
                  }`}
                  onClick={createTag}
                >
                  {strings.Opc.hashtags.create.btn[theme.lang]}
                </div>
              </div>
            ) : null}
          </div>

          {/* Creator */}
          <>
            {adminTypes.super.includes(admin.personalInfo.rol) ? (
              <div className="input-section">
                <h3 className="input-name">
                  {strings.Opc.creator[theme.lang]}
                </h3>
                {defaultValues.creators.map((creator) => (
                  <div
                    key={defaultValues.creators.indexOf(creator)}
                    className="ingredient-lang-container"
                    onClick={() => {
                      setSelectedCreatorIndex(
                        defaultValues.creators.indexOf(creator)
                      );
                    }}
                  >
                    {defaultValues.creators.indexOf(creator) ===
                    selectedCreatorIndex ? (
                      <MdCheckBox className="ingredient-lang-checkbox" />
                    ) : (
                      <MdCheckBoxOutlineBlank className="ingredient-lang-checkbox" />
                    )}
                    <p className="ingredient-lang">{creator.name}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </>

          {/* Accompaniments */}
          <>
            {defaultValues.categories.length > 0 ? (
              defaultValues.categories[selectedCategoryIndex].id ===
              "accompaniments" ? null : (
                <div className="input-section">
                  <h3 className="input-name">
                    {strings.Opc.accompaniments.title[theme.lang]}
                  </h3>
                  <input
                    className="input"
                    placeholder={
                      strings.Opc.accompaniments.placeholder[theme.lang]
                    }
                    value={accompanimentInput}
                    onChange={(event) =>
                      handleAccompanimentsInputChange(event.target.value)
                    }
                  />
                  <div className="selectedAccompaniments">
                    {accompaniments.map((accompaniment) => (
                      <div
                        className="btn accompaniment-selected"
                        onClick={() =>
                          handleAccompanimentsChange(
                            "remove",
                            accompaniments.indexOf(accompaniment)
                          )
                        }
                      >
                        {correctLang(accompaniment.name)}{" "}
                        <MdClose className="remove-accompaniment" />
                      </div>
                    ))}
                  </div>
                  <div className="accompaniments-suggestions-container">
                    {accompanimentsSuggestions.map((suggestion) => (
                      <div className="accompaniments-suggestion-container">
                        <div className="accompaniments-suggestion-img-super-container">
                          <div className="accompaniments-suggestion-img-container">
                            <img
                              alt="accompaniments-suggestion-img"
                              src={suggestion.img}
                              className="accompaniments-suggestion-img"
                            />
                          </div>
                        </div>
                        <div className="accompaniments-suggestion-text-container">
                          {correctLang(suggestion.name)}
                          <div
                            className="accompaniments-suggestion-select"
                            onClick={() =>
                              handleAccompanimentsChange(
                                "add",
                                accompanimentsSuggestions.indexOf(suggestion)
                              )
                            }
                          >
                            {strings.Opc.accompaniments.select[theme.lang]}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ) : null}
          </>

          {/* Create recipe */}
          <>
            {loading ? (
              <div style={{ alignSelf: "center" }}>
                {strings.Opc.submit.loading[theme.lang]}
              </div>
            ) : (
              <div
                className="btn createRecipe-btn"
                onClick={() => {
                  createRecipe(
                    adminTypes.super.includes(admin.personalInfo.rol)
                  );
                }}
              >
                {adminTypes.super.includes(admin.personalInfo.rol)
                  ? strings.Opc.submit.publish[theme.lang]
                  : strings.Opc.submit.saveDraft[theme.lang]}
              </div>
            )}
            {!loading && adminTypes.super.includes(admin.personalInfo.rol) ? (
              <p
                className="createCat-title-container"
                onClick={() => {
                  createRecipe(false);
                }}
              >
                {strings.Opc.submit.saveDraft[theme.lang]}
              </p>
            ) : null}
            <p className="createRecipe-error">{error}</p>
          </>
        </div>
      </div>
    </div>
  );
}

export default Createingredient;
