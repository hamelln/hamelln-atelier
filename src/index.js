"use strict";

import Selection from "./project/Selection.js";
import setupMuteButton from "./ui/muteButton.js";
import setupThemeButton from "./ui/themeButton/index.js";
import navigateWithScroll from "./utils/navigateWithScroll.js";
import { restoreFocus } from "./utils/storeFocus.js";

window.addEventListener("load", () => {
  setupMuteButton();
  setupThemeButton();
  navigateWithScroll();
  Selection();

  const op = document.querySelector(".opening");
  setTimeout(() => op.remove(), 6000);
});

window.addEventListener("focus", restoreFocus);
