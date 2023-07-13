import addEventForClickAndEnter from "../utils/addClickAndEnterHandler.js";
import { addFocusAttribute } from "../utils/focus.js";
import Selection from "./Selection.js";
import Spec from "./Spec.js";

export default function Project({
  title,
  siteUrl,
  codeUrl,
  backgroundImage,
  bgmUrl,
  spec,
  feature,
}) {
  const makeBox = () => {
    const boxElem = document.createElement("div");
    boxElem.classList.add("project-box");
    return boxElem;
  };

  const makeImage = () => {
    const imgElem = document.createElement("img");
    imgElem.classList.add("project__image");
    imgElem.src = backgroundImage;
    imgElem.alt = ".project background image";
    return imgElem;
  };

  const makeTitle = () => {
    let titleElem = document.createElement("h2");
    titleElem.classList.add("project-box__title");
    titleElem.textContent = title;
    return titleElem;
  };

  const makeLinkItem = (content) => {
    const li = document.createElement("li");
    li.classList.add("project-box__info__item");
    li.textContent = content;
    return (url) => {
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.target = "_blank";
      anchor.appendChild(li);
      return anchor;
    };
  };

  const makeItem = (content) => {
    const elem = document.createElement("li");
    elem.classList.add("project-box__info__item");
    elem.textContent = content;
    return elem;
  };

  const moveTo = (element) => {
    return (callback, ...args) => {
      addEventForClickAndEnter(element)(callback, ...args);
    };
  };

  const makeInfo = () => {
    const infoElem = document.createElement("ul");
    infoElem.classList.add("project-box__info");
    if (siteUrl) {
      const homepageLink = makeLinkItem("homepage")(siteUrl);
      addFocusAttribute(homepageLink);
      infoElem.appendChild(homepageLink);
    }
    if (codeUrl) {
      const codeLink = makeLinkItem("code")(codeUrl);
      addFocusAttribute(codeLink);
      infoElem.appendChild(codeLink);
    }
    const specElem = makeItem("spec");
    const featureElem = makeItem("feature");
    const exitElem = makeItem("exit");
    addFocusAttribute(specElem);
    addFocusAttribute(featureElem);
    addFocusAttribute(exitElem);
    moveTo(specElem)(Spec, spec, render);
    moveTo(featureElem)(() => {});
    moveTo(exitElem)(Selection);
    infoElem.appendChild(specElem);
    infoElem.appendChild(featureElem);
    infoElem.appendChild(exitElem);
    return infoElem;
  };

  const makeContent = () => {
    const boxElem = makeBox();
    const titleElem = makeTitle();
    const infoElem = makeInfo();
    const imgElem = makeImage();
    boxElem.appendChild(titleElem);
    boxElem.appendChild(infoElem);
    return [boxElem, imgElem];
  };

  const render = () => {
    const elem = document.querySelector(".project-content");
    elem.innerHTML = "";
    const [box, img] = makeContent();
    elem.appendChild(box);
    elem.appendChild(img);
  };

  render();
}
