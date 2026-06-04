const covelantMetals = ['Be', 'B', 'Al', 'Si'];

function is_it_possible(element1, element2, getTheCategory, filterByVelance, allMetals, atomicLength) {
  const resultList = {
    possible: true,
    normal: true,
    bothDiatomic: false,
    sameElement:  false,
    alloy: false,
    electronegativity: {
      deltaEN: 0,
      frist: 0,
      second: 0
    },
    nonAlloyNorBond: false,
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
  const diatomic = atomicLength[0];
  const tetra = atomicLength[1];
  const octa = atomicLength[2];


  //frist element data
  const ele1Name = element1.name;
  const ele1Electronegativity = Math.abs(element1.electronegativity);
  const ele1Velance = element1.oxidationStates;
  const ele1groupBlock = element1.groupBlock;
  const ele1symbol = element1.symbol

  //second element data
  const ele2Name = element2.name;
  const ele2Electronegativity = Math.abs(element2.electronegativity);
    const ele2Velance = element2.oxidationStates;
  const ele2groupBlock = element2.groupBlock;
  const ele2symbol = element2.symbol


  // step zero => determine whether one of the elements is noble gas or not
  if (ele1groupBlock === 'noble gas' || ele2groupBlock === 'noble gas') {
    resultList.possible  = false;
    resultList.normal = false;
    return resultList;
  };
  
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

  //second step => getting the Category of both elements
  const ele1Category = getTheCategory(ele1groupBlock);
  const ele2Category = getTheCategory(ele2groupBlock);
  

  //third step => determine the type of the reaction bond by delta Electronegativity
  const deltaEN = Math.abs(ele1Electronegativity - ele2Electronegativity);
  resultList.electronegativity.deltaEN = deltaEN;
  resultList.electronegativity.frist = ele1Electronegativity;
  resultList.electronegativity.second = ele2Electronegativity;
  if (deltaEN >= 0 && deltaEN <= 0.4) {
    resultList.reaction.type = 'covalent';
    resultList.normal = false;
  } else if (deltaEN > 0.4 && deltaEN <= 1.7) {

    if ((ele1Category === 'metal' && ele2Category === 'nonmetal') ||
    (ele1Category === 'metal' && ele2Category === 'nonmetal')) {

      resultList.reaction.type = 'ionic';
    } else {
      resultList.reaction.type = 'covalent';
    }

  } else if (deltaEN > 1.7) {
    if (deltaEN > 2) {
      let bond = 'ionic';
      if (ele1Category === 'metal' || ele1Category === 'metalloid') {
        covelantMetals.forEach((ele) => {
          if (ele === element1.symbol) {
            bond  = ' covalent'
          }
        });
      };
      if (ele2Category === 'metal' || ele2Category === 'metalloid') {
        covelantMetals.forEach((ele) => {
          if (ele === element2.symbol) {
            bond  = 'covalent'
          }
        });
      };
      resultList.reaction.type = bond;
    }else {
      if (ele1Category === 'nonmetal' && ele2Category === 'nonmetal') {
      resultList.reaction.type = 'covalent';
      }
      resultList.reaction.type = 'ionic';
    };
  };

  if (ele1Category === 'nonmetal' && ele2Category === 'nonmetal') {
    resultList.reaction.type = 'covalent';
  };

  if (ele1Category === ele2Category && ele2Category === 'metal') {
    resultList.info.first = 1;
    resultList.info.second = 1;
    resultList.reaction.element1Type = 'metal';
    resultList.reaction.element2Type = 'metal';
    resultList.normal = false;
    resultList.reaction.type = 'intermetallic';
    //--variables--
    let EN = false ;
    let states = false;
    let velance = false;
    let dBand = false;
    
    const metalConfig1 = allMetals[ele1symbol];
    const metalConfig2 = allMetals[ele2symbol];

    // the diffrence in electronegativity
    if (deltaEN > 0.2) {
      EN = true;
    };
    // diff. in size 
    const ele1Radius = metalConfig1.radius;
    const ele2Radius = metalConfig2.radius;
    const bigRadius = Math.max(ele1Radius, ele2Radius);
    const smalRadius = Math.min(ele1Radius, ele2Radius);
    const deltaR = ( Math.abs(bigRadius - smalRadius) / smalRadius ) *100;
  
    // getting the structure of the elements
    const ele1State = metalConfig1.structure;
    const ele2State = metalConfig2.structure;
    if (ele1State === ele2State) {
      if (deltaEN > 0.4) {
        states = true;
      };
    }else if (ele1State !== ele2State) {
      states = true;
    }
    // same velance or not 
    const velanceResult = filterByVelance(ele1Velance, ele2Velance);
    if (!(velanceResult.length === 0)) {
      velance = true;
    };
    // same d filling or oppistie filling
    if (ele1groupBlock === ele2groupBlock && ele2groupBlock === 'transition metal') {
      const theDConfig1 = metalConfig1.d;
      const theDConfig2 = metalConfig2.d;
      const dSum = theDConfig1 + theDConfig2;
      if (dSum <= 10) {
        dBand = true;
      };
    };
    
    if (deltaR > 15) {
      if (EN) {
        if (ele1groupBlock === ele2groupBlock && ele2groupBlock === 'transition metal') {
          if (dBand) {
            resultList.possible = true;
            resultList.alloy = false;
            resultList.nonAlloyNorBond = false;
            return resultList;
          } else {
            resultList.possible = false;
            resultList.alloy = true;
            resultList.nonAlloyNorBond = false;
            return resultList;
          };
        }else {
          resultList.possible = true;
          resultList.alloy = false;
          resultList.nonAlloyNorBond = false;
          return resultList;
        }
      }else {
        resultList.possible = false;
        resultList.alloy = false;
        resultList.nonAlloyNorBond = true;
        return resultList;
      };
    } else if (deltaR <= 15) {
      if (EN) {
        resultList.possible = true;
        resultList.alloy = false;
        resultList.nonAlloyNorBond = false;
        return resultList;
      } else {
        if (states) {
          resultList.possible = true;
          resultList.alloy = false;
          resultList.nonAlloyNorBond = false;
          return resultList;
        } else {
          if (ele1groupBlock === ele2groupBlock && ele2groupBlock === 'transition metal') {
            if (dBand) {
              resultList.possible = true;
              resultList.alloy = false;
              resultList.nonAlloyNorBond = false;
              return resultList;
            } else {
              resultList.possible = false;
              resultList.alloy = true;
              resultList.nonAlloyNorBond = false;
              return resultList;
            };
          }else {
            resultList.possible = false;
            resultList.alloy = true;
            resultList.nonAlloyNorBond = false;
            return resultList;
          };
        };
      };
    };
  };
   
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

  //detreminting the element normal shape of each reactant
  let ele1;
  let ele2;
  diatomic.forEach((ele) => {
    if (ele === ele1Name) {
      ele1 = 2;
    }
    if (ele === ele2Name) {
      ele2 = 2;
    };
  });
  tetra.forEach((ele) => {
    if (ele === ele1Name) {
      ele1 = 3;
    }
    if (ele === ele2Name) {
      ele2 = 3;
    };
  });
  octa.forEach((ele) => {
    if (ele === ele1Name) {
      ele1 = 8;
    }
    if (ele === ele2Name) {
      ele2 = 8;
    };
  });
  if (!ele1) {
    ele1 = 1;
  };
  if (!ele2) {
    ele2 = 1;
  };
  resultList.info.first = ele1;
  resultList.info.second = ele2;

  return resultList;
};

export default is_it_possible;


