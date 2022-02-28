function transitionToPage(href) {
  document.querySelector("body").style.opacity = 0;
  document.querySelector("body").style.transition = ".5s";
  setTimeout(function () {
    window.location.href = href;
  }, 500);
}

function markActive(current) {
  if (document.querySelector(".active"))
    document.querySelector(".active").classList.remove("active");
  document.querySelector(`.${current}`).classList.add("active");
}

function showMenu() {
  let menu = document.querySelector(".mobileFlex");
  let burger = document.querySelector(".burger");
  if (menu.style.visibility == "") {
    menu.style.backgroundColor = "rgba(0,0,0,1)";
    menu.style.transition = ".5s";
    menu.style.visibility = "visible";
    burger.style.transform = "scale(1.25)";
    burger.src = "imagini/burger.png";
  } else if (menu.style.visibility === "visible") {
    menu.style.backgroundColor = "rgba(0,0,0,0)";
    menu.style.transition = ".5s";
    menu.style.visibility = "";
    burger.style.transform = "scale(1)";
    burger.src = "imagini/burger2.png";
  }
}
