import is_it_possible from './modules/ele-reaction/testing.js';
import filterByVelance from './modules/utils/filterByVelance.js';
import getTheCategory from './modules/utils/getTheCategory.js';



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
const submitElement = document.querySelector('.submiting');
const resultElement = document.querySelector('.the-result');

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM ready! This should work');
  submitElement.addEventListener('click', () => {
    gittingEq();
  });
});


function renderChemicalEquation(formula) {
  if (resultElement && window.MathJax) {
    resultElement.innerHTML = `\\(\\ce{${formula}}\\)`;
    MathJax.typesetPromise([resultElement]);
  };
};


const element1 = 'Al';
const element2 = 'Na';
const infoElement1 = await getFetch(element1);
const infoElement2 = await getFetch(element2);
console.log(infoElement1);
console.log(infoElement2);
const testingResult = is_it_possible(infoElement1, infoElement2, getTheCategory);
console.log(testingResult);

