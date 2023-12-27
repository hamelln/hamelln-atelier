"use strict";

export const addFocus = (element) => {
  element.classList.add("focus");
  element.focus();
};

export const removeFocus = (element) => {
  element.classList.remove("focus");
  element.blur();
};

export const addFocusHandler = (element) => {
  return (callback, ...args) => {
    element.addEventListener("focus", () => {
      addFocus(element);
      callback(...args);
    });
  };
};

export const addBlurHandler = (element) => {
  return (callback, ...args) => {
    element.addEventListener("blur", () => {
      removeFocus(element);
      callback(...args);
    });
  };
};

export const saveFocusedElement = (name) => {
  sessionStorage.setItem("lastFocused", name);
};

export const restoreFocus = () => {
  const lastFocusedName = sessionStorage.getItem("lastFocused");
  if (lastFocusedName) {
    const element = document.querySelector(
      `[lastFocused="${lastFocusedName}"]`
    );
    if (element) {
      addFocus(element);
      sessionStorage.removeItem("lastFocused");
    }
  }
};
