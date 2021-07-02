export const getTheme = () => {
  let colorScheme = localStorage.getItem("colorScheme");
  if (colorScheme === null) {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      colorScheme = "dark";
    } else {
      colorScheme = "light";
    }
  }

  let lang = localStorage.getItem("lang");
  if (lang === null) {
    lang = "es";
  }
  return {
    colorScheme,
    lang,
  };
};
