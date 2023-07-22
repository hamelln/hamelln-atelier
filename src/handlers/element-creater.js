"use strict";

import { addFocus, removeFocus } from "./focus-handler.js";

const createElement = (tagName, option) => {
  const element = document.createElement(tagName);
  for (const key in option) {
    const value = option[key];
    switch (key) {
      case "class":
        const classList = value.split(" ");
        classList.map((c) => element.classList.add(c));
        break;
      case "textContent":
        element.textContent = value;
        break;
      case "onClick":
        const [handleClick, ...onClickArgs] = value;
        element.addEventListener("click", (e) => {
          e.preventDefault();
          handleClick(...onClickArgs);
        });
        break;
      case "onEnter":
        const [handleEnter, ...onEnterArgs] = value;
        element.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleEnter(...onEnterArgs);
          }
        });
        break;
      case "onFocus":
        const [handleFocus, ...focusArgs] = value;
        element.addEventListener("focus", () => {
          addFocus(element);
          handleFocus(...focusArgs);
        });
        break;
      case "onBlur":
        const [handleBlur, ...blurArgs] = value;
        element.addEventListener("blur", () => {
          removeFocus(element);
          handleBlur(...blurArgs);
        });
        break;
      case "onChange":
        const [handleChange, ...changeArgs] = value;
        element.addEventListener("change", () => {
          handleChange(...changeArgs);
        });
        break;
      default:
        element.setAttribute(key, value);
        break;
    }
  }
  return element;
};

export default createElement;
