let emExecucao = false;
let decimos = 0;
let segundos = 0;
let minutos = 0;
let intervalo;
const tempoElemento = document.querySelector("#tempo");

document.addEventListener("keydown", function (event) {
  if (event.key === " ") {
    if (emExecucao == true) {
      pararCronometro();
    } else {
      iniciarCronometro();
    }
  }
});

function formatarTempo() {
  return `${minutos.toString().padStart(2, "0")}:${segundos
    .toString()
    .padStart(2, "0")}.${decimos.toString().padStart(2, "0")}`;
}

function iniciarCronometro() {
  if (!emExecucao) {
    if (minutos !== 0 || segundos !== 0 || decimos !== 0) {
      resetarCronometro();
    }
    emExecucao = true;
    intervalo = setInterval(function () {
      decimos++;
      if (decimos === 100) {
        decimos = 0;
        segundos++;
        if (segundos === 60) {
          segundos = 0;
          minutos++;
        }
      }
      tempoElemento.textContent = formatarTempo();
    }, 10);
  }
}

function pararCronometro() {
  if (emExecucao) {
    emExecucao = false;
    clearInterval(intervalo);
  }
}

function resetarCronometro() {
  emExecucao = false;
  clearInterval(intervalo);
  decimos = 0;
  segundos = 0;
  minutos = 0;
  tempoElemento.textContent = "00:00.00";
}

/*
let decimos = 0;
let segundos = 0;
let minutos = 0;
let intervalo;
let emExecucao = false;

const tempoElemento = document.getElementById("tempo");
const iniciarBotao = document.getElementById("iniciar");
const pararBotao = document.getElementById("parar");
const resetarBotao = document.getElementById("resetar");

function formatarTempo() {
  return `${minutos.toString().padStart(2, "0")}:${segundos
    .toString()
    .padStart(2, "0")}.${decimos.toString().padStart(2, "0")}`;
}

function iniciarCronometro() {
  if (!emExecucao) {
    if (minutos === 0 && segundos === 0 && decimos === 0) {
      resetarCronometro();
    }
    emExecucao = true;
    intervalo = setInterval(function () {
      decimos++;
      if (decimos === 100) {
        decimos = 0;
        segundos++;
        if (segundos === 60) {
          segundos = 0;
          minutos++;
        }
      }
      tempoElemento.textContent = formatarTempo();
    }, 10);
  }
}

function pararCronometro() {
  if (emExecucao) {
    emExecucao = false;
    clearInterval(intervalo);
  }
}

function resetarCronometro() {
  emExecucao = false;
  clearInterval(intervalo);
  decimos = 0;
  segundos = 0;
  minutos = 0;
  tempoElemento.textContent = "00:00.00";
}

function alternarCronometro() {
  if (emExecucao) {
    pararCronometro();
  } else {
    iniciarCronometro();
  }
}

document.addEventListener("keydown", function (event) {
  if (event.key === " ") {
    alternarCronometro();
  }
});

iniciarBotao.addEventListener("click", alternarCronometro);
pararBotao.addEventListener("click", pararCronometro);
resetarBotao.addEventListener("click", resetarCronometro);
*/