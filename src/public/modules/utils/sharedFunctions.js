////////////////////////////////////////////----1----////////////////////////////////////////////

export function findSimplifiedCharge(aproduct) {
  /*
  const aproduct = {
    name: 'dimagnesium disulfate',
    formula: 'Mg2(SO4)2',
    cid: 20158028,
    elements: [
      2,
      {symbol: 'Mg', charge: 2, coSymbol: 'M'},
      {symbol: 'SO4', charge: -2}
    ],
    quantities: {
      Mg: 2,
      SO4: [2, {
        S: 1,
        O: 4
      }]
    }
  };
  */
  if (aproduct.elements[0] === 1) {
    return aproduct;
  };

  const chargeArray = [Math.abs(aproduct.elements[1].charge), Math.abs(aproduct.elements[2].charge)]

  const oneToTen = Array.from({ length: 10 }, (_, i) => i + 1);

  const allCoffIntg = [];

  let currentCoff = [];
  for (let i = 0; i < chargeArray.length;i++) {
    const aCharge = chargeArray[i];

    for (let j = 0; j < oneToTen.length; j++) {
      const oneOfTen = oneToTen[j];

      if (Number.isInteger(aCharge / oneOfTen)) {
        currentCoff.push(oneOfTen);
      };
    };

    allCoffIntg.push(currentCoff);
    currentCoff = [];
  };

  const semiNums = [];
  for (let i = 0; i < allCoffIntg[0].length;i++) {
    const first = allCoffIntg[0][i];

    for (let j = 0; j < allCoffIntg[1].length;j++) {
      const second = allCoffIntg[1][j];

      if (first === second) {
        semiNums.push(first);
        break;
      };
    };
  };
  const finalCoff = Math.max(...semiNums);

  aproduct.elements[1].charge = aproduct.elements[1].charge / finalCoff;
  aproduct.elements[2].charge = aproduct.elements[2].charge / finalCoff;

  //aproduct.quantities[aproduct.elements[1].symbol] = undefined;
  //aproduct.quantities[aproduct.elements[2].symbol] = undefined;

  return aproduct;
};

/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////----2----////////////////////////////////////////////

export function fixingQ(getElements, formulas, quantities, atomicLength) {
  //const formulas = ['Fe', 'Cu2(SO4)3'];
  //const quantities = [
  //  {Fe: 1},
  //  {Cu: 2, S: 1, O: 4},
  //  {Fe: 2, S: 3, O: 12},
  //  {Cu: 1}
  //];

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

/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////----3----////////////////////////////////////////////

export function filterByVelance(ele1OxidationStates, ele2OxidationStates) {
  let le1OxidationArray = [];
  let le2OxidationArray = [];
  let result = [];
  if (typeof ele1OxidationStates === 'string') {
    le1OxidationArray = ele1OxidationStates.split(', ').map(Number);
  }else if (typeof ele1OxidationStates === 'number') {
    le1OxidationArray = [ele1OxidationStates];
  };

  if (typeof ele2OxidationStates === 'string') {
    le2OxidationArray = ele2OxidationStates.split(', ').map(Number);
  }else if (typeof ele2OxidationStates === 'number') {
    le2OxidationArray = [ele2OxidationStates];
  };

  for (let i = 0;i < le1OxidationArray.length; i++) {
    const velance1 = le1OxidationArray[i];
    for (let i = 0;i < le2OxidationArray.length; i++) {
      const velance2 = le2OxidationArray[i];
      if (velance1 === velance2) {
        result.push(velance2);
      };
    };
  };
  if (le1OxidationArray.length >= le2OxidationArray.length) {
    for (let i = 0;i < le1OxidationArray.length; i++) {
      const velance = le1OxidationArray[i];
      for (let i = 0;i < result.length; i++) {
        const vel = result[i];
        if (vel === velance) {
          result.splice(i,1);
          break;
        }else {
          result.push(velance);
          break;
        };
      };
    };
  }else {
    for (let i = 0;i < le2OxidationArray.length; i++) {
      const velance = le2OxidationArray[i];
      for (let i = 0;i < result.length; i++) {
        const vel = result[i];
        if (vel === velance) {
          result.splice(i,1);
          break;
        }else {
          result.push(velance);
          break;
        };
      };
    };
  }
  return result;
};

/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////----4----////////////////////////////////////////////

export function gettingVelance(element) {
  let result = [];
  if (typeof element === 'string') {
    result = element.split(', ').map(Number);
  }else if (typeof element === 'number') {
    result = [element];
  };
  return result;
};

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////----5----/////////////////////////////////////////////

const metals = ['alkali metal', 'alkaline earth metal', 'transition metal', 'Post-transition Metal', 'metal', 'actinoid', 'lanthanoid'];
const nonmetals = ['halogen', 'nonmetal'];
export function getTheCategory(elegroupBlock) {
  let eleCategory;
  for (let i = 0;i < metals.length; i++) {
    const cat = metals[i];
    if (cat === elegroupBlock) {
      eleCategory = 'metal'
      return eleCategory;
    };
  };
  for (let i = 0;i < nonmetals.length; i++) {
    const cat = nonmetals[i];
    if (cat === elegroupBlock) {
      eleCategory = 'nonmetal' 
      return eleCategory;
    };
  };
  if (eleCategory === undefined) {
    eleCategory = elegroupBlock;
    return eleCategory;
  };
};

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////----6----/////////////////////////////////////////////

export function tranferToFormula(formula) {

  const formulaArray = formula.split('');

  formulaArray.forEach((le, index) => {
    formulaArray[index] = isNaN(Number(le)) ? le : Number(le);
  });
  
  let result = '';
  for (let i = 0; i < formulaArray.length;i++) {
    const letter = formulaArray[i];
    if (typeof letter === 'number') {
      result += `_{${letter}}`;
    } else {
      result += letter;
    }
  };
  return result;
};