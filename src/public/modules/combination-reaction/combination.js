function reactionByElement(element1, element2, is_it_possible, getTheCategory, filterByVelance, gettingVelance, allMetals, atomicLength) {
  //--element 1 info--//
  const eleSymbol1 = element1.symbol;
  const oxidationStates1 = gettingVelance( element1.oxidationStates );
  const elementState1 = element1.standardState
  //--element 2 info--//
  const eleSymbol2 = element2.symbol;
  const oxidationStates2 = gettingVelance( element2.oxidationStates );
  const elementState2 = element2.standardState

  const reactionTesting = is_it_possible(element1, element2, getTheCategory, filterByVelance, allMetals, atomicLength);
  console.log(reactionTesting);
  
  const products = getAllProducts(oxidationStates1, oxidationStates2, reactionTesting);
  console.log(products);
  const balancedEquations = balancingEquations(products, reactionTesting);
  
  getEquationsAllInfo(balancedEquations, reactionTesting, '', eleSymbol1, eleSymbol2, elementState1, elementState2, element1, element2);

};
//--------------------------------------------------------------------------------------------------------------------------------------//
function getAllProducts(oxidations1, oxidations2, reactionTesting) {
  const oxidationOnePo = oxidations1.filter(oxi => oxi > 0);
  const oxidationOneNe = oxidations1.filter(oxi => oxi < 0);
  const oxidationTwoPo = oxidations2.filter(oxi => oxi > 0);
  const oxidationTwoNe = oxidations2.filter(oxi => oxi < 0);
  console.log(oxidationOnePo, oxidationOneNe);   console.log(oxidationTwoPo, oxidationTwoNe);
  const reactionInfo = reactionTesting.reaction;

  const positiveByNig = posNig(oxidationOnePo, oxidationTwoNe);
  const nigativeByPos = NigPos(oxidationTwoPo, oxidationOneNe);
  const result = [];
  if (reactionInfo.type === 'ionic') {

    if (reactionInfo.element1Type === 'metal') {
      result.push(...positiveByNig);
    } else {
      result.push(...nigativeByPos);
    };
    
  } else if (reactionInfo.type === 'covalent' || reactionInfo.type === 'intermetallic') {

    if (reactionTesting.electronegativity.deltaEN < 0.5) {
      result.push(...positiveByNig, ...nigativeByPos);
    } else {
      if (reactionTesting.electronegativity.frist < reactionTesting.electronegativity.second) {
        result.push(...positiveByNig);
      }else {
        result.push(...nigativeByPos);
      };
    };

  };
  return result;
};
function posNig(oxidationOnePo, oxidationTwoNe) {
  const result = [];
  oxidationOnePo.forEach( oxi1 => {
    oxidationTwoNe.forEach( oxi2 => {
      let oxi1fam = oxi1;
      let oxi2fam = oxi2;
      if (Math.abs(oxi2fam) === 0.5) {
        oxi1fam = oxi1 * 2;
        oxi2fam = oxi2 * 2;
      }
      const calc = (oxi1fam * Math.abs(oxi2fam)) + (oxi2fam * oxi1fam);
      if (calc === 0) {
        result.push([1, Math.abs(oxi2fam), oxi1fam]);
      };
    });
  });
  return result;
};
function NigPos(oxidationTwoPo, oxidationOneNe) {
  const result = [];
  oxidationTwoPo.forEach( oxi2 => {
    oxidationOneNe.forEach( oxi1 => {
      let oxi1fam = oxi1;
      let oxi2fam = oxi2;
      if (Math.abs(oxi1fam) === 0.5) {
        oxi1fam = oxi1 * 2;
        oxi2fam = oxi2 * 2;
      };
      const calc = (oxi2fam * Math.abs(oxi1fam)) + (oxi1fam * oxi2fam);
      if (calc === 0) {
        result.push([2, oxi2fam, Math.abs(oxi1fam)]);
      };
    });
  });
  return result;
};
//--------------------------------------------------------------------------------------------------------------------------------------//
function balancingEquations(products, reactionTesting) {
  const result = [];
  const reactionInfo = reactionTesting.info;

  const elementR1Q = reactionInfo.first;
  const elementR2Q = reactionInfo.second;

  for (let i = 0;i < products.length;i++) {
    const pro = products[i];
    const elementP1Q = pro[1];
    const elementP2Q = pro[2];
    result.push({
      elementOne: {
        reactantCoff: elementR2Q * elementP1Q,
        reactantQ: elementR1Q
      },
      elementTwo: {
        reactantCoff: elementR1Q * elementP2Q,
        reactantQ: elementR2Q
      },
      productInfo: {
        productCoff: elementR1Q * elementR2Q,
        productQ: pro
      }
    });
    
    const element1Coff = result[i].elementOne.reactantCoff;
    const element2Coff = result[i].elementTwo.reactantCoff;
    const { productCoff } = result[i].productInfo;

    const firstFactor = Array(element1Coff + 1).fill().map((_, i) => i += 1).filter((i) => Number.isInteger(element1Coff / i));
    const secondFactor = Array(element2Coff + 1).fill().map((_, i) => i += 1).filter((i) => Number.isInteger(element2Coff / i));
    const thirdFactor = Array(productCoff + 1).fill().map((_, i) => i += 1).filter((i) => Number.isInteger(productCoff / i));

    const totalCoffF = [];
    let coffFactor;
    firstFactor.forEach( num1 => {
      secondFactor.forEach( num2 => {
        if (num1 === num2) {
          totalCoffF.push(num1);
        };
      });
    });
    upperLoop: for (let i = 0;i < totalCoffF.length;i++) {
      const numf = totalCoffF[i];
      for (let j = 0;j < thirdFactor.length;j++) {
        const num3 = thirdFactor[i];
        if (numf === num3) {
          continue upperLoop;
        };
      };
      totalCoffF.splice(i, 1);
    };
    
    
    if (totalCoffF.length !== 0) {
      coffFactor = Math.max(...totalCoffF);
      result[i].elementOne.reactantCoff = element1Coff / coffFactor;
      result[i].elementTwo.reactantCoff = element2Coff / coffFactor;
      result[i].productInfo.productCoff = productCoff / coffFactor;
    };
  };
  return result;
};
//--------------------------------------------------------------------------------------------------------------------------------------//
function getEquationsAllInfo(equations, reactionTesting, productName, symbol1, symbol2, state1, state2, element1Info, element2Info) {
  console.log(reactionTesting.electronegativity.deltaEN);
  const result = [
    {
      element1: {
        atomicNum: element1Info.atomicNumber,
        name: element1Info.name,
        symbol: element1Info.symbol,
        config: element1Info.electronicConfiguration,
        state: element1Info.standardState,
        group: element1Info.groupBlock,
        electronegativity: reactionTesting.electronegativity.frist
      },
      element2: {
        atomicNum: element2Info.atomicNumber,
        name: element2Info.name,
        symbol: element2Info.symbol,
        config: element2Info.electronicConfiguration,
        state: element2Info.standardState,
        group: element2Info.groupBlock,
        electronegativity: reactionTesting.electronegativity.second
      },
      equationData: {
        possiablity: reactionTesting.possible === true ? 'possible' : 'not possible',
        conditions: reactionTesting.normal === true ? 'possible under normal conditions' : 'NOT possible under normal conditions',
        bondingType: reactionTesting.reaction.type,
        alloyOrNot: reactionTesting.alloy ,
        deltaEN: +reactionTesting.electronegativity.deltaEN.toFixed(2)
      }
    }
  ];
  for (let i = 0;i < equations.length;i++) {
    const equation = equations[i];
    const product = equation.productInfo.productQ;

    const reactant1ChargeNum = product[1] === 1 ? '' : product[1];
    const reactant2ChargeNum = product[2] === 1 ? '' : product[2];

    const fristCharge = product[0] === 1 ? '+' : '-';
    const secondCharge = product[0] === 1 ? '-' : '+';

    let fristElementCharge = `\\(\\ce{${symbol1}^${fristCharge}^${reactant1ChargeNum}}\\)`;
    let secondElementCharge = `\\(\\ce{${symbol2}^${secondCharge}^${reactant2ChargeNum}}\\)`;
    
    if (reactionTesting.reaction.type === 'covalent') {
      fristElementCharge = `\\(\\overset{\\delta${fristCharge}${reactant2ChargeNum}}{${symbol1}}\\)`;
      secondElementCharge =  `\\(\\overset{\\delta${secondCharge}${reactant1ChargeNum}}{${symbol2}}\\)`;
    } else if (reactionTesting.reaction.type === 'intermetallic') {
      fristElementCharge = "intermetallic bonds don't have charges";
      secondElementCharge = '';
    };
    
    result.push({
      equation: getTextEquation(equation, symbol1, symbol2, state1, state2),
      productName: '',
      fristElementCharge,
      secondElementCharge
    });
  };
  console.log(result);
};

function getTextEquation(balancingData, symbol1, symbol2, state1, state2) {
  let symboledEquation;
  const product = balancingData.productInfo.productQ;
  const PQ1 = product[1] === 1 ? '' : product[1];
  const PQ2 = product[2] === 1 ? '' : product[2];
  const PC = balancingData.productInfo.productCoff === 1 ? '' : balancingData.productInfo.productCoff;

  const RC1 = balancingData.elementOne.reactantCoff === 1 ? '' : balancingData.elementOne.reactantCoff;
  const RQ1 = balancingData.elementOne.reactantQ === 1 ? '' : balancingData.elementOne.reactantQ;

  const RC2 = balancingData.elementTwo.reactantCoff === 1 ? '' : balancingData.elementTwo.reactantCoff;
  const RQ2 = balancingData.elementTwo.reactantQ === 1 ? '' : balancingData.elementTwo.reactantQ;
  let state11;
  let state22;
  if (state1 === 'solid') {state11 = 's'}
  else if (state1 === 'liquid') {state11 = 'l'}
  else {state11 = 'g'};

  if (state2 === 'solid') {state22 = 's'}
  else if (state2 === 'liquid') {state22 = 'l'}
  else {state22 = 'g'};

  let element1Piece = `${RC1}${symbol1}_${RQ1}_(_${state11}_)`;
  let element2Piece = `${RC2}${symbol2}_${RQ2}_(_${state22}_)`;
  let productPiece;
  if (RQ1 === '') {
    element1Piece = `${RC1}${symbol1}_(_${state11}_)`;
  }
  if (RQ2 === '') {
    element2Piece = `${RC2}${symbol2}_(_${state22}_)`;
  }
  if (product[0] === 1) {
    if (PQ1 === '') {
      productPiece = `${PC}${symbol1}${symbol2}_${PQ2}`;
    } else {
      productPiece = `${PC}${symbol1}_${PQ1}${symbol2}_${PQ2}`;
    }
  } else {
    if (PQ2 === '') {
      productPiece = `${PC}${symbol2}${symbol1}_${PQ1}`;
    } else {
      productPiece = `${PC}${symbol2}_${PQ2}${symbol1}_${PQ1}`;
    }
  };
  symboledEquation = `\\( \\ce{${element1Piece} + ${element2Piece} \\longrightarrow ${productPiece}} \\)`;
  
  return symboledEquation;
};

export default reactionByElement;