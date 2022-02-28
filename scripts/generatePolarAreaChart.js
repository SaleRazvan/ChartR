function generatePolarAreaChart() {
  let labels = [];
  let sortedANS = allANS.sort(function (a, b) {
    return a - b;
  });
  let highestANS = sortedANS.slice(sortedANS.length - 5, sortedANS.length);
  for (i = 0; i < allCountry.length; i++)
    for (j = 0; j < highestANS.length; j++)
      if (allCountry[i]["Average Net Salary"] === highestANS[j])
        labels[j] = allCountry[i]["id"];

  if (typeof PolarChart !== "undefined") PolarChart.destroy();

  const data = {
    labels: labels,
    datasets: [
      {
        data: highestANS,
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(255, 159, 64)",
          "rgba(255, 205, 86)",
          "rgba(75, 192, 192)",
          "rgba(65, 105, 225)",
        ],
        borderColor: [
          "rgb(0,0,0,0.5)",
          "rgb(0,0,0,0.5)",
          "rgb(0,0,0,0.5)",
          "rgb(0,0,0,0.5)",
          "rgb(0,0,0,0.5)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const config = {
    type: "polarArea",
    data: data,
    options: {},
  };

  PolarChart = new Chart(polarAreaChart, config);
}
