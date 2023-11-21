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
import scrollytellingTitleAndCanvas from "./ui/scrollytelling-title-and-canvas.js";
import moveTextOnMouse from "./ui/move-text-onmouse.js";
import scrollytellingLoadingBar from "./ui/scrollytelling-loading-bar.js";
import handleTabsFocusAndHover from "./header/style-tabs.js";
import scrollytellingAboutGuide from "./ui/scrollytelling-about-guide.js";
import scrollytellingBackgroundImage from "./ui/scrollytelling-background-image.js";
import scrollytellingAboutNavAndProject from "./ui/scrollytelling-about-nav-and-project.js";

window.addEventListener("DOMContentLoaded", () => {
  if (isMobile()) MobileHeader();
  renderSelection();
});

window.addEventListener("load", () => {
  const settingButton = document.querySelector(".mode__setting");
  const themeBtn = document.querySelector(".mode__theme");
  const muteBtn = document.querySelector(".mode__mute");
  const titleElement = document.querySelector(".about__title");
  const HEIGHT_OF_ABOUT = document.getElementById("about").offsetHeight;
  const START_Y_OF_TITLE_AND_CANVAS =
    document.querySelector(".header").offsetHeight * 2;
  const START_Y_OF_GUIDE =
    START_Y_OF_TITLE_AND_CANVAS + HEIGHT_OF_ABOUT * (1 / 8);
  const START_Y_OF_BACKGROUND = 168 + START_Y_OF_GUIDE;
  const START_Y_OF_NAV = HEIGHT_OF_ABOUT / 2.4;

  addClickAndEnterHandler(settingButton)(() => {
    themeBtn.classList.toggle("focusable");
    muteBtn.classList.toggle("focusable");
    addKeyboardController();
  });

  scrollytellingLoadingBar();
  moveTextOnMouse(titleElement);
  scrollytellingTitleAndCanvas(START_Y_OF_TITLE_AND_CANVAS, HEIGHT_OF_ABOUT);
  scrollytellingAboutGuide(START_Y_OF_GUIDE);
  scrollytellingBackgroundImage(START_Y_OF_BACKGROUND);
  scrollytellingAboutNavAndProject(START_Y_OF_NAV);
  handleTabsFocusAndHover();
  setupMuteButton(setupSound);
  setupThemeButton();
  navigateWithScroll();
});

window.addEventListener("focus", restoreFocus);
