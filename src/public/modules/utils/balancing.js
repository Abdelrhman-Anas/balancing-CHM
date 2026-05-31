export async function balancingEquations(matrix) {
  //const matrix = [
  //  [12, 3, 18],
  //  [5, 19 , 2],
  //  [8, 11, 14]
  //];
  console.log(matrix);
  const RREFMatrix = getRREF(matrix)

  console.log(RREFMatrix);
  
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

  console.log(result);
  return result;  
};


///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
const fsub = (a, b) => frac(a.n * b.d - b.n * a.d, a.d * b.d);
const fmul = (a, b) => frac(a.n * b.n, a.d * b.d);
const fdiv = (a, b) => frac(a.n * b.d, a.d * b.n);

function getRREF(matrix) {
  let m = matrix.map(row => row.map(v => frac(v)));
  const R = m.length;
  const C = m[0].length;
  let pivotRow = 0;

  for (let col = 0; col < C && pivotRow < R; col++) {
    let maxRow = -1;
    for (let r = pivotRow; r < R; r++) {
      if (m[r][col].n !== 0) { maxRow = r; break; }
    };

    if (maxRow === -1) continue;

    [m[pivotRow], m[maxRow]] = [m[maxRow], m[pivotRow]];

    const pivot = m[pivotRow][col];
    m[pivotRow] = m[pivotRow].map(v => fdiv(v, pivot));

    for (let r = 0; r < R; r++) {
      if (r === pivotRow) continue;
      const factor = m[r][col];
      m[r] = m[r].map((v, c) => fsub(v, fmul(factor, m[pivotRow][c])));
    };

    pivotRow++;
  };

  return m.map(row =>
    row.map(({ n, d }) => {
      if (n === 0) return 0;
      if (d === 1) return n;
      return n / d;
    })
  );
};

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
};

function frac(n, d = 1) {
  const g = gcd(Math.abs(n), Math.abs(d));
  const sign = d < 0 ? -1 : 1;
  return { n: (sign * n) / g, d: (sign * d) / g };
};