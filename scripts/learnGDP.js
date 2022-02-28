let arrayGDP = [["Country", "Per Capita (PPP)"]];

async function fetchGDP() {
  try {
    const response = await fetch("https://chart-r.herokuapp.com/countriesData");
    const data = await response.json();
    allCountries = data;
    parseGDP(allCountries);
    drawGDPMap();
  } catch (err) {
    alert("Connection timed out. Please refresh the page!");
  }
}

function parseGDP(arr) {
  arr.reduce((arrayGDP, elem) => {
    arrayGDP.push([elem.id, elem["Per Capita (PPP)"]]);
    return arrayGDP;
  }, arrayGDP);
}

google.charts.load("current", {
  packages: ["geochart"],
  mapsApiKey: "AIzaSyCFI15YTgkjpnyxsiPzvteXXWn3Gge4G4s",
});

function drawGDPMap() {
  var data = google.visualization.arrayToDataTable(arrayGDP);

  var options = {
    region: "150",
    colorAxis: {
      colors: ["#DF2935", "#E63946", "#F9DC5C", "#8AEA92", "#3F784C"],
      maxValue: 65000,
    },
    legend: "none",
    width: width,
    backgroundColor: {
      stroke: "black",
      strokeWidth: 5,
    },
  };

  var chart = new google.visualization.GeoChart(
    document.getElementById("learnGDP")
  );

  chart.draw(data, options);
}
