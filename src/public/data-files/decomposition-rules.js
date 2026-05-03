const decomRules = async (ammoniumProductPraser, ammoniumExceptionProduct, commonOxidationStates, atomicLength, getElement, getTheCategory, symbolicShape) => {
  return [
    {
    name: 'metal carbonate',
    formula: 'MCO3',
    products: [
      2,
      {
        name: 'metal oxide',
        formula: 'MO',
        elements: [
          2,
          {symbol: 'M', charge: undefined}, 
          {symbol: 'O', charge: -2}
        ],
        quantities: {
          'M': 2,
          'O': undefined
        }
      },{
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
      }
    ], 
    method: 'thermal',
    exceptions: ''
  },{
    name: 'metal bicarbonate',
    formula: 'MHCO3',
    products: [
      3,
      {
        name: 'metal carbonate',
        formula: 'MCO3',
        elements: [
          3,
          {symbol: 'M', charge: undefined},
          {symbol: 'CO3', charge: -2},
        ],
        quantities: {
          'M': 2,
          'CO3': [undefined, {
            'C': 1,
            'O': 3
          }]
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
      },{
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
      }
    ],
    method: 'thermal',
    exceptions: ''
  },{
    name: 'metal halate',
    formula: 'MXO3',
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
      },{
        name: 'oxygen molecule',
        formula: 'O2',
        elements: [
          1,
          {symbol: 'O', charge: 0}
        ],
        quantities: {
          'O': 2
        }
      }
    ],
    method: 'thermal',
    exceptions: ''
  },{
    name: 'metal perholorate',
    formula: 'MXO4',
    products: [
      2,
      {
        name: 'metal halide',
        formula: 'MCl',
        elements: [
          2,
          {symbol: 'M', charge: undefined},
          {symbol: 'X', charge: -1}
        ],
        quantities: {
          'M': 1,
          'X': undefined
        }
      },{
        name: 'oxygen molecule',
        formula: 'O2',
        elements: [
          1,
          {symbol: 'O', charge: 0}
        ],
        quantities: {
          'O': 2
        }
      }
    ],
    method: 'thermal',
    exceptions: ''
  },{
    name: 'metal nitrate',
    formula: 'MNO3',
    products: [
      3,
      {
        name: 'metal oxide',
        symbol: 'MO',
        elements: [
          2,
          {symbol: 'M', charge: undefined},
          {symbol: 'O', charge: -2}
        ],
        quantities: {
          'M': 2,
          'O': undefined,
        }
      },{
        name: 'nitrogen dioxide',
        symbol: 'NO2',
        elements: [
          2,
          {symbol: 'N', charge: 2},
          {symbol: 'O', charge: -1}
        ],
        quantities: {
          'N': 1,
          'O': 2
        }
      },{
        name: 'oxygen molecule',
        formula: 'O2',
        elements: [
          1,
          {symbol: 'O', charge: 0},
        ],
        quantities: {
          'O': 2
        }
      }
    ],
    method: 'thermal',
    exceptions: [
      2,
      {
        elements: ['Na', 'K', 'Rb', 'Cs', 'Fr'],
        products: [
          2,
          {
            name: 'metal nitrite',
            formula: 'MNO2',
            elements: [
              2,
              {symbol: 'M', charge: undefined},
              {symbol: 'NO2', charge: -1}
            ],
            quantities: {
              'M': 1,
              'NO2': [undefined, {
                'N': 1,
                'O': 2
              }]
            }
          },{
            name: 'oxygen molecule',
            formula: 'O2',
            elements: [
              1,
              {symbol: 'O', charge: 0},
            ],
            quantities: {
              'O': 2
            }
          }
        ]
      },{
        elements: ['Au', 'Pt', 'Ir', 'Rh', 'Os', 'Ru', 'Pd', 'Ag'],
        products: [
          3,
          {
            name: 'metal',
            formula: 'M',
            elements: [1, {symbol: 'M', charge: undefined}],
            quantities: {
              'M': 1
            }
          },{
            name: 'nitrogen dioxide',
            symbol: 'NO2',
            elements: [
              2,
              {symbol: 'N', charge: 2},
              {symbol: 'O', charge: -1}
            ],
            quantities: {
              'N': 1,
              'O': 2
            }
          },{
            name: 'oxygen molecule',
            formula: 'O2',
            elements: [
              1,
              {symbol: 'O', charge: 0},
            ],
            quantities: {
              'O': 2
            }
          }
        ]
      }
    ]
  },{
    name: 'metal hydroxide',
    formula: 'MOH',
    products: [
      2,
      {
        name: 'metal oxide',
        formula: 'MO',
        elements: [
          2,
          {symbol: 'M', charge: undefined},
          {symbol: 'O', charge: -2}
        ],
        quantities: {
          'M': 2,
          'O': undefined
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
    ],
    method: 'thermal',
    exceptions: [
      1,
      {
        elements: ['Na', 'K', 'Rb', 'Cs', 'Fr'],
        products: [
          0,
          "can't be decomposed"
        ]
      }
    ]
  },{
    name: 'metal oxide',
    formula: 'MO',
    products: [
      2,
      {name: 'metal', formula: 'M', elements: [1, {symbol: 'M', charge: undefined}], quantities: {'M': 1}},
      {
        name: 'oxygen molecule',
        formula: 'O2',
        elements: [
          1,
          {symbol: 'O', charge: 0},
        ],
        quantities: {
          'O': 2
        }
      }
    ],
    method: 'thermal',
    exceptions: ''
  },{
    name: 'metal sulfate',
    formula: 'MSO4',
    products: [
      2,
      {
        name: 'metal oxide',
        formula: 'MO',
        elements: [
          2,
          {symbol: 'M', charge: undefined},
          {symbol: 'O', charge: -2}
        ],
        quantities: {
          'M': 2,
          'O': undefined
        }
      },{
        name: 'sulfur trioxide',
        formula: 'SO3',
        elements: [
          2,
          {symbol: 'S', charge: 6},
          {symbol: 'O', charge: -2}
        ],
        quantities: {
          'S': 1,
          'O': 3
        }
      }
    ],
    method: 'thermal',
    exceptions: ''
  },{
    name: 'Metal sulfite',
    formula: 'MSO3',
    products: [
      2,
      {
        name: 'metal oxide',
        formula: 'MO',
        elements: [
          2,
          {symbol: 'M', charge: undefined},
          {symbol: 'O', charge: -2}
        ],
        quantities: {
          'M': 2,
          'O': undefined
        }
      },{
        name: 'sulfur dioxide',
        formula: 'SO2',
        elements: [
          2,
          {symbol: 'S', charge: 4},
          {symbol: 'O', charge: -2}
        ],
        quantities: {
          'S': 1,
          'O': 2
        }
      }
    ],
    method: 'thermal',
    exceptions: ''
  },{
    name: 'metal sulfide',
    formula: 'MS',
    products: [
      2,
      {name: 'metal', formula: 'M', elements: [1, {symbol: 'M', charge: undefined}],quantities: {'M': 1}},
      {
        name: 'sulfur',
        formula: 'S',
        elements: [
          1,
          {symbol: 'S', charge: 0}
        ],
        quantities: {
          'S': 8
        }
      }
    ],
    method: 'thermal',
    exceptions: [
      1,
      {
        elements: ['Na', 'K', 'Li', 'Ba'],
        products: [
          0,
          "can't be decomposed"
        ]
      }
    ]
  },{
    name: 'metal hydride',
    formula: 'MH',
    products: [
      2,
      {name: 'metal', formula: 'M', elements: [1, {symbol: 'M', charge: undefined}], quantities: {'M': 1}},
      {
        name: 'hydrogen molecule',
        formula: 'H2',
        elements: [
          1,
          {symbol: 'H', charge: 0}
        ],
        quantities: {
          'H': 2
        }
      }
    ],
    method: 'thermal',
    exceptions: ''
  },{
    name: 'metal azide',
    formula: 'MN3',
    products: [
      2,
      {name: 'metal', formula: 'M', elements: [1, {symbol: 'M', charge: undefined}], quantities: {'M': 1}},
      {
        name: 'nitrogen molecule',
        formula: 'N2',
        elements: [
          1,
          {symbol: 'N', charge: 0}
        ],
        quantities: {
          'N': 2
        }
      }
    ],
    method: 'thermal',
    exceptions: ''
  },{
    name: 'Metal peroxide',
    formula: 'MO2',
    products: [
      2,
      {
        name: 'metal oxide',
        formula: 'MO',
        elements: [
          2,
          {symbol: 'M', charge: undefined}, 
          {symbol: 'O', charge: -2}
        ],
        quantities: {
          'M': 2,
          'O': undefined
        }
      },{
        name: 'oxygen molecule',
        formula: 'O2',
        elements: [
          1,
          {symbol: 'O', charge: 0}
        ],
        quantities: {
          'O': 2
        }
      }
    ],
    method: 'thermal',
    exceptions: ''
  },{
    name: 'metal oxalate',
    formula: 'MC2O4',
    products: [
      2,
      {
        name: 'metal oxide',
        formula: 'MO',
        elements: [
          2,
          {symbol: 'M', charge: undefined}, 
          {symbol: 'O', charge: -2}
        ],
        quantities: {
          'M': 2,
          "O": undefined
        }
      },{
        name: 'carbon monoxide',
        formula: 'CO',
        elements: [
          2,
          {symbol: 'C', charge: 1},
          {symbol: 'O', charge: -1}
        ],
        quantities: {
          'C': 1,
          'O': 1
        }
      }
    ],
    method: 'thermal',
    exceptions: ''
  },{
    name: 'ammonium salt',
    formula: 'NH4Z',
    products: await ammoniumProductPraser(commonOxidationStates, atomicLength, getElement, getTheCategory, symbolicShape),
    method: 'thermal',
    exceptions: [
      2,
      {
        elements: ['SO4', 'PO4', 'BO3', 'SiO4', 'AsO4', 'SeO4'],
        products: await ammoniumExceptionProduct(symbolicShape, getElement, commonOxidationStates)
      },{
        elements: ['CO3'],
        products: [
          3,
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
      }
    ]
  },{
    name: 'hypohalous acid',
    formula: 'HXO',
    products: [
      2,
      {
        name: 'oxygen molecule',
        formula: 'O2',
        elements: [
          1,
          {symbol: 'O', charge: 0}
        ],
        quantities: {
          'O': 2
        }
      },{
        name: undefined,
        formula: 'HX',
        elements: [
          2,
          {symbol: 'H', charge: 1},
          {symbol: 'X', charge: -1}
        ],
        quantities: {
          'H': 1,
          'X': 1
        }
      }
    ],
    method: 'thermal',
    exceptions: ''
  },{
    name: 'halous acid',
    formula: 'HXO2',
    products: [
      2,
      {
        name: 'hypohalous acid',
        formula: 'HXO',
        elements: [
          2,
          {symbol: 'X',charge: 1},
          {symbol: 'OH', charge: -1}
        ],
        quantities: {
          'X': 1,
          'OH': [1, {
            'O': 1,
            'H': 1
          }]
        }
      },{
        name: 'halic acid',
        formula: 'HXO3',
        elements: [
          2,
          {symbol: 'X', charge: 1},
          {symbol: 'HO3', charge: -1}
        ],
        quantities: {
          'X': 1,
          'HO3': [1, {
            'H': 1,
            'O': 3
          }]
        }
      }
    ],
    method: 'thermal',
    exceptions: ''
  },{
    name: 'halic acid',
    formula: 'HXO3',
    products: [
      3,
      {
        name: 'perhalic acid',
        formula: 'HXO4',
        elements: [
          2,
          {symbol: 'X', charge: 1},
          {symbol: 'HO4', charge: -1}
        ],
        quantities: {
          'X': 1,
          'HO4': [1, {
            'H': 1,
            'O': 4
          }]
        }
      },{
        name: 'halogen dioxide',
        formula: 'XO2',
        elements: [
          2,
          {symbol: 'X', charge: 2},
          {symbol: 'O', charge: -1}
        ],
        quantities: {
          'X': 1,
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
    ],
    method: 'thermal',
    exceptions: ''
  },{
    name: 'perhalic acid',
    formula: 'HXO4',
    products: [
      3,
      {
        name: 'halogen molecule',
        formula: 'X2',
        elements: [
          1,
          {symbol: 'X', charge: 0}
        ],
        quantities: {
          'X': 2
        }
      },{
        name: 'oxygen molecule',
        formula: 'O2',
        elements: [
          1,
          {symbol: 'O', charge: 0}
        ], 
        quantities: {
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
    ],
    method: 'thermal',
    exceptions: ''
  },{
    name: 'metal halide',
    formula: 'MX',
    products: [
      2,
      {name: 'metal', formula: 'M', elements: [1, {symbol: 'M', charge: undefined}], quantities: {'M': 1}},
      {name: 'halogen', formula: 'X', elements: [1, {symbol: 'X', charge: -1}], quantities: {'X': 1}},
    ],
    method: 'electrolysis',
    exceptions: ''
  },{
    name: 'metal oxide',
    formula: 'MO',
    products: [
      2,
      {name: 'metal', formula: 'M', elements: [1, {symbol: 'M', charge: undefined}], quantities: {'M': 1}},
      {
        name: 'oxygen molecule',
        formula: 'O2',
        elements: [
          1,
          {symbol: 'O', charge: 0},
        ],
        quantities: {
          'O': 2
        }
      }
    ],
    method: 'electrolysis',
    exceptions: ''
  },{
    name: 'water',
    formula: 'H2O',
    products: [
      2,
      {
        name: 'oxygen molecule',
        formula: 'O2',
        elements: [
          1,
          {symbol: 'O', charge: 0}
        ],
        quantities: {
          'O': 2
        }
      },{
        name: 'hydrogen molecule',
        formula: 'H2',
        elements: [
          1,
          {symbol: 'H', charge: 0}
        ],
        quantities: {
          'H': 2
        }
      }
    ],
    method: 'electrolysis',
    exceptions: ''
  },{
    name: 'metal hydroxide',
    formula: 'MOH',
    products: [
      2,
      {
        name: 'metal oxide',
        formula: 'MO',
        elements: [
          2,
          {symbol: 'M', charge: undefined},
          {symbol: 'O', charge: -2}
        ],
        quantities: {
          'M': 2,
          'O': undefined
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
    ],
    method: 'electrolysis',
    exceptions: ''
  },{
    name: 'hydrogen peroxide',
    formula: 'HO',
    products: [
      2,
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
      },{
        name: 'oxygen molecule',
        formula: 'O2',
        elements: [
          1,
          {symbol: 'O', charge: 0}
        ],
        quantities: {
          'O': 2
        }
      }
    ],
    method: 'catalytic',
    exceptions: ''
  },{
    name: 'metal Halate',
    formula: 'MXO3',
    products: [
      2,
      {
        name: 'matal halide',
        formula: 'MX',
        elements: [
          2,
          {name: 'metal', formula: 'M', elements: [1, {symbol: 'M', charge: undefined}]},
          {name: 'halogen', formula: 'X', elements: [1, {symbol: 'X', charge: -1}]}
        ],
        quantities: {
          'M': 1,
          'X': undefined
        }
      },{
        name: 'oxygen molecule',
        formula: 'O2',
        elements: [
          1,
          {symbol: 'O', charge: 0}
        ],
        quantities: {
          'O': 2
        }
      }
    ],
    method: 'catalytic',
    exceptions: ''
  },{
    name: 'ammonia',
    formula: 'NH3',
    products: [
      2,
      {
        name: 'nitrogen molecule',
        symbol: 'N2',
        elements: [
          1,
          {symbol: 'N', charge: 0}
        ],
        quantities: {
          'N': 2
        }
      },{
        name: 'hydrogen molecule',
        symbol: 'H2',
        elements: [
          1,
          {symbol: 'H', charge: 0}
        ],
        quantities: {
          'H': 2
        }
      }
    ],
    method: 'catalytic',
    exceptions: ''
  },{
    name: 'hydrazine',
    formula: 'N2H4',
    products: [
      2,
      {
        name: 'nitrogen molecule',
        symbol: 'N2',
        elements: [
          1,
          {symbol: 'N', charge: 0}
        ],
        quantities: {
          'N': 2
        }
      },{
        name: 'hydrogen molecule',
        symbol: 'H2',
        elements: [
          1,
          {symbol: 'H', charge: 0}
        ],
        quantities: {
          'H': 2
        }
      }
    ],
    method: 'catalytic',
    exceptions: ''
  },{
    name: 'nitrogen polyhalide',
    formula: 'NX3',
    products: [
      2,
      {
        name: 'nitrogen molecule',
        symbol: 'N2',
        elements: [
          1,
          {symbol: 'N', charge: 0}
        ],
        quantities: {
          'N': 2
        }
      },
      {name: 'halogen', formula: 'X', elements: [1, {symbol: 'X', charge: -1}], quantities: {'X': 1}}
    ],
    method: 'catalytic',
    exceptions: ''
  }];
};

export default decomRules;
/*

{
  name,
  formula,
  products: [
    productNumber,
    {name, formula , elements: [elementsNumber, {symbol, charge}]},
    {name, formula , elements: [elementsNumber, {symbol, charge}]}
  ],
  method,
  exceptions: {
    elements: []
    products: [
    productNumber,
    {name, formula , elements: [ elementsNumber, {symbol, charge} ] },
    {name, formula , elements: [elementsNumber, {symbol, charge}]}
    ],
  }
}
*/