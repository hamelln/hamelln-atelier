"use strict";

import navigateWithScroll from "./controllers/click-navigator.js";
import isMobile from "./handlers/mobile-recognizer.js";
import MobileHeader from "./header/MobileHeader.js";
import setupMuteButton from "./ui/mute-button.js";
import setupThemeButton from "./ui/theme-button/index.js";
import renderSelection from "./project/index.js";
import { restoreFocus } from "./handlers/focus-saver.js";
import setupSound from "./controllers/sound-controller.js";
import addKeyboardController from "./controllers/keyboard-controller.js";
import addClickAndEnterHandler from "./handlers/click-enter-handler.js";

window.addEventListener("DOMContentLoaded", () => {
  if (isMobile()) MobileHeader();
  renderSelection();
});

window.addEventListener("load", () => {
  window.addEventListener("scroll", () => {
    const scroll = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.clientHeight;
    const width = Math.min(
      (scroll / (documentHeight - windowHeight)) * 100,
      100
    );
    const loadingBar = document.querySelector(".loading-bar");
    loadingBar.style.width = width + "%";
  });

  const title = document.querySelector(".about__title");

  window.addEventListener("scroll", () => {
    const aboutHeight = document.getElementById("about").clientHeight;
    const opacity = 1 - (scrollY / aboutHeight) * 4.5;
    title.style.opacity = opacity;
  });

  const settingButton = document.querySelector(".mode__setting");
  const themeBtn = document.querySelector(".mode__theme");
  const muteBtn = document.querySelector(".mode__mute");
  addClickAndEnterHandler(settingButton)(() => {
    themeBtn.classList.toggle("focusable");
    muteBtn.classList.toggle("focusable");
    addKeyboardController();
  });

  setupMuteButton(setupSound);
  setupThemeButton();
  navigateWithScroll();
});

window.addEventListener("focus", restoreFocus);
