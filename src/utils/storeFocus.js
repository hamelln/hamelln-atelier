export const saveFocusedElement = (name) => {
  sessionStorage.setItem("lastFocusedElement", name);
};

export const restoreFocus = () => {
  const lastFocusedName = sessionStorage.getItem("lastFocusedElement");
  if (lastFocusedName) {
    const elem = document.querySelector(
      `[data-focus-name="${lastFocusedName}"]`
    );
    if (elem) {
      addFocus(elem);
      sessionStorage.removeItem("lastFocusedElement");
    }
  }
};
