"use strict";

import setLogo from "../../header/changeLogoWithTheme.js";
import addClickAndEnterHandler from "../../utils/addClickAndEnterHandler.js";
import { handleAnimation, stopAnimation } from "./animation.js";
import handleSoundSign from "./sound.js";
import { displayCanvas, foldCanvas, handleSign } from "./style.js";

const setupThemeButton = () => {
  const isMobileDevice = /Mobi/i.test(navigator.userAgent);
  const button = document.querySelector(".mode__button");

  const handleTheme = () => {
    setTheme();
    if (isMobileDevice) displayCanvas();
    handleAnimation();
    handleSign();
    handleSoundSign();
  };

  const reverseTheme = () =>
    document.body.dataset.theme === "dark" ? "light" : "dark";

  const setTheme = () => {
    const theme = reverseTheme();
    document.body.dataset.theme = theme;
    setLogo(theme);
  };

  const clearCanvas = () => {
    setTimeout(stopAnimation, 300);
    foldCanvas();
  };

  addClickAndEnterHandler(button)(handleTheme);
  button.addEventListener("mouseenter", displayCanvas);
  button.addEventListener("focus", displayCanvas);
  button.addEventListener("blur", clearCanvas);
};

export default setupThemeButton;
