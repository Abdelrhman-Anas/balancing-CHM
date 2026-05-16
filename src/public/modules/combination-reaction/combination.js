async function combinationReaction(getElement, is_it_possible, getTheCategory, filterByVelance, gettingVelance, allMetals, atomicLength, getCompound, toPubChemFormula, tranferToFormula, getElements, commonOxidationStates, combiRules, fixingQ, balancingOtherEquations) {
  const reactant1Symbol = 'Cl2O7';
  const reactant2Symbol = 'H2O';

  const element1 = await getElement(reactant1Symbol);
  const element2 = await getElement(reactant2Symbol);

  if (element1 === undefined && element2 === undefined) {

    return reactionByCompounds(reactant1Symbol, reactant2Symbol, getElements, allMetals, commonOxidationStates, combiRules, fixingQ, balancingOtherEquations, getCompound, toPubChemFormula, tranferToFormula);

  } else if (element1 !== undefined && element2 !== undefined) {

    return reactionByElement(element1, element2, is_it_possible, getTheCategory, filterByVelance, gettingVelance, allMetals, atomicLength, getCompound, toPubChemFormula, tranferToFormula);

  }else {
    console.log('ffffuckkkkkk');
  };
  
};
//--------------------------------------------------------------------------------------------------------------------------------------//
async function reactionByElement(element1, element2, is_it_possible, getTheCategory, filterByVelance, gettingVelance, allMetals, atomicLength, getCompound, toPubChemFormula, tranferToFormula) {

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
  
  return await getEquationsAllInfo(balancedEquations, reactionTesting, '', eleSymbol1, eleSymbol2, elementState1, elementState2, element1, element2, getCompound, toPubChemFormula);
}
//--------------------------------------------------------------------------------------------------------------------------------------//
async function reactionByCompounds(reactant1Symbol, reactant2Symbol, getElements, allMetals, commonOxidationStates, combiRules, fixingQ, balancingOtherEquations, getCompound, toPubChemFormula, tranferToFormula) {
  
  const reactant1Array = reactant1Symbol.split('');
  const reactant2Array = reactant2Symbol.split('');
  
  reactant1Array.forEach((le, index) => {
    reactant1Array[index] = isNaN(Number(le)) ? le : Number(le);
  });

  reactant2Array.forEach((le, index) => {
    reactant2Array[index] = isNaN(Number(le)) ? le : Number(le);
  });
  const symbolicReactant = [reactant1Symbol, reactant2Symbol];
  const elementsArray = [ getElements(reactant1Symbol, reactant1Array),  getElements(reactant2Symbol, reactant2Array) ];
  console.log(elementsArray);
  let modifiedFormula = '';
  let currentformula = '';
  for (let q = 0; q < elementsArray.length;q++) {
    const theReactant = symbolicReactant[q];
    if (theReactant === 'H2O') {
      modifiedFormula += `H2O+`;
      continue;
    };

    for (let i = 1;i < elementsArray[q].length -1; i++) {
      const element = elementsArray[q][i].symbol;
      elementsArray[q][i].oxidation = commonOxidationStates[element].com;
      
      if (allMetals[element]) {
        elementsArray[q][i].coSymbol = 'M';
        continue;
      } else {
        elementsArray[q][i].coSymbol = elementsArray[q][i].symbol;
      };

      const nonmetals = [
        "C", "N", "F", "P", "S", "Cl", "Se", "Br", "I"
      ];

      let inOrOut = false;
      nonmetals.forEach((halo) => {
        if (halo === element) {
          inOrOut = true;
        }
      });
      if (inOrOut === true) {
        elementsArray[q][i].coSymbol = 'Q';
      } else {
        elementsArray[q][i].coSymbol = elementsArray[q][i].symbol;
      };
    };


    for (let i = 1;i < elementsArray[q].length -1; i++) {
      const element = elementsArray[q][i];
      if (element.coSymbol === 'M') {
        currentformula += element.coSymbol;
        continue;
      }else if (element.coSymbol === 'Q') {
        currentformula += element.coSymbol;
        continue;
      }
      if (elementsArray[q].length -2 === 2) {
        currentformula += element.coSymbol
      } else {
        currentformula += element.coSymbol + (element.quantity === 1 ? '' : element.quantity);
      };
    };
    modifiedFormula += `${currentformula}+`;
    currentformula = '';
  };
  modifiedFormula = modifiedFormula.slice(0, -1);
  console.log(modifiedFormula);

  const rules = await combiRules();

  let acceptableRule;
  rules.forEach((rule) => {
    if (rule.formula1 === modifiedFormula || rule.formula2 === modifiedFormula) {
      acceptableRule = rule
    };
  });

  if (!acceptableRule) return 'fuckkkkkkkkkkkkkkk';

  console.log(elementsArray);

  const theProduct = acceptableRule.product[1];
  const ProductElements = theProduct.elements;

  for (let i = 1; i < ProductElements.length;i++) {
    const pElement = ProductElements[i];
    
    if (pElement.symbol === 'M' || pElement.symbol === 'Q') {

      for (let j = 0; j < elementsArray.length;j++) {

        for (let k = 1; k < elementsArray[j].length -1;k++) {
          const otherElement = elementsArray[j][k];

          if (otherElement.coSymbol === 'M' && pElement.symbol === 'M' ) {
            acceptableRule.product[1].elements[i].charge = otherElement.oxidation;
            acceptableRule.product[1].elements[i].symbol = otherElement.symbol;

            acceptableRule.product[1].quantities[otherElement.symbol] = acceptableRule.product[1].quantities['M'];
            delete  acceptableRule.product[1].quantities['M'];
            
          } else if (otherElement.coSymbol === 'Q' && pElement.symbol === 'Q') {
            acceptableRule.product[1].elements[i].charge = otherElement.oxidation;
            acceptableRule.product[1].elements[i].symbol = otherElement.symbol;

            acceptableRule.product[1].quantities[otherElement.symbol] = acceptableRule.product[1].quantities['Q'];
            delete  acceptableRule.product[1].quantities['Q'];
          };
        };
      };
    };
  };

  const quantitesArray = Object.entries(acceptableRule.product[1].quantities);
  let howMuch = 0;
  for (let i = 0; i < quantitesArray.length;i++) {
    const quantity = quantitesArray[i];
    if (quantity[1] === undefined) {
      howMuch++;
    };
  };
  if (howMuch === quantitesArray.length) {
    let oxidationArray = [];

    const imposterElements = [];
    for (let q = 0; q < elementsArray.length;q++) {
      const elementalArray = elementsArray[q];
      const elementalSymbol = symbolicReactant[q];

      if (elementalSymbol === 'H2O') {
        oxidationArray.push(['H', 1]);
      } else {
        let centralOxidation = 0;
        let centralElement;
        for (let i = 1; i < elementalArray.length -1;i++) {
          const element = elementalArray[i];

          if (element.coSymbol === 'Q' || element.coSymbol === 'M') {
            centralElement = element;
            imposterElements.push(element);
            continue;
          };
          
          centralOxidation += -(await commonOxidationStates[element.symbol].com) * element.quantity;
        };
        oxidationArray.push([centralElement.symbol, centralOxidation / centralElement.quantity]);
      };
    };



    if (oxidationArray[0][0] === oxidationArray[1][0]) {
      oxidationArray = [[oxidationArray[0][0], (oxidationArray[0][1] + oxidationArray[1][1]) / 2]];
    }

    const productElements = acceptableRule.product[1].elements;

    for (let i = 0; i < oxidationArray.length;i++) {
      const anElement = oxidationArray[i];

      for (let j = 1; j < productElements.length;j++) {
        const neElement = productElements[j];
        const theImposter = imposterElements.find( array => array.symbol === neElement.symbol);
        if (anElement[0] === neElement.symbol && theImposter !== undefined) {
          acceptableRule.product[1].elements[j].charge = anElement[1];
        };
      };
    };
    console.log(productElements);

    if (productElements[0] === 2) {
      const coffArray = [[productElements[1].charge, undefined], [productElements[2].charge, undefined]];

      const nums = [...Array(10).keys()].slice(2);
      outerloop: for (let i = 0; i < coffArray.length;i++) {
        const aCoff = coffArray[i];

        for (let j = 0; j < nums.length;j++) {
          const num = nums[j];

          if (Number.isInteger(aCoff[0] / num)) {

            coffArray[i][1] = num;
            continue outerloop;
          };
        };
      };
      let firstCoff;    let secondCoff;
      if (coffArray[0][1] === coffArray[1][1]) {
        firstCoff = Math.abs(coffArray[0][0] / coffArray[0][1]);
        secondCoff = Math.abs(coffArray[1][0] / coffArray[1][1]);
      } else {
        firstCoff = Math.abs(coffArray[0][0]);
        secondCoff = Math.abs(coffArray[1][0]);
      };
      const fristHalf = `${productElements[1].symbol}${secondCoff === 1 ? '' : secondCoff}`;
      const secondHalf = `${productElements[2].symbol}${firstCoff === 1 ? '' : firstCoff}`;

      acceptableRule.product[1].formula = fristHalf + secondHalf;
      acceptableRule.product[1].quantities[productElements[1].symbol] = secondCoff;
      acceptableRule.product[1].quantities[productElements[2].symbol] = firstCoff;
    } else {
      const fristCharge = productElements[1].charge;
      const secondcharge = productElements[2].charge;
      const thirdcharge = productElements[3].charge;

      let X = 1;     let Y = 1;     let Z = 0;

      for (let i = 0; i < 15; i++) {
        const calc = (fristCharge*X + secondcharge*Y) / -thirdcharge;
        if (X === Y) {
          if (Number.isInteger(calc)) {
            Z = calc;
            break;
          } else {
            X++;
            continue;
          }
        } else if (X > Y) {
          if (Number.isInteger(calc)) {
            Z = calc;
            break;
          } else {
            X--;
            Y++;
            continue;
          }
        } else {
          if (Number.isInteger(calc)) {
            Z = calc;
            break;
          } else {
            X++;
            continue;
          };
        };
      };
      const fristHalf = `${productElements[2].symbol}${Y === 1 ? '' : Y}`;
      const secondHalf = `${productElements[1].symbol}${X === 1 ? '' : X}`;
      const thirdHalf = `${productElements[3].symbol}${Z === 1 ? '' : Z}`;
      
      acceptableRule.product[1].formula = fristHalf + secondHalf + thirdHalf;
      acceptableRule.product[1].quantities[productElements[2].symbol] = Y;
      acceptableRule.product[1].quantities[productElements[1].symbol] = X;
      acceptableRule.product[1].quantities[productElements[3].symbol] = Z;
    };
    
  } else {
    acceptableRule.product[1].quantities['H'] = Math.abs(acceptableRule.product[1].elements[1].charge);
    acceptableRule.product[1].quantities['O'] = Math.abs(acceptableRule.product[1].elements[1].charge);
    delete acceptableRule.product[1].quantities['OH'];
    const theMainProduct = acceptableRule.product[1];
    let formula = '';
    const fristHalf = 
      `${theMainProduct.elements[1].symbol}${
        theMainProduct.quantities[theMainProduct.elements[1].symbol] === 1 ?
          '' : theMainProduct.quantities[theMainProduct.elements[1].symbol]
      }`
    ;

    const secondHalf = 
      `${theMainProduct.quantities['O'] === 1 ? 'OH' : `(OH)${theMainProduct.quantities['O']}`}`
    ;
    formula = fristHalf + secondHalf;
    acceptableRule.product[1].formula = formula;
  };
  const finalResultArray = [
    [{
      name: '',
      formula: symbolicReactant[0]
    },{
      name: '',
      formula: symbolicReactant[1]
    },{
      name: '',
      formula: acceptableRule.product[1].formula
  }]];

  for (let i = 0; i < finalResultArray[0].length;i++) {
    const elementObject = finalResultArray[0][i];
    const compoundData1 = await getCompound(toPubChemFormula(elementObject.formula), elementObject.formula);
    if (compoundData1.success === false) {
      finalResultArray[0][i].name = "couldn't fetch";
    } else {
      //cid: compoundData.id.id.cid
      const compoundData = compoundData1.data.PC_Compounds[0];

      finalResultArray[0][i].cid = compoundData.id.id.cid;

      for (let h = 0;h < compoundData.props.length;h++) {
        const section = compoundData.props[h];
        if (section.urn.label === 'IUPAC Name') {
          finalResultArray[0][i].name = (section.value.sval).replaceAll(';', ' ');
          break;
        };
      };
    };
  };

  const formulaArray = [...symbolicReactant, acceptableRule.product[1].formula];
  const allQuantitesArray = [];

  let currentObject = {};
  for(let i = 0; i < elementsArray.length; i++) {
    const currentArray = elementsArray[i];

    for (let j = 1;j < currentArray.length -1;j++) {
      const element = currentArray[j];
      currentObject[element.symbol] = element.quantity;
    };
    allQuantitesArray.push(currentObject);
    currentObject = {};
  };
  allQuantitesArray.push(acceptableRule.product[1].quantities);
  console.log(formulaArray);
  console.log(allQuantitesArray);

  const fixedQuantities = fixingQ(getElements, formulaArray, allQuantitesArray);
  console.log(fixedQuantities);

  const allElements = Object.entries(fixedQuantities[2]);
  console.log(allElements);
  const balancingMatrix = [];
  let currentRow = [];

  for (let i = 0; i < allElements.length;i++) {
    const elementalSymbol = allElements[i][0];

    for (let j = 0; j < fixedQuantities.length;j++) {
      const quantityObject = fixedQuantities[j];

      if (quantityObject[elementalSymbol] === undefined && j < fixedQuantities.length -1) {
        currentRow.push(0);
        continue;
      } else if (quantityObject[elementalSymbol] !== undefined && j < fixedQuantities.length -1) {
        currentRow.push(quantityObject[elementalSymbol]);
        continue;
      } else if (j === fixedQuantities.length -1) {
        currentRow.push(-quantityObject[elementalSymbol]);
      };
    };
    balancingMatrix.push(currentRow);
    currentRow = [];
  };
  console.log(balancingMatrix);
  
  const balancedCoff = await balancingOtherEquations(balancingMatrix);
  console.log(balancedCoff);

  let textedEquation = '\\(\\ce{ ';
  let symboledEquation = '\\(\\ce{ ';
  for (let i = 0; i < finalResultArray[0].length;i++) {
    const anEquationSet = finalResultArray[0][i];
    const equationCoff = balancedCoff[i];

    if (i === finalResultArray[0].length -1) {
      textedEquation = textedEquation.slice(0, -1);
      symboledEquation = symboledEquation.slice(0, -1);
      console.log(balancedCoff);
      textedEquation += `\\longrightarrow ${anEquationSet.name} `;
      symboledEquation += `\\longrightarrow ${equationCoff === 1? '' : equationCoff}${tranferToFormula(anEquationSet.formula)} `;
    }else {
      textedEquation += ` ${anEquationSet.name} +`;
      symboledEquation += ` ${equationCoff === 1? '' : equationCoff}${tranferToFormula(anEquationSet.formula)} +`;
    }
  };
  textedEquation += '}\\)';
  symboledEquation += '}\\)';
  finalResultArray.push({
    textedEquation,
    symboledEquation
  });
  console.log(finalResultArray);

  console.log(acceptableRule);
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

    if (reactionTesting.electronegativity.frist < reactionTesting.electronegativity.second) {
      result.push(...positiveByNig);
    } else {
      result.push(...nigativeByPos);
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
async function getEquationsAllInfo(equations, reactionTesting, productName, symbol1, symbol2, state1, state2, element1Info, element2Info, getCompound, toPubChemFormula) {
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
    const equationAndProduct = getTextEquation(equation, symbol1, symbol2, state1, state2);
    const compoundData1 = await getCompound(toPubChemFormula(equationAndProduct.productEntry), equationAndProduct.productEntry);
    if (compoundData1.success) {
      const compoundData = compoundData1.data.PC_Compounds[0];
      const productData = {
        cid: compoundData.id.id.cid,
        formula: equationAndProduct.productEntry
      };

      for (let h = 0;h < compoundData.props.length;h++) {
        const section = compoundData.props[h];
        if (section.urn.label === 'IUPAC Name') {
          productData.name = (section.value.sval).replaceAll(';', ' ');
        };
      };

      result.push({
        equation: equationAndProduct.equation,
        productData,
        fristElementCharge,
        secondElementCharge
      });
    } else {
      continue;
    }
    
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
  let productEntry;
  if (RQ1 === '') {
    element1Piece = `${RC1}${symbol1}_(_${state11}_)`;
  }
  if (RQ2 === '') {
    element2Piece = `${RC2}${symbol2}_(_${state22}_)`;
  }
  if (product[0] === 1) {
    if (PQ1 === '') {
      productPiece = `${PC}${symbol1}${symbol2}_${PQ2}`;
      productEntry = `${symbol1}${symbol2}${PQ2}`;
    } else {
      productPiece = `${PC}${symbol1}_${PQ1}${symbol2}_${PQ2}`;
      productEntry = `${symbol1}${PQ1}${symbol2}${PQ2}`;
    }
  } else {
    if (PQ2 === '') {
      productPiece = `${PC}${symbol2}${symbol1}_${PQ1}`;
      productEntry = `${symbol2}${symbol1}${PQ1}`;
    } else {
      productPiece = `${PC}${symbol2}_${PQ2}${symbol1}_${PQ1}`;
      productEntry = `${symbol2}${PQ2}${symbol1}${PQ1}`;
    }
  };
  symboledEquation = `\\( \\ce{${element1Piece} + ${element2Piece} \\longrightarrow ${productPiece}} \\)`;
  
  return {equation: symboledEquation, productEntry};
};

export default combinationReaction;