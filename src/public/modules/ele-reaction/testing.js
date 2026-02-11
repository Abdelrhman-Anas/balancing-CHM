const diatomic = ['Oxygen', 'Chlorine', 'Hydrogen', 'Iodine', 'Bromine', 'Fluorine', 'Nitrogen'];
const covelantMetals = ['Be', 'B', 'Al', 'Si'];
const tetra = ['Phosphorus', 'Arsenic', 'Antimony'];
const octa = ['Sulfur ' ,'Selenium ', 'Tellurium '];

function is_it_possible(element1, element2, getTheCategory) {
  const resultList = {
    possible: true,
    normal: true,
    bothDiatomic: false,
    sameElement:  false,
    alloy: false,
    reaction: {
      type: '',
      element1Type: '',
      element2Type: ''
    },
    info: {
      first: '',
      second: ''
    }
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
    resultList.possible = false;
    resultList.normal = false;
    resultList.sameElement = true;
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
    if (so1 === so2 && so1 === true) {
      resultList.bothDiatomic = true;
    }
  };

  //second step => determine whether the elements are both metals
  const ele1Category = getTheCategory(ele1groupBlock);
  const ele2Category = getTheCategory(ele2groupBlock);
  console.log(ele1Category);
  console.log(ele2Category);
  

  //third step => determine the type of the reaction bond by delta Electronegativity
  const deltaEN = Math.abs(ele1Electronegativity - ele2Electronegativity);
  console.log(deltaEN);
  if (deltaEN >= 0 && deltaEN <= 0.4) {
    resultList.reaction.type = 'nonpolar covalent';
    resultList.normal = false;
  } else if (deltaEN > 0.4 && deltaEN <= 1.7) {
    resultList.reaction.type = 'polar covalent';
  } else if (deltaEN > 1.7) {
    if (deltaEN > 2) {
      let bond = 'ionic';
      if (ele1Category === 'metal' || ele1Category === 'metalloid') {
        covelantMetals.forEach((ele) => {
          if (ele === element1.symbol) {
            bond  = 'polar covalent'
          }
        });
      };
      if (ele2Category === 'metal' || ele2Category === 'metalloid') {
        covelantMetals.forEach((ele) => {
          if (ele === element2.symbol) {
            bond  = 'polar covalent'
          }
        });
      };
      resultList.reaction.type = bond;
    }else {
      resultList.reaction.type = 'ionic';
    }
    

  };

  if (ele1Category === ele2Category && ele1Category === 'metal') {
    resultList.possible = false;
    resultList.alloy = true;
    resultList.normal = false;
    resultList.reaction.type = 'metallic';
  }
   
  // forth step => determine the type of the reactant
  if (ele1Category === ele2Category && ele1Category === 'nonmetal') {
  
    resultList.reaction.element1Type = 'nonmetal';
    resultList.reaction.element2Type = 'nonmetal';

  } else if ((ele1Category === 'nonmetal' && ele2Category === 'metal') 
  ||         (ele1Category === 'metal' && ele2Category === 'nonmetal')) {

    if (ele1Category === 'nonmetal' && ele2Category === 'metal') {

      resultList.reaction.element1Type = 'nonmetal';
      resultList.reaction.element2Type = 'metal';

    }else if (ele1Category === 'metal' && ele2Category === 'nonmetal') {

      resultList.reaction.element1Type = 'metal';
      resultList.reaction.element2Type = 'nonmetal';

    };
  } else if (ele1Category === ele2Category && ele1Category === 'metalloid') {

    resultList.reaction.element1Type = 'metalloid';
    resultList.reaction.element2Type = 'metalloid';
    resultList.reaction.possible = false;
    resultList.normal = false;
    return resultList;

  } else if ((ele1Category === 'metalloid' && ele2Category === 'metal')
  ||         (ele1Category === 'metal' && ele2Category === 'metalloid')) {

    if (ele1Category === 'metalloid' && ele2Category === 'metal') {
      resultList.reaction.element1Type = 'nonmetal';
      resultList.reaction.element2Type = 'metal';

    } else if (ele1Category === 'metal' && ele2Category === 'metalloid') {
      resultList.reaction.element1Type = 'metal';
      resultList.reaction.element2Type = 'nonmetal';
    }

  } else if ((ele1Category === 'metalloid' && ele2Category === 'nonmetal')
  ||         (ele1Category === 'nonmetal' && ele2Category === 'metalloid')) {


    if (ele1Category === 'metalloid' && ele2Category === 'nonmetal') {
      resultList.reaction.element1Type = 'metal';
      resultList.reaction.element2Type = 'nonmetal';

    } else if (ele1Category === 'nonmetal' && ele2Category === 'metalloid') {
      resultList.reaction.element1Type = 'nonmetal';
      resultList.reaction.element2Type = 'metal';

    };
  };

  //detreminting the atomic structure of each reactant
  let ele1;
  let ele2;
  diatomic.forEach((ele) => {
    if (ele === ele1Name) {
      ele1 = 'diatomic';
    }
    if (ele === ele2Name) {
      ele2 = 'diatomic';
    };
  });
  tetra.forEach((ele) => {
    if (ele === ele1Name) {
      ele1 = 'tetra';
    }
    if (ele === ele2Name) {
      ele2 = 'tetra';
    };
  });
  octa.forEach((ele) => {
    if (ele === ele1Name) {
      ele1 = 'octa';
    }
    if (ele === ele2Name) {
      ele2 = 'octa';
    };
  });
  if (!ele1) {
    ele1 = 'mono'
  };
  if (!ele2) {
    ele2 = 'mono'
  }
  resultList.info.first = ele1;
  resultList.info.second = ele2;

  return resultList;
};

export default is_it_possible;


