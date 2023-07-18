import addKeyboardController from "../utils/addKeyboardController.js";
import addClickAndEnterHandler from "../utils/addClickAndEnterHandler.js";
import {
  addBlurHandler,
  addFocus,
  addFocusHandler,
  addFocusHandlers,
} from "../utils/focus.js";
import { play, stop } from "../utils/sound.js";
import Spec from "./Spec.js";
import Loading from "./Loading.js";
import {
  addAttribute,
  makeElementWithClasses,
  makeImg,
} from "../utils/controllDOM.js";
import renderSelection from "./index.js";

const makeInfoItem = (content) => {
  const li = makeElementWithClasses("li")("project-box__info__item");
  return addAttribute(li)({ dataName: content, textContent: content });
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

const onClose = (title, bgm) => {
  Loading("Thank you!");
  setTimeout(() => {
    renderSelection(title);
    stop(bgm);
  }, 1000);
};

const directPageOnItemByClickAndEnter = (element, callback, ...args) => {
  addClickAndEnterHandler(element)(callback, ...args);
};

const findPrevFocusItem = (className, textContent) => {
  const items = Array.from(document.querySelectorAll(className));
  return items.find((item) => item.textContent.trim() === textContent);
};

const focusPreviousItem = (infoBox, className, textContent) => {
  const focusItem = className
    ? findPrevFocusItem(className, textContent)
    : infoBox.firstChild;
  addFocus(focusItem);
};

const createElements = (projectTitle, backgroundImage) => {
  const projectBox = makeElementWithClasses("div")("project-box");
  const projectTitleElement =
    makeElementWithClasses("h2")("project-box__title");
  projectTitleElement.textContent = projectTitle;
  const infoBox = makeElementWithClasses("ul")("project-box__info");
  const projectImage = makeImg("project__image")(
    backgroundImage,
    "project image"
  );

  return { projectBox, projectTitleElement, infoBox, projectImage };
};

const renderContent = (parent, elements) => {
  const { projectBox, projectTitleElement, infoBox, projectImage } = elements;
  parent.innerHTML = "";
  projectBox.appendChild(projectTitleElement);
  projectBox.appendChild(infoBox);
  parent.appendChild(projectBox);
  parent.appendChild(projectImage);
};

const createInfoItems = (siteUrl, codeUrl) => {
  const homepageItem = siteUrl && makeInfoLinkItem("homepage");
  const codeItem = codeUrl && makeInfoLinkItem("code");
  const specItem = makeInfoItem("spec");
  const featureItem = makeInfoItem("feature");
  const exitItem = makeInfoItem("exit");
  return { homepageItem, codeItem, specItem, featureItem, exitItem };
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

  const goSpecPage = () => {
    Spec(spec, render);
  };

  const displayDescriptionOfItem = (item) => {
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
    Object.values(infoItems).forEach(
      (item) => item && infoBox.appendChild(item)
    );
  };

  const applyEventHandlers = (infoItems) => {
    const { homepageItem, codeItem, specItem, featureItem, exitItem } =
      infoItems;

    if (homepageItem)
      directPageOnItemByClickAndEnter(homepageItem, openLink, siteUrl);
    if (codeItem) directPageOnItemByClickAndEnter(codeItem, openLink, codeUrl);
    directPageOnItemByClickAndEnter(specItem, goSpecPage);
    directPageOnItemByClickAndEnter(featureItem, () => {});
    directPageOnItemByClickAndEnter(exitItem, onClose, title, bgm);

    Object.values(infoItems).forEach((item) => {
      if (item) {
        displayDescriptionOfItem(item);
        addFocusHandlers(item);
      }
    });
  };

  const render = (className, textContent) => {
    const parent = document.querySelector(".project-content");
    const elements = createElements(title, backgroundImage);
    const infoItems = createInfoItems(siteUrl, codeUrl);
    parent.innerHTML = "";

    appendChildrenToInfoBox(elements.infoBox, infoItems);
    applyEventHandlers(infoItems);
    renderContent(parent, elements);
    addKeyboardController();
    focusPreviousItem(elements.infoBox, className, textContent);
    play(bgm);
  };

  render();
}
