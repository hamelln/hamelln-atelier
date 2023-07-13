export const addFocus = (element) => {
  element.classList.add("focus");
  element.focus();
};

export const removeFocus = (element) => {
  element.classList.remove("focus");
  element.blur();
};

export const toggleFocusClass = (element) => {
  element.addEventListener("focus", () => {
    addFocus(element);
  });
  element.addEventListener("blur", () => {
    removeFocus(element);
  });
};

export const addFocusAttribute = (element) => {
  element.classList.add("focusable");
  element.tabIndex = 0;
};

export const addFocusHandlers = (element) => {
  addFocusAttribute(element);
  toggleFocusClass(element);
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
