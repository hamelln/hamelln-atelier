"use strict";

import { addFocus, removeFocus } from "./focus-handler.js";

const moveToNextFocus = (event) => {
  const focusableElements = Array.from(document.querySelectorAll(".focusable"));
  const currentIndex = focusableElements.findIndex(
    (element) => element === document.activeElement
  );
  let nextIndex = 0;

  event.preventDefault();

  switch (event.key) {
    case "ArrowUp":
    case "ArrowLeft":
      nextIndex = currentIndex - 1;
      break;
    case "ArrowDown":
    case "ArrowRight":
    case "Tab":
      nextIndex = currentIndex + 1;
      break;
    default:
      return;
  }

  if (nextIndex >= focusableElements.length) nextIndex = 0;
  if (nextIndex < 0) nextIndex = focusableElements.length - 1;

  const prevElement = focusableElements[currentIndex];
  const nextElement = focusableElements[nextIndex];

  removeFocus(prevElement);
  addFocus(nextElement);
};

export default moveToNextFocus;
