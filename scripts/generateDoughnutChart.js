function generateDoughnutChart() {
  let labels = [];
  let sortedExports = allExports.sort(function (a, b) {
    return a - b;
  });
  let highestExports = sortedExports.slice(
    sortedExports.length - 5,
    sortedExports.length
  );
  for (i = 0; i < allCountry.length; i++)
    for (j = 0; j < highestExports.length; j++)
      if (allCountry[i]["Exports"] === highestExports[j])
        labels[j] = allCountry[i]["id"];

  if (typeof DoughnutChart !== "undefined") DoughnutChart.destroy();

  const data = {
    labels: labels,
    datasets: [
      {
        data: highestExports,
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(255, 159, 64)",
          "rgba(255, 205, 86)",
          "rgba(75, 192, 192)",
          "rgba(65, 105, 225)",
        ],
        borderColor: [
          "rgb(0,0,0,0.25)",
          "rgb(0,0,0,0.25)",
          "rgb(0,0,0,0.25)",
          "rgb(0,0,0,0.25)",
          "rgb(0,0,0,0.25)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const config = {
    type: "doughnut",
    data: data,
  };

  DoughnutChart = new Chart(doughnutChart, config);
}
