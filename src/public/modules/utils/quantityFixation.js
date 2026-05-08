export function fixingQ(getElements, formulas, quantities) {

  for (let i = 0; i < formulas.length;i++) {
    const formulaArray = formulas[i];
    const quantityArray = quantities[i];

    for (let j = 0; j < formulaArray.length;j++) {
      const formula = formulaArray[j];
      const quantityFormula = quantityArray[j];

      let coordinate = [];
      let firstOrSecond = 0;
      for (let k = 0; k < formula.length;k++) {
        const aLetter = formula[k];
        if (aLetter === '(') {
          coordinate.push(k);
          firstOrSecond++;
        };

        if (aLetter === ')') {
          coordinate.push(k);
        };
      };

      if (coordinate.length === 4 && firstOrSecond === 2) {
        coordinate = [[coordinate[0], coordinate[1]], [[coordinate[2], coordinate[3]]]];
      } else {
        coordinate = [coordinate];
      };

      for (let n = 0; n < coordinate.length;n++) {
        const coorArray = coordinate[n];
        const thePiece = formula.slice(coorArray[0] , coorArray[1] + 2);
        const thePieceArray = thePiece.split('');

        thePieceArray.forEach((le, index) => {
          thePieceArray[index] = isNaN(Number(le)) ? le : Number(le);
        });

        const elements = getElements(thePiece, thePieceArray);

        if (isNaN(Number(thePieceArray[thePieceArray.length - 1]))) {
          continue;
        } else {
          const number = Number(thePieceArray[thePieceArray.length - 1]);

          for (let k = 1; k < elements.length -1; k++) {
            const elementSymbol = elements[k].symbol;

            quantities[i][j][elementSymbol] = quantities[i][j][elementSymbol] * number;
          };
        };
      };
    };
  };
  
  return quantities;
};