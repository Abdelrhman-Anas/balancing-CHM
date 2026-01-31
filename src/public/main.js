import { is_it_possible } from './modules/testing.js';
import { electronConfiguration } from './modules/configuration.js';


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
    calculating();
  });
});


function renderChemicalEquation(elementId, formula) {
  const element = document.getElementById(elementId);
  if (element && window.MathJax) {
    element.innerHTML = `\\(\\ce{${formula}}\\)`;
    MathJax.typesetPromise([element]);
  };
};


const element1 = 'Mg';
const element2 = 'Na';
const infoElement1 = await getFetch(element1);
const infoElement2 = await getFetch(element2);
console.log(infoElement1);
console.log(infoElement2);


function calculating() {
  const testingResult = is_it_possible(infoElement1, infoElement2, electronConfiguration);
  console.log(testingResult);
  if (testingResult.alloy === true) {
    renderChemicalEquation(resultElement, `${element1} + ${element2} \rightarrow Alloy`);
  }
}


