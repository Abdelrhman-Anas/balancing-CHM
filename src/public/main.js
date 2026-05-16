import is_it_possible from './modules/combination-reaction/testing.js';
import combinationReaction from './modules/combination-reaction/combination.js';
import combiRules from './data-files/combination-rules.js';

import { fixingQ } from './modules/utils/quantityFixation.js';
import { filterByVelance, gettingVelance } from './modules/utils/filterByVelance.js';
import getTheCategory from './modules/utils/getTheCategory.js';
import { toPubChemFormula } from './modules/utils/prasingFormula.js';
import { balancingEquations } from './modules/utils/balancing.js';
import { allMetals } from './data-files/metals-data.js';
import { tranferToFormula } from './modules/utils/transferFormula.js'

import decompositionReaction from './modules/decomposition-reaction/decomposition.js';
import { ammoniumProductPraser, ammoniumExceptionProduct, getElements } from './data-files/decomposition-utils.js';
import commonOxidationStates from './data-files/commonOxidations.js';
import decomRules from './data-files/decomposition-rules.js';

import single_displaceReaction from './modules/single-displacement-reaction/single-displace.js';
import singDispRules from './data-files/single_displace-rules.js';
import { metalic_series, halous_series } from './data-files/activity-series.js'

import { UIComponents } from './UI/UI.js'

const atomicLength = [
  ['Oxygen', 'Chlorine', 'Hydrogen', 'Iodine', 'Bromine', 'Fluorine', 'Nitrogen'],
  ['Phosphorus', 'Arsenic', 'Antimony'],
  ['Sulfur' ,'Selenium', 'Tellurium']
];


async function getCompound(formula, formula2) {
  try {

    const response = await fetch(
      `/api/pubchem/compound/fastformula/${formula}/JSON`
    );

    if (!response.ok) {
      const response2 = await fetch(
        `/api/pubchem/compound/name/${formula2}/JSON`
      );
      if (!response2.ok) {
        const response3 = await fetch(
          `/api/pubchem/compound/fastformula/${formula2}/JSON`
        );
        if (!response3.ok) {
          return {success: false , data: `HTTP: ${response3.status}`}
        };

        const data3 = await response3.json();

        if (!data2.PC_Compounds || data2.PC_Compounds.length === 0) {
          return { success: false, data: "No compounds found for this formula" };
        };
        
        return { success: true, data: data3 };
      };

      const data2 = await response2.json();

      if (!data2.PC_Compounds || data2.PC_Compounds.length === 0) {
        return { success: false, data: "No compounds found for this formula" };
      };
      
      return { success: true, data: data2 };
    }

    const data = await response.json();

    // Step 3: Check if PubChem returned actual compounds
    if (!data.PC_Compounds || data.PC_Compounds.length === 0) {
      return { success: false, data: "No compounds found for this formula" };
    };

    return { success: true, data: data };

  } catch (error) {
    // Step 4: Catch network errors or JSON parse failures
    if (error.name === "SyntaxError") {
      return { success: false, data: "Invalid JSON response from server" };
    }
    return { success: false, data: `Network error: ${error.message}` };
  }
};
//console.log(await getCompound('(NH4)2SO4'));

async function getElement(element) {
  try{
    const response = await fetch("/api/elements");
    let data;
    if (!response.ok) {
      throw new Error("couldn't fetch data from the Periodic Table API");
    } else {
      const elements = await response.json();
      elements.forEach((ele) => {
        if (ele.symbol === element) { 
          data = ele;
        };
      });
    };
    return data;
  }catch(error){
    console.error(error);
  };
};

/////////////////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
  UIComponents();
});
/////////////////////////////////////////////////////////////////////////////////////////////////////

function renderChemicalEquation(formula) {
  if (resultElement && window.MathJax) {
    resultElement.innerHTML = formula;
    MathJax.typesetPromise([resultElement]);
  };
};

//console.log(toPubChemFormula('(NH4)2CO3'));
//fixingQ(getElements);
//tranferToFormula();


buttonActivaton();
function buttonActivaton() {
  if (true) { // combination reaction
    const combination = combinationReaction(getElement, is_it_possible, getTheCategory, filterByVelance, gettingVelance, allMetals, atomicLength, getCompound, toPubChemFormula, tranferToFormula, getElements, commonOxidationStates, combiRules, fixingQ, balancingEquations);
  } else if (false) { // decomposition reaction
    const decomposition = decompositionReaction(ammoniumProductPraser, ammoniumExceptionProduct, commonOxidationStates, atomicLength,getElement,getTheCategory, decomRules, getElements, allMetals,getCompound, toPubChemFormula, balancingEquations, fixingQ, tranferToFormula);
  } else if (false) {  // single displacement reaction
    const single_displacement = single_displaceReaction(getElement, getElements, commonOxidationStates, allMetals, metalic_series, halous_series, singDispRules);
  } 
};

