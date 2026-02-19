function reactionByElement(element1, element2, is_it_possible, getTheCategory, filterByVelance, allMetals) {
  const eleName1 = element1.name;
  const eleAtomicNumber1 = element1.atomicNumber;
  const eleSymbol1 = element1.symbol;

  const eleName2 = element2.name;
  const eleAtomicNumber2 = element2.atomicNumber;
  const eleSymbol2 = element2.symbol; 

  const reactionTesting = is_it_possible(element1, element2, getTheCategory, allMetals);
  console.log(reactionTesting);

  if (reactionTesting.possible = false) {
    return textMaker(ele);
  };
};
function textMaker(intity1, intity2 , coff1, coff2, coff3, product) {
  return ` \\(  ${intity1} + ${intity2} \\) `
}
export default reactionByElement;