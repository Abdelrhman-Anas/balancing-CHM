# Node Stats Helpers
[![Build Status](https://travis-ci.com/jeremyqzt/statsJs.svg?branch=master)](https://travis-ci.com/jeremyqzt/statsJs)  [![Coverage Status](https://coveralls.io/repos/github/jeremyqzt/statsJs/badge.svg?branch=master)](https://coveralls.io/github/jeremyqzt/statsJs?branch=master)  [![Active Development](https://img.shields.io/badge/Maintenance%20Level-Actively%20Developed-brightgreen.svg)](https://gist.github.com/cheerfulstoic/d107229326a01ff0f333a1d3476e068d)

This is a library that helps with some common stats operations. We support the following:
 * Combinations
   *  Counting number of combinations
   *  Getting an array of k-combinations
   *  Getting all power sets
 * Permutations
    *  Counting number of permutations
    *  Getting an array of k-permutations
    *  Getting an array of all permutations
 * Statical Calculation
    * Mean, Median, Mode
    * Geometric means
    * Standard deviation (sample or population)
    * Z-Score from mean/standard deviation or input
    * Correlation
 * Z-score table (From -3.99 to 3.99)
 * Simple probability calculations
 * Matrix Operations
    * Determinant
    * Matrix of Minors, Cofactors
    * Matrix Transpose
    * Matrix Inverse
    * Row Canonical Form (Reduced Row Echelon Form)
    * Matrix Rank
    * LU Decomposition
    * QR Decomposition
    * Dot product
    * Arithmetic on every matrix element
    * Deep copying a matrix
    * Random or Identity matrix of a given size

Full Docs can be found at [our git pages](https://jeremyqzt.github.io/statsJs/).
Example usages are as followed.

## Importing
The libraries can be imported using the following.
```
const {matrixLib, probabilityLib, statsLib, combinationLib, permutationLib} = require('../index.js');
```

## Matrix Helper
Note that all matrixLib operations work on a duplicated copy of the matrix, the original reference is always maintained.

### Adding a constant to every matrix element
Returns a matrix with the each constant C added to each element. In this example, c = 3
```
t = [[1,2,3], [1,2,3], [1,2,3]]
console.log(matrixLib.addMatrixC(t,3))
//=> [ [ 4, 5, 6 ], [ 4, 5, 6 ], [ 4, 5, 6 ] ]
```

### Subtracting a constant to every matrix element
Returns a matrix with the each constant C subtracted from each element. In this example, c = 3
```
t = [[1,2,3], [1,2,3], [1,2,3]]
console.log(matrixLib.addMatrixC(t,3))
//=> [ [ -2, -1, 0 ], [ -2, -1, 0 ], [ -2, -1, 0 ] ]
```

### Multiplying a constant to every matrix element
Returns a matrix with the each constant c multiplied to each element. In this example, c = 3
```
let matTest = [[1.00002,2.31,3,4,5], [-1,-10.4,1,1,5], [7,-8,1,2,8], [9,-1.1231,1,2,3]];
console.log(matrixLib.roundMatrix(matTest))
//=> [ [ 3, 6, 9 ], [ 3, 6, 9 ], [ 3, 6, 9 ] ]
```

### Dividing a constant to every matrix element
Returns a matrix with each element divided by constant c. In this example, c = 3
```
t = [[3,6,9], [12,15,18], [21,24,27]]
console.log(matrixLib.divideMatrixC(t,3))
//=> [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]
```

### Getting basic matricies
Get an identity matrix
```
console.log(matrixLib.getIdentityMatrix(3))
//=> [ [ 1, 0, 0 ], [ 0, 1, 0 ], [ 0, 0, 1 ] ]
```

Get an identity matrix, but with extra columns of rows
```
console.log(matrixLib.getIdentityMatrixRC(4, 3))
//=> [ [ 1, 0, 0 ], [ 0, 1, 0 ], [ 0, 0, 1 ], [ 0, 0, 0 ] ]
```

Get an matrix of constants (3X2 matrix of constantly 4)
```
console.log(matrixLib.getMatrix(3, 2, 4))
//=> [ [ 4, 4 ], [ 4, 4 ], [ 4, 4 ] ]
```

### Basic Matrix operations
Comparing 2 matricies
```
let A = [1,2,3]
console.log(matrixLib.areMatriciesEqual(A, A)
//=> true
console.log(matrixLib.areMatriciesEqual(A, [[1,2],[2,3]])
//=> false
```
Comparing 2 matricies, with an error tolerance. By default tolerance is 0.1 set it using the third parameter.
```
let A = [1,2,3]
console.log(matrixLib.areMatriciesApproximatelyEqual(A, A))
//=> true
console.log(matrixLib.areMatriciesApproximatelyEqual(A, [1.09,2.01,3]))
//=> true
console.log(matrixLib.areMatriciesApproximatelyEqual(A, [1.09,2.01,3], 0.05))
//=> false
```
Duplicating a matrix - leaves original reference intact
```
let A = [1,2,3]
console.log(matrixLib.duplicateMatrix(A))
//=> [1,2,3]
```

Get an random matrix (4X3 matrix between -10 and 10, floats allowed)
```
matrixLib.getRandomMatrix(4, 3, {min:-10, max:10 , intOnly: false}):
```

Matrix Transpose
```
console.log(matrixLib.transposeMatrix([1,2,3]));
//=> [ [ 1 ], [ 2 ], [ 3 ] ]
```
### Rounding every matrix element
Rounds each matrix element to a given decimal place, in this case, rounds to first decimal
```
t = [[1,2,3], [1,2,3], [1,2,3]]
console.log(matrixLib.roundMatrix(matTest, 1))
//=> [
//    [ 1, 2.3, 3, 4, 5 ],
//    [ -1, -10.4, 1, 1, 5 ],
//    [ 7, -8, 1, 2, 8 ],
//    [ 9, -1.1, 1, 2, 3 ]
//   ]
```

### Matrix dot product
Returns a matrix that represents the dot product of the 2 input matricies
```
t = [
    [1,2,3],
    [4,5,6],
    [7,2,9]
]

t2 = [
    [1,1,1],
    [1,1,1],
    [1,1,1]
]
console.log(matrixLib.multiplyMatrix(t, t2));
//=> [ [ 6, 6, 6 ], [ 15, 15, 15 ], [ 18, 18, 18 ] ]
```

### LU Decomposition
Returns a lower and upper matrix decomposed from the given matrix. Utilizes Crout's method
Returns null if the determinant is too close to 0 (No LU available)
```
let matTest = [[1.00002,2.31,3,4,5], [-1,-10.4,1,1,5], [7,-8,1,2,8], [9,-1.1231,1,2,3]];
console.log(matrixLib.QrDecomposeMatrix(matTest));


//=> {
//     L: [
//       [ -3, 0, 0 ],
//       [ -12, -5.8, 0 ],
//       [ 77, 19.633333333333333, -11.16896551724139 ]
//     ],
//     U: [
//       [ 1, -0.5666666666666667, 3 ],
//       [ 0, 1, -6.1034482758620685 ],
//       [ 0, 0, 1 ]
//     ]
//   }
```

### QR Decomposition
Performs householder's algorithm to QR decompose the matrix.
returns a dictionary with {
  Q: <Q matrix>
  R: <R matrix>
  Q_x: <Intermediate H matricies, starting from H0...Hx>
}
```
let matTest = [[1.00002,2.31,3,4,5], [-1,-10.4,1,1,5], [7,-8,1,2,8], [9,-1.1231,1,2,3]];
let qrRes = matrixLib.QrDecomposeMatrix(matTest);
console.log(matrixLib.roundMatrix(qrRes.R));
//=> [
//     [ 11, -5, 2, 3, 7 ],
//     [ 0, 13, -0, -0, -6 ],
//     [ -0, 0, 3, 4, 6 ],
//     [ 0, -0, 0, 0, 2 ]
//   ]
console.log(matrixLib.roundMatrix(qrRes.Q));
//=> [
//     [ 0, 0, 1, 0 ],
//     [ -0, -1, 0, -0 ],
//     [ 1, -0, -0, 1 ],
//     [ 1, 0, -0, -1 ]
//   ]
console.log(qrRes.Q_x)
//=> [
//     [ [ 1, 0, 0, 0 ], [ 0, 1, 0, 0 ], [ 0, 0, 1, 0 ], [ 0, 0, 0, 1 ] ],
//     [ [ 1, 0, 0, 0 ], [ 0, 1, 0, 0 ], [ 0, 0, 1, 0 ], [ 0, 0, 0, 1 ] ]
//   ]
```

### Determinant
Returns the determinant of the matrix
```
test = [[1,2,3], [4,5,6], [7,2,9]]
console.log(matrixLib.determinantMatrix(test));
//=> -36
```

### Inverse of a matrix
Returns the inverse of the matrix
```
test = [[1,2,3], [4,5,6], [7,2,9]]
console.log(matrixLib.inverseMatrix(test));
//=> [
//    [ -0.9166666666666666, 0.3333333333333333, 0.08333333333333333 ],  
//    [ -0.16666666666666666, 0.3333333333333333, -0.16666666666666666 ],
//    [ 0.75, -0.3333333333333333, 0.08333333333333333 ]
//   ]
```

### Matrix of Cofactors
Puts the matrix as a matrix of cofactors
```
let coFactorTest = [[1,2,3, 11],[4,-2,13, -6],[-7, 9,8,7]];
console.log(matrixLib.cofactorMatrix(coFactorTest));
// => [
//      [ 1, -2, 3, -11 ],
//      [ -4, -2, -13, -6 ],
//      [ -7, -9, 8, -7 ]
//    ]
```

### Matrix of Minors
Puts the matrix as a matrix of minors, matrix must be *Square*.
```
let coFactorTest = [[1,2,3, 11],[4,-2,13, -6],[-7, 9,8,7]];
console.log(matrixLib.cofactorMatrix(coFactorTest));
// => [
//      [ -133, 123, 22, 22 ],
//      [ -11, 29, 23, 23 ],
//      [ 32, 1, -10, -10 ]
//    ]
```

### Eigenvalues of a matrix
Returns the eigenvalues of a matrix, all eigenvalues appears on the diagonal. In this case,
the matrix eigenvalues are 4 and -3.

The second paramter can be used to control the maximum number of QR iteration algorithms cycles.
The default is 20.
```
let mat2 = [[3,2],[3,-2]];
console.log(matrixLib.QReig(mat2));
//=> [
       [ 4.001464871443321, 0 ],
       [ 0, -3.0014648714433183 ]
     ]

console.log(matrixLib.QReig(mat2,2000));
//=> [
       [ 4.000000007324081, 0 ],
       [ 0, -3.000000007324077 ]
     ]
```


### Eigenvectors of a matrix and given eigenvalue
Given a *Square* matrix and an approximate eigenvalue. A corresponding eigenvector is returned.
The initial eigenvalue must be different than the actual eigenvalue - otherwise it may return NaN or Inifinty

This is based off of the inverse iteration algorithm.

In the following example, the eigenvalues are 4,-3 (as found previously). 2 is passed in as the initial eigenvalue.

The initial eigenvector is null (a random eigenvector is generated).
By default - the iteration tolerance is 0, a maximum of 200 cycles is perofmed.
```
let mat2 = [[3,2],[3,-2]];
console.log(matrixLib.matrixEigenVector(mat2, 2));
// => [ [ 2 ], [ 1 ] ]
```
In the following example, the eigenvalues are 4,-3 (as found previously). -22 is passed in as the initial eigenvalue
and `[[-10],[-2]]` is the initial eigenvector guess. 

The algorithm parameters are 2000 cycles maximum or 0 change between each successive iterations
```
let mat2 = [[3,2],[3,-2]];
console.log(matrixLib.matrixEigenVector(mat2, -22, [[-10],[-2]], {tol = 0, iter=2000}));
// => [ [ -0.33333333333333337 ], [ 1 ] ]
```

### Row Canonical Form and Rank
Puts the matrix in row canonical form (Reduced Row Echelon Form).
```
let rankTest = [[1,2,3, 11],[4,-2,13, -6],[-7, 9,8,7]];
console.log(matrixLib.rowCanonicalMatrix(rankTest));
// => [
//     [ 1, 0, 0, 4.169329073482428 ],
//     [ 0, 1, 0, 4.900958466453674 ],
//     [ 0, 0, 1, -0.9904153354632588 ]
//    ]
```
Finds the rank of the matrix
```
console.log(matrixLib.rankOfMatrix(rankTest));
// => 3
```

## Combination Helper
### Counting number of combinations 
Returns the number of pemutations of the given input. The following is 5 choose 3 (5C3) and 10 choose 7 (10C7).
```
console.log(combinationLib.countCombinations(5,3))
//=> 10
console.log(combinationLib.countCombinations(10,7))
//=> 120
```

### Getting the combinations
Returns the combinations of the given input. This utilizes the Forward-Backward Algorithm for generating combinations.
```
console.log(combinationLib.combinations([1,2,3,4,5,6,7,8,9,10],7))
//=> [ Set { 1, 2, 3, 4, 5, 6, 7 },
//     Set { 1, 2, 3, 4, 5, 6, 8 },
//     Set { 1, 2, 3, 4, 5, 6, 9 },
//     Set { 1, 2, 3, 4, 5, 6, 10 },
//     Set { 1, 2, 3, 4, 5, 7, 8 },
//     Set { 1, 2, 3, 4, 5, 7, 9 },
//     ...119 more
console.log(combinationLib.combinations([1,2,3,4,5,6,7,8,9,10],7).length)
//=> 120
```

### Counting number of power sets
Returns the number of combinations of the given input.
```
console.log(combinationLib.countPowerSet(6));
//=> 64
```

### Getting the power sets
Returns the powersets of the given input.
```
console.log(combinationLib.powerSet([1,2,3,4,5]));
//=> [ Set {},
//     Set { 1 },
//     Set { 2 },
//     Set { 1, 2 }, 
//     Set { 3 }, 
//     Set { 1, 3 }, 
//     ...26 more
```

## Permutation Helper

### Factorials
Returns the evaluated factorial of the given input.
```
console.log(permutationLib.factorial(5));
//=> 120
```

### Counting number of permutations
Returns the number of pemutations of the given input. The following is 5P5.
```
console.log(permutationLib.countPermutation(5,5))
//=> 120
console.log(permutationLib.countPermutation(5,1))
//=> 5
```

### Getting the permutations
Returns the pemutations of the given input. This utilizes Heap's Algorithm for generating permutations.
```
console.log(permutationLib.permutation([1,2,3]))
//=> [ [ 1, 2, 3 ],
//     [ 2, 1, 3 ],
//     [ 3, 1, 2 ],
//     [ 1, 3, 2 ],
//     [ 2, 3, 1 ],
//     [ 3, 2, 1 ]
//   ]
```

### Getting N permutations
Returns the N pemutations of the given input. This utilizes a recursive algorithm to generate all permutations of a given length. The Following is 3-length permutations of 5 (5P3).
```
console.log(permutationLib.kPermutations([1,2,3,4,5], 3))
//=> [ [ 1, 2, 3 ],
//     [ 1, 2, 4 ],
//     [ 1, 2, 5 ],
//     [ 1, 3, 2 ],
//     [ 1, 3, 4 ],
//     [ 1, 3, 5 ],
//     ...54 more
console.log(permutationLib.nPermutations([1,2,3,4,5], 3).length)
//=> 60
```

## Probability Helper
### P(X and Y)
Probability of X and Y occuring (Assuming X and Y are independent).
```
console.log(probabilityLib.XandY(0.5, 0.3))
//=> 0.15
```

### P(X or Y)
Probability of X or Y occuring (Assuming X and Y are independent).
```
console.log(probabilityLib.XorY(0.5, 0.3))
//=> 0.65
```

### P(X and ~Y)
Probability of X and NOT Y occuring (Assuming X and Y are independent).
```
console.log(probabilityLib.XandNotY(0.5, 0.3))
//=> 0.35
```

### P(X | Y)
Probability of X occuring given that Y occured (Assuming X and Y are independent).
```
console.log(probabilityLib.XgivenY(0.5, 0.3))
//=> 0.5
```

### P(X | ~Y)
Probability of X occuring given that Y DID NOT occured (Assuming X and Y are independent).
```
console.log(probabilityLib.XgivenNotY(0.5, 0.3))
//=> 0.5
```

## Stats Helper
### Sum of array
Returns a value representing the sum of the input array. Returns 0 if input is invalid.
```
console.log(statsLib.sum([1,2,3,4,5]));
//=> 15
```

### Geometric sum of array
Returns a value representing the factorial of the input array. Returns 0 if input is invalid.
```
console.log(statsLib.geometricSum([1,2,3,4,5]));
//=> 120
```

### Mean of array
Returns a value representing the factorial of the input array. Returns _undefined_ if input is invalid.
```
console.log(statsLib.mean([1,2,3,4,5]));
//=> 3
```

### Geometric mean of array
Returns a value representing the geometric mean of the input array. Returns _undefined_ if input is invalid.
```
console.log(statsLib.geometricMean([1,2,3,4,5]));
//=> 2.605171084697352
```

### Median of array
Returns a value representing the geometric mean of the input array. Returns _NaN_ if input is invalid.
```
console.log(statsLib.median([1,2,3,4,5]));
//=> 3
console.log(statsLib.median([5,3,1,4,2,3,4,5]));
//=> 3.5
```

### Mode of array
Returns a value representing the mode of the input array.
```
console.log(statsLib.mode([1,2,3,4,5]));
//=> [ 1, 2, 3, 4, 5 ]
console.log(statsLib.mode([5,3,1,4,2,3,4,5]));
//=> [ 3, 4, 5 ]
console.log(statsLib.mode([5,3,1,4,2,3,4,5,7,7,7]));
//=> [ 7 ]
```

### Standard deviation of array
Returns a value representing the standard deviation of the input array. Assumes the input array is the population unless otherwise specified. Returns _NaN_ if input is invalid.
```
console.log(statsLib.stdev([5,3,1,4,2,3,4,5,7,7,7], opt = {"population": true}));
//=> 1.966664332071267
console.log(statsLib.stdev([5,3,1,4,2,3,4,5,7,7,7], opt = {"population": false}));
//=> 2.062654952856986
```

### Absolute percentile of array
Returns a value representing the given percentile of the input array. The following example gives the 80th percentile value - which is 5.
```
console.log(statsLib.absolutePercentile(80, [5,3,1,4,2,3,4,5,7,7,7]));
//=> 5
```

### Z-score of an value, mean and standard deviation
Returns a value representing the percentile of a value and a given input. Value does not have to be in the input, a Z-score calculation and lookup occurs. Returns _undefined_ if input is not a number.
```
console.log(statsLib.percentileFromMeanAndStdev(5, 5.5, 3));
//=> 0.43251
console.log(statsLib.percentileFromMeanAndStdev(5, 22, 1.3));
//=> 0.00003
```

### Z-score of a value and array
Returns a value representing the Z-score of the input array.
```
console.log(statsLib.zScore(7, [5,3,1,4,2,3,4,5,7,7,7]));
//=> 1.3405254742109705
console.log(statsLib.zScore(10, [5,3,1,4,2,3,4,5,7,7,7]));
//=> 2.8659510138303506
```

### Percentile given value and input array
Returns a value representing the Z-score of the mean and standard deviaiton. Returns _undefined_ if input is not a number.
```
console.log(statsLib.percentile(13, [1,2,3,4,5,6,7,8,9,10], opt={"population": false}));
//=> 0.99343
console.log(statsLib.percentile(5, [1,2,3,4,5,6,7,8,9,10], opt={"population": true}));
//=> 0.43251
console.log(statsLib.percentile(5.5, [1,2,3,4,5,6,7,8,9,10], opt={"population": true}));
//=> 0.5
```

### Z-score percentile
Returns a value representing the percentile of a given Z-score. Returns _undefined_ if input is not a number.
```
console.log(statsLib.zScorePercentile(3.99));
//=> 0.99997
console.log(statsLib.zScorePercentile(-2.1));
//=> 0.01786
```

### Correlations
Returns a value representing the correlatio between 2 arrays
```
console.log(statsLib.correlation([1,2,3,4,5], [1,2,3,4,5]))
//=> 1
console.log(statsLib.correlation([1,2,3,4,5], [-1,-2,-3,-4,-5]))
//=> -1
console.log(statsLib.correlation([1,4,9,5,3], [-1,-2,-3,-4,-5]))
//=> -0.266500895444513
```