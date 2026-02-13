function reactionByElement(element1, element2, is_it_possible, getTheCategory) {
  const eleName1 = element1.name;
  const eleAtomicNumber1 = element1.atomicNumber;
  const elesymbol1 = element1.symbol;

  const eleName2 = element2.name;
  const eleAtomicNumber2 = element2.atomicNumber;
  const elesymbol2 = element2.symbol; 

  const raectionTesting = is_it_possible(element1, element2, getTheCategory);
  console.log(raectionTesting);

  if (raectionTesting.possible = false) {

  }

}