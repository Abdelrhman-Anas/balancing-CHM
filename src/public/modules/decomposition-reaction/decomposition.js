async function decompositionReaction(r1,ammoniumProductPraser, ammoniumExceptionProduct, commonOxidationStates, atomicLength1, getElement, getTheCategory, decomRules, getElements, allMetals, getCompound, toPubChemFormula, balancingEquations, fixingQ, tranferToFormula, atomicLength, findSimplifiedCharge) {

  let symbolicShape = r1;
  
  const symbolicShapeArray = symbolicShape.split('');

  symbolicShapeArray.forEach((le, index) => {
    symbolicShapeArray[index] = isNaN(Number(le)) ? le : Number(le);
  });

  const symbolicShapeElements = getElements(symbolicShape, symbolicShapeArray, atomicLength);
  const symbolicShapeElementsOr = getElements(symbolicShape, symbolicShapeArray, atomicLength);
  let modifiedFormula = '';
  if (symbolicShape.includes('NH4')) {
    modifiedFormula = 'NH4Z';
  } else {
    for (let i = 1;i < symbolicShapeElements.length -1; i++) {
      const element = symbolicShapeElements[i].symbol;
      symbolicShapeElements[i].oxidation = commonOxidationStates[element].com;
      
      if (allMetals[element]) {
        symbolicShapeElements[i].coSymbol = 'M';
        continue;
      } else {
        symbolicShapeElements[i].coSymbol = symbolicShapeElements[i].symbol;
      }

      let inOrOut = false;
      const halogens = ['F', 'Cl', 'Br', 'I'];

      halogens.forEach((halo) => {
        if (halo === element) {
          inOrOut = true;
        }
      });
      if (inOrOut === true) {
        symbolicShapeElements[i].coSymbol = 'X';
      } else {
        symbolicShapeElements[i].coSymbol = symbolicShapeElements[i].symbol;
      }
    };


    for (let i = 1;i < symbolicShapeElements.length -1; i++) {
      const element = symbolicShapeElements[i];
      if (element.coSymbol === 'M') {
        modifiedFormula += element.coSymbol;
        continue;
      }else if (element.coSymbol === 'X') {
        modifiedFormula += element.coSymbol;
        continue;
      }
      if (symbolicShapeElements.length -2 === 2) {
        modifiedFormula += element.coSymbol
      } else {
        modifiedFormula += element.coSymbol + (element.quantity === 1 ? '' : element.quantity);
      };
    };
  }
  
  const theDecompositionRules = await decomRules(ammoniumProductPraser, ammoniumExceptionProduct, commonOxidationStates, atomicLength1, getElement, getTheCategory, symbolicShape, atomicLength);

  const modifiedFormulaArray = modifiedFormula.split('');
  let yesOrNo = false;

  modifiedFormulaArray.forEach((letter) => {
    if (letter === 'M' || letter === 'X') {
      yesOrNo = true;
    } 
  })

  if (!yesOrNo && modifiedFormula !== 'NH4Z') {
    modifiedFormula = symbolicShape;
  };
  const acceptableRules = [];
  theDecompositionRules.forEach((rule) => {
    if (rule.formula === modifiedFormula) {
      acceptableRules.push(rule);
    };
  });

  if (acceptableRules.length === 0) {
    return [[undefined, 'No reation or need higher tools to predict']]
  }
  
  let metalIndex = 0;
  for (let i = 1;i < symbolicShapeElements.length -1;i++) {
    const element = symbolicShapeElements[i];
    if (element.coSymbol === 'M') {
      metalIndex = i;
    };
  };

  const equationsProducts = [];
  if (modifiedFormula === 'NH4Z') {
    symbolicShapeElements.splice(1, 2);
 
    let acid = '';
    for (let i =1; i < symbolicShapeElements.length-1;i++) {
      const element = symbolicShapeElements[i];
      acid += element.symbol + (element.quantity === 1 ? '' : element.quantity);
    };
    const exceptions = acceptableRules[0].exceptions;

    for (let i = 1; i< exceptions.length;i++) {
      const theException = exceptions[i];
      const { elements} = theException;

      let search = false;
      elements.forEach((element) => {
        if (element === acid) {
          search = true;
        };
      });

      if (search) {
        equationsProducts.push({products: theException.products, method: acceptableRules[0].method});
        break;
      } else {
        if (exceptions.length -1 === i) {
          equationsProducts.push({products: acceptableRules[0].products, method: acceptableRules[0].method});
          break;
        };
      };
    };


  }else {
  
    const metallicElement = metalIndex === 0 ? 'J' : symbolicShapeElements[metalIndex].symbol

    acceptableRules.forEach((rule, index) => {
      const {exceptions} = rule;

      if (exceptions === '') {
        equationsProducts.push({products: rule.products, method: rule.method});
        acceptableRules.splice(index, 1);

      } else {

        for (let i = 1;i < exceptions.length;i++) {
          const theException = exceptions[i];
          const {elements} = theException;
          const {products} = theException;

          let search = false;
          elements.forEach((theElement) => {
            if (theElement === metallicElement) {
              search = true;
            };
          });

          if (search) {
            equationsProducts.push({products: products, method: rule.method});
            break;
          } else {
            if (i === exceptions.length -1) {
              equationsProducts.push({products: rule.products, method: rule.method});
              break;
            };
          };
        };
      };
    });
  };

  
  for (let i = 0; i< equationsProducts.length; i++) {
    const theProducts = equationsProducts[i].products;

    for (let j = 1; j < theProducts.length;j++) {
      const aProductElements = theProducts[j].elements;

      let thereOrNot = 0;
      let elementMIndex = 0;
      let elementXIndex = 0;
      let bothOrSingle = 0;
      for (let k = 1; k < aProductElements.length;k++) {
        const element = aProductElements[k];

        if (element.symbol === 'M') {
          thereOrNot = 1;
          elementMIndex = k;
          bothOrSingle++;
        } else if (element.symbol === 'X') {
          thereOrNot = 2;
          elementXIndex = k;
          bothOrSingle++;
        }
      };

      if (bothOrSingle === 2) {
        let elementM;
        for (let e = 1; e < symbolicShapeElements.length -1; e++) {
          const symbolicElement = symbolicShapeElements[e];
          if (symbolicElement.coSymbol === 'M') {
            elementM = symbolicElement;
          };
        };

        equationsProducts[i].products[j].quantities[elementM.symbol] = equationsProducts[i].products[j].quantities['M'];
        delete equationsProducts[i].products[j].quantities['M'];
        equationsProducts[i].products[j].elements[elementMIndex].symbol = elementM.symbol;
        equationsProducts[i].products[j].elements[elementMIndex].charge = elementM.oxidation;

        let elementX;
        for (let e = 1; e < symbolicShapeElements.length -1; e++) {
          const symbolicElement = symbolicShapeElements[e];
          if (symbolicElement.coSymbol === 'X') {
            elementX = symbolicElement;
          };
        };
        equationsProducts[i].products[j].quantities[elementX.symbol] = equationsProducts[i].products[j].quantities['X'];
        delete equationsProducts[i].products[j].quantities['X'];
        equationsProducts[i].products[j].elements[elementXIndex].symbol = elementX.symbol;
        equationsProducts[i].products[j].elements[elementXIndex].charge = elementX.oxidation;
      } else {
          if (thereOrNot === 1) {
          let element;
          for (let e = 1; e < symbolicShapeElements.length -1; e++) {
            const symbolicElement = symbolicShapeElements[e];
            if (symbolicElement.coSymbol === 'M') {
              element = symbolicElement;
            };
          };

          equationsProducts[i].products[j].quantities[element.symbol] = equationsProducts[i].products[j].quantities['M'];
          delete equationsProducts[i].products[j].quantities['M'];
          equationsProducts[i].products[j].elements[elementMIndex].symbol = element.symbol;
          equationsProducts[i].products[j].elements[elementMIndex].charge = element.oxidation;
        } else if (thereOrNot === 2) {
          let element;
          for (let e = 1; e < symbolicShapeElements.length -1; e++) {
            const symbolicElement = symbolicShapeElements[e];
            if (symbolicElement.coSymbol === 'X') {
              element = symbolicElement;
            };
          };
          equationsProducts[i].products[j].quantities[element.symbol] = equationsProducts[i].products[j].quantities['X'];
          delete equationsProducts[i].products[j].quantities['X'];
          equationsProducts[i].products[j].elements[elementXIndex].symbol = element.symbol;
          equationsProducts[i].products[j].elements[elementXIndex].charge = element.oxidation;
        };
      };
    };
  };

  for (let i = 0; i< equationsProducts.length;i++) {
    const aProduct = equationsProducts[i].products;

    for (let j = 1; j < aProduct.length;j++) {
      const { elements } = aProduct[j];

      for (let k = 1; k < elements.length;k++) {
        const element = elements[k];
        const elementData = await getElement(elements[k].symbol);

        if (!(allMetals[element.symbol] === undefined)) {
          equationsProducts[i].products[j] = findSimplifiedCharge(equationsProducts[i].products[j]);
        };

        if (elementData === undefined) {
          equationsProducts[i].products[j].elements[k].name = undefined;
          continue;
        }
        equationsProducts[i].products[j].elements[k].name = elementData.name;

      };
    };
  };

  for (let i  = 0;i < equationsProducts.length;i++) {
    const allTheProducts = equationsProducts[i].products;
    
    for (let j = 1; j< allTheProducts.length; j++) {
      const aProductElements = allTheProducts[j].elements;
      
      for (let q = 1; q < aProductElements.length;q++) {
        const element = aProductElements[q];

        if (allTheProducts[j].quantities[element.symbol] === undefined || allTheProducts[j].quantities[element.symbol][0] === undefined) {

          if (aProductElements[q + 1] === undefined) {
            if (typeof aProductElements[q - 1] !== 'number') {

              if (typeof allTheProducts[j].quantities[element.symbol] === "undefined") {

                equationsProducts[i].products[j].quantities[element.symbol] = Math.abs(aProductElements[q - 1].charge);
              } else if (typeof allTheProducts[j].quantities[element.symbol] === "object") {
   
                equationsProducts[i].products[j].quantities[element.symbol][0] = Math.abs(aProductElements[q - 1].charge);
              }
            }
          } else if (typeof aProductElements[q - 1] !== 'undefined') {

            if (typeof allTheProducts[j].quantities[element.symbol] === "undefined") {

              equationsProducts[i].products[j].quantities[element.symbol] = Math.abs(aProductElements[q + 1].charge);
            } else if (typeof allTheProducts[j].quantities[element.symbol] === "object") {

              equationsProducts[i].products[j].quantities[element.symbol][0] = Math.abs(aProductElements[q + 1].charge);
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

        if (typeof allTheProducts[j].quantities[aProductElements[1].symbol] === 'object') {
          const quantitiesArray = Object.entries(allTheProducts[j].quantities[aProductElements[1].symbol][1]);

          for (let d = 0; d < quantitiesArray.length;d++) {
            const fristElement = quantitiesArray[d];
            firstHalf += `${fristElement[0]}${fristElement[1] === 1 ? '' : fristElement[1]}`;
          };

          if (allTheProducts[j].quantities[aProductElements[1].symbol][0] !== 1) {
            firstHalf = `(${firstHalf})${allTheProducts[j].quantities[aProductElements[1].symbol][0]}`;
          };

          if (allTheProducts[j].quantities[aProductElements[1].symbol][0] === 0) {
            firstHalf = '';
          };
          
        } else {
          firstHalf = 
          allTheProducts[j].quantities[aProductElements[1].symbol] === 1 ? `${aProductElements[1].symbol}`
          : await getElement(aProductElements[1].symbol) === undefined ?
          `(${aProductElements[1].symbol})${
            allTheProducts[j].quantities[aProductElements[1].symbol] === 1 ? '':
            allTheProducts[j].quantities[aProductElements[1].symbol]}`
            
          : `${aProductElements[1].symbol}
          ${allTheProducts[j].quantities[aProductElements[1].symbol] === 1 ? '':
            allTheProducts[j].quantities[aProductElements[1].symbol]}`
          ;
          firstHalf = firstHalf.replace(/\s/g, "");
        }
        
        if (typeof allTheProducts[j].quantities[aProductElements[2].symbol] === 'object') {

          const quantitiesArray = Object.entries(allTheProducts[j].quantities[aProductElements[2].symbol][1]);

          for (let d = 0; d < quantitiesArray.length;d++) {
            const fristElement = quantitiesArray[d];
            firstHalf += `${fristElement[0]}${fristElement[1] === 1 ? '' : fristElement[1]}`;
          };

          if (allTheProducts[j].quantities[aProductElements[2].symbol][0] !== 1) {
            firstHalf = `(${firstHalf})${allTheProducts[j].quantities[aProductElements[2].symbol][0]}`;
          }
        } else {
          secondHalf =  allTheProducts[j].quantities[aProductElements[2].symbol] === 1 ?
          `${aProductElements[2].symbol}`
          : await getElement(aProductElements[2].symbol) === undefined ?
          `(${aProductElements[2].symbol})${
            allTheProducts[j].quantities[aProductElements[2].symbol] === 1 ? '':
            allTheProducts[j].quantities[aProductElements[2].symbol]}`

          : `${aProductElements[2].symbol}${
            allTheProducts[j].quantities[aProductElements[2].symbol] === 1 ? '':
            allTheProducts[j].quantities[aProductElements[2].symbol]}`
          ;
        };

        theNewFormula = firstHalf + secondHalf;
      };
      equationsProducts[i].products[j].formula = theNewFormula;

      const theproduct = allTheProducts[j];

      const compoundData1 = await getCompound(toPubChemFormula(theproduct.formula), theproduct.formula);
      
      if (compoundData1.success === false) {
        const compoundData = compoundData1.data.PC_Compounds[0];

        equationsProducts[i].products[j].cid = compoundData.id.id.cid;

        let nameClear = false;
        let weightClear = false;
        for (let h = 0;h < compoundData.props.length;h++) {
          const section = compoundData.props[h];
          if (nameClear && weightClear) break;

          if (section.urn.label === 'IUPAC Name' && !nameClear) {
            equationsProducts[i].products[j].name = (section.value.sval).replaceAll(';', ' ');
            nameClear = true;
          } else if (section.urn.label === 'Molecular Weight' && !weightClear) {
            equationsProducts[i].products[j].weight = Number(section.value.sval);
            weightClear = true;
          };
        };
      } else {
        equationsProducts[i].products[j].name = "couldn't fetch";
      };

    };
    const compoundData1 = await getCompound(toPubChemFormula(symbolicShape), symbolicShape);
    const compoundData = compoundData1.data.PC_Compounds[0];

    if (compoundData1.success === false) {
      
      equationsProducts[i].reactantData = {
        cid: undefined,
        formula: symbolicShape,
        name: "couldn't fetch"
      };
    } else {
      equationsProducts[i].reactantData = {
        cid: compoundData.id.id.cid,
        formula: symbolicShape
      };
      let nameClear = false;
      let weightClear = false;
      for (let h = 0;h < compoundData.props.length;h++) {
        const section = compoundData.props[h];
        if (nameClear && weightClear) break;

        if (section.urn.label === 'IUPAC Name' && !nameClear) {
          equationsProducts[i].reactantData.name = (section.value.sval).replaceAll(';', ' ');
          nameClear = true;
        } else if (section.urn.label === 'Molecular Weight' && !weightClear) {
          equationsProducts[i].reactantData.weight = Number(section.value.sval);
          weightClear = true;
        };
      };
    };
    let reactantQuantities = {};

    for (let i = 1; i < symbolicShapeElementsOr.length - 1;i++) {
      const theElement = symbolicShapeElementsOr[i];
      reactantQuantities[theElement.symbol] = theElement.quantity;
    };
    equationsProducts[i].reactantData.quantities = reactantQuantities;
  };
  //console.log(equationsProducts);


  const onlyQuantites = [];
  let currentEquationQuantity = [];
  for (let i = 0; i < equationsProducts.length;i++) {

    const theProducts = equationsProducts[i].products;
    const reactantQuantities = equationsProducts[i].reactantData.quantities;
    currentEquationQuantity.push(reactantQuantities);

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
      currentEquationQuantity.push(finalObject);
    };
    onlyQuantites.push(currentEquationQuantity);
    currentEquationQuantity = [];
  };

  const symbolicFormulaArray = [];
  let eachProduct = [];
  for (let i = 0; i < equationsProducts.length;i++) {
    const equation = equationsProducts[i];
    eachProduct.push(equation.reactantData.formula);

    for (let j = 1; j < (equation.products).length;j++) {
      const product = equation.products[j];
      eachProduct.push(product.formula);
    };
    symbolicFormulaArray.push(eachProduct);
    eachProduct = [];
  };
  const fixedQuantities = fixingQ(getElements, symbolicFormulaArray, onlyQuantites, atomicLength);

  const balancingMatrix = [];
  let perEQ = [];
  let currentRow = [];

  for (let k = 0; k < fixedQuantities.length;k++) {
    const currentEquation = fixedQuantities[k];

    for (let i = 1; i < symbolicShapeElementsOr.length -1;i++) {
      const elementSymbol = symbolicShapeElementsOr[i].symbol;

      for (let j = 0; j < currentEquation.length;j++) {
        const quantitiesQroup = currentEquation[j];

        if (j === 0) {
          currentRow.push((quantitiesQroup[elementSymbol] === undefined ? 0 : quantitiesQroup[elementSymbol]));
          continue;
        };
        currentRow.push((quantitiesQroup[elementSymbol] === undefined ? 0 : -quantitiesQroup[elementSymbol]));

      };
      perEQ.push(currentRow);
      currentRow = [];
    };
    balancingMatrix.push(perEQ);
    perEQ = [];
  };


  const balancedCoff = [];
  for (let i = 0; i < balancingMatrix.length;i++) {
    const aMatrix = balancingMatrix[i];
    
    balancedCoff.push(await balancingEquations(aMatrix));
  };

  const finalEquationArray = [];
  let symbolicEquation = '\\(\\ce{ ';
  let textedEquation = '\\(\\ce{ ';
  for (let i = 0; i < equationsProducts.length; i++) {
    const anEquation = equationsProducts[i];
    const balancedCoffArray = balancedCoff[i];
    const cidObject = {};

    textedEquation += `${anEquation.reactantData.name} \\longrightarrow `;
    symbolicEquation += 
      `${balancedCoffArray[0] === 1 ? '': balancedCoffArray[0]}${tranferToFormula(anEquation.reactantData.formula)} \\longrightarrow `
    ;
    cidObject[anEquation.reactantData.name] = [
      anEquation.reactantData.cid,
      anEquation.reactantData.formula,
      anEquation.reactantData.weight,
      balancedCoffArray[0]
    ];
    for (let j = 1; j < anEquation.products.length;j++) {
      const aProduct = anEquation.products[j];
      const theCoff = balancedCoffArray[j];

      textedEquation += ` ${aProduct.name} +`;
      symbolicEquation += ` ${theCoff === 1 ? '': theCoff}${tranferToFormula(aProduct.formula)} +`;
      cidObject[aProduct.name] = [aProduct.cid, aProduct.formula, aProduct.weight, theCoff];
    };

    finalEquationArray.push([
      textedEquation.slice(0, -1) + '}\\)',
      symbolicEquation.slice(0, -1) + '}\\)',
      anEquation.method,
      cidObject
    ]);
    symbolicEquation = '\\(\\ce{ ';
    textedEquation = '\\(\\ce{ ';
  };
  //console.log(finalEquationArray);

  return finalEquationArray;
};
export default decompositionReaction;