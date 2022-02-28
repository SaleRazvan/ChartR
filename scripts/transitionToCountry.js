let index = 0;
let dummy = 0;
let countries = [];

async function fetchIt() {
  try {
    const response = await fetch("https://chart-r.herokuapp.com/countries");
    const data = await response.json();
    countries = data;
  } catch (err) {
    alert("Server connection failed");
  }
}

window.addEventListener("DOMContentLoaded", () => {
  fetchIt();
});

function nextCountry() {
  if (index < countries.length - 1) {
    index++;

    document.querySelector(".currentCountry").style.opacity = 0;
    document.querySelector(".currentCountry").style.transition = ".5s";
    setTimeout(function () {
      document.querySelector(".currentCountry").style.display = "none";
      let entries = Object.entries(countries[index]);
      let values = Object.values(countries[index]);
      document.querySelectorAll(".currentCountry h1")[0].innerHTML = values[2];
      document.querySelectorAll(".currentCountry img")[1].src = values[1];
      document.querySelectorAll(".currentCountry img")[2].src = values[3];
      for (let i = 4; i < entries.length; i++)
        document.querySelectorAll(".currentCountry h2")[
          i - 4
        ].innerHTML = `<b>${entries[i][0]}:</b> <i>${entries[i][1]}</i>`;
    }, 500);

    setTimeout(function () {
      document.querySelector(".currentCountry").style.display = "flex";
      document.querySelector(".currentCountry").style.opacity = 1;
    }, 500);
  }
}

function prevCountry() {
  if (index > 0) {
    index--;

    document.querySelector(".currentCountry").style.opacity = 0;
    document.querySelector(".currentCountry").style.transition = ".5s";
    setTimeout(function () {
      document.querySelector(".currentCountry").style.display = "none";
      let entries = Object.entries(countries[index]);
      let values = Object.values(countries[index]);
      document.querySelectorAll(".currentCountry h1")[0].innerHTML = values[2];
      document.querySelectorAll(".currentCountry img")[1].src = values[1];
      document.querySelectorAll(".currentCountry img")[2].src = values[3];
      for (let i = 4; i < entries.length; i++)
        document.querySelectorAll(".currentCountry h2")[
          i - 4
        ].innerHTML = `<b>${entries[i][0]}:</b> <i>${entries[i][1]}</i>`;
    }, 500);

    setTimeout(function () {
      document.querySelector(".currentCountry").style.display = "flex";
      document.querySelector(".currentCountry").style.opacity = 1;
    }, 500);
  }
}
