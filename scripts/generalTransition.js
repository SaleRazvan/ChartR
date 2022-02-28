let index = 0;

function next(current, next) {
  if (index < 5) {
    index++;

    document.querySelector(`.${current}`).style.opacity = 0;
    document.querySelector(`.${current}`).style.transition = ".5s";
    setTimeout(function () {
      document.querySelector(`.${current}`).style.display = "none";
    }, 500);

    setTimeout(function () {
      document.querySelector(`.${next}`).style.display = "flex";
      document.querySelector(`.${next}`).style.opacity = 1;
    }, 500);
  }
}

function prev(current, prev) {
  if (index > 0) {
    index--;

    document.querySelector(`.${current}`).style.opacity = 0;
    document.querySelector(`.${current}`).style.transition = ".5s";
    setTimeout(function () {
      document.querySelector(`.${current}`).style.display = "none";
    }, 500);

    setTimeout(function () {
      document.querySelector(`.${prev}`).style.display = "flex";
      document.querySelector(`.${prev}`).style.opacity = 1;
    }, 500);
  }
}
