import is_it_possible from './modules/combination-reaction/testing.js';
import reactionByElement from './modules/combination-reaction/combination.js'
import { filterByVelance, gettingVelance } from './modules/utils/filterByVelance.js';
import getTheCategory from './modules/utils/getTheCategory.js';
import { allMetals } from './data-files/metals-data.js';

import decompositionReaction from './modules/decomposition-reaction/decomposition.js';
import { ammoniumProductPraser, ammoniumExceptionProduct, getElements } from './data-files/decomposition-utils.js';
import commonOxidationStates from './data-files/commonOxidations.js';
import decomRules from './data-files/decomposition-rules.js'

const atomicLength = [
  ['Oxygen', 'Chlorine', 'Hydrogen', 'Iodine', 'Bromine', 'Fluorine', 'Nitrogen'],
  ['Phosphorus', 'Arsenic', 'Antimony'],
  ['Sulfur' ,'Selenium', 'Tellurium']
];


async function getCompound(formula) {
  try {

    const response = await fetch(
      `/api/pubchem/compound/fastformula/${formula}/JSON`
    );

    if (!response.ok) {
      const response2 = await fetch(
        `/api/pubchem/compound/name/${formula}/JSON`
      );
      if (!response2.ok) {
        return {success: false , data: `HTTP: ${response2.status}`}
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
}
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

async function getRREF(matrix) {
  try {
    const response = await fetch('/api/rref', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ matrix: matrix })
    });
    
    if (!response.ok) {
      throw new Error('RREF computation failed');
    }
    
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Error computing RREF:', error);
    return null;
  };
};


const submitElement1 = document.querySelector('.submiting');
const resultElement = document.querySelector('.the-result');

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM ready!');

  submitElement1.addEventListener('click', () => {
    buttonActivaton();
  });

});



function renderChemicalEquation(formula) {
  if (resultElement && window.MathJax) {
    resultElement.innerHTML = formula;
    MathJax.typesetPromise([resultElement]);
  };
};

console.log(await getRREF([
  [2, -2, 0],
  [1, 0, -1],
  [3, -1, -2]
]));
const element1 = 'Al';
const element2 = 'Mg';
const infoElement1 = await getElement(element1);
const infoElement2 = await getElement(element2);
console.log(infoElement1);
console.log(infoElement2);

buttonActivaton();
function buttonActivaton() {
  if (false) { // combination reaction
    const combination = reactionByElement(infoElement1, infoElement2, is_it_possible, getTheCategory, filterByVelance, gettingVelance, allMetals, atomicLength);
  } else if (true) { // decomposition reaction
    const decomposition = decompositionReaction(ammoniumProductPraser, ammoniumExceptionProduct, commonOxidationStates, atomicLength,getElement,getTheCategory, decomRules, getElements, allMetals,getCompound);
  };
};

