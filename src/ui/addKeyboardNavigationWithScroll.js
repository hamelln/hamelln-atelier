"use strict";

import { addFocus, removeFocus } from "../utils/focus.js";

const handleKeyDown = (event) => {
  const focusableNodes = document.querySelectorAll(".focusable");
  const focusableArray = Array.from(focusableNodes);
  navigateNodes(event, focusableArray);
};

const navigateNodes = (event, focusableArray) => {
  const currentIndex = focusableArray.findIndex(
    (node) => node === document.activeElement
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
  removeFocus(focusableArray[currentIndex]);
  const nextNode = focusableArray[nextIndex];
  addFocus(nextNode);
  const parentSection = nextNode.closest("section");
  parentSection?.scrollIntoView({ block: "nearest" });
};

const addKeyboardNavigationWithScroll = () => {
  const focusableNodes = document.querySelectorAll(".focusable");

  focusableNodes.forEach((node) => {
    const handleFocus = () => {
      addFocus(node);
    };
    const handleBlur = () => {
      removeFocus(node);
    };
    node.removeEventListener("mousemove", handleFocus);
    node.removeEventListener("mouseleave", handleBlur);
    node.removeEventListener("focus", handleFocus);
    node.removeEventListener("blur", handleBlur);
    node.removeEventListener("keydown", handleKeyDown);

    node.addEventListener("mousemove", handleFocus);
    node.addEventListener("mouseleave", handleBlur);
    node.addEventListener("focus", handleFocus);
    node.addEventListener("blur", handleBlur);
    node.addEventListener("keydown", handleKeyDown);
  });
};

export default addKeyboardNavigationWithScroll;
