let settingsBox = document.querySelector(".settings-box");
let aboutImg = document.getElementById("about-img");
let mainColor = localStorage.getItem("chosen_color");
let changedBackground = localStorage.getItem("background_status");
let backgroundOption = true;
let backgroundInterval;

if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);
  settingsBox.querySelectorAll(".colors-list li").forEach((el) => {
    el.classList.remove("active");
    if (mainColor === el.dataset.color) {
      el.classList.add("active");
      if (mainColor === "#ff9800") aboutImg.src = "imgs/about-1.jpg";
      if (mainColor === "#4dd0e1") aboutImg.src = "imgs/about-2.jpg";
      if (mainColor === "#9afa35") aboutImg.src = "imgs/about-3.jpg";
      if (mainColor === "#f44336") aboutImg.src = "imgs/about-4.jpg";
      if (mainColor === "#dc12ff") aboutImg.src = "imgs/about-5.jpg";
    }
  });
}

if (changedBackground !== null) {
  if (changedBackground === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  settingsBox.querySelectorAll(".random-back span").forEach((el) => {
    el.classList.remove("active");
    if (changedBackground === "true") {
      document.querySelector(".random-back .yes").classList.add("active");
    } else {
      document.querySelector(".random-back .no").classList.add("active");
    }
  });
}

document.querySelector(".settings-icon .fa-gear").onclick = function () {
  this.classList.toggle("fa-spin");
  settingsBox.classList.toggle("show");
};

const settingsColors = document.querySelectorAll(".colors-list li");
settingsColors.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("chosen_color", e.target.dataset.color);
    handleActive(e);
    if (li.dataset.color === "#ff9800") aboutImg.src = "imgs/about-1.jpg";
    if (li.dataset.color === "#4dd0e1") aboutImg.src = "imgs/about-2.jpg";
    if (li.dataset.color === "#9afa35") aboutImg.src = "imgs/about-3.jpg";
    if (li.dataset.color === "#f44336") aboutImg.src = "imgs/about-4.jpg";
    if (li.dataset.color === "#dc12ff") aboutImg.src = "imgs/about-5.jpg";
  });
});

const settingsBackground = document.querySelectorAll(".random-back span");
settingsBackground.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background_status", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_status", false);
    }
  });
});

// let landing = document.querySelector(".landing-page");
// let landingImgs = [];
// for (let i = 1; i <= 5; i++) {
//   landingImgs.push(`landing-${i}.jpg`);
// }
// setInterval(() => {
//   let landingRandom = Math.floor(Math.random() * landingImgs.length);
//   landing.style.backgroundImage = `url(imgs/${landingImgs[landingRandom]}`;
// }, 10000);

let landing = document.querySelector(".landing-page");
let i = 1;

function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      landing.style.backgroundImage = `url(imgs/landing-${i++}.jpg`;
      if (i === 6) i = 1;
    }, 10000);
  }
}
randomizeImgs();

let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
  let skillsTop = ourSkills.offsetTop;
  let skillsHeight = ourSkills.offsetHeight;
  let windowHeight = this.innerHeight;
  let windowScroll = this.scrollY;

  if (windowScroll > windowHeight + skillsHeight - skillsTop + 200) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

let gallery = document.querySelectorAll(".images-box img");

gallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);

    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    let popupImage = document.createElement("img");
    popupImage.src = img.src;
    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);

    if (img.alt !== null) {
      let imgHeading = document.createElement("h3");
      let headingText = document.createTextNode(img.alt);
      imgHeading.appendChild(headingText);
      popupBox.appendChild(imgHeading);
    }

    let close = document.createElement("span");
    let closeText = document.createTextNode("X");
    close.appendChild(closeText);
    close.className = "close";
    popupBox.appendChild(close);
  });
});

document.addEventListener("click", function (e) {
  if (e.target.className == "close") {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

scrollToSection(".nav-bullets .bullet");
scrollToSection(".header-area .links a");

function scrollToSection(getSections) {
  const sections = document.querySelectorAll(getSections);

  sections.forEach((section) => {
    section.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

function handleActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((el) => {
    el.classList.remove("active");
  });
  ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".option-box .bullets span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletsStauts = localStorage.getItem("bullets");
if (bulletsStauts !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletsStauts === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets", "none");
    }
  });
});

let headerArea = document.querySelector(".header-area");
let headerSpan = document.querySelectorAll(".option-box .position span");
let headerPosition = localStorage.getItem("header_status");
if (headerPosition !== null) {
  headerSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (headerPosition === "movable") {
    headerArea.classList.add("staticHead");
    document.querySelector(".position .no").classList.add("active");
  } else {
    headerArea.classList.remove("staticHead");
    document.querySelector(".position .yes").classList.add("active");
  }
}
headerSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);
    if (span.dataset.moving === "movable") {
      headerArea.classList.add("staticHead");
      localStorage.setItem("header_status", "movable");
    } else {
      headerArea.classList.remove("staticHead");
      localStorage.setItem("header_status", "fixed");
    }
  });
});

document.querySelector(".reset-settings").onclick = function () {
  localStorage.removeItem("bullets");
  localStorage.removeItem("chosen_color");
  localStorage.removeItem("background_status");
  localStorage.removeItem("header_status");
  window.location.reload();
};

let menuBtn = document.querySelector(".toggle-menu");
let menuLinks = document.querySelector(".links");

menuBtn.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("menu-active");
  menuLinks.classList.toggle("open");
};
menuLinks.onclick = function (e) {
  e.stopPropagation();
};

document.addEventListener("click", (e) => {
  if (e.target !== menuBtn && e.target !== menuLinks) {
    if (menuLinks.classList.contains("open")) {
      menuBtn.classList.toggle("menu-active");
      menuLinks.classList.toggle("open");
    }
  }
});
