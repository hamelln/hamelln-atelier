const moveTextOnMouse = (textElement) => {
  function translateTitle(e) {
    const { offsetX: x, offsetY: y } = e,
      { offsetWidth: width, offsetHeight: height } = e.target,
      move = 12,
      xMove = (x / width) * (move * 8) - move * 4,
      yMove = (y / height) * (move * 2) - move;

    e.target.style.transform = `translate(${xMove}px, ${yMove}px)`;

    if (e.type === "mouseleave") e.target.style.transform = "";
  }

  textElement.addEventListener("mousemove", translateTitle);
  textElement.addEventListener("mouseleave", translateTitle);
};

export default moveTextOnMouse;
