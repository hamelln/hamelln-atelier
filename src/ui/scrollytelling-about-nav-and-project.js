const scrollytellingAboutNavAndProject = () => {
  const aboutNav = document.querySelector(".about__nav");
  const project = document.querySelector("#project");
  const aboutGuide = document.querySelector(".about__guide");
  let isHide = false;
  const inersectionCallback = ([entry]) => {
    if (entry.isIntersecting) {
      project.classList.add("hide");
    } else {
      project.classList.remove("hide");
    }
  };
  const intersectionObserver = new IntersectionObserver(inersectionCallback, {
    rootMargin: "200px 0px",
  });

  const mutationObserver = new MutationObserver((mutationList) => {
    mutationList.map(async (entry) => {
      if (entry.type === "attributes" && entry.attributeName === "style") {
        const currentWidth = entry.target.style.width;
        if (currentWidth === "0px" && !isHide) {
          isHide = true;
          aboutNav.classList.remove("about__nav");
          aboutNav.classList.add("about__nav-hide");
          return;
        }
        if (currentWidth !== "0px" && isHide) {
          aboutNav.classList.remove("about__nav-hide");
          aboutNav.classList.add("about__nav");
          isHide = false;
        }
      }
    });
  });

  mutationObserver.observe(aboutGuide, {
    attributes: true,
    attributeFilter: ["style"],
  });
  intersectionObserver.observe(aboutNav);
};

export default scrollytellingAboutNavAndProject;
