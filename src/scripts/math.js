import { formatTimeWithoutMinutes, timeToDate } from "./utils.js";

export function calcularMediaTempos(arrayTempos) {
    if (arrayTempos.length < 5) {
      return "O array deve conter pelo menos 5 tempos.";
    }

    arrayTempos = arrayTempos.slice(-5);
  
    // Ordena o array em ordem crescente
    arrayTempos.sort(function (a, b) {
      return a - b;
    });
  
    // Remove o melhor e o pior tempo
    arrayTempos = arrayTempos.slice(1, -1);
    
    // Calcula a média dos tempos restantes
    var soma = arrayTempos.reduce(function (total, tempo) {
        const formattedTime = formatTimeWithoutMinutes(tempo)
        const timeInDate = timeToDate(formattedTime)
      return total + timeInDate;
    }, 0);

    var media = soma / arrayTempos.length;
  
    return media;
  }