import { generateNewScramble } from "./scrambles.js";
import { dateToTime, formatTimeWithoutMinutes, objectToArray } from "./utils.js";
import { calculateAo5, calculateAo12, totalOfSolves, getBestSolve } from './math.js'

let inExecution = false;
let tenths = 0;
let seconds = 0;
let minutes = 0;
let interval;
let solvedScramble;

let timeRecords = [];

const elementTime = document.querySelector("#tempo");
solvedScramble = generateNewScramble();

let timeoutId;
let spacePressed = false;

function handleKeyDown(event) {
  if (event.code === "Space") {
    if (!spacePressed && !inExecution) {
      spacePressed = true;
      console.log(spacePressed);
      timeoutId = setTimeout(() => {
        if (spacePressed) {
          document.addEventListener("keyup", handleKeyUp);
        }
      }, 1000);
    } else if (inExecution) {
      stopTimer();
    }
  }
}
 
function handleKeyUp(event) {
  console.log('sortou');
  if (event.code === "Space") {
    if (spacePressed) {
      spacePressed = false;
      startTimer();
      clearTimeout(timeoutId);
    }
  }
}

document.addEventListener("keydown", handleKeyDown);

function formatTime() {
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}.${tenths.toString().padStart(2, "0")}`;
}

function startTimer() {
  if (!inExecution) {
    if (minutes !== 0 || seconds !== 0 || tenths !== 0) {
      resetTimer();
    }
    inExecution = true;
    interval = setInterval(function () {
      tenths++;
      if (tenths === 100) {
        tenths = 0;
        seconds++;
        if (seconds === 60) {
          seconds = 0;
          minutes++;
        }
      }
      elementTime.textContent = formatTime();
    }, 10);
  }
}

function stopTimer() {
  if (inExecution) {
    inExecution = false;
    clearInterval(interval);

    const currentTime = formatTime();
    if (currentTime !== "00:00.00") {
      const timeRecord = {
        time: currentTime,
        scramble: solvedScramble,
      };

      timeRecords.push(timeRecord);

      localStorage.setItem("times", JSON.stringify(timeRecords));
      populateTableFromLocalStorage();
    }
  }
}

function resetTimer() {
  inExecution = false;
  clearInterval(interval);
  tenths = 0;
  seconds = 0;
  minutes = 0;
  elementTime.textContent = "00:00.00";
}

function populateTableFromLocalStorage() {
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
      adicionarDivComDado(formatTimeWithoutMinutes(record.time), table)
    });
  }

}

function adicionarDivComDado(dado, table) {
  const par = document.createElement("p")
  par.classList.add('list')
  par.textContent = dado;

  table.appendChild(par)
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