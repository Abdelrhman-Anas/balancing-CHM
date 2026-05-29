function gettingSaltyProduct(elementsArray, symbolicReactant) {
  const result = [
    2
  ];

  let mIndex;
  let sIndex;
  for (let i = 0; i < elementsArray.length;i++) {
    const elementalArray = elementsArray[i];

    if (elementalArray.length -2 === 1) {
      sIndex = i;
      continue;
    } else if (elementalArray.length -2 > 1) {
      mIndex = i;
      continue;
    };
  };
  
  let totalQuantity = 1;
  let bracket = 0;
  if (symbolicReactant[mIndex].includes(')')) {

    for (let i = 0; i < symbolicReactant[mIndex].length;i++) {
      const aletter = symbolicReactant[mIndex][i];

      if (aletter === ')') {
        bracket = i;
      }
    };
    totalQuantity = 
      symbolicReactant[mIndex][bracket + 1] === undefined ? 1 : Number(symbolicReactant[mIndex][bracket + 1])
    ;
  } else {

    if (
      !isNaN(Number(symbolicReactant[mIndex][symbolicReactant[mIndex].length -1])) &&
      elementsArray[mIndex].length - 3 === 1
    ) {

      totalQuantity = Number(symbolicReactant[mIndex][symbolicReactant[mIndex].length -1]);
    };
  };

  const secondHalfData = [];
  let totalOxidation = 0;
  console.log(elementsArray[mIndex]);
  for (let i = 1; i < elementsArray[mIndex].length;i++) {
    const anElement = elementsArray[mIndex][i];

    if (typeof anElement === 'number') {
      secondHalfData.push(totalOxidation);
      break;
    }

    if (anElement.coSymbol === 'A' || anElement.coSymbol === 'M') {
      totalOxidation = -(anElement.oxidation * anElement.quantity) / totalQuantity;
      continue;
    };

    secondHalfData.push(anElement);
  };
  console.log(secondHalfData);
  const theSaltyProduct = {
    name: 'salt',
    formula: '***',
    elements: [
      2,
      {symbol: elementsArray[sIndex][1].coSymbol, charge: undefined}
    ],
    quantities: {
      [elementsArray[sIndex][1].coSymbol]: undefined
    }
  };

  let saltySymbol = '';
  let saltyQuantities = {};
  for (let i = 0; i < secondHalfData.length -1;i++) {
    const secondaryElement = secondHalfData[i];

    if (secondHalfData.length -1 === 1) {
      saltySymbol = secondaryElement.symbol;
      break;
    };

    saltySymbol += `${secondaryElement.symbol}${secondaryElement.quantity === 1 ? '' : secondaryElement.quantity}`;
    saltyQuantities[secondaryElement.symbol] = secondaryElement.quantity;
  };


  theSaltyProduct.elements.push({symbol: saltySymbol, charge: secondHalfData[secondHalfData.length -1]});
  theSaltyProduct.quantities[saltySymbol] = [undefined, saltyQuantities];

  if (secondHalfData.length -1 === 1) {
    theSaltyProduct.quantities[saltySymbol] = undefined;
  }

  result.push(theSaltyProduct);

  result.push({
    name: 'metal',
    formula: elementsArray[mIndex][1].coSymbol,
    elements: [
      1,
      {symbol: elementsArray[mIndex][1].coSymbol, charge: undefined}
    ],
    quantities: {
      [elementsArray[mIndex][1].coSymbol]: undefined
    }
  });

  return result;
};
export default gettingSaltyProduct;