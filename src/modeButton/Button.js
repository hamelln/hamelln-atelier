class Button {
  constructor(button) {
    this.button = button;
    this.sign = 1;
    this.timeoutId;
    this.phaseMap = this.setup();
  }

  setup() {
    const sunImage = "./img/sun.png";
    const moonImage = "./img/moon.png";
    const phaseMap = new Map();
    phaseMap.set(1, [sunImage, this.light]);
    phaseMap.set(-1, [moonImage, this.dark]);
    return phaseMap;
  }

  light() {
    const body = document.querySelector("body");
    body.removeAttribute("data-theme");
  }

  dark() {
    const body = document.querySelector("body");
    body.setAttribute("data-theme", "dark");
  }

  display() {
    const container = document.querySelector(".mode__container");
    clearTimeout(this.timeoutId);
    container.classList.remove("hide");
  }

  hide() {
    const container = document.querySelector(".mode__container");
    this.timeoutId = setTimeout(() => {
      container.classList.add("hide");
    }, 400);
  }

  click = () => {
    const img = document.querySelector(".mode__button__image");
    this.button.classList.add("clicked");
    this.sign *= -1;
    const [src, changeTheme] = this.phaseMap.get(this.sign);
    changeTheme();
    setTimeout(() => {
      img.src = src;
      this.button.classList.remove("clicked");
    }, 400);
  };
}

export default Button;
