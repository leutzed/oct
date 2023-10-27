import { dateToTime, formatTimeWithoutMinutes, objectToArray } from "./utils.js";
import { calculateAo5, calculateAo12, totalOfSolves, getBestSolve } from './math.js'
// import { populateChart } from './stats.js'

document.addEventListener("click", openAlertRemoveTime);

//TODO
function openAlertRemoveTime(event) {
  if (event.target.id == 'list-unique-time') {
    // Pega o elemento que acionou o evento de clique
    let listElement = event.target;

    let isUserRemovingThisTime = confirm(`Deseja remover o tempo ${listElement.textContent}?`);
    if (isUserRemovingThisTime) { 
      // Remove o elemento da lista
      listElement.remove();
      removeTimeFromLocalStorage(listElement.getAttribute('data-time'));
      populateTableFromLocalStorage();
      // populateChart();
    }
  }
}

function removeTimeFromLocalStorage(dateTimeId) {
  let timesArray = JSON.parse(localStorage.getItem("times"));
  timesArray.splice(dateTimeId, 1);
  localStorage.setItem("times", JSON.stringify(timesArray));
}

export function populateTableFromLocalStorage() {
  const storedData = localStorage.getItem("times");

  if (storedData) {
    const timeRecords = JSON.parse(storedData);
    
    const table = document.querySelector("#times");
    const ao5 = document.querySelector("#ao5");
    const ao12 = document.querySelector("#ao12");
    const total = document.querySelector("#total");
    const best = document.querySelector("#best");

    table.innerHTML = "";
    ao5.innerHTML = "";

    let timesArray = objectToArray(timeRecords);
    let averageOf5 = calculateAo5(timesArray);
    let averageOf12 = calculateAo12(timesArray);
    let numberOfSolves = totalOfSolves(timesArray)
    let bestSolve = getBestSolve(timesArray)

    populateAverage(averageOf5, ao5);
    populateAverage(averageOf12, ao12);
    populateNumberOfSolves(numberOfSolves, total);
    populateBestSolve(bestSolve, best)

    timeRecords.forEach((record, index) => {
      addDivWithData(formatTimeWithoutMinutes(record.time), table, index)
    });
  }
}

function addDivWithData(data, table, id) {
  const paragraph = document.createElement("p")
  paragraph.classList.add('list')
  paragraph.id = 'list-unique-time';
  paragraph.setAttribute('data-time', id);
  paragraph.textContent = data;

  table.appendChild(paragraph)
}

function populateAverage(average, element) {
  let stringAverage = dateToTime(average)
  let numberAverage = Number(stringAverage);

  if (isNaN(numberAverage)) {
    element.textContent = '---';
  } else {
    element.textContent = numberAverage.toFixed(2);
  }
}

function populateNumberOfSolves (string, element) {
  if (string) {
    element.textContent = string;
  } else {
    element.textContent = '---';
  }
}

function populateBestSolve (string, element) {
  let printBestTime = Number(dateToTime(string)); 

  if (isNaN(printBestTime)) {
    element.textContent = '---';
  } else {
    element.textContent = printBestTime;
  }
}