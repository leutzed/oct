import { formatTimeWithoutMinutes } from "./utils.js";

const ctx = document.getElementById("chart");
let storedData = localStorage.getItem("times");
let timesArray = [];
let labelsArray = [];

// export function populateChart() {

  if (storedData) {
    const timeRecords = JSON.parse(storedData);
    
    timeRecords.forEach((record, index) => {
      let isso = formatTimeWithoutMinutes(record.time)
      
      timesArray.push(isso);
      labelsArray.push(index);
    });
  }
// }

let chartData = {
  type: "line",
  data: {
    labels: labelsArray,
    datasets: [
      {
        label: "Stats",
        data: timesArray,
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
}

new Chart(ctx, chartData);