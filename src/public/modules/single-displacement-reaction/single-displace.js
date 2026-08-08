async function single_displaceReaction(r1, r2, getElement, getElements, commonOxidationStates, allMetals, metalic_series, halous_series, singDispRules, getCompound, toPubChemFormula, tranferToFormula, atomicLengthBySymbol, fixingQ, balancingEquations, gettingSaltyProduct, findSimplifiedCharge) {
  
  const reactant1Symbol = r1;
  const reactant2Symbol = r2;

  const reactant1Array = reactant1Symbol.split('');
  const reactant2Array = reactant2Symbol.split('');
  
  reactant1Array.forEach((le, index) => {
    reactant1Array[index] = isNaN(Number(le)) ? le : Number(le);
  });

  reactant2Array.forEach((le, index) => {
    reactant2Array[index] = isNaN(Number(le)) ? le : Number(le);
  });
  const symbolicReactant = [reactant1Symbol, reactant2Symbol]
  const elementsArray = [ 
    getElements(reactant1Symbol, reactant1Array, atomicLengthBySymbol),
    getElements(reactant2Symbol, reactant2Array, atomicLengthBySymbol)
  ];

  let modifiedFormula = '';
  let currentformula = '';

  let anotherMetal = 0;
  let anotherHalogen = 0;
  for (let q = 0; q < elementsArray.length;q++) {
    const theReactant = symbolicReactant[q];

    if (theReactant === 'H2O') {
      modifiedFormula += `H2O+`;
      anotherMetal++
      continue;
    };

    for (let i = 1;i < elementsArray[q].length -1; i++) {
      const element = elementsArray[q][i].symbol;
      elementsArray[q][i].oxidation = commonOxidationStates[element].com;
      
      let thereOrNot = false;
      for (let j = 0; j < metalic_series.length;j++) {
        const metallicElement = metalic_series[j];
        if (metallicElement === element) {
          thereOrNot = true;
          break;
        };
      };

      if (thereOrNot) {
        if (anotherMetal === 1) {
          elementsArray[q][i].coSymbol = 'A';
          anotherMetal++;
          continue;
        };
        elementsArray[q][i].coSymbol = 'M';
        anotherMetal++;
        continue;
      } else {
        elementsArray[q][i].coSymbol = elementsArray[q][i].symbol;
      };

      let inOrOut = false;
      const halogens = ['F', 'Cl', 'Br', 'I'];

      halogens.forEach((halo) => {
        if (halo === element) {
          inOrOut = true;
        }
      });
      if (inOrOut === true) {
        if (anotherHalogen === 1) {
          elementsArray[q][i].coSymbol = 'Q';
          anotherHalogen++;
        } else {
          elementsArray[q][i].coSymbol = 'X';
          anotherHalogen++;
        }
      } else {
        elementsArray[q][i].coSymbol = elementsArray[q][i].symbol;
      };
    };


    for (let i = 1;i < elementsArray[q].length -1; i++) {
      const element = elementsArray[q][i];
      if (element.coSymbol === 'M' || element.coSymbol === 'X' || element.coSymbol === 'A' || element.coSymbol === 'Q') {
        currentformula += element.coSymbol;
        continue;
      };

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
  
  if (modifiedFormula.includes('M') && modifiedFormula.includes('A')) {
    modifiedFormula = 'M+AA'
  }
  //console.log(elementsArray);
  const rules = await singDispRules(gettingSaltyProduct, elementsArray, symbolicReactant);

  let acceptableRule;
  rules.forEach((rule) => {
    if (rule.formula1 === modifiedFormula || rule.formula2 === modifiedFormula) {
      acceptableRule = rule
    };
  });

  if (!acceptableRule) return {equationData: {symboledEquation: 'No reation or need higher tools to predict'}};

  for (let a = 1; a < acceptableRule.products.length;a++) {
    const theProduct = acceptableRule.products[a];
    const ProductElements = theProduct.elements;

    for (let i = 1; i < ProductElements.length;i++) {
      const pElement = ProductElements[i];
      
      if (pElement.symbol === 'M' || pElement.symbol === 'Q' || pElement.symbol === 'A' || pElement.symbol === 'X') {

        for (let j = 0; j < elementsArray.length;j++) {

          for (let k = 1; k < elementsArray[j].length -1;k++) {
            const otherElement = elementsArray[j][k];

            if (otherElement.coSymbol === 'A' && pElement.symbol === 'A') {
              acceptableRule.products[a].elements[i].charge = otherElement.oxidation;
              acceptableRule.products[a].elements[i].symbol = otherElement.symbol;
              acceptableRule.products[a].elements[i].coSymbol = 'A';

              acceptableRule.products[a].quantities[otherElement.symbol] = acceptableRule.products[a].quantities['A'];
              delete  acceptableRule.products[a].quantities['A'];

            }else if (otherElement.coSymbol === 'M' && pElement.symbol === 'M') {
              acceptableRule.products[a].elements[i].charge = otherElement.oxidation;
              acceptableRule.products[a].elements[i].symbol = otherElement.symbol;
              acceptableRule.products[a].elements[i].coSymbol = 'M';

              acceptableRule.products[a].quantities[otherElement.symbol] = acceptableRule.products[a].quantities['M'];
              delete  acceptableRule.products[a].quantities['M'];

            } else if (otherElement.coSymbol === 'X' && pElement.symbol === 'X') {
              acceptableRule.products[a].elements[i].charge = otherElement.oxidation;
              acceptableRule.products[a].elements[i].symbol = otherElement.symbol;
              acceptableRule.products[a].elements[i].coSymbol = 'X';

              acceptableRule.products[a].quantities[otherElement.symbol] = acceptableRule.products[a].quantities['X'];
              delete  acceptableRule.products[a].quantities['X'];

            } else if (otherElement.coSymbol === 'Q' && pElement.symbol === 'Q') {
              acceptableRule.products[a].elements[i].charge = otherElement.oxidation;
              acceptableRule.products[a].elements[i].symbol = otherElement.symbol;
              acceptableRule.products[a].elements[i].coSymbol = 'Q';

              acceptableRule.products[a].quantities[otherElement.symbol] = acceptableRule.products[a].quantities['Q'];
              delete  acceptableRule.products[a].quantities['Q'];
            };
          };
        };
      };
    };
  };

  let firstElement = '';
  let secondElement = '';
  for (let i = 0;i < elementsArray.length;i++) {
    const anElementArray = elementsArray[i];

    for (let j = 1; j < anElementArray.length -1;j++) {
      const anElement = anElementArray[j];
      if (anotherMetal === 2) {
        if (modifiedFormula === 'M+H2O' || modifiedFormula === 'H2O+M') {

          if (anElement.coSymbol === 'M') {
            firstElement = anElement.symbol;
          } else if (anElement.symbol === 'H') {
            secondElement = anElement.symbol;
          };

        } else {

          if (anElement.coSymbol === 'M') {
            firstElement = anElement.symbol;
          } else if (anElement.coSymbol === 'A') {
            secondElement = anElement.symbol;
          };
        };

      } else if (anotherHalogen === 2) {

        if (anElement.coSymbol === 'X') {
          firstElement = anElement.symbol;
        } else if (anElement.coSymbol === 'Q') {
          secondElement = anElement.symbol;
        };
      };
    };
  };

  let firstIndex = 0;          let secondIndex = 0;
  if (anotherMetal === 2) {

    for (let i = 0; i < metalic_series.length;i++) {
      if (metalic_series[i] === firstElement) firstIndex = i;
      else if (metalic_series[i] === secondElement) secondIndex = i;
    };

  } else if (anotherHalogen === 2) {

    for (let i = 0; i < halous_series.length;i++) {
      if (halous_series[i] === firstElement) firstIndex = i;
      else if (halous_series[i] === secondElement) secondIndex = i;
    };
  };

  const element1 = await getElement(reactant1Symbol);
  const element2 = await getElement(reactant2Symbol);

  if (element1 === undefined) {
    if (firstIndex < secondIndex || firstIndex === secondIndex) {
      return 'No Reaction';
    }
  } else if (element2 === undefined) {
    if (firstIndex > secondIndex || firstIndex === secondIndex) {
      return 'No Reaction';
    }
  }
  
  const allTheProducts = acceptableRule.products;

  for (let j = 1; j< allTheProducts.length; j++) {
    const aProductElements = allTheProducts[j].elements;
    
    acceptableRule.products[j] = findSimplifiedCharge(acceptableRule.products[j]);
    
    for (let q = 1; q < aProductElements.length;q++) {
      const element = aProductElements[q];

      if (allTheProducts[j].quantities[element.symbol] === undefined || allTheProducts[j].quantities[element.symbol][0] === undefined) {

        if (aProductElements.length -1 === 1) {
          let found = false;
          for (let i = 0; i < atomicLengthBySymbol.length;i++) {

            for (let q = 1; q < atomicLengthBySymbol[i].length;q++) {

              if (atomicLengthBySymbol[i][q] === element.symbol) {
                acceptableRule.products[j].quantities[element.symbol] = atomicLengthBySymbol[i][0];
                found = true;
                break;
              };
            };
          };
          if (!found) {
           acceptableRule.products[j].quantities[element.symbol] = 1;
          };
        } else if (aProductElements[q + 1] === undefined) {
          if (typeof aProductElements[q - 1] !== 'number') {

            if (typeof allTheProducts[j].quantities[element.symbol] === "undefined") {

              acceptableRule.products[j].quantities[element.symbol] = Math.abs(aProductElements[q - 1].charge);
            } else if (typeof allTheProducts[j].quantities[element.symbol] === "object") {
  
              acceptableRule.products[j].quantities[element.symbol][0] = Math.abs(aProductElements[q - 1].charge);
            }
          }
        } else if (typeof aProductElements[q - 1] !== 'undefined') {

          if (typeof allTheProducts[j].quantities[element.symbol] === "undefined") {

            acceptableRule.products[j].quantities[element.symbol] = Math.abs(aProductElements[q + 1].charge);
          } else if (typeof allTheProducts[j].quantities[element.symbol] === "object") {

            acceptableRule.products[j].quantities[element.symbol][0] = Math.abs(aProductElements[q + 1].charge);
          };
        };
      };
    };

    let theNewFormula = '';
    let firstHalf = '';
    let secondHalf = '';
    
    if (aProductElements.length === 2) {
      theNewFormula = aProductElements[1].symbol + 
      (allTheProducts[j].quantities[aProductElements[1].symbol] === 1 ? '' : allTheProducts[j].quantities[aProductElements[1].symbol]);
    } else {
      const quantitiesObject = acceptableRule.products[j].quantities;

      
      for (let q = 1; q < aProductElements.length;q++) {
        const anElements = aProductElements[q];

        let thisHalf = '';
        if (typeof quantitiesObject[anElements.symbol] === 'object') {

          const smallObjectArray = Object.entries(quantitiesObject[anElements.symbol][1]);

          for (let k = 0; k < smallObjectArray.length;k++) {
            const aQuantity = smallObjectArray[k];

            thisHalf += `${aQuantity[0]}${aQuantity[1] === 1 ? '' : aQuantity[1]}`;
          };
          thisHalf = quantitiesObject[anElements.symbol][0] === 1 ? thisHalf : `(${thisHalf})${quantitiesObject[anElements.symbol][0]}`;

        } else if (typeof quantitiesObject[anElements.symbol] === 'number') {
          thisHalf += `${anElements.symbol}${quantitiesObject[anElements.symbol] === 1 ? '' : quantitiesObject[anElements.symbol]}`;
        };
        theNewFormula += thisHalf;
      };
    };
    acceptableRule.products[j].formula = theNewFormula;

    const theproduct = allTheProducts[j];
    //console.log(theproduct.formula);
    const compoundData1 = await getCompound(toPubChemFormula(theproduct.formula), theproduct.formula);
    if (compoundData1.success === false) {
      return compoundData.data
    };

    const compoundData = compoundData1.data.PC_Compounds[0];
    if (compoundData !== undefined) {

      acceptableRule.products[j].cid = compoundData.id.id.cid;

      let nameClear = false;
      let weightClear = false;
      for (let h = 0;h < compoundData.props.length;h++) {
        const section = compoundData.props[h];

        if (nameClear && weightClear) break;

        if (section.urn.label === 'IUPAC Name' && !nameClear) {

          acceptableRule.products[j].name = (section.value.sval).replaceAll(';', ' ');
          nameClear = true;

        } else if (section.urn.label === 'Molecular Weight' && !weightClear) {

          acceptableRule.products[j].weight = Number(section.value.sval);
          weightClear = true;
        };
      };
    } else {
      acceptableRule.products[j].name = "couldn't fetch";
    };
  };

  const finalEquationObject = {
    products: acceptableRule.products,
    reactants: [],
    equationData: {}
  };
  
  for (let i = 0; i < symbolicReactant.length;i++) {
    let aReactant = symbolicReactant[i];
    const elementalArray = elementsArray[i];

    if (elementalArray.length -2 === 1) {
      aReactant = `${elementalArray[1].symbol}${elementalArray[1].quantity === 1 ? '' : elementalArray[1].quantity}`
    }

    const compoundData1 = await getCompound(toPubChemFormula(aReactant), aReactant);
    if (compoundData1.success === false) {
      finalEquationObject.reactants.push({
        cid: '',
        formula: aReactant,
        name: "couldn't fetch"
      });
    } else {
      const compoundData = compoundData1.data.PC_Compounds[0];
    
      finalEquationObject.reactants.push({
        cid: compoundData.id.id.cid,
        formula: aReactant
      });
      let nameClear = false;
      let weightClear = false;
      for (let h = 0;h < compoundData.props.length;h++) {
        const section = compoundData.props[h];
        if (nameClear && weightClear) break;

        if (section.urn.label === 'IUPAC Name' && !nameClear) {
          finalEquationObject.reactants[finalEquationObject.reactants.length -1].name = (section.value.sval).replaceAll(';', ' ');
          nameClear = true;
        } else if (section.urn.label === 'Molecular Weight' && !weightClear) {
          finalEquationObject.reactants[finalEquationObject.reactants.length -1].weight = Number(section.value.sval);
          weightClear = true;
        };
      };
    };
  };
  
  const formulaArray = [...symbolicReactant];

  const onlyQuantites = [];
  const theProducts = acceptableRule.products;

  for (let i = 0; i < elementsArray.length;i++) {
    const elementalArray = elementsArray[i];

    const currentOne = {};
    for (let j = 1; j < elementalArray.length -1;j++) {
      currentOne[elementalArray[j].symbol] = elementalArray[j].quantity;
    };
    onlyQuantites.push(currentOne);
  };

  for (let j = 1; j < theProducts.length;j++) {
    const aProductElements = theProducts[j].elements;
    
    const productEntries = [];
    for (let u = 1; u < aProductElements.length;u++) {
      const anElement = aProductElements[u];
      productEntries.push(anElement.symbol);
    };

    let finalObject = {};
    for (let u = 0; u < productEntries.length;u++) {
      const entry = productEntries[u];

      if (typeof theProducts[j].quantities[entry] === 'object') {
        const quantitiesArray = theProducts[j].quantities[entry];
        const allQuantity = Object.fromEntries(
          Object.entries(quantitiesArray[1]).map(([key, value]) => [key, value * quantitiesArray[0]])
        );
        const allQuantityArray = Object.entries(allQuantity);
        const finalObjectArray = Object.entries(finalObject);

        for (let q = 0; q < allQuantityArray.length;q++) {
          const aQuantity = allQuantityArray[q];

          let thereOrNot = false;
          finalObjectArray.forEach((finalQuantity) => {
            if (finalQuantity[0] === aQuantity[0]) {
              thereOrNot = true;
            };
          });
          if (thereOrNot === false) {
            finalObject[aQuantity[0]] = aQuantity[1];
          } else {
            finalObject[aQuantity[0]] = finalObject[aQuantity[0]] + aQuantity[1];
          };
        };
      } else {
        if (finalObject[entry] === undefined) {
          finalObject[entry] = theProducts[j].quantities[entry];
        } else {
          
          finalObject[entry] = theProducts[j].quantities[entry] + finalObject[entry];
        };

      };
    };
    onlyQuantites.push(finalObject);
  };

  const fixedQuantities = fixingQ(getElements, [formulaArray], [onlyQuantites])[0];
  //console.log(fixedQuantities);


  const allElements = Object.entries({...fixedQuantities[0], ...fixedQuantities[1]});

  const balancingMatrix = [];
  let currentRow = [];

  for (let i = 0; i < allElements.length;i++) {
    const elementalSymbol = allElements[i][0];

    for (let j = 0; j < fixedQuantities.length;j++) {
      const quantityObject = fixedQuantities[j];
      
      if (quantityObject[elementalSymbol] === undefined && j < fixedQuantities.length -2) {
        currentRow.push(0);

      } else if (quantityObject[elementalSymbol] !== undefined && j < fixedQuantities.length -2) {
        currentRow.push(quantityObject[elementalSymbol]);

      } else if (j >= fixedQuantities.length -2) {

        if (quantityObject[elementalSymbol] === undefined) currentRow.push(0);
        
        else currentRow.push(-quantityObject[elementalSymbol]);
      };
    };
    balancingMatrix.push(currentRow);
    currentRow = [];
  };

  const balancedCoff = await balancingEquations(balancingMatrix);

  let textedEquation = '\\(\\ce{';
  let symboledEquation = '\\(\\ce{';
  for (let i = 0; i < finalEquationObject.reactants.length;i++) {
    const aReactant = finalEquationObject.reactants[i];

    finalEquationObject.reactants[i].coff = balancedCoff[i];

    textedEquation += ` ${aReactant.name} +`
    symboledEquation += ` ${balancedCoff[i] === 1 ? '' : balancedCoff[i]}${tranferToFormula(aReactant.formula)} +`
  };
  textedEquation = textedEquation.slice(0, -1);
  symboledEquation = symboledEquation.slice(0, -1);

  textedEquation += '\\longrightarrow';
  symboledEquation += '\\longrightarrow';

  for (let i = 1; i < finalEquationObject.products.length;i++) {
    const aProduct = finalEquationObject.products[i];

    finalEquationObject.products[i].coff = balancedCoff[i + 1];

    textedEquation += ` ${aProduct.name} +`;
    symboledEquation += ` ${balancedCoff[i + 1] === 1 ? '' : balancedCoff[i + 1]}${tranferToFormula(aProduct.formula)} +`;
  };
  textedEquation = textedEquation.slice(0, -1);
  symboledEquation = symboledEquation.slice(0, -1);
  
  finalEquationObject.equationData.textedEquation = textedEquation + '}\\)';
  finalEquationObject.equationData.symboledEquation = symboledEquation +  '}\\)';

  //console.log(finalEquationObject);
  //console.log(acceptableRule);

  return finalEquationObject;
};
export default single_displaceReaction;