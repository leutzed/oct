import { formatTimeWithoutMinutes, timeToDate } from "./utils.js";

export function calculateAo5(arrayTempos) {
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

export function calculateAo12(arrayTempos) {
    if (arrayTempos.length < 12) {
        return "O array deve conter pelo menos 12 tempos.";
    }

    arrayTempos = arrayTempos.slice(-12);

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

export function totalOfSolves (arrayTimes) {
    return arrayTimes.length;
}

export function getBestSolve (arrayTimes) {
    arrayTimes.sort(function (a, b) {
        return a - b;
    });

    arrayTimes = arrayTimes.slice(-1);

    const formattedTime = formatTimeWithoutMinutes(arrayTimes[0])
    const timeInDate = timeToDate(formattedTime)

    return timeInDate
}