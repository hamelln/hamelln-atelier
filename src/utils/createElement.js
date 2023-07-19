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
      default:
        element.setAttribute(key, value);
        break;
    }
  }
  return element;
};

export default createElement;
