"use strict";

import isMobile from "../handlers/mobile-recognizer.js";
import { play } from "../handlers/sound-handler.js";

const setupSound = () => {
  const defaultSound = document.getElementById("default-sound");
  const projectSound = document.getElementById("project-sound");
  const contactSound = document.getElementById("contact-sound");
  const focusableElements = document.querySelectorAll(".focusable");
  const isMobileDevice = isMobile();
  const isMuteOrThemeButton = (element) =>
    element.classList.contains("mode__mute") ||
    element.classList.contains("mode__theme");

  focusableElements.forEach((element) => {
    const playSectionSound = () => {
      const sectionId = element.closest("section")?.id;
      switch (sectionId) {
        case "project":
          play(projectSound);
          break;
        case "contact":
          play(contactSound);
          break;
        default:
          if (isMobileDevice && isMuteOrThemeButton(element)) return;
          play(defaultSound);
          break;
      }
    };
    if (isMobileDevice) {
      element.addEventListener("click", playSectionSound);
    } else {
      element.addEventListener("focus", playSectionSound);
      element.addEventListener("mouseover", playSectionSound);
    }
  });
};

export default setupSound;
