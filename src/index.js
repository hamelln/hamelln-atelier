"use strict";

import setupNavigateScroll from "./header/setupNavigateScroll.js";
import setupChangeProjectSkill from "./project/index.js";
import setupMuteButton from "./ui/muteButton.js";
import setupThemeButton from "./ui/themeButton/index.js";
import { setupSound } from "./utils/sound.js";

window.addEventListener("load", () => {
  setupMuteButton();
  setupSound();
  setupThemeButton();
  setupNavigateScroll();
  setupChangeProjectSkill();

  const op = document.querySelector(".opening");
  setTimeout(() => op.remove(), 6000);
});
