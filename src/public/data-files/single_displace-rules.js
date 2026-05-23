const singDispRules = (gettingSaltyProduct, elementsArray, symbolicReactant) => {
  return [
    {
    name: 'metal + water',
    formula1: 'M+H2O',
    formula2: 'H2O+M',
    products: [
      2,
      {
        name: 'metal hydroxide',
        formula: 'MOH',
        elements: [
          2,
          {symbol: 'M', charge: undefined},
          {symbol: 'OH', charge: -1 }
        ],
        quantities: {
          'M': 1,
          'OH': [undefined, {
            'O': 1,
            'H': 1
          }]
        }
      },
      {name: 'hydrogen',formula: 'H',elements: [1,{symbol: 'H', charge: 0}],quantities: {'H': 2}}
    ]
  },{
    name: 'halogen + metal halide',
    formula1: 'X+MQ',
    formula2: 'X+MQ',
    products: [
      2,
      {
        name: 'metal halide',
        formula: 'MX',
        elements: [
          2,
          {symbol: 'M', charge: undefined},
          {symbol: 'X', charge: -1}
        ],
        quantities: {
          'M': 1,
          'X': undefined
        }
      },
      {name: 'halogen',formula: 'Q',elements: [1, {symbol: 'Q', charge: -1}],quantities: {'Q': 2}}
    ]
  },{
    name: 'halogen + matal halide',
    formula1: 'MX+Q',
    formula2: 'MX+Q',
    products: [
      2,
      {
        name: 'metal halide',
        formula: 'MQ',
        elements: [
          2,
          {symbol: 'M', charge: undefined},
          {symbol: 'Q', charge: -1}
        ],
        quantities: {
          'M': 1,
          'Q': undefined
        }
      },
      {name: 'halogen',formula: 'X',elements: [1, {symbol: 'X', charge: -1}],quantities: {'X': 2}}
    ]
  },{
    name: 'metal + anything',
    formula1: 'M+AA',
    formula2: 'M+AA',
    products: gettingSaltyProduct(elementsArray, symbolicReactant)
  }];
};
export default singDispRules;