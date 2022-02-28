let index = 0;

window.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".secondComparison").style.display = "none";
  document.querySelector(".secondComparison").style.opacity = 0;
});

function nextComparison() {
  if (index < 2) {
    index++;

    document.querySelector(".firstComparison").style.opacity = 0;
    document.querySelector(".firstComparison").style.transition = ".5s";
    setTimeout(function () {
      document.querySelector(".firstComparison").style.display = "none";
    }, 500);

    setTimeout(function () {
      document.querySelector(".secondComparison").style.display = "block";
      document.querySelector(".secondComparison").style.opacity = 1;
    }, 500);
  }
}

function prevComparison() {
  if (index > 0) {
    generateRadarChart();
    index--;

    document.querySelector(".secondComparison").style.opacity = 0;
    document.querySelector(".secondComparison").style.transition = ".5s";
    setTimeout(function () {
      document.querySelector(".secondComparison").style.display = "none";
    }, 500);

    setTimeout(function () {
      document.querySelector(".firstComparison").style.display = "block";
      document.querySelector(".firstComparison").style.opacity = 1;
    }, 500);
  }
}
