export default function addEventForClickAndEnter(element) {
  return (callback, ...args) => {
    element.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        callback(...args);
      }
    });
    element.addEventListener("click", () => {
      callback(...args);
    });
  };
}
