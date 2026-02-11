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
export default filterByVelance;