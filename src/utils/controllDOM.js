export const makeElementWithClasses = (tag) => {
  const element = document.createElement(tag);
  return (className1, className2 = null) => {
    element.classList.add(className1);
    className2 && element.classList.add(className2);
    return element;
  };
};

export const addAttribute = (element) => {
  return (attrs) => {
    for (const attr in attrs) {
      const value = attrs[attr];
      switch (attr) {
        case "text":
          element.textContent = value;
          break;
        case "src":
          element.src = value;
          break;
        case "alt":
          element.alt = value;
          break;
        case "tabIndex":
          element.tabIndex = value;
          break;
        case "dataName":
          element.setAttribute("data-focus-name", value);
        default:
          break;
      }
    }
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
