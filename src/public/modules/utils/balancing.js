export async function balancingEquations(getRREF, matrix) {
  //const matrix = [
  //  [12, 3, 18],
  //  [5, 19 , 2],
  //  [8, 11, 14]
  //];
  const RREFMatrix = await getRREF(matrix);
  const REFMatrix = getREF(matrix);
  
  const coffObject = {};
  coffObject['coffNum'] = RREFMatrix[0].length;
  for (let i = 0; i < RREFMatrix.length;i++) {
    const row = RREFMatrix[i];

    for (let j = 0; j < row.length;j++) {
      const index = row[j];

      if (index === 0) continue;
      if (index === 1 && row[row.length -1] !== 0) {
        coffObject[`X${j + 1}`] = [-row[row.length -1], j + 1];
      };
    };
  };

  const coffObjectArray = Object.entries(coffObject);
  const nums = [...Array(10).keys()].slice(1);
  outerloop: for (let i = 0; i < coffObjectArray.length;i++) {
    const aCoff = coffObjectArray[i];

    for (let j = 0; j < nums.length;j++) {
      const num = nums[j];

      if (Number.isInteger(aCoff[1][0] * num)) {

        coffObjectArray[i][1].push(num);
        continue outerloop;
      };
    };
  };

  
  let theNumber = 0;
  for (let i = 0; i < coffObjectArray.length;i++) {
    const variable = coffObjectArray[i];
    
    if (typeof variable[1] === 'number') continue;

    if (variable[1][2] > theNumber) {
      theNumber = variable[1][2];
    };
  };

  for (let i = 0; i < coffObjectArray.length;i++) {
    const variable = coffObjectArray[i];

    if (typeof variable[1] === 'number') continue;

    if (!Number.isInteger(variable[1][0] * theNumber)) {
      theNumber = theNumber * variable[1][2];
    };
  };
  if (coffObject.coffNum > Object.keys(coffObjectArray).length - 1) {

    coffObject[`X${coffObject.coffNum}`] = [1, coffObject.coffNum, theNumber];
  };

  const result = [];

  const finalArray = Object.entries(coffObject);

  for (let i = 0; i < finalArray.length; i++) {
    const variable = finalArray[i];

    if (typeof variable[1] === 'number') continue;

    result.push(variable[1][0] * theNumber);
  };

  return result;  
};



function getREF(matrix) {
  const m = matrix.map(row => [...row]); // deep copy
  const rows = m.length;
  const cols = m[0].length;
  let pivot = 0;

  for (let col = 0; col < cols && pivot < rows; col++) {
    // Find a non-zero row in this column
    let nonZeroRow = -1;
    for (let row = pivot; row < rows; row++) {
      if (Math.abs(m[row][col]) > 1e-10) {
        nonZeroRow = row;
        break;
      };
    };
    if (nonZeroRow === -1) continue; // all zeros in this column, skip

    // Swap it to the current pivot row
    [m[pivot], m[nonZeroRow]] = [m[nonZeroRow], m[pivot]];

    // Eliminate everything BELOW the pivot (REF only, not above)
    for (let row = pivot + 1; row < rows; row++) {
      const factor = m[row][col] / m[pivot][col];
      for (let j = col; j < cols; j++) {
        m[row][j] -= factor * m[pivot][j];
        // Clean up floating point noise
        if (Math.abs(m[row][j]) < 1e-10) m[row][j] = 0;
      };
    };
    pivot++;
  };
  return m;
};