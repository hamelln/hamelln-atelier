export const saveFocusedElement = (name) => {
  localStorage.setItem("lastFocusedElement", name);
};

export const restoreFocus = () => {
  const lastFocusedName = localStorage.getItem("lastFocusedElement");
  if (lastFocusedName) {
    const elem = document.querySelector(
      `[data-focus-name="${lastFocusedName}"]`
    );
    if (elem) {
      addFocus(elem);
      localStorage.removeItem("lastFocusedElement");
    }
  }
};
