(() => {
  window.addEventListener("load", () => {
    const op = document.querySelector(".opening");
    setTimeout(() => op.remove(), 6000);
  });
})();
