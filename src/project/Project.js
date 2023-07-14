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
  getByQuery,
  makeElementWithClasses,
} from "../utils/controllDOM.js";

export default function Project({
  title,
  siteUrl,
  codeUrl,
  backgroundImage,
  bgmUrl,
  spec,
  feature,
}) {
  const bgm = getByQuery("#bgm");

  const addEventProjectItem = (select, text) => {
    const describe = getByQuery(".project__describe");
    const textMap = new Map([
      ["homepage", "홈페이지로 이동"],
      ["code", "GitHub으로 이동"],
      ["spec", "프로젝트 스펙을 확인"],
      ["feature", "진행중 겪은 이야기들"],
      ["exit", "화면을 종료합니다"],
    ]);

    const handleFocus = () => {
      describe.textContent = textMap.get(text);
    };

    const handleBlur = () => {
      describe.textContent = "";
    };

    addFocusHandler(select)(handleFocus);
    addBlurHandler(select)(handleBlur);
  };
  const makeBox = () => {
    return makeElementWithClasses("div")("project-box");
  };

  const makeImage = () => {
    const imgElem = makeElementWithClasses("img")("project__image");
    const alt = "project background image";
    addAttribute(imgElem)({ src: backgroundImage, alt });
    return imgElem;
  };

  const makeTitle = () => {
    let titleElem = makeElementWithClasses("h2")("project-box__title");
    addAttribute(titleElem)({ text: title });
    return titleElem;
  };

  const makeLinkItem = (content) => {
    const openLinkAndSaveFocus = (url) => {
      saveFocusedElement(content);
      window.open(url, "_blank");
    };

    const li = makeElementWithClasses("li")("project-box__info__item");
    addAttribute(li)({ dataName: content });

    return (url) => {
      const anchor = makeElementWithClasses("a");
      addAttribute(anchor)({ text: content });
      addClickAndEnterHandler(li)(openLinkAndSaveFocus, url);
      addEventProjectItem(li, content);
      li.appendChild(anchor);
      return li;
    };
  };

  const makeItem = (content) => {
    const li = makeElementWithClasses("li")("project-box__info__item");
    addAttribute(li)({ text: content, dataName: content });
    addEventProjectItem(li, content);
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
    const infoElem = makeElementWithClasses("ul")("project-box__info");
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
      const elem = getByQuery(`[data-focus-name="${lastFocusedName}"]`);
      if (elem) {
        addFocus(elem);
        localStorage.removeItem("lastFocusedElement");
      }
    }
  };

  const render = () => {
    const elem = getByQuery(".project-content");
    elem.innerHTML = "";
    const [box, img] = makeContent();
    elem.appendChild(box);
    elem.appendChild(img);
    addKeyboardController();
    focus();
    play(bgm);
  };

  const focus = () => {
    const firstItem = getByQuery(".project-box__info").firstChild;
    addFocus(firstItem);
  };

  window.addEventListener("focus", restoreFocus);

  render();
}
