export function tranferToFormula(formula) {

  const formulaArray = formula.split('');

  formulaArray.forEach((le, index) => {
    formulaArray[index] = isNaN(Number(le)) ? le : Number(le);
  });
  
  let result = '';
  for (let i = 0; i < formulaArray.length;i++) {
    const letter = formulaArray[i];
    if (typeof letter === 'number') {
      result += `_{${letter}}`;
    } else {
      result += letter;
    }
  };
  return result;
};