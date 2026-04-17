async function decompositionReaction(ammoniumProductPraser, ammoniumExceptionProduct, commonOxidationStates, atomicLength, getElement, getTheCategory, decomRules) {

  const symbolicShape = 'NH4Cl';


  const theDecompositionRules = await decomRules(ammoniumProductPraser, ammoniumExceptionProduct, commonOxidationStates, atomicLength, getElement, getTheCategory, symbolicShape);

  console.log(await theDecompositionRules[14]);
};  
export default decompositionReaction;
