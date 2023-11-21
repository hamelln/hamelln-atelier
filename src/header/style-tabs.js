const handleTabsFocusAndHover = () => {
  let nav = document.querySelector(".header-nav");
  let background = nav.querySelector(".header-nav__background");
  let items = nav.querySelectorAll(".header-nav-list__item");

  items.forEach((item) => {
    item.addEventListener("focus", function () {
      let rect = this.getBoundingClientRect();
      let navRect = nav.getBoundingClientRect();
      let coords = {
        height: this.clientHeight,
        width: this.clientWidth,
        top: rect.top - navRect.top,
        left: rect.left - navRect.left,
      };

      background.style.setProperty("width", `${coords.width}px`);
      background.style.setProperty("height", `${coords.height}px`);
      background.style.setProperty(
        "transform",
        `translate(${coords.left}px, ${coords.top}px)`
      );
      background.style.setProperty("opacity", "1");
    });
    item.addEventListener("mouseenter", function () {
      let rect = this.getBoundingClientRect();
      let navRect = nav.getBoundingClientRect();

      let coords = {
        height: this.clientHeight,
        width: this.clientWidth,
        top: rect.top - navRect.top,
        left: rect.left - navRect.left,
      };

      background.style.setProperty("width", `${coords.width}px`);
      background.style.setProperty("height", `${coords.height}px`);
      background.style.setProperty(
        "transform",
        `translate(${coords.left}px, ${coords.top}px)`
      );
      background.style.setProperty("opacity", "1");
    });

    item.addEventListener("blur", function () {
      background.style.setProperty("opacity", "0");
    });
  });

  nav.addEventListener("mouseleave", function () {
    background.style.setProperty("opacity", "0");
  });
};

export default handleTabsFocusAndHover;
