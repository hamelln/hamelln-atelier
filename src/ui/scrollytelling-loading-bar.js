const scrollytellingLoadingBar = () => {
  const loadingBar = document.querySelector(".loading-bar");
  const documentHeight = document.body.clientHeight;
  window.addEventListener("scroll", () => {
    const width = Math.min(
      (scrollY / (documentHeight - innerHeight)) * 100,
      100
    );
    loadingBar.style.width = `${width}%`;
  });
};

export default scrollytellingLoadingBar;
