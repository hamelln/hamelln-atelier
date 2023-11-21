const scrollytellingAboutNavAndProject = async (START_Y_OF_NAV) => {
  setTimeout(() => {
    const aboutNav = document.querySelector(".about__nav");
    const project = document.querySelector("#project");
    const aboutWidth = aboutNav.getBoundingClientRect().width;
    const aboutLeft = aboutNav.getBoundingClientRect().left;
    let isFixed = false;

    function reset() {
      isFixed = false;
      aboutNav.classList.remove("fix");
      aboutNav.style.opacity = "";
      aboutNav.style.width = "100%";
      aboutNav.style.left = "0";
      aboutNav.style.backgroundColor = `rgba(0, 0, 0, 0.63)`;
      aboutNav.style.borderColor = "var(--pale-white)";
      aboutNav.style.color = "var(--primary-color)";
      aboutNav.textContent = "See Work";
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          project.classList.add("hide");
        } else {
          project.classList.remove("hide");
        }
      });
    });

    observer.observe(aboutNav);

    window.addEventListener("scroll", () => {
      const scrollValue = scrollY - START_Y_OF_NAV;
      if (scrollValue >= 0 && scrollValue < 600) {
        if (!isFixed) {
          aboutNav.style.width = `${aboutWidth}px`;
          aboutNav.classList.add("fix");
          aboutNav.style.left = `${aboutLeft}px`;
          isFixed = true;
        }
        if (scrollValue >= 200) {
          aboutNav.style.borderColor = "transparent";
        }
        if (scrollValue >= 400) {
          aboutNav.style.backgroundColor = "transparent";
          aboutNav.style.color = "var(--text-color)";
          aboutNav.textContent = "Thank you!";
        }
        aboutNav.style.opacity = 2 - scrollValue / 600;
      } else {
        reset();
      }
    });
  }, 300);
};

export default scrollytellingAboutNavAndProject;
