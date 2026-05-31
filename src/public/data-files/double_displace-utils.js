export function getDoubleSaltyProducts(symbolicReactant, elementsArray)  {

  const result = [
    2
  ];

  let totalQuantity = [1, 1];
  let bracket = 0;

  for (let j = 0; j < symbolicReactant.length;j++) {

    if (symbolicReactant[j].includes(')')) {

      for (let i = 0; i < symbolicReactant[j].length;i++) {
        const aletter = symbolicReactant[j][i];

        if (aletter === ')') {
          bracket = i;
        }
      };
      totalQuantity[j] = 
        symbolicReactant[j][bracket + 1] === undefined ? 1 : Number(symbolicReactant[j][bracket + 1])
      ;
    } else {

      if (
        !isNaN(Number(symbolicReactant[j][symbolicReactant[j].length -1])) &&
        elementsArray[j].length - 3 === 1
      ) {

        totalQuantity[j] = Number(symbolicReactant[j][symbolicReactant[j].length -1]);
      };
    };
  };
  
  const AnionsArray = [elementsArray[0][1], elementsArray[1][1]];

  const cationsInfoArray = [];

  for (let i = 0; i < elementsArray.length;i++) {
    const currentReactant = elementsArray[i];

    let currentOne = [];
    for (let j = 2; j < currentReactant.length; j++) {
      const element = currentReactant[j];

      if (typeof element === 'number') {
        currentOne.push(-(elementsArray[i][1].quantity * elementsArray[i][1].oxidation) / totalQuantity[i]);
        continue;
      };
      currentOne.push(element);
    };
    cationsInfoArray.push(currentOne);
    currentOne = [];
  };
  console.log(cationsInfoArray);
  
  let formulaArray = [];
  const quantitiesArray = [];

  for (let i = 0; i < cationsInfoArray.length;i++) {
    const currentCation = cationsInfoArray[i];

    let currentformula = '';
    for (let j = 0; j < currentCation.length -1; j++) {
      const anElement = currentCation[j];

      if (currentCation.length === 2) {
        currentformula += anElement.symbol;
      } else {
        currentformula += anElement.symbol + (anElement.quantity === 1 ? '' : anElement.quantity);
      }
    };
    formulaArray.push(currentformula);

    if (currentCation.length === 2) {
      quantitiesArray.push(undefined);
    } else {
      let itsQuantity = [undefined, {}];
      
      for (let j = 0; j < currentCation.length -1;j++) {
        itsQuantity[1][currentCation[j].symbol] = currentCation[j].quantity;
      };
      quantitiesArray.push(itsQuantity);
    };
  };

  formulaArray.forEach((formula, index) => {
    
    const itsQuantity = quantitiesArray[index];
    const itsCharge = cationsInfoArray[index].at(-1);
    const itsAnion = AnionsArray[index === 1 ? 0 : 1];

    result.push({
      name: 'salt',
      formula: '***',
      elements: [
        2,
        {symbol: itsAnion.symbol, charge: itsAnion.oxidation},
        {symbol: formula, charge: itsCharge},
      ],
      quantities: {
        [itsAnion.symbol]: undefined,
        [formula]: itsQuantity
      }
    });
  });

  return result;
};

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

export function getAcidicPartedProduct(elementsArray) {
  const result = {
    name: 'salt',
    formula: '***',
    elements: [
      2
    ]
  };

  let acidicIndex = 0;
  let itsAnion;

  elementsArray.forEach((anElementsArray, index) => {

    if (anElementsArray[1].coSymbol === 'M') itsAnion = anElementsArray[1];
    else if (anElementsArray[1].coSymbol === 'H') acidicIndex = index;
  });

  const itsCharge = -elementsArray[acidicIndex][1].quantity * elementsArray[acidicIndex][1].oxidation;
  let itsFormula = '';
  let itsQuantity = [undefined, {}];

  for (let i = 2; i < elementsArray[acidicIndex].length -1;i++) {
    const anElement = elementsArray[acidicIndex][i];

    if (elementsArray[acidicIndex].length  === 4) {

      itsFormula += anElement.symbol;
      itsQuantity = undefined;
    } else {

      itsFormula += anElement.symbol + (anElement.quantity === 1 ? '' : anElement.quantity);
      itsQuantity[1][anElement.symbol] = anElement.quantity;
    };
  };

  result.elements.push({symbol: itsAnion.symbol, charge: itsAnion.oxidation});
  result.elements.push({symbol: itsFormula, charge: itsCharge});
  result.quantities = {
    [itsAnion.symbol]: undefined,
    [itsFormula]: itsQuantity
  };

  return result;
};
