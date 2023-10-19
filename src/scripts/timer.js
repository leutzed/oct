import { generateNewScramble } from "./scrambles.js";
import { formatTimeWithoutMinutes } from "./utils.js";
import { calcularMediaTempos } from './math.js'

let inExecution = false;
let tenths = 0;
let seconds = 0;
let minutes = 0;
let interval;
let solvedScramble;
let timesToCalculate;

let timeRecords = [];

const elementTime = document.querySelector("#tempo");
solvedScramble = generateNewScramble();

document.addEventListener("keydown", function (event) {
  if (event.key === " ") {
    if (inExecution == true) {
      stopTimer();
      solvedScramble = generateNewScramble();
    } else {
      startTimer();
    }
  }
});

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
    timesToCalculate = timeRecords;

    const table = document.querySelector("#times");

    table.innerHTML = "";

    timeRecords.forEach((record, index) => {
      adicionarDivComDado(formatTimeWithoutMinutes(record.time), table)

      let valores = [];

      // Itera sobre os registros e extrai a propriedade "valor"
      timesToCalculate.forEach(function (registro) {
        valores.push(record.time);
      });

      calcularMediaTempos(valores);
    });
  }

}

function adicionarDivComDado(dado, table) {
  const par = document.createElement("p")
  par.classList.add('list')
  par.textContent = dado;

  table.appendChild(par)
}