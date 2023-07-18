export const makeElementWithClasses = (tag) => {
  const element = document.createElement(tag);
  return (className1 = null, className2 = null) => {
    className1 && element.classList.add(className1);
    className2 && element.classList.add(className2);
    return element;
  };
};

export const makeImg = (className1, className2) => {
  const imageElement = makeElementWithClasses("img")(className1, className2);
  return (src, alt) => addAttribute(imageElement)({ src, alt });
};

export const addAttribute = (element) => {
  return (attrs) => {
    for (const key in attrs) {
      const value = attrs[key];
      switch (key) {
        case "textContent":
          element.textContent = value;
          break;
        default:
          element.setAttribute(key, value);
          break;
      }
    }
    return element;
  };
};
