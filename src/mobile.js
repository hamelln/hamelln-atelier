import MobileSelection from "./project/MobileSelection.js";
import scrollytellingAboutNavAndProject from "./ui-mobile/scrollytelling-about-nav-and-project.js";
import scrollytellingBackgroundImage from "./ui-mobile/scrollytelling-background-image.js";
import scrollytellingTitle from "./ui-mobile/scrollytelling-title-and-subtitle.js";

const setupMobile = () => {
  const HEIGHT_OF_ABOUT = document.getElementById("about").offsetHeight;
  scrollytellingTitle(HEIGHT_OF_ABOUT);
  scrollytellingBackgroundImage(HEIGHT_OF_ABOUT / 4);
  // scrollytellingAboutNavAndProject();
  MobileSelection();
};

export default setupMobile;
