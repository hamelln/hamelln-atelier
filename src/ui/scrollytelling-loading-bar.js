import throttle from "../utils/throttle.js";

const scrollytellingLoadingBar = () => {
  const loadingBar = document.querySelector(".loading-bar");
  const documentHeight = document.body.clientHeight;

  const scrollytelling = throttle(() => {
    const width = Math.min(
      (scrollY / (documentHeight - innerHeight)) * 100,
      100
    );
    loadingBar.style.width = `${width}%`;
  }, 100);
  window.addEventListener("scroll", scrollytelling);
};

export default scrollytellingLoadingBar;
