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
const element1 = 'Na';
const element2 = 'Cl';
const infoElement1 = await getFetch(element1);
const infoElement2 = await getFetch(element2);
console.log(infoElement1);
console.log(infoElement2);

