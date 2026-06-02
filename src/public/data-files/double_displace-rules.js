const doubleDispRules = (getDoubleSaltyProducts, getAcidicPartedProduct, symbolicReactant, elementsArray) => {
  return [
    {
      name: 'salt + salt',
      formula1: 'M+A',
      formula2: 'M+A',
      products: getDoubleSaltyProducts(symbolicReactant, elementsArray)
    },{
      name: 'metal carbonate + acid',
      formula1: 'CO3+H',
      formula2: 'H+CO3',
      products: [
        3,
        getAcidicPartedProduct(elementsArray),
        {
          name: 'carbon dioxide',
          formula: 'CO2',
          elements: [
            2,
            {symbol: 'C', charge: 4},
            {symbol: 'O', charge: -2}
          ],
          quantities: {
            'C': 1,
            'O': 2
          }
        },{
          name: 'water',
          formula: 'H2O',
          elements: [
            2,
            {symbol: 'H', charge: 1},
            {symbol: 'O', charge: -2}
          ],
          quantities: {
            'H': 2,
            'O': 1
          }
        }
      ]
    },{
      name: 'metal sulfite + acid',
      formula1: 'SO3+H',
      formula2: 'H+SO3',
      products: [
        3,
        getAcidicPartedProduct(elementsArray),
        {
          name: 'sulfur dioxide',
          formula: 'SO2',
          elements: [
            2,
            {symbol: 'S', charge: 2},
            {symbol: 'O', charge: -1}
          ],
          quantities: {
            'S': 1,
            'O': 2
          }
        },{
          name: 'water',
          formula: 'H2O',
          elements: [
            2,
            {symbol: 'H', charge: 1},
            {symbol: 'O', charge: -2}
          ],
          quantities: {
            'H': 2,
            'O': 1
          }
        }
      ]
    },{
      name: 'metal sulfide + acid',
      formula1: 'S+H',
      formula2: 'H+S',
      products: [
        2,
        getAcidicPartedProduct(elementsArray),
        {
          name: 'hydrogen sulfide',
          formula: 'H2S',
          elements: [
            2,
            {symbol: 'H', charge: 1},
            {symbol: 'S', charge: -2}
          ],
          quantities: {
            'S': 1,
            'H': 2
          }
        }
      ]
    },{
      name: 'acid + base',
      formula1: 'H+OH',
      formula2: 'OH+H',
      products: [
        2,
        getAcidicPartedProduct(elementsArray),
        {
          name: 'water',
          formula: 'H2O',
          elements: [
            2,
            {symbol: 'H', charge: 1},
            {symbol: 'O', charge: -2}
          ],
          quantities: {
            'H': 2,
            'O': 1
          }
        }
      ]
    },{
      name: 'ammonium Salt + base',
      formula1: 'NH4+b',
      formula2: 'NH4+b',
      products: [
        3,
        getAcidicPartedProduct(elementsArray),
        {
          name: 'ammonia',
          formula: 'NH3',
          elements: [
            2,
            {symbol: 'N', charge: 3},
            {symbol: 'H', charge: -1}
          ],
          quantities: {
            'N': 1,
            'H': 3
          }
        },{
          name: 'water',
          formula: 'H2O',
          elements: [
            2,
            {symbol: 'H', charge: 1},
            {symbol: 'O', charge: -2}
          ],
          quantities: {
            'H': 2,
            'O': 1
          }
        }
      ]
    }
  ];
};
export default doubleDispRules;