import addKeyboardController from "../utils/addKeyboardController.js";
import addClickAndEnterHandler from "../utils/addClickAndEnterHandler.js";
import {
  addBlurHandler,
  addFocus,
  addFocusHandler,
  addFocusHandlers,
} from "../utils/focus.js";
import { play, stop } from "../utils/sound.js";
import Selection from "./Selection.js";
import Spec from "./Spec.js";
import Loading from "./Loading.js";
import {
  addAttribute,
  makeElementWithClasses,
  makeImg,
} from "../utils/controllDOM.js";
import { saveFocusedElement } from "../utils/storeFocus.js";

export default function Project({
  title,
  siteUrl,
  codeUrl,
  backgroundImage,
  bgmUrl,
  spec,
  feature,
}) {
  const bgm = document.querySelector("#bgm");

  const makeProjectTitle = (className) => {
    const projectTitle = makeElementWithClasses("h2")(className);
    return addAttribute(projectTitle)({ text: title });
  };

  const makeInfoItem = (content) => {
    const li = makeElementWithClasses("li")("project-box__info__item");
    return addAttribute(li)({ dataName: content, text: content });
  };

  const makeInfoLinkItem = (content) => {
    const li = makeInfoItem(content);
    const anchor = document.createElement("a");
    li.appendChild(anchor);
    return li;
  };

  const openLink = (url) => {
    window.open(url, "_blank");
  };

  const displayDescriptionOfItem = (item) => {
    const describe = document.querySelector(".project__describe");
    const itemText = item.textContent.trim();
    const descriptionMap = new Map([
      ["homepage", "홈페이지로 이동"],
      ["code", "GitHub으로 이동"],
      ["spec", "프로젝트 스펙을 확인"],
      ["feature", "진행중 겪은 이야기들"],
      ["exit", "화면을 종료합니다"],
    ]);

    const handleFocus = () => {
      describe.textContent = descriptionMap.get(itemText);
    };

    const handleBlur = () => {
      describe.textContent = "";
    };

    addFocusHandler(item)(handleFocus);
    addBlurHandler(item)(handleBlur);
  };

  const directPageOnItemByClickAndEnter = (element) => {
    return (callback, ...args) => {
      addClickAndEnterHandler(element)(callback, ...args);
    };
  };

  const focusFirstItemWhenRender = () => {
    const firstItemOfInfo =
      document.querySelector(".project-box__info").firstChild;
    addFocus(firstItemOfInfo);
  };

  const returnSelectionPage = () => {
    Loading("Thank you!");
    setTimeout(() => {
      Selection(title);
      stop(bgm);
    }, 1000);
  };

  const goSpecPage = () => {
    Spec(spec, render);
  };

  const render = () => {
    const parent = document.querySelector(".project-content");
    const projectBox = makeElementWithClasses("div")("project-box");
    const projectTitle = makeProjectTitle("project-box__title");
    const infoBox = makeElementWithClasses("ul")("project-box__info");
    const projectImage =
      makeImg("project__image")(backgroundImage)("project image");
    const homepageItem = makeInfoLinkItem("homepage");
    const codeItem = makeInfoLinkItem("code");
    const specItem = makeInfoItem("spec");
    const featureItem = makeInfoItem("feature");
    const exitItem = makeInfoItem("exit");
    parent.innerHTML = "";
    addFocusHandlers(homepageItem);
    addFocusHandlers(codeItem);
    addFocusHandlers(specItem);
    addFocusHandlers(featureItem);
    addFocusHandlers(exitItem);
    directPageOnItemByClickAndEnter(homepageItem)(openLink, siteUrl);
    directPageOnItemByClickAndEnter(codeItem)(openLink, codeUrl);
    directPageOnItemByClickAndEnter(specItem)(goSpecPage);
    directPageOnItemByClickAndEnter(featureItem)(() => {});
    directPageOnItemByClickAndEnter(exitItem)(returnSelectionPage);
    infoBox.appendChild(homepageItem);
    infoBox.appendChild(codeItem);
    infoBox.appendChild(specItem);
    infoBox.appendChild(featureItem);
    infoBox.appendChild(exitItem);
    displayDescriptionOfItem(homepageItem);
    displayDescriptionOfItem(codeItem);
    displayDescriptionOfItem(specItem);
    displayDescriptionOfItem(featureItem);
    displayDescriptionOfItem(exitItem);
    projectBox.appendChild(projectTitle);
    projectBox.appendChild(infoBox);
    parent.appendChild(projectBox);
    parent.appendChild(projectImage);
    addKeyboardController();
    focusFirstItemWhenRender();
    play(bgm);
  };
  render();
}
