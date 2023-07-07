export const addFocus = (node) => {
  node.classList.add("focus");
  node.focus();
};

export const removeFocus = (node) => {
  node.classList.remove("focus");
  node.blur();
};
