const scrollytellingCanvas = (START_Y_OF_TITLE_AND_CANVAS, HEIGHT_OF_ABOUT) => {
  const title = document.querySelector(".about__title");
  const canvas = document.getElementById("about__subtitle");

  const scrollytelling = () => {
    const dy = scrollY - START_Y_OF_TITLE_AND_CANVAS;
    const opacitySpeed = 1 - (dy / HEIGHT_OF_ABOUT) * 8;
    const opacity = Math.max(opacitySpeed, 0);
    if (scrollY < START_Y_OF_TITLE_AND_CANVAS) {
      title.style.opacity = 1;
      title.style.transform = "";
      canvas.style.opacity = 1;
      canvas.style.transform = "";
    } else {
      title.style.opacity = opacity;
      title.style.transform = `translateX(-${dy / 2}px)`;
      canvas.style.transform = `translateX(${dy / 2}px)`;
      canvas.style.opacity = opacity;
    }
  };

  window.addEventListener("scroll", scrollytelling, true);
};

export default scrollytellingCanvas;
