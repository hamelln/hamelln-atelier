import createElement from "../handlers/element-creater.js";
import { addFocus, removeFocus } from "../handlers/focus-handler.js";

class Dropdown {
  constructor(element) {
    this.element = element;
    this.dropdownMenu = this.create();
    this.init();
  }

  init() {
    this.element.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggle();
    });

    this.element.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.stopPropagation();
        this.toggle();
      }
    });

    this.element.addEventListener("mouseleave", () => {
      this.hasDropdown() && this.remove();
    });

    window.addEventListener("click", () => {
      this.hasDropdown() && this.remove();
    });

    window.addEventListener("keydown", ({ key }) => {
      const activeElement = document.activeElement;
      const isFocusInDropdown =
        activeElement.classList.contains("dropdown-item");

      if (key === "Escape" && this.hasDropdown()) {
        removeFocus(activeElement);
        this.remove();
        addFocus(this.element);
      }
      if (!isFocusInDropdown && this.hasDropdown()) {
        this.remove();
      }
    });
  }

  create() {
    const ul = createElement("ul", {
      class: "dropdown-list",
    });

    const items = [
      { href: "https://blog.cinntiq.synology.me", text: "Blog" },
      { href: "https://github.com/hamelln", text: "GitHub" },
      {
        href: "https://www.linkedin.com/in/%ED%83%9C%ED%98%84-%EC%9D%B4-531077273",
        text: "Linkedin",
      },
      { href: "mailto:thlee.js@gmail.com", text: "Email" },
    ];

    items.map((item) => {
      const li = createElement("li", {
        class: "dropdown-item focusable",
        tabIndex: 0,
      });

      const a = createElement("a", {
        href: item.href,
        target: "_blank",
        textContent: item.text,
      });
      li.appendChild(a);
      ul.appendChild(li);
    });

    return ul;
  }

  hasDropdown() {
    return this.element.contains(this.dropdownMenu);
  }

  toggle() {
    this.hasDropdown() ? this.remove() : this.render();
  }

  render() {
    this.element.appendChild(this.dropdownMenu);
  }

  remove() {
    this.element.removeChild(this.dropdownMenu);
  }
}

export default Dropdown;
