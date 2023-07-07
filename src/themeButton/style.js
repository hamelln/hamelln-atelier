export const { displayCanvas, foldCanvas, handleThemeSign } = (() => {
  const setup = () => {
    const light = () => {
      const body = document.querySelector("body");
      body.removeAttribute("data-theme");
    };

    const dark = () => {
      const body = document.querySelector("body");
      body.setAttribute("data-theme", "dark");
    };

    const sunImage = "./public/img/sun.webp";
    const moonImage = "./public/img/moon.webp";
    const sunAlt = "sun icon";
    const moonAlt = "moon icon";
    const phaseMap = new Map();
    phaseMap.set(1, [sunImage, sunAlt, light]);
    phaseMap.set(-1, [moonImage, moonAlt, dark]);
    return phaseMap;
  };

  const setTheme = (themeSign, phaseMap) => {
    phaseMap.get(themeSign)[2]();
  };

  const displayCanvas = () => {
    const container = document.querySelector(".mode__container");
    clearTimeout(timeoutId);
    container.classList.remove("hide");
  };

  const foldCanvas = () => {
    const container = document.querySelector(".mode__container");
    timeoutId = setTimeout(() => {
      container.classList.add("hide");
    }, 800);
  };

  const setButtonImage = (themeSign, phaseMap) => {
    const img = document.querySelector(".mode__button__image");
    const button = document.querySelector(".mode__button");
    button.classList.add("clicked");
    setTimeout(() => {
      const src = phaseMap.get(themeSign)[0];
      const alt = phaseMap.get(themeSign)[1];
      img.src = src;
      img.alt = alt;
      button.classList.remove("clicked");
    }, 400);
  };

  const setThemeSign = (newThemeSign, phaseMap) => {
    if (themeSign !== newThemeSign) {
      themeSign = newThemeSign;
      setTheme(themeSign, phaseMap);
      setButtonImage(themeSign, phaseMap);
    }
  };

  const handleThemeSign = () => {
    setThemeSign(-themeSign, phaseMap);
  };

  let timeoutId;
  let themeSign = 1;
  let phaseMap = setup();

  return { displayCanvas, foldCanvas, handleThemeSign };
})();
