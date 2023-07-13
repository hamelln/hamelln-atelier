export const addFocus = (element) => {
  element.classList.add("focus");
  element.focus();
};

export const removeFocus = (element) => {
  element.classList.remove("focus");
  element.blur();
};

export const addFocusAttribute = (element) => {
  element.classList.add("focusable");
  element.tabIndex = 0;
  return element;
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
