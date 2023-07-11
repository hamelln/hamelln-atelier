"use strict";

const setupNavigateScroll = () => {
  const getPosition = (section) => {
    const sectionTop = section?.offsetTop;
    const sectionHeight = section?.offsetHeight;
    const y = section
      ? sectionTop - (windowHeight - sectionHeight) / 2 - headerHeight + 25
      : 0;

    return y;
  };

  const scrollToPosition = (link, position) => {
    link.addEventListener("keydown", ({ key }) => {
      if (key === "Enter") scrollTo(0, position);
    });
    link.addEventListener("click", () => {
      scrollTo(0, position);
    });
  };

  const home = document.querySelector(".header__logo");
  const tabs = document.querySelector(".header-nav-list").children;
  const [aboutLink, projectsLink, contactLink] = tabs;
  const about = document.getElementById("about");
  const project = document.getElementById("project");
  const contact = document.getElementById("contact");
  const navToProject = document.querySelector(".about__nav");
  const projectItems = document.querySelectorAll(
    ".project-content__selection__item"
  );
  const windowHeight = window.innerHeight;
  const headerHeight = document.querySelector("header").offsetHeight;
  const aboutPosition = getPosition(about);
  const projectPosition = getPosition(project);
  const contactPosition = getPosition(contact);

  projectItems.forEach((item) => {
    item.addEventListener("focus", () => {
      scrollToPosition(item, projectPosition);
    });
  });

  scrollToPosition(home, 0);
  scrollToPosition(aboutLink, aboutPosition);
  scrollToPosition(projectsLink, projectPosition);
  scrollToPosition(contactLink, contactPosition);
  scrollToPosition(navToProject, projectPosition);
};

export default setupNavigateScroll;
