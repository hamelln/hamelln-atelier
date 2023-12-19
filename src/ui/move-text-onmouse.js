const moveTextOnMouse = (textElement) => {
  function translateTitle(e) {
    const { offsetX, offsetY } = e;
    const { offsetWidth, offsetHeight } = this;
    const move = 12;
    const xMove = (offsetX / offsetWidth) * (move * 8) - move * 4;
    const yMove = (offsetY / offsetHeight) * (move * 2) - move;
    this.style.transform = `translate(${xMove}px, ${yMove}px)`;
  }

  function reset() {
    this.style.transform = "";
  }

  textElement.addEventListener("mousemove", translateTitle);
  textElement.addEventListener("mouseleave", reset);
};

export default moveTextOnMouse;
