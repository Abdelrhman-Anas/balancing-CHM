import is_it_possible from './modules/combination-reaction/testing.js';
import reactionByElement from './modules/combination-reaction/combination.js'
import { filterByVelance, gettingVelance } from './modules/utils/filterByVelance.js';
import getTheCategory from './modules/utils/getTheCategory.js';
import { allMetals } from './data-files/metals-data.js';

import decompositionReaction from './modules/decomposition-reaction/decomposition.js';
import { ammoniumProductPraser, ammoniumExceptionProduct } from './data-files/decomposition-utils.js';
import commonOxidationStates from './data-files/commonOxidations.js';
import decomRules from './data-files/decomposition-rules.js'

const atomicLength = [
  ['Oxygen', 'Chlorine', 'Hydrogen', 'Iodine', 'Bromine', 'Fluorine', 'Nitrogen'],
  ['Phosphorus', 'Arsenic', 'Antimony'],
  ['Sulfur' ,'Selenium', 'Tellurium']
];


async function getCompound(compound, formula) {
  
  //const data = await response.json();
  //console.log(data.PC_Compounds[0]);
  if (formula === 'name') {
    try{
      const response = await fetch(`https://molexa-api.vercel.app/api/pubchem/compound/name/${compound}/JSON`);
      if (!response.ok) {
        throw new Error("couldn't fetch data from the molexa API");
      } else {
        return await response.json();
      };
    }catch(error){
      console.error(error);
    };
  } else if (formula === 'symbol' && false) {

  } else {
    console.error("could't identitfy the formula of the compound")
  }
  
};
console.log(await getCompound('Chlorous acid', 'name'));

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
    const decomposition = decompositionReaction(ammoniumProductPraser, ammoniumExceptionProduct, commonOxidationStates, atomicLength,getElement,getTheCategory, decomRules);
  };
};

