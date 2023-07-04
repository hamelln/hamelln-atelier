const headerSetup = () => {
  const homeLink = document.querySelector(".header__logo");
  const tabs = document.querySelector(".header-nav-list").children;
  const [aboutLink, projectsLink, contactLink] = tabs;
  const aboutSection = document.getElementById("about");
  const projectSection = document.getElementById("project");
  const contactSection = document.getElementById("contact");
  const scrollToPosition = (link, section) => {
    const y = section ? section.offsetTop : 0;
    link.addEventListener("keydown", ({ key }) => {
      if (key === "Enter") {
        scrollTo(0, y);
      }
    });
    link.addEventListener("click", () => {
      scrollTo(0, y);
    });
  };

  scrollToPosition(homeLink);
  scrollToPosition(aboutLink, aboutSection);
  scrollToPosition(projectsLink, projectSection);
  scrollToPosition(contactLink, contactSection);
};

export default headerSetup;
