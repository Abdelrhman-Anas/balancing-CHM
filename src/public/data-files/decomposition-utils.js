export async function ammoniumProductPraser(commonOxidationStates, atomicLength, getElement, getTheCategory, symbolicShape) {

  const acid = symbolicShape.replace('(', '').replace(')', '').replace('NH4', '');
  const acidArray = acid.split('');

  acidArray.forEach((le, index) => {
    acidArray[index] = isNaN(Number(le)) ? le : Number(le);
  });
  console.log(acidArray);
  const elements = getElements(acidArray);

  for (let i = 1; i < elements.length;i++) {
    const element = elements[i];
    if (typeof element === 'number') {
      break;
    }
    elements[i].oxidation = commonOxidationStates[element.symbol].com;
  };
  let totalCalc = elements[elements.length-1];
  for ( let i = 1;i < elements.length;i++ ) {
    const element = elements[i];
    if (elements[0] === i) {
      continue;
    };
    if (typeof element === 'number') {
      break;
    };
    totalCalc -= element.oxidation*element.quantity;
  };
  const centralOxidation = totalCalc / elements[elements[0]].quantity;

  let theProduct;
  const elementsData = [];

  for(let i = 1;i < elements.length;i++) {
    const element = elements[i];
    if (typeof element === 'number') {
      break;
    }
    const elementData = await getElement(element.symbol);
    elementsData.push(elementData);
  };
  
  for(let i = 0;i < elements.length;i++) {
    const theElement = elements[i + 1];
    if (typeof theElement === 'number') {
      break;
    };
    const elementName = elementsData[i].name;
    elements[i + 1].name = elementName;
    for (let j = 0;j < atomicLength[0].length;j++) {
      const diElement = atomicLength[0][j];
      if (elementName === diElement) {
        elements[i + 1].length = 2;
      };
    };
    for (let l = 0;l < atomicLength[1].length;l++) {
      const tetElement = atomicLength[1][l];
      elements[i + 1].name = elementName;
      if (elementName === tetElement) {
        elements[i + 1].length = 4;
      };
    };
    for (let k = 0;k < atomicLength[2].length;k++) {
      const octElement = atomicLength[2][k];
      elements[i + 1].name = elementName;
      if (elementName === octElement) {
        elements[i + 1].length = 8;
      };
    };
    if (theElement.length === undefined) {
      elements[i + 1].length = 1;
    }
  };  

  if (centralOxidation >= 3) {
    const centralElement = elements[elements[0]]
    const centralElementData = elementsData[elements[0] -1];
    const centralCategory = getTheCategory(centralElementData.groupBlock);
    if (centralCategory === 'metal') {
      theProduct = [
        3,
        {
          name: `metal oxide`,
          symbol: `MO`,
          elements: [
            2,
            {symbol: `${centralElement.symbol}`, charge: centralElement.oxidation},
            {symbol: 'O', charge: -2}
          ]
        },{
          name: 'nitrogen molecule',
          symbol: 'N2',
          elements: [
            1,
            {symbol: 'N', charge: 0}
          ]
        },{
          name: 'water',
          formula: 'H2O',
          elements: [
            2,
            {symbol: 'H', charge: 1},
            {symbol: 'O', charge: -2}
          ],
        }
      ]
    } else {
      let trueOrNot;
      for (let i = 1;i < elements.length;i++) {
        const element = elements[i];
        if (typeof element === 'number') {
          break;
        };
        if (element.symbol === 'O') {
          trueOrNot = true;
          const lastIndex = elements[elements.length - 1];
          elements.splice(elements.length - 1, 1);
          if (element.quantity >= 3) {
            elements.push({productCode: 1});
          } else {
            elements.push({productCode: 2});
          };
          elements.push(lastIndex);
        };
      };

      if (!trueOrNot) {
        return [
          0,
          "can't be decomposed"
        ];
      };
      console.log(elements);
      console.log('this one');
      theProduct = [
        4,
        {
          name: 'nitrogen molecule',
          formula: 'N2',
          elements: [
            1,
            {symbol: 'N', charge: 0}
          ]
        },{
          name: `${elements[elements[0]].name}`,
          formula: `${elements[elements[0]].symbol}${elements[elements[0]].length === 1 ? '' : elements[elements[0]].length}`,
          elements: [
            1,
            {symbol: `${elements[elements[0]].symbol}`, charge: 0}
          ]
        },{
          name: 'oxygen molecule',
          formula: 'O2',
          elements: [
            1,
            {symbol: 'O', charge: 0},
          ]
        },{
          name: 'water',
          formula: 'H2O',
          elements: [
            2,
            {symbol: 'H', charge: 1},
            {symbol: 'O', charge: -2}
          ],
        }
      ];
      if (elements[elements.length -2].productCode === 2) {
        theProduct.splice(3, 1);
      };
    };
  } else {
    theProduct = ammoniumExceptionProduct(symbolicShape);
  }
  return theProduct;
};
//--------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------//

function getElements(compoundArray) {
  const result = [
    undefined,
  ];

  let currentElement = '';
  compoundArray.forEach((letter, index) => {
    const letter2 = compoundArray[index + 1];
    const letter3 = compoundArray[index + 2];
  
    if (typeof letter === 'string' && letter === letter.toUpperCase()) {
      currentElement = letter;
      if (letter2 !== undefined) {
        if (typeof letter2 === 'number') {
          result.push({symbol: currentElement, quantity: letter2});
        } else {
          if (letter2 === letter2.toUpperCase()) {
            result.push({symbol: currentElement, quantity: 1});
          } else {
            if (letter3 !== undefined) {
              if (typeof letter3 === 'number') {
                result.push({symbol: currentElement + letter2, quantity: letter3});
              } else {
                result.push({symbol: currentElement + letter2, quantity: 1});
              };
            } else {
              result.push({symbol: currentElement + letter2, quantity: 1});
            }
          };
        };
      } else {
        result.push({symbol: currentElement, quantity: 1});
      };
    };
  });

  if (typeof compoundArray[0] === 'number') {
    result.push(-compoundArray[0]);
  } else {
    result.push(-1);
  }
  let theSmallest = {value: 100, index: 0};

  for (let i = 1;i < result.length;i++) {
    const element = result[i];
    
    if (theSmallest.value > element.quantity) {
      theSmallest = {value: element.quantity, index: i};
    };

  };
  result[0] = theSmallest.index;

  return result;
};
//--------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------//
export function ammoniumExceptionProduct(symbolicShape) {
  let result;

  const acid = symbolicShape.replace('(', '').replace(')', '').replace('NH4', '');
  const acidArray = acid.split('');

  acidArray.forEach((le, index) => {
    acidArray[index] = isNaN(Number(le)) ? le : Number(le);
  });

  const elements = getElements(acidArray);
  const cenrtalElement = elements[elements[0]];
  const ammoniumQuantity = (elements[elements.length -1] * -1 ) - 1;
  let compinatedAcid = 'H';
  for (let i = 1;i < elements.length;i++) {
    const element = elements[i];
    if (typeof element === 'number') {
      break;
    };
    const theSymbol = element.symbol;
    let theQuantity = element.quantity;
    if (theQuantity === 1) {
      theQuantity = '';
    }
    compinatedAcid += theSymbol + theQuantity;
  }

  result = [
    2,
    {
      name: 'ammonia',
      formula: 'NH3',
      elements: [
        2,
        {symbol: 'N', charge: 3},
        {symbol: 'H', charge: -1}
      ]
    },{
      name: undefined,
      formula: (ammoniumQuantity <= 0 ? '': `(NH4)${ammoniumQuantity}`) + compinatedAcid,
      elements: [
        undefined
      ]
    }
  ]

  return result;
}

