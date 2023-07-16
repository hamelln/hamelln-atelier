"use strict";

import Selection from "./project/Selection.js";
import setupMuteButton from "./ui/muteButton.js";
import setupThemeButton from "./ui/themeButton/index.js";
import isMobile from "./utils/isMobile.js";
import navigateWithScroll from "./utils/navigateWithScroll.js";
import { setupSound } from "./utils/sound.js";
import { restoreFocus } from "./utils/storeFocus.js";

window.addEventListener("load", () => {
  if (!isMobile()) Selection();
  else console.log("it's mobile");
  requestIdleCallback(() => {
    setupMuteButton(setupSound);
    setupThemeButton();
    navigateWithScroll();
  });
});

window.addEventListener("focus", restoreFocus);
