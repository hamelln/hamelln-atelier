import addKeyboardController from "../utils/addKeyboardController.js";
import addClickAndEnterHandler from "../utils/addClickAndEnterHandler.js";
import { addBlurHandler, addFocus, addFocusHandler } from "../utils/focus.js";
import { play, stop } from "../utils/sound.js";
import Spec from "./Spec.js";
import Loading from "./Loading.js";
import createElement from "../utils/createElement.js";
import renderSelection from "./index.js";

const createInfoItem = (content) => {
  return createElement("li", {
    class: "project-box__info__item focusable",
    dataName: content,
    textContent: content,
    tabIndex: 0,
  });
};

const createInfoLinkItem = (content) => {
  const li = createInfoItem(content);
  const anchor = document.createElement("a");
  li.appendChild(anchor);
  return li;
};

const openLink = (url) => {
  window.open(url, "_blank");
};

const onClose = (title, bgm) => {
  Loading("Thank you!");
  setTimeout(() => {
    renderSelection(title);
    stop(bgm);
  }, 1000);
};

const findPrevFocusItem = (className, textContent) => {
  const items = Array.from(document.querySelectorAll(className));
  return items.find((item) => item.textContent.trim() === textContent);
};

const focusPrevItem = (infoBox, className, textContent) => {
  const focusItem = className
    ? findPrevFocusItem(className, textContent)
    : infoBox.firstChild;
  addFocus(focusItem);
};

const createInfoBox = (projectTitle, backgroundImage) => {
  const projectBox = createElement("div", { class: "project-box" });
  const projectTitleElement = createElement("h2", {
    class: "project-box__title",
    textContent: projectTitle,
  });
  const infoBox = createElement("ul", { class: "project-box__info" });
  const projectImage = createElement("img", {
    class: "project__image",
    src: backgroundImage,
    alt: "project image",
  });
  return { projectBox, projectTitleElement, infoBox, projectImage };
};

const createInfoItems = (siteUrl, codeUrl) => {
  const homepageItem = siteUrl && createInfoLinkItem("homepage");
  const codeItem = codeUrl && createInfoLinkItem("code");
  const specItem = createInfoItem("spec");
  const featureItem = createInfoItem("feature");
  const exitItem = createInfoItem("exit");
  return [homepageItem, codeItem, specItem, featureItem, exitItem];
};

const renderContent = (parent, elements) => {
  const { projectBox, projectTitleElement, infoBox, projectImage } = elements;
  parent.innerHTML = "";
  projectBox.appendChild(projectTitleElement);
  projectBox.appendChild(infoBox);
  parent.appendChild(projectBox);
  parent.appendChild(projectImage);
};

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
  const DESCRIPTION_MAP = new Map([
    ["homepage", "홈페이지로 이동"],
    ["code", "GitHub으로 이동"],
    ["spec", "프로젝트 스펙을 확인"],
    ["feature", "진행중 겪은 이야기들"],
    ["exit", "화면을 종료합니다"],
  ]);

  const displayDescOnItem = (item) => {
    if (!item) return;
    const describe = document.querySelector(".project__describe");
    const itemText = item.textContent.trim();

    const handleFocus = () => {
      describe.textContent = DESCRIPTION_MAP.get(itemText);
    };

    const handleBlur = () => {
      describe.textContent = "";
    };

    addFocusHandler(item)(handleFocus);
    addBlurHandler(item)(handleBlur);
  };

  const appendChildrenToInfoBox = (infoBox, infoItems) => {
    infoItems.map((item) => item && infoBox.appendChild(item));
  };

  const goSpecPage = () => {
    Spec(spec, render);
  };

  const applyEventHandlers = (infoItems) => {
    const [homepageItem, codeItem, specItem, featureItem, exitItem] = infoItems;
    if (homepageItem) addClickAndEnterHandler(homepageItem)(openLink, siteUrl);
    if (codeItem) addClickAndEnterHandler(codeItem)(openLink, codeUrl);
    addClickAndEnterHandler(specItem)(goSpecPage);
    addClickAndEnterHandler(featureItem)(() => {});
    addClickAndEnterHandler(exitItem)(onClose, title, bgm);
    Object.values(infoItems).forEach(displayDescOnItem);
  };

  const render = (className, textContent) => {
    const parent = document.querySelector(".project-content");
    const elements = createInfoBox(title, backgroundImage);
    const infoItems = createInfoItems(siteUrl, codeUrl);
    parent.innerHTML = "";

    appendChildrenToInfoBox(elements.infoBox, infoItems);
    applyEventHandlers(infoItems);
    renderContent(parent, elements);
    addKeyboardController();
    focusPrevItem(elements.infoBox, className, textContent);
    play(bgm);
  };

  render();
}
