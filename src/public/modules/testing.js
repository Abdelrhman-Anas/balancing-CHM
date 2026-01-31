const diatomic = ['Oxygen', 'Chlorine', 'Hydrogen', 'Iodine', 'Bromine', 'Fluorine', 'Nitrogen'];
const metals = ['alkali metal', 'alkaline earth metal', 'transition metal', 'Post-transition Metal', 'metal'];
const nonmetals = ['halogen', 'nonmetal'];
export function is_it_possible(element1, element2, electronConfiguration) {
  const resultList = {
    possible: true,
    normal: true,
    bothDiatomic: false,
    sameElement:  false,
    alloy: false,
    reactionType: ''
  };


  //frist element data
  const ele1Name = element1.name;
  const ele1Electronegativity = Math.abs(element1.electronegativity);
  const ele1groupBlock = element1.groupBlock;

  //second element data
  const ele2Name = element2.name;
  const ele2Electronegativity = Math.abs(element2.electronegativity);
  const ele2groupBlock = element2.groupBlock;

  // step zero => determine whether one of the elements is noble gas or not
  if (ele1groupBlock === 'noble gas') {
    resultList.possible  = false;
    resultList.normal = false;
    return resultList;
  };
  if (ele2groupBlock === 'noble gas') {

  }

  // frist step => determine whether the elements are the same or not
  if (ele1Name === ele2Name) {
    for (let i = 0; i < diatomic.length; i++) {
      const ele = diatomic[i];
      if (ele === ele1Name && ele === ele2Name) {
        resultList.bothDiatomic = true;
        resultList.sameElement = true;
        return resultList;
      };
    };
    resultList.normal = false;
    return resultList;
  };
  // if both are diatomic
  if (ele1Name !== ele2Name) {
    let so1 = false;
    let so2 = false;
    for (let i = 0; i < diatomic.length;i++) {
      const ele = diatomic[i];
      if (ele1Name === ele) {
        so1 = true;
      };
      if (ele2Name === ele) {
        so2 = true;
      };
    };
    if (so1 === so2) {
      resultList.bothDiatomic = true;
    }
  };


  //second step => fiter by Electronegativity
  const deltaEN = Math.abs(ele1Electronegativity - ele2Electronegativity);
  if (deltaEN < 1/2) {
    resultList.normal = false;
  } else {
    resultList.normal = true;
  }


  //third step => determine whether the elements are both metals
  const ele1Category = getTheCategory(ele1groupBlock);
  const ele2Category = getTheCategory(ele2groupBlock);
  console.log(ele1Category);
  console.log(ele2Category);
  if (ele1Category === ele2Category && ele1Category === 'metal') {
    resultList.possible = false;
    resultList.alloy = true;
    resultList.normal = false;
    resultList.reactionType = 'metallic';
  };


  // forth step => determine the type of the reaction
  if (ele1Category === ele2Category && ele1Category === 'nonmetal') {
    resultList.reactionType = 'covalent';
  } else if ((ele1Category === 'nonmetal' && ele2Category === 'metal') 
  ||         (ele1Category === 'metal' && ele2Category === 'nonmetal')) {
    resultList.reactionType = 'ionic';
  } else if (ele1Category === ele2Category && ele1Category === 'metalloid') {
    resultList.reactionType = 'metallic';
    resultList.normal = false;
    return resultList;
  } else if ((ele1Category === 'metalloid' && ele2Category === 'metal')
  ||         (ele1Category === 'metal' && ele2Category === 'metalloid')) {
    resultList.reactionType = 'ionic';
  } else if ((ele1Category === 'metalloid' && ele2Category === 'nonmetal')
  ||         (ele1Category === 'nonmetal' && ele2Category === 'metalloid')) {
    resultList.reactionType = 'covalent';
  };
  return resultList;
};


export function getTheCategory(elegroupBlock) {
  let eleCategory;
  for (let i = 0;i < metals.length; i++) {
    const cat = metals[i];
    if (cat === elegroupBlock) {
      eleCategory = 'metal'
      return eleCategory;
    };
  };
  for (let i = 0;i < nonmetals.length; i++) {
    const cat = nonmetals[i];
    if (cat === elegroupBlock) {
      eleCategory = 'nonmetal' 
      return eleCategory;
    };
  };
  if (eleCategory === undefined) {
    eleCategory = elegroupBlock;
    return eleCategory;
  };
};

export function filterByVelance(ele1OxidationStates, ele2OxidationStates) {
  let le1OxidationArray = [];
  let le2OxidationArray = [];

  if (typeof ele1OxidationStates === 'string') {
    le1OxidationArray = ele1OxidationStates.split(', ').map(Number);
  }else if (typeof ele1OxidationStates === 'number') {
    le1OxidationArray = [ele1OxidationStates];
    console.log(le1OxidationArray);
  };

  if (typeof ele2OxidationStates === 'string') {
    le2OxidationArray = ele2OxidationStates.split(', ').map(Number);
  }else if (typeof ele2OxidationStates === 'number') {
    le2OxidationArray = [ele2OxidationStates];
    console.log(le2OxidationArray);
  };

  for (let i = 0;i < le1OxidationArray.length; i++) {
    const velance1 = le1OxidationArray[i];
    for (let i = 0;i < le2OxidationArray.length; i++) {
      const velance2 = le2OxidationArray[i];
      if (velance1 === velance2) {
        return true;
      };
    };
  };
  return false;
};