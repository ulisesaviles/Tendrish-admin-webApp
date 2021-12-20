// React imports
import { useState, useRef, useEffect } from "react";

// Local imports
import { ads as strings, langs } from "../config/text";
import { getTheme } from "../config/theme";

// Icons
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";

// Style
import "../App.css";
import "react-datepicker/dist/react-datepicker.css";

// Http
import axios from "axios";

const CreateAd = () => {
  // Constants
  const [firstLoad, setFirstLoad] = useState(true);
  const theme = getTheme();
  const admin = JSON.parse(localStorage.getItem("user"));
  const [usedLangs, setUsedLangs] = useState([langs.default]);
  const imgInputRef = useRef();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageObj, setSelectedImageObj] = useState(null);
  const [title, setTitle] = useState({});
  const [content, setContent] = useState({});
  const [link, setLink] = useState("");
  const [invalidInputs, setInvalidInputs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [author, setAuthor] = useState("");
  const [numOfUsers, setNumOfUsers] = useState(0);

  // Functions
  const handleContentChange = (lang, str) => {
    let temp = { ...content };
    temp[lang] = str;
    setContent(temp);
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

  const handleNumOfUsersChange = (num) => {
    if (num === "") {
      setNumOfUsers(0);
      return;
    }
    if (isNaN(num)) return;
    setNumOfUsers(parseInt(num));
  };

  const handleTitleChange = (lang, str) => {
    let temp = { ...title };
    temp[lang] = str;
    setTitle(temp);
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

  const inputsAreValid = () => {
    if (selectedImage === null) return;
    for (let i = 0; i < usedLangs.length; i++) {
      const lang = usedLangs[i];
      if (!title[lang] || title[lang] === "") return;
      if (!content[lang] || content[lang] === "") return;
    }
    if (author.length < 1) return;
    if (!numOfUsers) return;
    return true;
  };

  const publishAd = async () => {
    if (!inputsAreValid()) {
      setInvalidInputs(true);
      return;
    }
    if (loading) return;
    setInvalidInputs(false);
    setLoading(true);

    const img = await uploadImg();
    let response;
    try {
      response = await axios.post(
        "https://us-central1-tendrishh.cloudfunctions.net/server",
        {
          method: "createAd",
          admin: { email: admin.id, password: admin.personalInfo.password },
          langs: usedLangs,
          img,
          title,
          content,
          author,
          link,
          numOfUsers,
        }
      );
    } catch (e) {
      console.log(e);
      setLoading(false);
      return;
    }
    setLoading(false);
    if (response.status === 200) {
      console.log(response.data);
      alert(strings.success[theme.lang]);
    }
  };

  const uploadImg = async () => {
    let formData = new FormData();
    formData.append("method", "uploadImgs");
    formData.append("destination", "AdImgs");
    formData.append("img", selectedImageObj);
    const response = await axios({
      method: "post",
      url: "https://us-central1-tendrishh.cloudfunctions.net/server",
      data: formData,
    });
    if (response.status === 200) {
      return response.data.urls[0];
    }
  };

  // Logic
  // eslint-disable-next-line
  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
    }
  });

  // Render
  return (
    <div className="tab-container">
      <div className="content-container">
        {/* General */}
        <div className="subsection events-generalSection-conainer">
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
        </div>

        {/* Content */}
        <div className="subsection events-contentSection-conainer">
          <h1 className="section-title">{strings.content.title[theme.lang]}</h1>
          {/* Title */}
          <div className="input-section">
            <h3 className="input-name">
              {strings.content.title_.title[theme.lang]}
            </h3>
            {usedLangs.map((lang) => (
              <div className="input-container" key={usedLangs.indexOf(lang)}>
                <p className="input-lang">{`${lang.toUpperCase()}: `}</p>
                <input
                  className="input"
                  placeholder={strings.content.title_.placeHolder[lang]}
                  onChange={(e) => handleTitleChange(lang, e.target.value)}
                  value={title[lang]}
                />
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="input-section">
            <h3 className="input-name">
              {strings.content.content.title[theme.lang]}
            </h3>
            {usedLangs.map((lang) => (
              <div className="input-container" key={usedLangs.indexOf(lang)}>
                <p className="input-lang">{`${lang.toUpperCase()}: `}</p>
                <input
                  className="input"
                  placeholder={strings.content.content.placeHolder[lang]}
                  onChange={(e) => handleContentChange(lang, e.target.value)}
                  value={content[lang]}
                />
              </div>
            ))}
          </div>

          {/* Author */}
          <div className="input-section">
            <h3 className="input-name">
              {strings.content.advertiser.title[theme.lang]}
            </h3>
            <div className="input-container">
              <input
                className="input"
                placeholder={strings.content.advertiser.placeHolder[theme.lang]}
                onChange={(e) => setAuthor(e.target.value)}
                value={author}
              />
            </div>
          </div>

          {/* Link */}
          <div className="input-section">
            <h3 className="input-name">
              {strings.content.link.title[theme.lang]}
            </h3>
            <div className="input-container">
              <input
                className="input"
                placeholder={strings.content.link.placeHolder[theme.lang]}
                onChange={(e) => setLink(e.target.value)}
                value={link}
              />
            </div>
          </div>
        </div>

        {/* Scope */}
        <div className="subsection events-durationSection-container">
          <h1 className="section-title">{strings.scope.title[theme.lang]}</h1>
          {/* Num of users */}
          <div className="input-section">
            <h3 className="input-name">
              {strings.scope.numOfUsers.title[theme.lang]}
            </h3>
            <div className="input-container">
              <input
                className="input"
                placeholder={strings.scope.numOfUsers.placeHolder[theme.lang]}
                onChange={(e) => handleNumOfUsersChange(e.target.value)}
                value={numOfUsers}
              />
            </div>
          </div>

          {/* Publish */}
          {!loading ? (
            <div className="btn event-publish" onClick={publishAd}>
              {strings.scope.publish[theme.lang]}
            </div>
          ) : (
            <div style={{ alignSelf: "center" }}>
              {strings.loading[theme.lang]}
            </div>
          )}
          {invalidInputs ? (
            <p className="event-error">
              {strings.scope.invalidInputs[theme.lang]}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CreateAd;
