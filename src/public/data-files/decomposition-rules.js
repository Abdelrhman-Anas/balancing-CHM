const decomRules = (ammoniumProductPraser, ammoniumExceptionProduct, commonOxidationStates, atomicLength, getElement, getTheCategory, symbolicShape) => {
  return [{
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
        ]
      },{
        name: 'carbon dioxide',
        formula: 'CO2',
        elements: [
          2,
          {symbol: 'C', charge: 4},
          {symbol: 'O', charge: -2}
        ]
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
          {symbol: 'CO3', charge: -1},
        ]
      },{
        name: 'water',
        formula: 'H2O',
        elements: [
          2,
          {symbol: 'H', charge: 1},
          {symbol: 'O', charge: -2}
        ]
      },{
        name: 'carbon dioxide',
        formula: 'CO2',
        elements: [
          2,
          {symbol: 'C', charge: 4},
          {symbol: 'O', charge: -2}
        ]
      }
    ],
    method: 'thermal',
    exceptions: ''
  },{
    name: 'metal chlorate',
    formula: 'MClO3',
    products: [
      2,
      {
        name: 'metal chloride',
        formula: 'MCl',
        elements: [
          2,
          {symbol: 'M', charge: undefined},
          {symbol: 'Cl', charge: -1}
        ]
      },{
        name: 'oxygen molecule',
        formula: 'O2',
        elements: [
          1,
          {symbol: 'O', charge: 0}
        ]
      }
    ],
    method: 'thermal',
    exceptions: ''
  },{
    name: 'metal perchlorate',
    formula: 'MClO4',
    products: [
      2,
      {
        name: 'metal chloride',
        formula: 'MCl',
        elements: [
          2,
          {symbol: 'M', charge: undefined},
          {symbol: 'Cl', charge: -1}
        ]
      },{
        name: 'oxygen molecule',
        formula: 'O2',
        elements: [
          1,
          {symbol: 'O', charge: 0}
        ]
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
        ]
      },{
        name: 'nitrogen dioxide',
        symbol: 'NO2',
        elements: [
          2,
          {symbol: 'N', charge: 2},
          {symbol: 'O', charge: -1}
        ]
      },{
        name: 'oxygen molecule',
        formula: 'O2',
        elements: [
          1,
          {symbol: 'O', charge: 0},
        ]
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
              3,
              {symbol: 'M', charge: undefined},
              {symbol: 'NO2', charge: -1}
            ]
          },{
            name: 'oxygen molecule',
            formula: 'O2',
            elements: [
              1,
              {symbol: 'O', charge: 0},
            ]
          }
        ]
      },{
        elements: ['Au', 'Pt', 'Ir', 'Rh', 'Os', 'Ru', 'Pd', 'Ag'],
        products: [
          3,
          {
            name: 'metal',
            formula: 'M',
            elements: [1, {symbol: 'M', charge: undefined}]
          },{
            name: 'nitrogen dioxide',
            symbol: 'NO2',
            elements: [
              2,
              {symbol: 'N', charge: 2},
              {symbol: 'O', charge: -1}
            ]
          },{
            name: 'oxygen molecule',
            formula: 'O2',
            elements: [
              1,
              {symbol: 'O', charge: 0},
            ]
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
        ]
      },{
        name: 'water',
        formula: 'H2O',
        elements: [
          2,
          {symbol: 'H', charge: 1},
          {symbol: 'O', charge: -2}
        ]
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
      {name: 'metal', formula: 'M', elements: [1, {symbol: 'M', charge: undefined}]},
      {
        name: 'oxygen molecule',
        formula: 'O2',
        elements: [
          1,
          {symbol: 'O', charge: 0},
        ] 
      }
    ],
    method: 'thermal',
    exeptions: ''
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
        ]
      },{
        name: 'sulfur trioxide',
        formula: 'SO3',
        elements: [
          2,
          {symbol: 'S', charge: 6},
          {symbol: 'O', charge: -2}
        ]
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
        ] 
      },{
        name: 'sulfur dioxide',
        formula: 'SO2',
        elements: [
          2,
          {symbol: 'S', charge: 4},
          {symbol: 'O', charge: -2}
        ]
      }
    ],
    method: 'thermal',
    exceptions: ''
  },{
    name: 'metal sulfide',
    formula: 'MS',
    products: [
      0,
      "can't be decomposed"
    ],
    method: 'thermal',
    exceptions: [
      1,
      {
        elements: ['Au', 'Pt', 'Ir', 'Rh', 'Os', 'Ru', 'Pd', 'Ag'],
        products: [
          2,
          {name: 'metal', formula: 'M', elements: [1, {symbol: 'M', charge: undefined}]},
          {
            name: 'sulfur',
            formula: 'S8',
            elements: [
              1,
              {symbol: 'S', charge: 0}
            ]
          }
        ]
      }
    ]
  },{
    name: 'metal hydride',
    formula: 'MH',
    products: [
      2,
      {name: 'metal', formula: 'M', elements: [1, {symbol: 'M', charge: undefined}]},
      {
        name: 'hydrogen molecule',
        formula: 'H2',
        elements: [
          1,
          {symbol: 'H', charge: 0}
        ]
      }
    ],
    method: 'thermal',
    exceptions: ''
  },{
    name: 'metal azide',
    formula: 'MN3',
    products: [
      2,
      {name: 'metal', formula: 'M', elements: [1, {symbol: 'M', charge: undefined}]},
      {
        name: 'nitrogen molecule',
        formula: 'N2',
        elements: [
          1,
          {symbol: 'N', charge: 0}
        ]
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
        ]
      },{
        name: 'oxygen molecule',
        formula: 'O2',
        elements: [
          1,
          {symbol: 'O', charge: 0}
        ]
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
        ]
      },{
        name: 'carbon monoxide',
        formula: 'CO',
        elements: [
          2,
          {symbol: 'C', charge: 1},
          {symbol: 'O', charge: -1}
        ]
      }
    ],
    method: 'thermal',
    exceptions: ''
  },{
    name: 'ammonium salt',
    formula: 'NO4X',
    products: ammoniumProductPraser(commonOxidationStates, atomicLength, getElement, getTheCategory, symbolicShape),
    method: 'thermal',
    exceptions: [
      2,
      {
        elements: ['SO4', 'PO4', 'BO3', 'SiO4', 'AsO4', 'SeO4'],
        products: ammoniumExceptionProduct(symbolicShape)
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
            ]
          },{
            name: 'carbon dioxide',
            formula: 'CO2',
            elements: [
              2,
              {symbol: 'C', charge: 4},
              {symbol: 'O', charge: -2}
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
      }
    ]
  },{
    name: 'hypohalous acid',
    formula: 'XOH',
    products: [
      2,
      {
        name: 'oxygen molecule',
        formula: 'O2',
        elements: [
          1,
          {symbol: 'O', charge: 0}
        ]
      },{
        name: undefined,
        formula: 'HX',
        elements: [
          2,
          {symbol: 'H', charge: 1},
          {symbol: 'X', charge: -1}
        ]
      }
    ],
    method: 'thermal',
    exceptions: ''
  },{
    name: 'halous acid',
    formula: 'XHO2',
    products: [
      2,
      {
        name: 'hypohalous acid',
        formula: 'XOH',
      },{
        name: 'halic acid',
        formula: 'XHO3',
      }
    ],
    method: 'thermal',
    exceptions: ''
  },{
    name: 'halic acid',
    formula: 'XHO3',
    products: [
      3,
      {
        name: 'perhalic acid',
        formula: 'XHO4',
      },{
        name: 'halogen dioxide',
        formula: 'XO2'
      },{
        name: 'water',
        formula: 'H2O',
        elements: [
          2,
          {symbol: 'H', charge: 1},
          {symbol: 'O', charge: -2}
        ]
      }
    ],
    method: 'thermal',
    exceptions: ''
  },{
    name: 'perhalic acid',
    formula: 'XHO4',
    products: [
      3,
      {
        name: 'chlorine molecule',
        formula: 'Cl2',
        elements: [
          1,
          {symbol: 'Cl', charge: 0}
        ]
      },{
        name: 'oxygen molecule',
        formula: 'O2',
        elements: [
          1,
          {symbol: 'O', charge: 0}
        ]
      },{
        name: 'water',
        formula: 'H2O',
        elements: [
          2,
          {symbol: 'H', charge: 1},
          {symbol: 'O', charge: -2}
        ]
      }
    ],
    method: 'thermal',
    exceptions: ''
  },{
    name: 'metal halide',
    formula: 'MX',
    products: [
      2,
      {name: 'metal', formula: 'M', elements: [1, {symbol: 'M', charge: undefined}]},
      {name: 'halogen', formula: 'X', elements: [1, {symbol: 'X', charge: undefined}]},
    ],
    method: 'electrolysis',
    exceptions: ''
  }, {
    name: 'metal oxide',
    formula: 'MO',
    products: [
      2,
      {name: 'metal', formula: 'M', elements: [1, {symbol: 'M', charge: undefined}]},
      {
        name: 'oxygen molecule',
        formula: 'O2',
        elements: [
          1,
          {symbol: 'O', charge: 0},
        ] 
      }
    ],
    method: 'electrolysis',
    exeptions: ''
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
        ]
      },{
        name: 'hydrogen molecule',
        formula: 'H2',
        elements: [
          1,
          {symbol: 'H', charge: 0}
        ]
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
        ]
      },{
        name: 'water',
        formula: 'H2O',
        elements: [
          2,
          {symbol: 'H', charge: 1},
          {symbol: 'O', charge: -2}
        ]
      }
    ],
    method: 'electrolysis',
    exceptions: ''
  },{
    name: 'hydrogen peroxide',
    formula: 'H2O2',
    products: [
      2,
      {
        name: 'water',
        formula: 'H2O',
        elements: [
          2,
          {symbol: 'H', charge: 1},
          {symbol: 'O', charge: -2}
        ]
      },{
        name: 'oxygen molecule',
        formula: 'O2',
        elements: [
          1,
          {symbol: 'O', charge: 0}
        ]
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
          {name: 'halogen', formula: 'X', elements: [1, {symbol: 'X', charge: undefined}]}
        ]
      },{
        name: 'oxygen molecule',
        formula: 'O2',
        elements: [
          1,
          {symbol: 'O', charge: 0}
        ]
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
        ]
      },{
        name: 'hydrogen molecule',
        symbol: 'H2',
        elements: [
          1,
          {symbol: 'H', charge: 0}
        ]
      }
    ],
    method: 'catalytic',
    exceptions: ''
  }, {
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
        ]
      },{
        name: 'hydrogen molecule',
        symbol: 'H2',
        elements: [
          1,
          {symbol: 'H', charge: 0}
        ]
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
        ]
      },{name: 'halogen', formula: 'X', elements: [1, {symbol: 'X', charge: undefined}]}
    ]
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