const calcCenterPositionOfSection = (section) => {
  const windowHeight = window.innerHeight;
  const headerHeight = document.querySelector("header").offsetHeight;
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;
  const position =
    sectionTop - (windowHeight - sectionHeight) / 2 - headerHeight / 2;
  return position;
};

const about = document.getElementById("about");
const project = document.getElementById("project");
const contact = document.getElementById("contact");
const ABOUT_POSITION = calcCenterPositionOfSection(about);
const PROJECT_POSITION = calcCenterPositionOfSection(project);
const CONTACT_POSITION = calcCenterPositionOfSection(contact);

const scrollToSection = (sectionId) => {
  switch (sectionId) {
    case "about":
      scrollTo(0, ABOUT_POSITION);
      break;
    case "project":
      scrollTo(0, PROJECT_POSITION);
      break;
    case "contact":
      scrollTo(0, CONTACT_POSITION);
      break;
    case "home":
      scrollTo(0, 0);
      break;
    default:
      break;
  }
};

export default scrollToSection;
