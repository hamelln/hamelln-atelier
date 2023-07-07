"use strict";

import { handleAnimation, stopAnimation } from "./animation.js";
import handleSoundSign from "./sound.js";
import { displayCanvas, foldCanvas, handleThemeSign } from "./style.js";

const setupThemeButton = () => {
  const isMobileDevice = /Mobi/i.test(navigator.userAgent);
  const button = document.querySelector(".mode__button");

  const changeTheme = () => {
    if (isMobileDevice) displayCanvas();
    handleAnimation();
    handleThemeSign();
    handleSoundSign();
  };

  const clearCanvas = () => {
    setTimeout(stopAnimation, 300);
    foldCanvas();
  };

  button.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      changeTheme();
    }
  });
  button.addEventListener("click", changeTheme);
  button.addEventListener("mouseenter", displayCanvas);
  button.addEventListener("focus", displayCanvas);
  button.addEventListener("blur", clearCanvas);
};

export default setupThemeButton;
