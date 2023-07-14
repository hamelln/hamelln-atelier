import { addAttribute, makeElementWithClasses } from "../utils/controllDOM.js";

export default function Loading(text) {
  const makeContent = (className) => {
    const textElem = makeElementWithClasses("h2")(className);
    return addAttribute(textElem)({ text });
  };

  const render = () => {
    const parent = document.querySelector(".project-content");
    const loadingBox = makeElementWithClasses("div")(
      "project-content__loading"
    );
    const loadingContent = makeContent("project-content__loading__text");

    parent.innerHTML = "";
    loadingBox.appendChild(loadingContent);
    parent.appendChild(loadingBox);
  };

  render();
}
