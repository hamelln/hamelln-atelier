"use strict";

import createElement from "../handlers/element-creater.js";

export default class Loading {
  constructor(textContent) {
    this.parent = document.querySelector(".project-content");
    this.loadingBox = createElement("div", {
      class: "project-content__loading",
    });
    this.loadingContent = createElement("h2", {
      class: "project-content__loading__text",
      textContent,
    });
    this.render();
  }

  render() {
    this.parent.innerHTML = "";
    this.loadingBox.appendChild(this.loadingContent);
    this.parent.appendChild(this.loadingBox);
  }
}
