export function calcularMediaTempos(arrayTempos) {
    if (arrayTempos.length < 5) {
      return "O array deve conter pelo menos 5 tempos.";
    }

    arrayTempos = arrayTempos.slice(-5);
  
    // Ordena o array em ordem crescente
    arrayTempos.sort(function (a, b) {
      return a - b;
    });
    console.log(arrayTempos)
  
    // Remove o melhor e o pior tempo
    arrayTempos = arrayTempos.slice(1, -1);
    console.log(arrayTempos)
    
    // Calcula a média dos tempos restantes
    var soma = arrayTempos.reduce(function (total, tempo) {
      return total + tempo;
    }, 0);
  
    console.log(soma);
    var media = soma / arrayTempos.length;
    console.log(media);
  
    return media;
  }