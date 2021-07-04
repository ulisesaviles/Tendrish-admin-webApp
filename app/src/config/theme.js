import { useHistory } from "react-router-dom";

export const SetTheme = (theme) => {
  let history = useHistory();
  let colorScheme = theme.colorScheme;
  let lang = theme.lang;
  let tab = theme.tab;
  let needsToNavigate;

  if (colorScheme === null) {
    needsToNavigate = true;
    colorScheme = localStorage.getItem("colorScheme");
    if (colorScheme === null) {
      colorScheme = "light";
      localStorage.setItem("colorScheme", colorScheme);
    }
  } else {
    localStorage.setItem("colorScheme", colorScheme);
  }

  if (lang === null) {
    needsToNavigate = true;
    lang = localStorage.getItem("lang");
    if (lang === null) {
      lang = "es";
      localStorage.setItem("lang", lang);
    }
  } else {
    localStorage.setItem("lang", lang);
  }

  if (needsToNavigate) {
    history.replace(`?tab=${tab}&lang=${lang}&colorScheme=${colorScheme}`);
  }

  return {
    colorScheme,
    lang,
    tab,
  };
};

export const getTheme = () => {
  return {
    colorScheme: localStorage.getItem("colorScheme"),
    lang: localStorage.getItem("lang"),
  };
};

export const SetLang = (lang, tab) => {
  let history = useHistory();
  localStorage.setItem("lang", lang);
  history.replace(
    `?tab=${tab}&lang=${lang}&colorScheme=${getTheme().colorScheme}`
  );
};

export const SetColorScheme = (colorScheme, tab) => {
  let history = useHistory();
  localStorage.setItem("colorScheme", colorScheme);
  history.replace(
    `?tab=${tab}&lang=${getTheme().lang}&colorScheme=${colorScheme}`
  );
};
