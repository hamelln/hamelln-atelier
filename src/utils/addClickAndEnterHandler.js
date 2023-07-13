export default function addClickAndEnterHandler(element) {
  return (callback, ...args) => {
    element.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        callback(...args);
      }
    });
    element.addEventListener("click", (e) => {
      e.preventDefault();
      callback(...args);
    });
  };
}
