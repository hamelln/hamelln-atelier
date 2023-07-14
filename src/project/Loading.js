import {
  addAttribute,
  getByQuery,
  makeElementWithClasses,
} from "../utils/controllDOM.js";

export default function Loading(loadingText) {
  const makeBox = () => {
    return makeElementWithClasses("div")("project-content__loading");
  };

  const makeText = () => {
    const textElem = makeElementWithClasses("h2")(
      "project-content__loading__text"
    );
    addAttribute(textElem)({ text: loadingText });
    return textElem;
  };

  const makeHTML = () => {
    const boxElem = makeBox();
    const textElem = makeText();
    boxElem.appendChild(textElem);
    return boxElem;
  };

  const render = () => {
    let elem = getByQuery(".project-content");
    const boxElem = makeHTML();
    elem.innerHTML = "";
    elem.appendChild(boxElem);
  };

  render();
}
