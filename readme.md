![header](https://capsule-render.vercel.app/api?type=rounded&color=timeGradient&text=Welcome%20to%20hamelln's%20GitHub%20👋&animation=twinkling&fontSize=40&fontAlignY=50&fontAlign=50&height=180)

![hamelln's GitHub stats](https://github-readme-stats.vercel.app/api?username=hamelln&include_all_commits=true&show_icons=true&theme=tokyonight)

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fhamelln&count_bg=%2335BE21&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hamelln&edge_flat=false)](https://hits.seeyoufarm.com)

# Why this project

**제 프로젝트를 모아놓은 사이트입니다. 고전 픽셀풍 사이트를 만들어보고 싶어서 제작했습니다.**

# ScreenShots

![hamelln vercel app_ (1)](https://github.com/hamelln/hamelln/assets/39308313/21733e65-f7b7-48fd-b8db-409be0edbc22)

# Live Demo

**[사이트로 이동](https://hamelln.vercel.app)**

# Skills & Tools

![canvas_architecture-231006_0221](https://github.com/hamelln/hamelln/assets/39308313/8b4aeffb-7945-4586-972f-a372f36445c4)

# Challenges & Solutions

### 크로스 브라우징

[문제]
- 배포를 하고 삼성 인터넷으로 확인한 결과 CSS가 다르게 적용되는 일이 있었습니다.

[접근]
- 여러 실행 환경에서 동일한 디자인 경험을 제공할 수 있는 방법을 찾아봤고, normalize.css를 적용했습니다.

[문제]
- Safari 환경에서 접속할 시 일부 엘리먼트 렌더링이 안 되는 현상이 있었습니다.

[접근]
- 문제를 분석해본 결과 Safari는 현재 import의 assert 문법을 지원하지 않아서 발생한 문제였고, 이를 async / await로 변경해서 해결했습니다.

### 이벤트 루프

[문제]
- 모드 버튼을 연속해서 누르면 애니메이션이 계속 가속된 적이 있습니다. 이는 의도한 바와 괴리가 컸습니다.

[접근]
- 애니메이션은 rAF로 동작하지만, 멈추고 재생하는 로직은 stack으로만 처리하는 까닭에 애니메이션을 정지하기도 전에 replay를 했습니다. 따라서 setTimeout(단, 타이머는 1프레임 이상이라는 조건)을 이용해 replay 로직을 stack에서 task queue로 옮겼고, 이를 통해 애니메이션 정지 - 애니메이션 재생 순서를 안정적으로 보장하도록 고쳤습니다.

### 코드 가독성과 문제

[문제]
- JS만으론 DOM 조작이 불편합니다. 엘리먼트를 만들고, 속성과 메소드를 일일이 지정하기 때문입니다. 비슷한 작업들을 반복하면 코드는 길어지고 개발 비용은 점점 커집니다.

[접근]
- 엘리먼트를 생성하는 API를 별도로 생성합니다. 이와 같은 방식은 코드 길이를 축소하고 가독성을 높입니다.
```
const createElement = (tagName, option) => {
  const element = document.createElement(tagName);
  for (const key in option) {
    const value = option[key];
    switch (key) {
      case "class":
        const classList = value.split(" ");
        classList.map((c) => element.classList.add(c));
        break;
      case "onClick":
        const [handleClick, ...onClickArgs] = value;
        element.addEventListener("click", (e) => {
          e.preventDefault();
          handleClick(...onClickArgs);
        });
        break;
...
```

[문제]
- 엘리먼트 생성 API만으론 가독성 문제를 전부 해결할 수 없습니다. 편리하게 쓰려는 유틸 함수도 기능이 추가되면 냄새를 풍기게 됩니다. 예를 들어 클릭 시 스크롤을 이동시키는 네비게이션 버튼을 구현한 navigateWithScroll 함수가 그랬습니다.
```
const navigateWithScroll = () => {
  const calcCenterPositionOfSection = (section) => {
    const windowHeight = window.innerHeight;
    const headerHeight = document.querySelector("header").offsetHeight;
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const position =
      sectionTop - (windowHeight - sectionHeight) / 2 - headerHeight / 2;
    return position;
  };
  
  const about = document.getElementById("about");
  const project = document.getElementById("project");
  const contact = document.getElementById("contact");
  const ABOUT_POSITION = calcCenterPositionOfSection(about);
  const PROJECT_POSITION = calcCenterPositionOfSection(project);
  const CONTACT_POSITION = calcCenterPositionOfSection(contact);
  
  const scrollToSection = (sectionId) => {
    switch (sectionId) {
      case "about":
        scrollTo(0, ABOUT_POSITION);
        break;
      case "project":
        scrollTo(0, PROJECT_POSITION);
        break;
      case "contact":
        scrollTo(0, CONTACT_POSITION);
        break;
      case "home":
        scrollTo(0, 0);
        break;
      default:
        break;
    }
  };

  const homeLogo = document.querySelector(".header__logo");
  const tabs = document.querySelectorAll(".header-nav-list__item");
  const [aboutLink, projectLink, contactLink] = tabs;
  const navToProject = document.querySelector(".about__nav");

  addEventForClickAndEnter(homeLogo)(scrollToSection, "home");
  addEventForClickAndEnter(aboutLink)(scrollToSection, "about");
  addEventForClickAndEnter(projectLink)(scrollToSection, "project");
  addEventForClickAndEnter(contactLink)(scrollToSection, "contact");
  addEventForClickAndEnter(navToProject)(scrollToSection, "project");
};
```
위 코드는 하나의 이벤트에 중복 실행을 합니다. 이벤트에 대한 등록과 그에 대한 연산을 같이 두기 때문에 코드 파악이 더 복잡해지기도 합니다.

[접근]
- 따라서 이벤트 등록을 처리하는 코드를 Controllers로, 그에 대한 연산을 처리하는 코드는 Handlers로 분리를 했습니다. 이를 통해 코드는 읽기 편해질 뿐더러, side effect도 관리하기 편해집니다.

# Reference  

  효과음 연구소(테마 변경음)  
  https://soundeffect-lab.info/

  눈누(PFStardust, Neo둥근고딕Pro)  
  https://noonnu.cc/font_page/393  
  https://noonnu.cc/font_page/

  魔王魂(프로젝트 타이틀 배경음)  
  https://maou.audio/

  pixabay(프로젝트 선택 효과음)  
  https://pixabay.com/sound-effects/

  icons8(이메일 아이콘)  
  https://icons8.com/

  ドット絵こんばーた(이미지 픽셀화)  
  https://app.monopro.org/pixel/

  unsplash(썸네일 이미지)  
  https://unsplash.com/
