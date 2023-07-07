"use strict";

import setupHeaderScrollBehavior from "./header/setupHeaderScrollBehavior.js";
import setupChangeProjectSkill from "./project/index.js";
import addKeyboardNavigationWithScroll from "./ui/addKeyboardNavigationWithScroll.js";
import setupMuteButton from "./ui/muteButton.js";
import setupThemeButton from "./ui/themeButton/index.js";

window.addEventListener("load", () => {
  const isMobileDevice = /Mobi/i.test(navigator.userAgent);
  setupMuteButton();
  setupThemeButton();
  setupHeaderScrollBehavior();
  isMobileDevice || addKeyboardNavigationWithScroll();
  setupChangeProjectSkill();

  const op = document.querySelector(".opening");
  setTimeout(() => op.remove(), 6000);
});
