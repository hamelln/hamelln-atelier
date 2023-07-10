"use strict";

import setupNavigateScroll from "./header/setupNavigateScroll.js";
import setupChangeProjectSkill from "./project/index.js";
import addKeyboardNavigationWithScroll from "./ui/addKeyboardNavigationWithScroll.js";
import setupMuteButton from "./ui/muteButton.js";
import setupThemeButton from "./ui/themeButton/index.js";
import { setupSound } from "./utils/sound.js";

window.addEventListener("load", () => {
  const isMobileDevice = /Mobi/i.test(navigator.userAgent);
  setupMuteButton();
  setupSound();
  setupThemeButton();
  setupNavigateScroll();
  setupChangeProjectSkill();
  isMobileDevice || addKeyboardNavigationWithScroll();

  const op = document.querySelector(".opening");
  setTimeout(() => op.remove(), 6000);
});
