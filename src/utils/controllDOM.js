export const makeElementWithClasses = (tag) => {
  const element = document.createElement(tag);
  return (className1 = null, className2 = null) => {
    className1 && element.classList.add(className1);
    className2 && element.classList.add(className2);
    return element;
  };
};

export const addAttribute = (element) => {
  return (attrs) => {
    for (const attr in attrs) {
      const value = attrs[attr];
      switch (attr) {
        case "src":
          element.src = value;
          break;
        case "alt":
          element.alt = value;
          break;
        case "text":
          element.textContent = value;
          break;
        case "tabIndex":
          element.tabIndex = value;
          break;
        case "url":
          element.href = value;
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

export const makeImg = (className) => {
  const element = makeElementWithClasses("img")(className);
  return (src) => {
    return (alt) => {
      return addAttribute(element)({ src, alt });
    };
  };
};

export const getByQuery = (query) => document.querySelector(query);
export const getByQueryAll = (query) => document.querySelectorAll(query);
