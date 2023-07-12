import { play } from "../utils/sound.js";
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

  const makeLink = (url, content) => {
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.target = "_blank";
    const li = document.createElement("li");
    li.classList.add("project-box__info__item");
    li.textContent = content;
    anchor.appendChild(li);
    return anchor;
  };

  const makeListItem = (content, callback) => {
    const elem = document.createElement("li");
    elem.classList.add("project-box__info__item");
    elem.textContent = content;
    elem.addEventListener("click", callback);
    return elem;
  };

  const makeInfo = () => {
    let infoElem = document.createElement("ul");
    infoElem.classList.add("project-box__info");
    if (siteUrl) {
      const anchor = makeLink(siteUrl, "homepage");
      infoElem.appendChild(anchor);
    }
    if (codeUrl) {
      const anchor = makeLink(codeUrl, "code");
      infoElem.appendChild(anchor);
    }
    const specElem = makeListItem("spec", () => {
      Spec(spec, render);
    });
    const featureElem = makeListItem("feature", () => {});
    const exitElem = makeListItem("exit", Selection);
    infoElem.appendChild(specElem);
    infoElem.appendChild(featureElem);
    infoElem.appendChild(exitElem);
    return infoElem;
  };

  const makeHTML = () => {
    const boxElem = makeBox();
    const titleElem = makeTitle();
    const infoElem = makeInfo();
    const imgElem = makeImage();
    boxElem.appendChild(titleElem);
    boxElem.appendChild(infoElem);
    return [boxElem, imgElem];
  };

  const render = () => {
    let elem = document.querySelector(".project-content");
    elem.innerHTML = "";
    const [box, img] = makeHTML();
    elem.appendChild(box);
    elem.appendChild(img);
    const bgm = document.getElementById("bgm");
    play(bgm);
  };

  render();
}
