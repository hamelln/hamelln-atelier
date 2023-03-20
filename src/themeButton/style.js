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
    const phaseMap = new Map();
    phaseMap.set(1, [sunImage, light]);
    phaseMap.set(-1, [moonImage, dark]);
    return phaseMap;
  };

  const setTheme = (themeSign) => {
    phaseMap.get(themeSign)[1]();
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
    }, 400);
  };

  const setButtonImage = (themeSign) => {
    const img = document.querySelector(".mode__button__image");
    const button = document.querySelector(".mode__button");
    button.classList.add("clicked");
    setTimeout(() => {
      const src = phaseMap.get(themeSign)[0];
      img.src = src;
      button.classList.remove("clicked");
    }, 400);
  };

  const setThemeSign = (newThemeSign) => {
    if (themeSign !== newThemeSign) {
      themeSign = newThemeSign;
      setTheme(themeSign);
      setButtonImage(themeSign);
    }
  };

  const handleThemeSign = () => {
    setThemeSign(-themeSign);
  };

  let timeoutId;
  let themeSign = 1;
  let phaseMap = setup();

  return { displayCanvas, foldCanvas, handleThemeSign };
})();
