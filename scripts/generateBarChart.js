function generateBarChart() {
  let labels = [];
  let sortedGDP = allGDP.sort(function (a, b) {
    return a - b;
  });
  let highestGDPs = sortedGDP.slice(sortedGDP.length - 5, sortedGDP.length);
  for (i = 0; i < allCountry.length; i++)
    for (j = 0; j < highestGDPs.length; j++)
      if (allCountry[i]["GDP (PPP)"] === highestGDPs[j])
        labels[j] = allCountry[i]["id"];

  if (typeof BarChart !== "undefined") BarChart.destroy();

  const data = {
    labels: labels,
    datasets: [
      {
        label: "GDP (PPP - Trillion $)",
        data: highestGDPs,
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(255, 159, 64)",
          "rgba(255, 205, 86)",
          "rgba(75, 192, 192)",
          "rgba(65, 105, 225)",
        ],
        borderColor: [
          "rgb(0,0,0)",
          "rgb(0,0,0)",
          "rgb(0,0,0)",
          "rgb(0,0,0)",
          "rgb(0,0,0)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    },
  };

  BarChart = new Chart(barChart, config);
}
