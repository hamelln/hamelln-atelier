export const makeElementWithClasses = (tag) => {
  const element = document.createElement(tag);
  return (className1, className2 = null) => {
    element.classList.add(className1);
    className2 && element.classList.add(className2);
    return element;
  };
};

export const addSrcAndAlt = (element) => {
  return (src) => {
    element.src = src;
    return (alt) => {
      element.alt = alt;
      return element;
    };
  };
};

export const getByQuery = (query) => document.querySelector(query);
export const getByQueryAll = (query) => document.querySelectorAll(query);
