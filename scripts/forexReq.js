// set API key for the stocks API.
const API_KEY = "XaDgjz85YrsHihbcukvR";

const cmp1 = document.getElementById(`cmp1`);
const cmp2 = document.getElementById(`cmp2`);
const dummyLabel = new Array(300);
let country;
let compared1;
let compared2;
let lbl1 = "",
  lbl2 = "";
let data1;
let data2;
let currentData;
let high1 = new Array(300);
let high2 = new Array(300);
let currentHigh = [];
let myChart;
let currentValuesChart;
let min = [],
  max = [];

for (i = 0; i < 300; i++) {
  dummyLabel[i] = "";
}

// get the name of the stock you want to see details for

function getCMP() {
  compared1 = cmp1.value;
  compared2 = cmp2.value;
}

document.addEventListener("DOMContentLoaded", function () {
  plotCurrent();
  plot();
});

async function plotCurrent() {
  await fetch(
    `https://fcsapi.com/api-v3/forex/latest?id=629,659,645,9,661,704,707,68&access_key=${API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      currentData = data["response"];
    })
    .catch((err) => console.log(err));

  for (const [key, value] of Object.entries(currentData)) {
    currentHigh = [...currentHigh, parseFloat(value.h)];
    // currencies in order: DKK(danish krone), SEK(sweedish krona), BGN(bulgarian lev), CZK(czech krouna), HRK(croatian kuna), HUF(hungarian forint), PLN(polish zolty), RON(romanian leu)
  }
  drawPlot();
}

function drawPlot() {
  if (currentValuesChart != undefined) currentValuesChart.destroy();
  curChart = document.getElementById("currentCmpChart");
  currentValuesChart = new Chart(curChart, {
    type: "bar",
    data: {
      labels: ["DKK", "SEK", "BGN", "CZK", "HRK", "HUF", "PLN", "RON"],
      datasets: [
        {
          label: "Values in comparison to Euro",
          data: [
            currentHigh[0],
            currentHigh[1],
            currentHigh[2],
            currentHigh[3],
            currentHigh[4],
            currentHigh[5],
            currentHigh[6],
            currentHigh[7],
          ],
          borderWidth: 1,
          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(54, 162, 235, 0.7)",
            "rgba(255, 206, 86, 0.7)",
            "rgba(75, 192, 192, 0.7)",
            "rgba(153, 102, 255, 0.7)",
            "rgba(255, 159, 64, 0.7)",
            "rgba(255,243,194, 0.7)",
          ],
          borderColor: [
            "rgba(0,0,0, 0.75)",
            "rgba(0,0,0, 0.75)",
            "rgba(0,0,0, 0.75)",
            "rgba(0,0,0, 0.75)",
            "rgba(0,0,0, 0.75)",
            "rgba(0,0,0, 0.75)",
            "rgba(0,0,0, 0.75)",
            "rgba(0,0,0, 0.75)",
          ],
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 35,
        },
      },
    },
  });
}

function getLabels() {
  if (compared1 == "629") lbl1 = "Bulgarian Lev";
  else if (compared1 == "659") lbl1 = "Croatian Kuna";
  else if (compared1 == "645") lbl1 = "Czech Krouna";
  else if (compared1 == "9") lbl1 = "Danish Krone";
  else if (compared1 == "661") lbl1 = "Hungarian Forint";
  else if (compared1 == "704") lbl1 = "Polish Zolty";
  else if (compared1 == "707") lbl1 = "Romanian Leu";
  else if (compared1 == "68") lbl1 = "Sweedish Krona";

  if (compared2 == "629") lbl2 = "Bulgarian Lev";
  else if (compared2 == "659") lbl2 = "Croatian Kuna";
  else if (compared2 == "645") lbl2 = "Czech Krouna";
  else if (compared2 == "9") lbl2 = "Danish Krone";
  else if (compared2 == "661") lbl2 = "Hungarian Forint";
  else if (compared2 == "704") lbl2 = "Polish Zolty";
  else if (compared2 == "707") lbl2 = "Romanian Leu";
  else if (compared2 == "68") lbl2 = "Sweedish Krona";
}

async function getData() {
  getCMP();
  high1 = [];
  high2 = [];
  //set1
  if (compared1 != "") {
    await fetch(
      `https://fcsapi.com/api-v3/forex/history?id=${compared1}&period=month&access_key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        data1 = data["response"];
      })
      .catch((err) => console.log(err));

    // parse it in a format easy to use in chartJS
    // took the data from each candle and saved the high value in conversion_high
    for (const [key, value] of Object.entries(data1)) {
      high1 = [...high1, parseFloat(value.o)];
    }
  }

  //set2
  if (compared2 != "") {
    await fetch(
      `https://fcsapi.com/api-v3/forex/history?id=${compared2}&period=month&access_key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        data2 = data["response"];
      })
      .catch((err) => console.log(err));

    for (const [key, value] of Object.entries(data2)) {
      high2 = [...high2, parseFloat(value.h)];
    }
  }

  min = [...min, Math.min(...high1), Math.min(...high2)];
  max = [...max, Math.max(...high1), Math.max(...high2)];
  getLabels();
  plot();
}

function plot() {
  if (myChart != undefined) myChart.destroy();
  const ctx = document.getElementById("CmpChart");
  myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dummyLabel,
      datasets: [
        {
          label: lbl1,
          data: high1,
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
        {
          label: lbl2,
          data: high2,
          backgroundColor: ["rgba(54, 162, 235, 0.2)"],
          borderColor: ["rgba(54, 162, 235, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          min: Math.min(...min) - 0.5,
          max: Math.max(...max) + 0.5,
        },
      },
    },
  });
}

// limited by the ammount of requests/min the api allows (5 req/min)
// after those 5 are made you need to wait to make more
