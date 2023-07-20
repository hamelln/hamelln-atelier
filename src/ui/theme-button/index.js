"use strict";

import isMobile from "../../handlers/mobile-recognizer.js";
import setLogo from "../../header/logo-handler.js";
import addClickAndEnterHandler from "../../handlers/click-enter-handler.js";
import { handleAnimation, stopAnimation } from "./animation-controller.js";
import handleSoundSign from "./sound-controller.js";
import { displayCanvas, foldCanvas, handleSign } from "./style-controller.js";

const setupThemeButton = () => {
  const button = document.querySelector(".mode__theme");

  const handleTheme = () => {
    setTheme();
    if (isMobile()) displayCanvas();
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
  document.body.addEventListener("keydown", ({ code }) => {
    if (code === "KeyC") button.click();
  });
};

export default setupThemeButton;
