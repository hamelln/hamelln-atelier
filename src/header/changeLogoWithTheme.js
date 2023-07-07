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

  logo.innerHTML = "";
  const img = document.createElement("img");
  img.src = imgData[theme].src;
  img.alt = imgData[theme].alt;
  logo.appendChild(img);
};

export default setLogo;
