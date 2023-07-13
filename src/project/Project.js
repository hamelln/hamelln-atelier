import addKeyboardController from "../utils/addKeyboardController.js";
import addClickAndEnterHandler from "../utils/addClickAndEnterHandler.js";
import { addFocus, addFocusHandlers } from "../utils/focus.js";
import { play, stop } from "../utils/sound.js";
import Selection from "./Selection.js";
import Spec from "./Spec.js";
import Loading from "./Loading.js";

export default function Project({
  title,
  siteUrl,
  codeUrl,
  backgroundImage,
  bgmUrl,
  spec,
  feature,
}) {
  const bgm = document.getElementById("bgm");

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
    const openLinkAndSaveFocus = (url) => {
      saveFocusedElement(content);
      window.open(url, "_blank");
    };

    const li = document.createElement("li");
    li.classList.add("project-box__info__item");
    li.setAttribute("data-focus-name", content);

    return (url) => {
      const anchor = document.createElement("a");
      anchor.textContent = content;
      addClickAndEnterHandler(li)(openLinkAndSaveFocus, url);
      li.appendChild(anchor);
      return li;
    };
  };

  const makeItem = (content) => {
    const li = document.createElement("li");
    li.classList.add("project-box__info__item");
    li.setAttribute("data-focus-name", content);
    li.textContent = content;
    return li;
  };

  const moveTo = (element) => {
    return (callback, ...args) => {
      addClickAndEnterHandler(element)(callback, ...args);
    };
  };

  const quitProject = () => {
    Loading("Thank you!");
    setTimeout(() => {
      Selection(title);
      stop(bgm);
    }, 1000);
  };

  const makeInfo = () => {
    const infoElem = document.createElement("ul");
    infoElem.classList.add("project-box__info");
    if (siteUrl) {
      const homepageLink = makeLinkItem("homepage")(siteUrl);
      addFocusHandlers(homepageLink);
      infoElem.appendChild(homepageLink);
    }
    if (codeUrl) {
      const codeLink = makeLinkItem("code")(codeUrl);
      addFocusHandlers(codeLink);
      infoElem.appendChild(codeLink);
    }
    const specElem = makeItem("spec");
    const featureElem = makeItem("feature");
    const exitElem = makeItem("exit");
    addFocusHandlers(specElem);
    addFocusHandlers(featureElem);
    addFocusHandlers(exitElem);
    moveTo(specElem)(Spec, spec, render);
    moveTo(featureElem)(() => {});
    moveTo(exitElem)(quitProject);
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

  const saveFocusedElement = (name) => {
    localStorage.setItem("lastFocusedElement", name);
  };

  const restoreFocus = () => {
    const lastFocusedName = localStorage.getItem("lastFocusedElement");
    if (lastFocusedName) {
      const elem = document.querySelector(
        `[data-focus-name="${lastFocusedName}"]`
      );
      if (elem) {
        addFocus(elem);
        localStorage.removeItem("lastFocusedElement");
      }
    }
  };

  const render = () => {
    const elem = document.querySelector(".project-content");
    elem.innerHTML = "";
    const [box, img] = makeContent();
    elem.appendChild(box);
    elem.appendChild(img);
    addKeyboardController();
    focus();
    play(bgm);
  };

  const focus = () => {
    const firstItem = document.querySelector(".project-box__info").firstChild;
    addFocus(firstItem);
  };

  window.addEventListener("focus", restoreFocus);

  render();
}
