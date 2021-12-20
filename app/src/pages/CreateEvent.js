// React imports
import { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";

// Local imports
import { events as strings, langs } from "../config/text";
import { getTheme } from "../config/theme";

// Icons
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";

// Style
import "../App.css";
import "react-datepicker/dist/react-datepicker.css";

// Http
import axios from "axios";

function Createingredient() {
  // Constants
  const [firstLoad, setFirstLoad] = useState(true);
  const theme = getTheme();
  const admin = JSON.parse(localStorage.getItem("user"));
  const milisecondsInADay = 24 * 60 * 60 * 1000;
  const [usedLangs, setUsedLangs] = useState([langs.default]);
  const imgInputRef = useRef();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageObj, setSelectedImageObj] = useState(null);
  const [title, setTitle] = useState({});
  const [content, setContent] = useState({});
  const [link, setLink] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(startDate.getTime() + milisecondsInADay)
  );
  const calendarRefs = {
    start: useRef(),
    end: useRef(),
  };
  const [invalidInputs, setInvalidInputs] = useState(null);
  const [loading, setLoading] = useState(false);

  // Functions
  const formatDate = (date = new Date()) => {
    if (theme.lang === "es")
      return `${date.getDate()} de ${
        strings.duration.months[date.getMonth()].es
      }`;
    return `${strings.duration.months[date.getMonth()].en} ${date.getDate()}`;
  };

  const formatDates = () => {
    return {
      start: `${
        startDate.getMonth() + 1
      }/${startDate.getDate()}/${startDate.getFullYear()}`,
      end: `${
        endDate.getMonth() + 1
      }/${endDate.getDate()}/${endDate.getFullYear()}`,
    };
  };

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
    if (startDate.getTime() > endDate.getTime()) return;
    for (let i = 0; i < usedLangs.length; i++) {
      const lang = usedLangs[i];
      if (!title[lang] || title[lang] === "") return;
      if (!content[lang] || content[lang] === "") return;
    }
    return true;
  };

  const publishEvent = async () => {
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
          method: "createEvent",
          title,
          content,
          link,
          img,
          admin: { email: admin.id, password: admin.personalInfo.password },
          langs: usedLangs,
          dates: formatDates(),
        }
      );
    } catch (e) {
      console.log(e);
      setLoading(false);
      return;
    }
    setLoading(false);
    if (response.status === 200) {
      alert(strings.success);
    }
  };

  const uploadImg = async () => {
    let formData = new FormData();
    formData.append("method", "uploadImgs");
    formData.append("destination", "eventsImgs");
    formData.append("img", selectedImageObj);
    const response = await axios({
      method: "post",
      url: "https://us-central1-tendrishh.cloudfunctions.net/server",
      data: formData,
    });
    if (response.status === 200) {
      console.log(response.data);
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

        {/* Duration */}
        <div className="subsection events-durationSection-container">
          <h1 className="section-title">
            {strings.duration.title[theme.lang]}
          </h1>
          {/* Dates */}
          <div className="events-dates-container">
            <div className="events-dateContainer">
              {strings.duration.from[theme.lang]}
              <div
                onClick={() => calendarRefs.start.current.setOpen(true)}
                className="btn dateSelector"
              >
                {formatDate(startDate)}
              </div>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                calendarStartDay={1}
                minDate={new Date()}
                ref={calendarRefs.start}
                className="datePicker"
              />
            </div>
            <div className="events-dateContainer">
              {strings.duration.to[theme.lang]}
              <div
                onClick={() => calendarRefs.end.current.setOpen(true)}
                className="btn dateSelector"
              >
                {formatDate(endDate)}
              </div>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                calendarStartDay={1}
                minDate={new Date(startDate.getTime() + milisecondsInADay)}
                ref={calendarRefs.end}
                className="datePicker"
              />
            </div>
          </div>

          {/* Publish */}
          {!loading ? (
            <div className="btn event-publish" onClick={publishEvent}>
              {strings.duration.publish[theme.lang]}
            </div>
          ) : (
            <div style={{ alignSelf: "center" }}>
              {strings.loading[theme.lang]}
            </div>
          )}
          {invalidInputs ? (
            <p className="event-error">
              {strings.duration.invalidInputs[theme.lang]}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Createingredient;
