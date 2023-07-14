"use strict";

import { getByQuery } from "../../utils/controllDOM.js";

export const { displayCanvas, foldCanvas, handleSign } = (() => {
  const setup = () => {
    const sunImage = "./public/img/sun.webp";
    const moonImage = "./public/img/moon.webp";
    const sunAlt = "sun icon";
    const moonAlt = "moon icon";
    const phaseMap = new Map();
    phaseMap.set(1, [sunImage, sunAlt]);
    phaseMap.set(-1, [moonImage, moonAlt]);
    return phaseMap;
  };

  const displayCanvas = () => {
    const container = getByQuery(".mode__container");
    clearTimeout(timeoutId);
    container.classList.remove("hide");
  };

  const foldCanvas = () => {
    const container = getByQuery(".mode__container");
    timeoutId = setTimeout(() => {
      container.classList.add("hide");
    }, 800);
  };

  const setButtonImage = (themeSign, phaseMap) => {
    const img = getByQuery(".mode__button__image");
    const button = getByQuery(".mode__button");
    button.classList.add("clicked");
    setTimeout(() => {
      const src = phaseMap.get(themeSign)[0];
      const alt = phaseMap.get(themeSign)[1];
      img.src = src;
      img.alt = alt;
      button.classList.remove("clicked");
    }, 400);
  };

  const setSign = (newThemeSign, phaseMap) => {
    if (themeSign !== newThemeSign) {
      themeSign = newThemeSign;
      setButtonImage(themeSign, phaseMap);
    }
  };

  const handleSign = () => {
    setSign(-themeSign, phaseMap);
  };

  let timeoutId;
  let themeSign = 1;
  let phaseMap = setup();

  return { displayCanvas, foldCanvas, handleSign };
})();
