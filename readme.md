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
- 엘리먼트 생성 API만으론 가독성 문제를 전부 해결할 수 없습니다. 편리하게 쓰려는 유틸 함수도 기능이 추가되면 냄새를 풍기게 됩니다.  
예를 들어 클릭 시 스크롤을 이동시키는 네비게이션 버튼을 구현한 navigateWithScroll 함수가 그랬습니다.
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
- 이벤트 등록을 처리하는 코드를 Controllers로, 그에 대한 연산을 처리하는 코드는 Handlers로 분리했습니다. 코드는 읽기 편해졌고 side effect 제어에도 도움이 됐습니다.

# Key Learnings & Insights

### 크로스 브라우징
> CSS, 기능 등 여러 방면에서 다양한 실행 환경에서 동일한 사용 경험을 제공하는 것이 중요하다고 체감했습니다.

### 이벤트 루프
> stack, task queue, microtask queue, requestAnimationFrame의 실행 순서에 대해서 다시금 되짚을 수 있었습니다.  
글로만 학습하고 상상한 것과 달리 task queue의 실행 타이머가 1프레임 이하라면 rAF보다 먼저 실행될 수도 있고, 나중일 수도 있다는 특징을 배웠습니다.

### 코드 가독성과 규칙
> 변수 네이밍, 기준에 따른 코드 분리 등으로 코드의 가독성을 높여야 유지보수에도 좋습니다.  
컴포넌트 수가 적은데도 JS로만 개발하니 1주 전에 작성한 코드조차 해석하는 데에 에너지가 소요됐습니다.  
따라서 자세하게 파악해야 할 로직은 내부적인 단계로 분리하는 게 좋다는 생각을 했습니다.

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
