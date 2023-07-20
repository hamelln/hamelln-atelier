"use strict";

import { addFocus, removeFocus } from "./focus.js";
import isMobile from "./isMobile.js";
import scrollToSection from "./scrollToPosition.js";

const handleKeyDown = (event) => {
  const focusableElements = document.querySelectorAll(".focusable");
  const focusableArray = Array.from(focusableElements);
  navigateToElements(event, focusableArray);
};

const navigateToElements = (event, focusableArray) => {
  const currentIndex = focusableArray.findIndex(
    (element) => element === document.activeElement
  );
  let nextIndex = 0;

  event.preventDefault();

  switch (event.key) {
    case "ArrowUp":
      nextIndex = currentIndex - 1;
      break;
    case "ArrowDown":
      nextIndex = currentIndex + 1;
      break;
    case "ArrowLeft":
      nextIndex = currentIndex - 1;
      break;
    case "ArrowRight":
      nextIndex = currentIndex + 1;
      break;
    case "Tab":
      nextIndex = currentIndex + 1;
      break;
    default:
      return;
  }

  if (nextIndex < 0) nextIndex = focusableArray.length - 1;
  else if (nextIndex >= focusableArray.length) nextIndex = 0;

  const nextElement = focusableArray[nextIndex];
  removeFocus(focusableArray[currentIndex]);
  addFocus(nextElement);
};

const addKeyboardController = () => {
  if (isMobile()) return;

  const focusableElements = document.querySelectorAll(".focusable");
  focusableElements.forEach((element) => {
    const handleOnMouse = () => {
      addFocus(element);
    };

    const handleFocus = (event) => {
      const sectionId = event.target.closest("section")?.id;
      if (sectionId) scrollToSection(sectionId);
      addFocus(element);
    };
    const handleBlur = () => {
      removeFocus(element);
    };
    element.removeEventListener("mousemove", handleOnMouse);
    element.removeEventListener("mouseleave", handleBlur);
    element.removeEventListener("focus", handleFocus);
    element.removeEventListener("blur", handleBlur);
    element.removeEventListener("keydown", handleKeyDown);

    element.addEventListener("mousemove", handleOnMouse);
    element.addEventListener("mouseleave", handleBlur);
    element.addEventListener("focus", handleFocus);
    element.addEventListener("blur", handleBlur);
    element.addEventListener("keydown", handleKeyDown);
  });
};

export default addKeyboardController;
