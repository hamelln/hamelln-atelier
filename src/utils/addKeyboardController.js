"use strict";

import { addFocus, removeFocus } from "./focus.js";
import isMobile from "./isMobile.js";

const handleKeyDown = (event) => {
  const focusableElements = document.querySelectorAll(".focusable");
  const focusableArray = Array.from(focusableElements);
  navigateToElements(event, focusableArray);
};

const navigateToElements = (event, focusableArray) => {
  const currentIndex = focusableArray.findIndex(
    (element) => element === document.activeElement
  );
  let nextIndex = -1;

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

  if (nextIndex < 0) {
    nextIndex = focusableArray.length - 1;
  } else if (nextIndex >= focusableArray.length) {
    nextIndex = 0;
  }

  const nextElement = focusableArray[nextIndex];
  removeFocus(focusableArray[currentIndex]);
  addFocus(nextElement);
  const parentSection = nextElement.closest("section");
  parentSection?.scrollIntoView({ block: "nearest" });
};

const addKeyboardController = () => {
  if (isMobile()) return;

  const focusableElements = document.querySelectorAll(".focusable");
  focusableElements.forEach((element) => {
    const handleFocus = () => {
      addFocus(element);
    };
    const handleBlur = () => {
      removeFocus(element);
    };
    element.removeEventListener("mousemove", handleFocus);
    element.removeEventListener("mouseleave", handleBlur);
    element.removeEventListener("focus", handleFocus);
    element.removeEventListener("blur", handleBlur);
    element.removeEventListener("keydown", handleKeyDown);

    element.addEventListener("mousemove", handleFocus);
    element.addEventListener("mouseleave", handleBlur);
    element.addEventListener("focus", handleFocus);
    element.addEventListener("blur", handleBlur);
    element.addEventListener("keydown", handleKeyDown);
  });
};

export default addKeyboardController;
