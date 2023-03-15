export const { displayCanvas, foldCanvas, handleSign } = (() => {
  const setup = () => {
    const sunImage = "./public/img/sun.png";
    const moonImage = "./public/img/moon.png";
    const phaseMap = new Map();
    phaseMap.set(1, [sunImage, light]);
    phaseMap.set(-1, [moonImage, dark]);
    return phaseMap;
  };

  const light = () => {
    const body = document.querySelector("body");
    body.removeAttribute("data-theme");
  };

  const dark = () => {
    const body = document.querySelector("body");
    body.setAttribute("data-theme", "dark");
  };

  const changeTheme = (sign) => {
    phaseMap.get(sign)[1]();
  };

  const displayCanvas = () => {
    const container = document.querySelector(".mode__container");
    clearTimeout(timeoutId);
    container.classList.remove("hide");
  };

  const foldCanvas = () => {
    const container = document.querySelector(".mode__container");
    timeoutId = setTimeout(() => {
      container.classList.add("hide");
    }, 400);
  };

  const changeButtonImage = (sign) => {
    const img = document.querySelector(".mode__button__image");
    const button = document.querySelector(".mode__button");
    const src = phaseMap.get(sign)[0];
    button.classList.add("clicked");
    setTimeout(() => {
      img.src = src;
      button.classList.remove("clicked");
    }, 400);
  };

  const setSign = (newSign) => {
    if (sign !== newSign) {
      sign = newSign;
      changeTheme(sign);
      changeButtonImage(sign);
    }
  };

  const handleSign = () => {
    setSign(-sign);
  };

  let timeoutId;
  let sign = 1;
  let phaseMap = setup();

  return { displayCanvas, foldCanvas, handleSign };
})();
