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

  const secondHalfData = [];
  let totalOxidation = 0;
  for (let i = 1; i < elementsArray[mIndex].length;i++) {
    const anElement = elementsArray[mIndex][i];

    if (typeof anElement === 'number') {
      secondHalfData.push(totalOxidation);
      break;
    }

    if (anElement.coSymbol === 'A' || anElement.coSymbol === 'M') {
      totalOxidation = -anElement.oxidation;
      continue;
    };

    secondHalfData.push(anElement);
  };

  const theSaltyProduct = {
    name: 'salt',
    formula: '***',
    elements: [
      2,
      {symbol: elementsArray[sIndex][1].coSymbol, charge: undefined}
    ],
    quantities: {
      [elementsArray[sIndex][1].coSymbol]: -secondHalfData[secondHalfData.length -1]
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