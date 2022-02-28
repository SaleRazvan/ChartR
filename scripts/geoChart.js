let drawCityArray = [["City", "GMP", "Population"]];
let width = window.innerWidth;

if (width > 767) width = width * 0.45;
else width = width * 0.8;
let point = width * 0.018;
let minPoint = width * 0.006;

async function fetchAll() {
  try {
    const response = await fetch("https://chart-r.herokuapp.com/citiesData");
    const data = await response.json();
    allCities = data;
    parseCities(allCities);
    drawMarkersMap();
  } catch (err) {
    alert("Connection timed out. Please refresh the page!");
  }
}

function parseCities(arr) {
  arr.reduce((drawCityArray, elem) => {
    drawCityArray.push(Object.values(elem));
    return drawCityArray;
  }, drawCityArray);
}

window.addEventListener("DOMContentLoaded", () => {
  fetchAll();
});

google.charts.load("current", {
  packages: ["geochart"],
  mapsApiKey: "AIzaSyCFI15YTgkjpnyxsiPzvteXXWn3Gge4G4s",
});

function drawMarkersMap() {
  var data = google.visualization.arrayToDataTable(drawCityArray);

  var options = {
    sizeAxis: {
      minSize: minPoint,
      maxSize: point,
    },
    region: "150",
    displayMode: "markers",
    colorAxis: {
      colors: ["royalblue", "crimson"],
      maxValue: 300,
    },
    width: width,
    backgroundColor: {
      stroke: "black",
      strokeWidth: 5,
    },
  };

  var chart = new google.visualization.GeoChart(
    document.getElementById("citiesDiv")
  );

  chart.draw(data, options);
}
