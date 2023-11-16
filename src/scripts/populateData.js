import { dateToTime, formatTimeWithoutMinutes, objectToArray } from "./utils.js";
import { calculateAo5, calculateAo12, totalOfSolves, getBestSolve } from './math.js'
// import { populateChart } from './stats.js'

document.addEventListener("click", openAlertRemoveTime);

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

    timeRecords.forEach((record, index) => {
      let avg5 = getAtLeast5Solves(index, timeRecords);
      // console.log(avg5);
      let thisAo5 = calculateAo5(avg5);
      addTableRecord(formatTimeWithoutMinutes(record.time), timesTable, index, thisAo5)
    });
  }
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
  populateAverage(avg5, ao5)

  const ao12 = document.createElement("td")
  ao12.textContent = '13.68'

  tr.appendChild(time)
  tr.appendChild(scramble)
  tr.appendChild(ao5)
  tr.appendChild(ao12)

  // console.log(table.rows.length);

  // if (table.rows.length > 0) {
  //   let trBefore = element.querySelector('#list-unique-time');
  //   console.log(trBefore)
  //   table.insertBefore(tr, trBefore);
  // }

  table.appendChild(tr)
}

function populateAverage(average, element) {
  let numberAverage = dateToTime(average)
  
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

function getAtLeast5Solves(index, array) {
  if (index < 4) {
    console.log("Não há registros suficientes antes do índice fornecido para criar um novo array com pelo menos 5 elementos.");
    return [];
  }
  console.log(array);
  const newArray = array.slice(index - 4, index + 1);
  console.log(newArray);
  return newArray;
}

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