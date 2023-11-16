import { dateToTime, formatTimeWithoutMinutes, objectToArray } from "./utils.js";
import { calculateAo5, calculateAo12, totalOfSolves, getBestSolve } from './math.js'
// import { populateChart } from './stats.js'

document.addEventListener("click", openAlertRemoveTime);

//TODO
function openAlertRemoveTime(event) {
  if (event.target.id == 'list-unique-time') {
    // Pega o elemento que acionou o evento de clique
    let listElement = event.target;

    console.log(listElement);

    getTimeFromLocalStorage(listElement.getAttribute('data-time'));

    let isUserRemovingThisTime = confirm(`${listElement.textContent} - [] \n Deseja remover o tempo ${listElement.textContent}?`);
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

function getTimeFromLocalStorage(dateTimeId) {
  let timesArray = JSON.parse(localStorage.getItem("times"));

  console.log(timesArray[dateTimeId]);
}

export function populateTableFromLocalStorage() {
  const storedData = localStorage.getItem("times");

  if (storedData) {
    const timeRecords = JSON.parse(storedData);

    const timesTable = document.querySelector("#tbody");
    const ao5 = document.querySelector("#ao5");
    const ao12 = document.querySelector("#ao12");
    const total = document.querySelector("#total");
    const best = document.querySelector("#best");

    timesTable.innerHTML = "";
    ao5.innerHTML = "";

    let timesArray = objectToArray(timeRecords);
    let averageOf5 = calculateAo5(timeRecords);
    let averageOf12 = calculateAo12(timeRecords);
    let numberOfSolves = totalOfSolves(timesArray)
    let bestSolve = getBestSolve(timesArray)

    populateAverage(averageOf5, ao5);
    populateAverage(averageOf12, ao12);
    populateNumberOfSolves(numberOfSolves, total);
    populateBestSolve(bestSolve, best)

    let valueOfAo5 = setAo5()

    timeRecords.forEach((record, index) => {
      console.log(record);
      addTableRecord(formatTimeWithoutMinutes(record.time), timesTable, index, valueOfAo5)
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

function addTableRecord(data, table, id, avg5) {
  const tr = document.createElement("tr")

  const time = document.createElement("td")
  time.setAttribute('data-time', id);
  time.textContent = data;
  time.id = 'list-unique-time';

  const scramble = document.createElement("td")
  scramble.textContent = "L' D F R' U' R2 F D2 L D' F U2 F2 R2 D2 F2 R2 L2 F' L2 D2"

  const ao5 = document.createElement("td")
  ao5.textContent = avg5

  const ao12 = document.createElement("td")
  ao12.textContent = '13.68'

  tr.appendChild(time)
  tr.appendChild(scramble)
  tr.appendChild(ao5)
  tr.appendChild(ao12)
  table.appendChild(tr)
}

function populateAverage(average, element) {
  console.log(average);
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

function getLast5Solves () {
  const storedData = localStorage.getItem("times");
  const timeRecords = JSON.parse(storedData);

  const length = timeRecords.length;
  const startIndex = length >= 5 ? length - 5 : 0; // Se houver menos de 5 elementos, comece do início

  const last5Solves = timeRecords.slice(startIndex, length);
  return last5Solves;
}

export function setAo5 () {
  const last5Solves = getLast5Solves();

  const avg = calculateAo5(last5Solves)

  return avg;
}