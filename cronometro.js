import { generateNewScramble } from './scrambles.js'

let inExecution = false;
let tenths = 0;
let seconds = 0;
let minutes = 0;
let interval;
let solvedScramble;

let timeRecords = [];

const elementTime = document.querySelector("#tempo");
solvedScramble = generateNewScramble();
console.log(solvedScramble)


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

    // Verificar se o tempo é diferente de zero antes de salvar no localStorage
    const currentTime = formatTime();
    if (currentTime !== "00:00.00") {
      // Criar um registro de tempo com os tempos e o parâmetro "scramble"
      const timeRecord = {
        time: currentTime,
        scramble: solvedScramble,
      };

      // Adicionar o registro de tempo à matriz de registros
      timeRecords.push(timeRecord);

      // Converter a matriz de registros em uma string JSON e salvar no localStorage
      localStorage.setItem("times", JSON.stringify(timeRecords));
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
  // Obter os dados do localStorage
  const storedData = localStorage.getItem("times");

  if (storedData) {
    // Converter os dados JSON de volta para uma matriz de registros
    const timeRecords = JSON.parse(storedData);

    // Selecionar a tabela onde você deseja adicionar os registros
    const table = document.querySelector("#sua-tabela"); // Substitua "sua-tabela" pelo ID da sua tabela

    // Limpar a tabela antes de adicionar novos registros (se necessário)
    table.innerHTML = "";

    // Iterar pelos registros e adicionar cada um à tabela
    timeRecords.forEach((record, index) => {
      const row = table.insertRow();
      const cellIndex = row.insertCell(0);
      cellIndex.textContent = index + 1; // Número do registro
      const cellTime = row.insertCell(1);
      cellTime.textContent = record.time; // Tempo
      const cellScramble = row.insertCell(2);
      cellScramble.textContent = record.scramble; // Scramble
    });
  }
}

// Chame a função para preencher a tabela ao carregar a página
//populateTableFromLocalStorage();

