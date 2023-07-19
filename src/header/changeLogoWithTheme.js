import createElement from "../utils/createElement.js";

const IMG_INFO = {
  dark: {
    src: "public/img/dark-logo.svg",
    alt: "dark-mode-logo",
  },
  light: {
    src: "public/img/logo.svg",
    alt: "light-mode-logo",
  },
};

const setLogo = (theme) => {
  const logo = document.querySelector(".header__logo");
  const img = createElement("img", {
    src: IMG_INFO[theme].src,
    alt: IMG_INFO[theme].alt,
  });
  logo.innerHTML = "";
  logo.appendChild(img);
};

export default setLogo;
