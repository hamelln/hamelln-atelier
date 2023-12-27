"use strict";

import navigateWithScroll from "./controllers/click-navigator.js";
import setupMuteButton from "./ui/mute-button.js";
import setupThemeButton from "./ui/theme-button/index.js";
import setupSound from "./controllers/sound-controller.js";
import addClickAndEnterHandler from "./handlers/click-enter-handler.js";
import scrollytellingTitleAndCanvas from "./ui/scrollytelling-title-and-canvas.js";
import moveTextOnMouse from "./ui/move-text-onmouse.js";
import scrollytellingLoadingBar from "./ui/scrollytelling-loading-bar.js";
import handleTabsFocusAndHover from "./header/style-tabs.js";
import scrollytellingAboutGuide from "./ui/scrollytelling-about-guide.js";
import scrollytellingBackgroundImage from "./ui/scrollytelling-background-image.js";
import scrollytellingAboutNavAndProject from "./ui/scrollytelling-about-nav-and-project.js";
import setupSubTitleAnimation from "./ui/sub-title/pixelAnimation.js";
import Dropdown from "./dropdown/index.js";
import updateKeyboardController from "./controllers/keyboard-controller.js";
import { removeFocus, restoreFocus } from "./handlers/focus-handler.js";
import Selection from "./project/Selection.js";

window.addEventListener("DOMContentLoaded", Selection);
window.addEventListener("load", () => {
  const settingButton = document.querySelector(".mode__setting");
  const themeBtn = document.querySelector(".mode__theme");
  const muteBtn = document.querySelector(".mode__mute");
  const titleElement = document.querySelector(".about__title");
  const contactTab = document.querySelectorAll(".header-nav-list__item")[1];

  const HEIGHT_OF_ABOUT = document.getElementById("about").offsetHeight;
  const START_Y_OF_TITLE_AND_CANVAS =
    document.querySelector(".header").offsetHeight * 2;
  const START_Y_OF_GUIDE =
    START_Y_OF_TITLE_AND_CANVAS + HEIGHT_OF_ABOUT * (1 / 8);
  const START_Y_OF_BACKGROUND = 168 + START_Y_OF_GUIDE;

  // 헤더 설정
  scrollytellingLoadingBar();
  handleTabsFocusAndHover();
  navigateWithScroll();
  new Dropdown(contactTab);

  // 어바웃 설정
  moveTextOnMouse(titleElement);
  setupSubTitleAnimation();
  scrollytellingTitleAndCanvas(START_Y_OF_TITLE_AND_CANVAS, HEIGHT_OF_ABOUT);
  scrollytellingAboutGuide(START_Y_OF_GUIDE);
  scrollytellingBackgroundImage(START_Y_OF_BACKGROUND);
  scrollytellingAboutNavAndProject();

  // 모드 버튼 설정
  setupMuteButton(setupSound);
  setupThemeButton();
  addClickAndEnterHandler(settingButton)(() => {
    themeBtn.classList.toggle("focusable");
    muteBtn.classList.toggle("focusable");
    if (themeBtn.classList.contains("focusable")) {
      themeBtn.setAttribute("tabIndex", "0");
      muteBtn.setAttribute("tabIndex", "0");
    } else {
      themeBtn.setAttribute("tabIndex", "-1");
      muteBtn.setAttribute("tabIndex", "-1");
    }
    updateKeyboardController();
  });
  settingButton.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && themeBtn.classList.contains("focusable")) {
      e.stopPropagation();
      settingButton.click();
    }
  });
});
window.addEventListener("focus", restoreFocus);
window.addEventListener("keydown", ({ key }) => {
  if (key === "Escape" && document.activeElement !== document.body) {
    removeFocus(document.activeElement);
  }
});
