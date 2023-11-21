const scrollytellingAboutGuide = (START_Y_OF_GUIDE) => {
  const guide = document.querySelector(".about__guide");
  const paragraphs = guide.querySelectorAll("p");

  const scrollytelling = () => {
    if (scrollY <= START_Y_OF_GUIDE) {
      guide.style.height = "12em";
      guide.style.opacity = "1";
      guide.style.width = "100%";
      guide.style.padding = "0 1em";
      guide.style.borderWidth = "2px";
      paragraphs.forEach((p) => {
        p.style.transition = "opacity 1.2s";
        p.style.opacity = "1";
      });
    } else {
      guide.style.height = `${Math.max(
        12 - (scrollY - START_Y_OF_GUIDE) / 14,
        0
      )}em`;
      const guidePosition = guide.offsetTop + guide.offsetHeight;

      switch (guide.style.height) {
        case "0em":
          guide.style.width = "0";
          guide.style.padding = "0";
          guide.style.borderWidth = "0";
          break;
        default:
          guide.style.opacity = "1";
          guide.style.width = "100%";
          guide.style.padding = "0 1em";
          guide.style.borderWidth = "2px";
          break;
      }

      paragraphs.forEach((p) => {
        if (p.offsetTop + p.offsetHeight <= guidePosition) {
          p.style.transition = "opacity 1.2s";
          p.style.opacity = "1";
        } else {
          p.style.transition = "";
          p.style.opacity = "0";
        }
      });
    }
  };

  window.addEventListener("scroll", scrollytelling, true);
};

export default scrollytellingAboutGuide;
