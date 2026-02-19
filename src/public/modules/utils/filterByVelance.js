function filterByVelance(ele1OxidationStates, ele2OxidationStates) {
  let le1OxidationArray = [];
  let le2OxidationArray = [];
  let result = [];
  if (typeof ele1OxidationStates === 'string') {
    le1OxidationArray = ele1OxidationStates.split(', ').map(Number);
  }else if (typeof ele1OxidationStates === 'number') {
    le1OxidationArray = [ele1OxidationStates];
  };

  if (typeof ele2OxidationStates === 'string') {
    le2OxidationArray = ele2OxidationStates.split(', ').map(Number);
  }else if (typeof ele2OxidationStates === 'number') {
    le2OxidationArray = [ele2OxidationStates];
  };

  for (let i = 0;i < le1OxidationArray.length; i++) {
    const velance1 = le1OxidationArray[i];
    for (let i = 0;i < le2OxidationArray.length; i++) {
      const velance2 = le2OxidationArray[i];
      if (velance1 === velance2) {
        result.push(velance2);
      };
    };
  };
  if (le1OxidationArray.length >= le2OxidationArray.length) {
    for (let i = 0;i < le1OxidationArray.length; i++) {
      const velance = le1OxidationArray[i];
      for (let i = 0;i < result.length; i++) {
        const vel = result[i];
        if (vel === velance) {
          result.splice(i,1);
          break;
        }else {
          result.push(velance);
          break;
        };
      };
    };
  }else {
    for (let i = 0;i < le2OxidationArray.length; i++) {
      const velance = le2OxidationArray[i];
      for (let i = 0;i < result.length; i++) {
        const vel = result[i];
        if (vel === velance) {
          result.splice(i,1);
          break;
        }else {
          result.push(velance);
          break;
        };
      };
    };
  }
  console.log(result);
  return result;
};
export default filterByVelance;