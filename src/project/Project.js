export default function Project({
  title,
  siteUrl,
  codeUrl,
  backgroundImage,
  characterImage,
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

  const makeInfo = () => {
    let infoElem = document.createElement("ul");
    infoElem.classList.add("project-box__info");
    let html = "";
    if (siteUrl) {
      html += `<a href=${siteUrl} target="_blank"}><li class="project-box__info__item">homepage</li></a>`;
    }
    if (codeUrl) {
      html += `<a href=${codeUrl} target="_blank"}><li class="project-box__info__item">code</li></a>`;
    }
    html += `<li class="project-box__info__item">spec</li><li class="project-box__info__item">feature</li><li class="project-box__info__item">exit</li>`;
    infoElem.innerHTML = html;
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
  };

  render();
}
