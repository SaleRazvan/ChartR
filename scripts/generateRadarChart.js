//DECLARE ARRAYS
let allCountry = [],
  allHDI = [],
  allExports = [],
  allAGS = [],
  allGDP = [],
  allPerCapita = [],
  allGINI = [],
  allDebt = [],
  allANS = [];

async function fetchAll() {
  //FETCHING ALL DATA AND ADDING IT INTO THE ALLCOUNTRY ARRAY
  try {
    const response = await fetch("https://chart-r.herokuapp.com/countriesData");
    const data = await response.json();
    allCountry = data;
  } catch (err) {
    alert("Connection timed out. Please refresh the page!");
  }
}

async function fetchNow() {
  //USING THE ABOVE-FETCHED DATA TO EXTRACT ITS FIELDS INTO SPECIALIZED ARRAYS
  await fetchAll();
  for (let i = 0; i < allCountry.length; i++) {
    allHDI.push(allCountry[i]["HDI"]);
    allExports.push(allCountry[i]["Exports"]);
    allAGS.push(allCountry[i]["Average Gross Salary"]);
    allGDP.push(allCountry[i]["GDP (PPP)"]);
    allPerCapita.push(allCountry[i]["Per Capita (PPP)"]);
    allGINI.push(allCountry[i]["GINI"]);
    allDebt.push(allCountry[i]["External Debt"]);
    allANS.push(allCountry[i]["Average Net Salary"]);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  //POPULATE THE ARRAYS WHEN PAGE LOADS
  fetchNow();
  generateRadarChart();
});

function percentile(arr, n, pos) {
  //CALCULATE THE NORMAL PERCENTILE
  let count = 0;
  for (let j = 0; j < n; j++) {
    if (pos > arr[j]) {
      count++;
    }
  }
  let percent = (count * 100) / (n - 1);

  return percent;
}

let firstCountry = [],
  secondCountry = [];

async function fetchIt() {
  //FETCH DATA FOR THE TWO USER-SELECTED COUNTRIES AND POPULATING OTHER ARRAYS
  try {
    let select = document.getElementById("country1");
    const callCountry1 = select.options[select.selectedIndex].text;
    let response = await fetch(
      `https://chart-r.herokuapp.com/countriesData/${callCountry1}`
    );
    let data = await response.json();
    firstCountry = data;

    select = document.getElementById("country2");
    const callCountry2 = select.options[select.selectedIndex].text;
    response = await fetch(
      `https://chart-r.herokuapp.com/countriesData/${callCountry2}`
    );
    data = await response.json();
    secondCountry = data;
  } catch (err) {
    alert("Connection timed out. Please refresh the page!");
  }
}

async function generateRadarChart() {
  //MAIN FUNCTION WHERE WE DRAW THE CHARTS
  await fetchIt();

  if (typeof chart !== "undefined") chart.destroy();

  const data = {
    labels: [
      "HDI",
      "Exports",
      "Avg Gross Sal",
      "GDP",
      "GDP / Capita",
      "GINI",
      "Avg Net Sal",
      "Ext Debt",
    ],
    datasets: [
      {
        label: firstCountry["id"],
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.25)",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
        data: [
          percentile(allHDI, allHDI.length, firstCountry["HDI"]),
          percentile(allExports, allExports.length, firstCountry["Exports"]),
          percentile(
            allAGS,
            allAGS.length,
            firstCountry["Average Gross Salary"]
          ),
          percentile(allGDP, allGDP.length, firstCountry["GDP (PPP)"]),
          percentile(
            allPerCapita,
            allPerCapita.length,
            firstCountry["Per Capita (PPP)"]
          ),
          percentile(allGINI, allGINI.length, firstCountry["GINI"]),
          percentile(allANS, allANS.length, firstCountry["Average Net Salary"]),
          percentile(allDebt, allDebt.length, firstCountry["External Debt"]),
        ],
      },
      {
        label: secondCountry["id"],
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.25)",
        borderColor: "rgb(54, 162, 235)",
        pointBackgroundColor: "rgb(54, 162, 235)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(54, 162, 235)",
        data: [
          percentile(allHDI, allHDI.length, secondCountry["HDI"]),
          percentile(allExports, allExports.length, secondCountry["Exports"]),
          percentile(
            allAGS,
            allAGS.length,
            secondCountry["Average Gross Salary"]
          ),
          percentile(allGDP, allGDP.length, secondCountry["GDP (PPP)"]),
          percentile(
            allPerCapita,
            allPerCapita.length,
            secondCountry["Per Capita (PPP)"]
          ),
          percentile(allGINI, allGINI.length, secondCountry["GINI"]),
          percentile(
            allANS,
            allANS.length,
            secondCountry["Average Net Salary"]
          ),
          percentile(allDebt, allDebt.length, secondCountry["External Debt"]),
        ],
      },
    ],
  };

  const config = {
    type: "radar",
    data: data,
    options: {
      scale: {
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 100,
          stepSize: 25,
        },
      },
    },
  };

  chart = new Chart(radarChart, config);
}
