"use strict";

const setupNavigateScroll = () => {
  const homeLink = document.querySelector(".header__logo");
  const tabs = document.querySelector(".header-nav-list").children;
  const [aboutLink, projectsLink, contactLink] = tabs;
  const about = document.getElementById("about");
  const project = document.getElementById("project");
  const contact = document.getElementById("contact");
  const navToProject = document.querySelector(".about__nav");

  const scrollToPosition = (link, section) => {
    const windowHeight = window.innerHeight;
    const headerHeight = document.querySelector("header").offsetHeight;
    const sectionTop = section?.offsetTop;
    const sectionHeight = section?.offsetHeight;
    const y = section
      ? sectionTop - (windowHeight - sectionHeight) / 2 - headerHeight + 25
      : 0;
    link.addEventListener("keydown", ({ key }) => {
      if (key === "Enter") scrollTo(0, y);
    });
    link.addEventListener("click", () => {
      scrollTo(0, y);
    });
  };

  scrollToPosition(homeLink, undefined);
  scrollToPosition(aboutLink, about);
  scrollToPosition(projectsLink, project);
  scrollToPosition(contactLink, contact);
  scrollToPosition(navToProject, project);
};

export default setupNavigateScroll;
