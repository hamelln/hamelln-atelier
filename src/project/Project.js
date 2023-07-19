import addKeyboardController from "../utils/addKeyboardController.js";
import { addFocus } from "../utils/focus.js";
import { play, stop } from "../utils/sound.js";
import Spec from "./Spec.js";
import Loading from "./Loading.js";
import createElement from "../utils/createElement.js";
import renderSelection from "./index.js";

const createInfoBox = (projectTitle, backgroundImage, infoItems) => {
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
  infoItems.map((info) => info && infoBox.appendChild(info));
  return { projectBox, projectTitleElement, infoBox, projectImage };
};

const createInfoItems = (siteUrl, codeUrl, spec, title, render) => {
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

  const homepageItem =
    siteUrl && createInfoLinkItem("homepage", openLink, siteUrl);
  const codeItem = codeUrl && createInfoLinkItem("code", openLink, codeUrl);
  const specItem = createInfoItem("spec", Spec, spec, render);
  const featureItem = createInfoItem("feature", () => {});
  const exitItem = createInfoItem("exit", onClose, title, bgm);
  return [homepageItem, codeItem, specItem, featureItem, exitItem];
};

const createInfoItem = (content, callback, ...args) => {
  const DESCRIPTION_MAP = new Map([
    ["homepage", "홈페이지로 이동"],
    ["code", "GitHub으로 이동"],
    ["spec", "프로젝트 스펙을 확인"],
    ["feature", "진행중 겪은 이야기들"],
    ["exit", "화면을 종료합니다"],
  ]);
  const projectDescription = document.querySelector(".project__describe");
  const displayDescription = () => {
    projectDescription.textContent = DESCRIPTION_MAP.get(content);
  };
  const removeDescription = () => {
    projectDescription.textContent = "";
  };

  return createElement("li", {
    class: "project-box__info__item focusable",
    dataName: content,
    textContent: content,
    tabIndex: 0,
    onClick: [callback, ...args],
    onEnter: [callback, ...args],
    onFocus: [displayDescription],
    onBlur: [removeDescription],
  });
};

const createInfoLinkItem = (content, callback, ...args) => {
  const li = createInfoItem(content, callback, ...args);
  const anchor = document.createElement("a");
  li.appendChild(anchor);
  return li;
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
  const render = (className, textContent) => {
    const bgm = document.querySelector("#bgm");
    const parent = document.querySelector(".project-content");
    const infoItems = createInfoItems(siteUrl, codeUrl, spec, title, render);
    const elements = createInfoBox(title, backgroundImage, infoItems);
    parent.innerHTML = "";
    renderContent(parent, elements);
    play(bgm);
    focusPrevItem(elements.infoBox, className, textContent);
    addKeyboardController();
  };

  render();
}
