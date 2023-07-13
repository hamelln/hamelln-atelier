"use strict";

import setupNavigateScroll from "./header/setupNavigateScroll.js";
import Selection from "./project/Selection.js";
import setupMuteButton from "./ui/muteButton.js";
import setupThemeButton from "./ui/themeButton/index.js";
import { setupSound } from "./utils/sound.js";

window.addEventListener("load", () => {
  setupMuteButton();
  setupSound();
  setupThemeButton();
  setupNavigateScroll();
  Selection();

  const op = document.querySelector(".opening");
  setTimeout(() => op.remove(), 6000);
});
