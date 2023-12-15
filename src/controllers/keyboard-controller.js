"use strict";

import { addFocus, removeFocus } from "../handlers/focus-handler.js";
import moveToNextFocus from "../handlers/keyboard-handler.js";
import scrollToSection from "../handlers/section-scroller.js";

//? 마우스 클릭 땐 포커스 이벤트 방지
function preventFocusOnClick(e) {
  e.preventDefault();
}

function handleBlur() {
  removeFocus(this);
}

function handleHover() {
  removeFocus(document.activeElement);
}

function handleFocus(e) {
  const sectionId = e.target.closest("section")?.id;
  sectionId && scrollToSection(sectionId);
  addFocus(this);
}

const updateKeyboardController = () => {
  const focusableElements = document.querySelectorAll(".focusable");

  focusableElements.forEach((element) => {
    element.removeEventListener("focus", handleFocus);
    element.removeEventListener("blur", handleBlur);
    element.removeEventListener("mouseover", handleHover);
    element.removeEventListener("mousedown", preventFocusOnClick);
    element.removeEventListener("keydown", moveToNextFocus);

    element.addEventListener("focus", handleFocus);
    element.addEventListener("blur", handleBlur);
    element.addEventListener("mouseover", handleHover);
    element.addEventListener("mousedown", preventFocusOnClick);
    element.addEventListener("keydown", moveToNextFocus);
  });
};

export default updateKeyboardController;
