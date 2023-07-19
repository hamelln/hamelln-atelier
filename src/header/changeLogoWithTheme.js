import createElement from "../utils/createElement.js";

const setLogo = (theme) => {
  const logo = document.querySelector(".header__logo");
  const imgData = {
    dark: {
      src: "public/img/dark-logo.svg",
      alt: "dark-mode-logo",
    },
    light: {
      src: "public/img/logo.svg",
      alt: "light-mode-logo",
    },
  };
  const src = imgData[theme].src;
  const alt = imgData[theme].alt;
  logo.innerHTML = "";
  const img = createElement("img", { src, alt });
  logo.appendChild(img);
};

export default setLogo;
