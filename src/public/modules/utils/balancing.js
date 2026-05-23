export async function balancingEquations(matrix) {
  //const matrix = [
  //  [12, 3, 18],
  //  [5, 19 , 2],
  //  [8, 11, 14]
  //];
  console.log(matrix);
  const RREFMatrix = getRREF(matrix);
  const REFMatrix = getREF(matrix);

  console.log(RREFMatrix);  console.log(REFMatrix);
  
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


/////////////////////////////////////////////////////////////////////////////////////////////////////////
function getREF(matrix) {
  const m = matrix.map(row => [...row]); 
  const rows = m.length;
  const cols = m[0].length;
  let pivot = 0;

  for (let col = 0; col < cols && pivot < rows; col++) {

    let nonZeroRow = -1;
    for (let row = pivot; row < rows; row++) {
      if (Math.abs(m[row][col]) > 1e-10) {
        nonZeroRow = row;
        break;
      };
    };
    if (nonZeroRow === -1) continue;

    [m[pivot], m[nonZeroRow]] = [m[nonZeroRow], m[pivot]];

    for (let row = pivot + 1; row < rows; row++) {
      const factor = m[row][col] / m[pivot][col];

      for (let j = col; j < cols; j++) {

        m[row][j] -= factor * m[pivot][j];
        if (Math.abs(m[row][j]) < 1e-10) m[row][j] = 0;
      };
    };
    pivot++;
  };
  return m;
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////
function getRREF(matrix) {
  const m = matrix.map(row => [...row]);
  const R = m.length;
  const C = m[0].length;
  let pivotRow = 0;

  let epsilon = 1e-10;

  for (let col = 0; col < C && pivotRow < R; col++) {
    let maxRow = -1, maxVal = 0;

    for (let r = pivotRow; r < R; r++) {

      if (Math.abs(m[r][col]) > maxVal) {
        maxVal = Math.abs(m[r][col]);
        maxRow = r;
      };
    };

    if (maxVal < epsilon) continue;

    [m[pivotRow], m[maxRow]] = [m[maxRow], m[pivotRow]];

    const scale = m[pivotRow][col];
    for (let c = 0; c < C; c++) m[pivotRow][c] /= scale;

    for (let r = 0; r < R; r++) {

      if (r === pivotRow) continue;

      const factor = m[r][col];
      for (let c = 0; c < C; c++) m[r][c] -= factor * m[pivotRow][c];
    };

    pivotRow++;
  };

  return m.map(row =>
    row.map(v => {
      if (Math.abs(v) < epsilon) return 0;
      if (Math.abs(v - Math.round(v)) < epsilon) return Math.round(v);
      return v;
    })
  );
};