"use strict";

import renderSelection from "./project/index.js";
import setupMuteButton from "./ui/muteButton.js";
import setupThemeButton from "./ui/themeButton/index.js";
import navigateWithScroll from "./utils/navigateWithScroll.js";
import { setupSound } from "./utils/sound.js";
import { restoreFocus } from "./utils/storeFocus.js";

window.addEventListener("load", () => {
  renderSelection();
  requestIdleCallback(() => {
    setupMuteButton(setupSound);
    setupThemeButton();
    navigateWithScroll();
  });
});

window.addEventListener("focus", restoreFocus);
