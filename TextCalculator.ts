function Calculate() {

  try {
    var input = document.getElementById("valueInput") as HTMLInputElement | null;
    var expr = input?.value;
    console.log(expr)
   
    if (expr) {
      var result = calculateExpression(expr);
      if (result) {
        var resultText = document.getElementById("resultText");
        (resultText as HTMLInputElement).value = result;
      }
    }
  }
  catch (error) {
    console.error(error)
  }
}

function calculateExpression(string: string): string | null {
  // Equation parsed into an array.
  let parsedEquations = string.match(/([0-9]+)|\+|-|\*|\//g);

  if (!parsedEquations) return null;
  else {
    let index = 0;
    let calcResult;
    while (index++ < parsedEquations.length - 1) {
      if (
        parsedEquations[index - 1] && parsedEquations[index + 1] &&
        (isNaN(Number(parsedEquations[index - 1])) || isNaN(Number(parsedEquations[index + 1])))
      ) return null;

      switch (parsedEquations[index]) { // perform the calculation
        case "*":
          calcResult =
            parseFloat(parsedEquations[index - 1]) *
            parseFloat(parsedEquations[index + 1]);
          break;
        case "/":
          calcResult =
            parseFloat(parsedEquations[index - 1]) /
            parseFloat(parsedEquations[index + 1]);
          break;
        case "+":
          calcResult =
            parseFloat(parsedEquations[index - 1]) +
            parseFloat(parsedEquations[index + 1]);
          break;
        case "-":
          calcResult =
            parseFloat(parsedEquations[index - 1]) -
            parseFloat(parsedEquations[index + 1]);
          break;
      }
      parsedEquations = removeRemainingItems(
        index,
        parsedEquations,
        calcResult
      );
      index--;
    }
    return parsedEquations[0];
  }
};

function removeRemainingItems(
  index: number,
  tempArr: any[],
  calcResult: number | undefined
) {
  let remainingItemsRemovedArr = [];
  let k = 0;
  while (k <= tempArr.length) {
    if (k === index - 1) remainingItemsRemovedArr.push(calcResult);
    else if (k !== index && k !== index + 1)
      remainingItemsRemovedArr.push(tempArr[k]);
    k++;
  }
  return remainingItemsRemovedArr;
};

export default Calculate;