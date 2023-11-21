const scrollytellingBackgroundImage = (START_Y_OF_BACKGROUND) => {
  const backgroundImage = document.querySelector(".about__image");
  const aboutHeight = document.getElementById("about").offsetHeight;
  window.addEventListener("scroll", () => {
    if (scrollY <= START_Y_OF_BACKGROUND + 30) {
      backgroundImage.style.opacity = "0.9";
    } else {
      backgroundImage.style.opacity = 1 - (scrollY / aboutHeight) * 2.5;
    }
  });
};

export default scrollytellingBackgroundImage;