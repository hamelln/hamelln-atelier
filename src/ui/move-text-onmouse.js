const moveTextOnMouse = (textElement) => {
  function translateTitle(e) {
    const { offsetX, offsetY, target } = e;
    const { offsetWidth, offsetHeight } = target;
    const move = 12;
    const xMove = (offsetX / offsetWidth) * (move * 8) - move * 4;
    const yMove = (offsetY / offsetHeight) * (move * 2) - move;

    e.target.style.transform = `translate(${xMove}px, ${yMove}px)`;
  }

  function reset(e) {
    e.target.style.transform = "";
  }

  textElement.addEventListener("mousemove", translateTitle);
  textElement.addEventListener("mouseleave", reset);
};

export default moveTextOnMouse;
