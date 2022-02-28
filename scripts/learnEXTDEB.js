let arrayExtDebt = [["Country", "External Debt"]];

async function fetchExtDebt() {
  try {
    const response = await fetch("https://chart-r.herokuapp.com/countriesData");
    const data = await response.json();
    allCountries = data;
    parseExtDebt(allCountries);
    drawExtDebtMap();
  } catch (err) {
    alert("Connection timed out. Please refresh the page!");
  }
}

function parseExtDebt(arr) {
  arr.reduce((arrayExtDebt, elem) => {
    arrayExtDebt.push([elem.id, elem["External Debt"]]);
    return arrayExtDebt;
  }, arrayExtDebt);
}

google.charts.load("current", {
  packages: ["geochart"],
  mapsApiKey: "AIzaSyCFI15YTgkjpnyxsiPzvteXXWn3Gge4G4s",
});

function drawExtDebtMap() {
  var data = google.visualization.arrayToDataTable(arrayExtDebt);

  var options = {
    region: "150",
    colorAxis: {
      colors: ["#8AEA92", "#3F784C", "#F9DC5C", "#DF2935", "#E63946"],
      maxValue: 4,
    },
    legend: "none",
    width: width,
    backgroundColor: {
      stroke: "black",
      strokeWidth: 5,
    },
  };

  var chart = new google.visualization.GeoChart(
    document.getElementById("learnEXTDEB")
  );

  chart.draw(data, options);
}
