import is_it_possible from './modules/ele-reaction/testing.js';
import {} from './modules/ele-reaction/elements.js'
import filterByVelance from './modules/utils/filterByVelance.js';
import getTheCategory from './modules/utils/getTheCategory.js';
import allMetals from '../data/metals-data.js';




async function getFetch(element) {
  try{
    const response = await fetch("/api/elements");
    let data;
    if (!response.ok) {
      throw new Error("couldn't fetch data");
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
  console.log('DOM ready! This should work');

  submitElement1.addEventListener('click', () => {
    buttonActivaton();
  });

});



function renderChemicalEquation(formula) {
  if (resultElement && window.MathJax) {
    resultElement.innerHTML = `\\(\\ce{${formula}}\\)`;
    MathJax.typesetPromise([resultElement]);
  };
};


const element1 = 'Ag';
const element2 = 'Al';
const infoElement1 = getMetalData(element1);
const infoElement2 = await getFetch(element2);
console.log(infoElement1);
console.log(infoElement2);
const testingResult = is_it_possible(infoElement1, infoElement2, getTheCategory);
console.log(testingResult);


function buttonActivaton() {
  if (true) {

  }
}

