const combiRules = async () => {
  return [{
    name: 'metal oxide + water',
    formula1: 'MO+H2O',
    formula2: 'H2O+MO',
    product: [
      1,
      {
        name: 'metal hydroxide',
        formula: 'MOH',
        elements: [
          2,
          {symbol: 'M', charge: undefined},
          {symbol: 'OH', charge: -1}
        ],
        quantities: {
          'M': 1,
          'OH': [undefined, {
            'O': 1,
            'H': 1
          }]
        }
      }
    ]
  },{
    name: 'nonmetal oxide + water',
    formula1: 'QO+H2O',
    formula2: 'H2O+QO',
    product: [
      1,
      {
        name: 'oxiacid',
        formula: 'HQO',
        elements: [
          3,
          {symbol: 'Q', charge: undefined},
          {symbol: 'H', charge: 1},
          {symbol: 'O', charge: -2}
        ],
        quantities: {
          'H': undefined,
          'Q': undefined,
          'O': undefined
        }
      }
    ]
  },{
    name: 'metal oxide + nonmetal oxide',
    formula1: 'MO+QO',
    formula2: 'QO+MO',
    product: [
      1,
      {
        name: 'salt',
        formula: 'MQO',
        elements: [
          3,
          {symbol: 'Q', charge: undefined},
          {symbol: 'M', charge: undefined},
          {symbol: 'O', charge: -2}
        ],
        quantities: {
          'M': undefined,
          'Q': undefined,
          'O': undefined
        }
      }
    ]
  },{
    name: 'nonmetal oxide + nonmetal oxide',
    formula1: 'QO+QO',
    formula2: 'QO+QO',
    product: [
      1,
      {
        name: 'nonmetal oxide',
        formula: 'QO',
        elements: [
          2,
          {symbol: 'Q', charge: undefined},
          {symbol: 'O', charge: -2}
        ],
        quantities: {
          'Q': undefined,
          'O': undefined
        }
      }
    ]
  }]
};
export default combiRules;