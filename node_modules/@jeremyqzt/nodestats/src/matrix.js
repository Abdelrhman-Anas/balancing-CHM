/** Class aggregating matrix methods. */
class matrixLib{
    /**
     * Checks if a pair of matricies are equal in size
     * @param {number[][]} A - The matrix to check
     * @param {number[][]} B - The second to check
     * @return {bool} Result if the dimension of the given matricies are equal
     */
    static isValidMatrixPair(A, B){
        if (A.length !== B.length){
            return false;
        }

        for (let i = 0; i < A.length; i++){
            if (A[i].length !== B[i].length){
                return false;
            }
        }
        
        return true;
    }

    /**
     * Adds constant c to each item in the matrix
     * @param {number[][]} A - The matrix to add c to
     * @param {number} c - Constant to add to each value
     * @return {number[][]} Matrix result from the adding C to each element of A
     */
    static addMatrixC(A, c){
        const addFunc = (i, j) =>{
            return i + j;
        };

        let ret = null;
        if (Array.isArray(A[0])){
            let B = [];
            for (let i = 0; i < A.length; i++){
                let newRow = [];
                for (let j = 0; j < A[i].length; j++){
                    newRow[j] = c
                }
                B[i] = newRow;
            }
            ret = matrixLib.matrixOpperation(A, B, addFunc);
        } else {
            ret = matrixLib.matrixOpperation1D(A, Array(A.length).fill(c), addFunc);
        }
        return ret;
    }

    /**
     * Multiplies constant c to each item in the matrix
     * @param {number[][]} A - The matrix to add c to
     * @param {number} c - Constant to multiply each value by
     * @return {number[][]} Matrix result from the multiplying c to each element of A
     */
    static multiplyMatrixC(A, c){
        const multFunc = (i, j) =>{
            return i * j;
        };

        let ret = null;
        if (Array.isArray(A[0])){
            let B = [];
            for (let i = 0; i < A.length; i++){
                let newRow = [];
                for (let j = 0; j < A[i].length; j++){
                    newRow[j] = c
                }
                B[i] = newRow;
            }
            ret = matrixLib.matrixOpperation(A, B, multFunc);
        } else {
            ret = matrixLib.matrixOpperation1D(A, Array(A.length).fill(c), multFunc);
        }
        return ret;
    }


    /**
     * Takes the power C for each element in the array
     * @param {number[][]} A - The matrix to take power for
     * @param {number} c - Constant to take power for
     * @return {number[][]} Matrix result from power of c for each element in A
     */
    static powerMatrixC(A, c){
        const powFunc = (item, pow) =>{
            return Math.pow(item, pow);
        };

        let ret = null;
        if (Array.isArray(A[0])){
            let B = [];
            for (let i = 0; i < A.length; i++){
                let newRow = [];
                for (let j = 0; j < A[i].length; j++){
                    newRow[j] = c
                }
                B[i] = newRow;
            }
            ret = matrixLib.matrixOpperation(A, B, powFunc);
        } else {
            ret = matrixLib.matrixOpperation1D(A, Array(A.length).fill(c), powFunc);
        }
        return ret;
    }

    
    /**
     * Divides constant c to each item in the matrix
     * @param {number[][]} A - The matrix to add c to
     * @param {numbe} c - Constant to divide each value by
     * @return {number[][]} Matrix result from the multiplying c to each element of A
     */
    static divideMatrixC(A, c){
        const multFunc = (i, j) =>{
            return i / j;
        };

        let ret = null;
        if (Array.isArray(A[0])){
            let B = [];
            for (let i = 0; i < A.length; i++){
                let newRow = [];
                for (let j = 0; j < A[i].length; j++){
                    newRow[j] = c
                }
                B[i] = newRow;
            }
            ret = matrixLib.matrixOpperation(A, B, multFunc);
        } else {
            ret = matrixLib.matrixOpperation1D(A, Array(A.length).fill(c), multFunc);
        }
        return ret;
    }

    /**
     * Subtracts constant c to each item in the matrix
     * @param {number[][]} A - The matrix to sub c to
     * @param {number} c - Constant to subtract from each value
     * @return {number[][]} Matrix result from the subtracting C to each element of A
     */
    static subMatrixC(A, c){
        const subFunc = (i, j) =>{
            return i - j;
        };

        let ret = null;
        if (Array.isArray(A[0])){
            let B = [];
            for (let i = 0; i < A.length; i++){
                let newRow = [];
                for (let j = 0; j < A[i].length; j++){
                    newRow[j] = c
                }
                B[i] = newRow;
            }
            ret = matrixLib.matrixOpperation(A, B, subFunc);
        } else {
            ret = matrixLib.matrixOpperation1D(A, Array(A.length).fill(c), subFunc);
        }
        return ret;
    }

    /**
     * Adds matrix A to matrix B
     * @param {number[][]} A - Matrix input A
     * @param {number[][]} B - Matrix input B
     * @return {number[][]} Matrix result from adding A and B
     */
    static addMatrix(A, B){
        const addFunc = (i, j) =>{
            return i + j;
        };

        let ret = null;
        if (Array.isArray(A[0])){
            ret = matrixLib.matrixOpperation(A, B, addFunc);
        } else {
            ret = matrixLib.matrixOpperation1D(A, B, addFunc);
        }
        return ret;
    }

    /**
     * Subtracts matrix B from matrix A
     * @param {number[][]} A - Matrix input A
     * @param {number[][]} B - Matrix input B
     * @return {number[][]} Matrix result from A - B
     */
    static subMatrix(A, B){
        const subFunc = (i, j) =>{
            return i - j;
        };

        let ret = null;
        if (Array.isArray(A[0])){
            ret = matrixLib.matrixOpperation(A, B, subFunc);
        } else {
            ret = matrixLib.matrixOpperation1D(A, B, subFunc);
        }
        return ret;
    }

    /**
     * Multiplies matrix A and B
     * Note: You must check if the matrices are actually multiply-able
     * @param {number[][]} A - Matrix input A
     * @param {number[][]} B - Matrix input B
     * @return {number[][]} Matrix result from A * B
     */
    static multiplyMatrix(A, B){
        if (!Array.isArray(A[0])){
            //size 1 arr
            let ret = 0;
            for (let z = 0; z < A.length; z++){
                ret += A[z] * B[z][0];
            }
            return [ret];
        }

        let aRow = A.length;
        let bCol = B[0].length;

        let outputSize = {
            row: aRow,
            col: bCol,
        }

        let ret = [];
        for (let i = 0; i < outputSize.row; i++){
            let newRow = [];
            for (let j = 0; j < outputSize.col; j++){
                newRow[j] = matrixLib.dotProductMatrix(A, B, i, j);
            }
            ret[i] = newRow;
        }
        return ret;
    }

    /**
     * Computers the dot product at a given row and column
     * Note: A and B must be multiply-able
     * Inputs are 0-offset.
     * @param {number[][]} A - The matrix A
     * @param {number[][]} B - The matrix B
     * @param {number} row - Row to find dot product for
     * @param {number} col - Column to find dot product for
     * @return {number} Numerical evaluation of the dot product matrix A and B @ (row,col)
     */
    static dotProductMatrix(A, B, row, col){
        let ret = 0;
        for (let i = 0; i < A[row].length; i++){
            ret += A[row][i] * B[i][col];
        }
        return ret;
    }

    /**
     * Operates on the given matricies with func (for 2D dim matrices)
     * @param {number[][]} A - The matrix to sum
     * @param {number[][]} B - The second to sum
     * @return {number[][]} Numerical evaluation of matrix A and B
     */
    static matrixOpperation(A, B, func){
        let ret = [];
        for (let i = 0; i < A.length; i++){
            let row = [];
            for (let j = 0; j < A[i].length; j++){
                row[j] = func(A[i][j], B[i][j]);
            }
            ret[i] = row;
        }
        return ret;
    }

    /**
     * Operates on the given matricies with func (for 1 dim matrices)
     * @param {number[]} A - The matrix to sum
     * @param {number[]} B - The second to sum
     * @return {number[]} Numerical evaluation of matrix A and B
     */
    static matrixOpperation1D(A, B, func){
        let ret = [];
        for (let i = 0; i < A.length; i++){
            ret[i] = func(A[i], B[i]);
        }
        return ret;
    }

    /**
     * Returns an identity matrix of a given size
     * @param {number} size - The size of matrix to generate
     * @return {number[][]} Identity matrix of a given size
     */
    static getIdentityMatrix(size){
        let ret = [];
        for (let i = 0; i < size; i++){
            let newRow = [];
            for (let j = 0; j < size; j++){
                newRow[j] = (i === j) ? 1: 0;
            }
            ret[i] = newRow;
        }
        return ret;
    }

    /**
     * Returns an identity matrix of size R X C
     * @param {number} rows - Number of rows in the matrix
     * @param {number} cols - Number of columns in the matrix
     * @return {number[][]} Identity matrix of a given size
     */
    static getIdentityMatrixRC(rows, cols){
        let ret = [];
        for (let i = 0; i < rows; i++){
            let newRow = [];
            for (let j = 0; j < cols; j++){
                newRow[j] = (i === j) ? 1: 0;
            }
            ret[i] = newRow;
        }
        return ret;
    }

    /**
     * Returns an square zero matrix of a given size
     * @param {number} row - The row size of matrix to generate
     * @param {number} col - The column size of matrix to generate
     * @return {number[][]} Zero matrix of a given size
     */
    static getZeroMatrix(row, col){
        let ret = [];
        for (let i = 0; i < row; i++){
            let newRow = [];
            for (let j = 0; j < col; j++){
                newRow[j] = 0;
            }
            ret[i] = newRow;
        }
        return ret;
    }

    /**
     * Computes the determinant of a matrix, returns NaN if det === 0
     * @param {number[][]} A - The matrix to find determinat for
     * @return {number} determinant of A
     */
    static determinantMatrix(A){
        let {L, U} = matrixLib.LuDecomposeMatrix(A);

        if ((L === U) && L === null){
            return 0;
        }

        let lDet = 1;
        let uDet = 1;

        for (let i = 0; i < A.length; i++){
            lDet = lDet * L[i][i];
            uDet = uDet * U[i][i];
        }

        return lDet * uDet;
    }

    /**
     * @typedef {Object} LU
     * @property {number[][]} L - Lower triangular matrix from decomposition
     * @property {number[][]} U - Upper triangular matrix from decomposition
     */

    /**
     * Computes the upper and lower matrix using crout's method
     * Implementation is from: https://en.wikipedia.org/wiki/Crout_matrix_decomposition
     * @param {number[][]} A - The matrix to decompose
     * @return {LU} LU decomposition result
     */
    static LuDecomposeMatrix(A){
        let n = A.length;
        let U = matrixLib.getIdentityMatrix(n);
        let L = matrixLib.getZeroMatrix(n, n);
        let sum = 0;
       
        for (let j = 0; j < n; j++) {
            for (let i = j; i < n; i++) {
                sum = 0;
                for (let k = 0; k < j; k++) {
                    sum = sum + L[i][k] * U[k][j];	
                }
                L[i][j] = A[i][j] - sum;
            }
    
            for (let i = j; i < n; i++) {
                sum = 0;
                for(let k = 0; k < j; k++) {
                    sum = sum + L[j][k] * U[k][i];
                }
                if (L[j][j] == 0) {
                    return {
                        L: null,
                        U: null,
                    };
                }
                U[j][i] = (A[j][i] - sum) / L[j][j];
            }
        }

        return {
            L: L,
            U: U,
        };
    }

    /**
     * Gets a random matrix of given parameters
     * @param {number} row - number of rows to generate
     * @param {number} col - number of columns to generate
     * @param {{min: number, max: number, intOnly: boolean}} opt - Option for random values
     * @return {number[][]} A matrix of random values given the options
     */
    static getRandomMatrix(row, col, opt = {min: -10, max: 10, intOnly: true}){
        let ret = [];
        const randNum = (minVal, maxVal, integer) => {
            let val = (Math.random() * maxVal)  + minVal;
            if (integer){
                return Math.round(val);
            }
            return val;
        }

        for (let i = 0; i < row; i++){
            let newRow = [];
            for (let j = 0; j < col; j++){
                newRow[j] = randNum(opt.min, opt.max, opt.intOnly);
            }
            ret[i] = newRow;
        }

        return ret;
    }


    /**
     * Gets a random matrix of the given value
     * @param {number} row - number of rows to generate
     * @param {number} col - number of columns to generate
     * @param {number} val - Option for random values
     * @return {number[][]} A matrix of the given value
     */
    static getMatrix(row, col, val){
        let ret = [];

        for (let i = 0; i < row; i++){
            let newRow = [];
            for (let j = 0; j < col; j++){
                newRow[j] = val;
            }
            ret[i] = newRow;
        }
        return ret;
    }

    /**
     * @typedef {Object} MatrixDescription
     * @property {number} row - Numbers of rows in the given matrix (Do not use if not valid)
     * @property {number} col - Number of columns in the given matrix (Do not use if not valid)
     * @property {boolean} square - Boolean representing if the matrix is square
     * @property {boolean} identity - Boolean representing if the matrix is the identity matrix
     * @property {boolean} valid - Boolean representing if the matrix is valid
     */

    /**
     * Describes a given matrix
     * @param {number[][]} mat - The matrix to describe
     * @return {MatrixDescription} Description of the given matrix
     */
    static describeMatrix(mat){
        let rows = mat.length;
        let colSame = true;
        let isIdentity = true;

        if (Array.isArray(mat[0])){
            let colFirst = mat[0].length;
            for (let i = 0; i < rows; i++){
                if (mat[i].length !== colFirst){
                    colSame = colSame && false;
                }

                for (let j = 0; j < mat[i].length; j++){
                    if (i === j){
                        if (mat[i][j] !== 1){
                            isIdentity = isIdentity && false;
                        }
                    } else if (mat[i][j] !== 0){
                        isIdentity = isIdentity && false;
                    }
                }
            }
            let ret = {
                row: rows,
                col: colFirst,
                square: colFirst === rows,
                identity: isIdentity,
                valid: colSame,
            };
            return ret;
        } else {
            return {
                row: 1,
                col: mat.length,
                square: false,
                identity: false,
                valid: true,
            };
        }
    }

    /**
     * Transposes a given matrix
     * 
     * @param {number[][]} mat - The matrix to transpose
     * @return {number[][]} Transposed matrix
     */
    static transposeMatrix(mat){
        let ret = [];

        if (!Array.isArray(mat[0])){
            for (let i = 0; i < mat.length; i++){
                ret[i] = [mat[i]];
            }
            return ret;
        }
    
        for (let j = 0; j < mat[0].length; j++){
            let col = [];
            for (let i = 0; i < mat.length; i++){
                col.push(mat[i][j]);
            }
            ret[j] = col;
        }
        return ret;
    }

    /**
     * Determins a the matrix of cofactors. (+,-,+,-,+,- ...)
     * @param {number[][]} mat - The matrix to determine cofactors for
     * @return {number[][]} matrix of cofactors
     */
    static cofactorMatrix(mat){
        let ret = [];
        let multFactor = 1;

        if (!Array.isArray(mat[0])){
            for (let i = 0; i < mat.length; i++){
                ret[i] = mat[i] * multFactor;
                multFactor = multFactor * -1;
            }
            return ret;
        }
    
        for (let i = 0; i < mat.length; i++){
            let col = [];
            for (let j = 0; j < mat[i].length; j++){
                col[j] = (mat[i][j] * multFactor);
                multFactor = multFactor * -1;
            }
            multFactor = (i % 2 === 0)? -1: 1;
            ret[i] = col;
        }
        return ret;
    }

    /**
     * Duplicates a given matrix. I.e. new copy is created and returned
     * Original reference is maintained
     * @param {number[][]} mat - The matrix to duplicate
     * @return {number[][]} Duplicated matrix
     */
    static duplicateMatrix(mat){
        let ret = [];
        if (!Array.isArray(mat[0])){
            return [...mat];
        }
    
        for (let i = 0; i < mat.length; i++){
            ret[i] = [...mat[i]];
        }
        return ret;
    }

    /**
     * Deletes a row and column of a given matrix
     * Original reference is maintained
     * This method only works on 2D matricies
     * @param {number[][]} mat - The matrix to modify
     * @param {number} row - The row to remove
     * @param {number} col - The col to remove
     * @return {number[][]} Matrix without the specified row and column
     */
    static removeRowAndColMatrix(mat, row, col){
        let ret = matrixLib.duplicateMatrix(mat);
    
        for(let i = 0 ; i < ret.length ; i++)
        {
            ret[i].splice(col,1);
        }

        ret.splice(row, 1);
        
        return ret;
    }

    /**
     * Computes the matrix of minors
     * Note: this method does not accept 1D matricies.
     * Original reference is maintained
     * @param {number[][]} mat - The matrix to find minors for
     * @return {number[][]} Matrix of minors
     */
    static ofMinorsMatrix(mat){
        let ret = matrixLib.getZeroMatrix(mat.length, mat[0].length);
    
        for(let i = 0 ; i < mat.length ; i++)
        {
            for (let j = 0; j < mat[i].length; j++){
                let newMat = matrixLib.removeRowAndColMatrix(mat, i, j);
                ret[i][j] = matrixLib.determinantMatrix(newMat);
            }
        }
        return ret;
    }

    /**
     * Computes the inverse of a matrix
     * Note: this method does not accept 1D matricies and the input must be square
     * Original reference is maintained
     * @param {number[][]} mat - The matrix to find inverse of
     * @return {number[][]} Inverse of the input matrix
     */
    static inverseMatrix(mat){
        let minors = matrixLib.ofMinorsMatrix(mat);
        let determinant = matrixLib.determinantMatrix(mat);
        let cofactors = matrixLib.cofactorMatrix(minors);
        let adjugate = matrixLib.transposeMatrix(cofactors);

        return matrixLib.divideMatrixC(adjugate, determinant);
    }


    /**
     * Returns then rank of a matrix
     * @param {number[][]} mat - The matrix to get rank for
     * @return {number}  Matrix rank
     */    
    static rankOfMatrix(mat){
        let rref = matrixLib.rowCanonicalMatrix(mat);
        let rank = 0;
        let colOkay = false;
        for (let col = 0 ; col < rref[0].length; col++){
            colOkay = false;
            for (let row = 0; row < rref.length; row++){
                if (rref[row][col] !== 0){
                    if (colOkay){
                        colOkay = false;
                        break;
                    }
                    colOkay = true;
                    continue;
                }

            }

            if(colOkay){
                rank+=1;
            }
        }

        return rank;

    }

    /**
     * Computes the row canonical form of a matrix (Also known as reduced row echelon)
     * Implementation from pseudo code: https://rosettacode.org/wiki/Reduced_row_echelon_form
     * Note: this method does not accept 1D matricies
     * Original reference is maintained
     * @param {number[][]} mat - The matrix to find inverse of
     * @return {number[][]} Row canonical form of the given matrix
     */
    static rowCanonicalMatrix(mat){
        let ret = matrixLib.duplicateMatrix(mat);
        let rowCount = mat.length;
        let columnCount = mat[0].length;
        let lead = 0;

        for (let r = 0; r < rowCount && lead + 1; r++){
            let i = r;
            while(ret[i][lead] === 0){
                i = i + 1;
                if (rowCount === i){
                    i = r;
                    lead = lead + 1;
                    if (lead === columnCount){
                        return ret;
                    }
                }
            }
            let tmp = ret[r];
            ret[r] = ret[i];
            ret[i] = tmp;

            if (ret[r][lead] !== 0){
                let divisor = ret[r][lead];
                ret[r] = matrixLib.divideMatrixC(ret[r], divisor);
                for (let u = 0; u < rowCount; u++){
                    if (u !== r){
                        divisor = ret[u][lead];
                        let matToProcess = matrixLib.multiplyMatrixC(ret[r], divisor);
                        ret[u] = matrixLib.subMatrix(ret[u], matToProcess);
                    }
                }

            }
            lead = lead + 1;
        }
        return ret;
    }

    /**
     * Compares a matrix against another one
     * @param {number[][]} A - The matrix to compare
     * @param {number[][]} B - The second matrix to compare
     * @return {boolean} Absolute equality comparison result
     */
    static areMatriciesEqual(A, B){
        let ret = true;
        if (!Array.isArray(A[0]) && !Array.isArray(B[0])){
            for (let i = 0; i < A.length; i++){
                ret &= (A[i] === B[i]);
            }

            return !!ret;
        }

        for (let i = 0; i < A.length; i++){
            for (let j = 0; j < A[i].length; j++){
                ret &= (A[i][j] === B[i][j]);
            }
        }
        
        return !!ret;
    }

    /**
     * Compares a matrix against another one, but allows a small difference tolerance
     * @param {number[][]} A - The matrix to compare
     * @param {number[][]} B - The second matrix to compare
     * @param {number} diff - The maximum (exclusive) tolerated difference between A[i][j] and B[i][j]
     * @return {boolean} Absolute equality comparison result, accounting for tolerance
     */
    static areMatriciesApproximatelyEqual(A, B, diff = 0.01){
        let ret = true;
        if (!Array.isArray(A[0]) && !Array.isArray(B[0])){
            for (let i = 0; i < A.length; i++){
                ret &= (Math.abs(A[i] - B[i]) < diff);
            }

            return !!ret;
        }
        
        for (let i = 0; i < A.length; i++){
            for (let j = 0; j < A[i].length; j++){
                ret &= (Math.abs(A[i][j] - B[i][j]) < diff);
            }
        }
        
        return !!ret;
    }

    /**
     * Gets a matrix column as a vector
     * @param {number[][]} mat - The matrix get vector for
     * @param {number[][]} idx - The column to get matrix for
     * @return {number[]} Vector from the matrix
     */
    static getVectorFromMatrix(mat, idx){
        let ret = [];
        for (let i = 0 ; i < mat.length; i++){
            ret[i] = [mat[i][idx]];
        }

        return ret;
    }

    /**
     * Gets a matrix column as a vector
     * @param {number[][]} mat - The matrix get vector for
     * @param {number[][]} idx - The column to get matrix for
     * @return {number[]} Vector from the matrix
     */
    static vectorNorm(vec, returnAsVec = false){
        let ret = 0;

        for (let i = 0 ; i < vec.length; i++){
            ret += (vec[i][0] * vec[i][0]);
        }

        if (returnAsVec){
            let retVec = matrixLib.getZeroMatrix(vec.length, 1);
            retVec[0][0] = Math.sqrt(ret);
            return retVec;
        }

        return Math.sqrt(ret);
    }


    /**
     * Returns a sub matrix from mat[idx][idx] onwards
     * Original reference is maintained
     * @param {number[][]} mat - The matrix round
     * @param {number} idx - The matrix offset
     * @return {number[][]} Matrix from mat[idx][idx] onwards
     */
    static getSubMatix(mat, idx){
        let ret = matrixLib.getZeroMatrix(mat.length - idx, mat.length - idx);

        for (let i = idx; i < mat.length; i++){
            for (let j = idx; j < mat[i].length; j++){
                ret[i-idx][j-idx] = mat[i][j];
            }
        }

        return ret;
    }

    /**
     * Returns a matrix from mat[idx][idx] set as a submatrix
     * Original reference is maintained
     * @param {number[][]} mat - The matrix round
     * @param {number[][]} sub - The submatrix to plug into the original mat
     * @param {number} idx - The matrix offset
     * @return {number[][]} Matrix reaplced mat[idx][idx] onwards with sub
     */
    static setSubMatix(mat, sub, idx){
        let ret = matrixLib.duplicateMatrix(mat);

        for (let i = idx; i < mat.length; i++){
            for (let j = idx; j < mat[i].length; j++){
                ret[i][j] = sub[i-idx][j-idx];
            }
        }
        return ret;
    }


    /**
     * Rounds each element in the matrix to a given accuracy
     * Original reference is maintained
     * @param {number[][]} mat - The matrix round
     * @param {number} digits - The number of digits to round to
     * @return {number[][]} Matrix with rounding applied
     */
    static roundMatrix(mat, digits){
        let ret = matrixLib.duplicateMatrix(mat);

        for (let i = 0; i < ret.length; i++){
            for (let j = 0 ; j < ret[i].length; j++){
                ret[i][j] = +ret[i][j].toFixed(digits);
            }
        }

        return ret;
    }

    /**
     * Performs QR decomposition on the matrix
     * Original reference is maintained
     * @param {number[][]} mat - The matrix round
     * @return {number[][]} Matrix with rounding applied
     */
    static QrDecomposeMatrix(mat){
        return matrixLib._QrDecomposeMatrix(mat, true);
    }

    static _QrDecomposeMatrix(mat, topLevel){
        if (mat.length === 1){
            return {
                R: mat,
                Q: null,
            };
        }

        let X = matrixLib.getVectorFromMatrix(mat, 0);
        let Xnorm = matrixLib.vectorNorm(X, true);
        let U = matrixLib.subMatrix(X, Xnorm);
        let H_numerator = matrixLib.multiplyMatrix(U, matrixLib.transposeMatrix(U));
        let H_denominator = matrixLib.multiplyMatrix(matrixLib.transposeMatrix(U), U)[0][0] / 2;
        let identity = matrixLib.getIdentityMatrix(H_numerator.length);
        let H_i = matrixLib.subMatrix(identity, matrixLib.divideMatrixC(H_numerator, H_denominator));

        let H_iA = matrixLib.multiplyMatrix(H_i, mat);

        let subMatrix_H_iA = matrixLib.getSubMatix(H_iA, 1);
        let nextQr = matrixLib._QrDecomposeMatrix(subMatrix_H_iA, false);
        let lowerQr = nextQr.R;

        let H_i_next = [H_i];

        if (nextQr.Q !== null){
            H_i_next = [H_i, ...nextQr.Q];
        }

        let R = matrixLib.setSubMatix(H_iA, lowerQr, 1);
        if (topLevel){
            let nextQ = H_i_next[0];
            let allQ = [];
            for (let i = 1; i < H_i_next.length; i++){
                let nextQUnprocessed = matrixLib.getIdentityMatrixRC(H_i_next[i].length + i, H_i_next[i][0].length + i);
                let subMatrix = matrixLib.setSubMatix(nextQUnprocessed, H_i_next[i], i);
                nextQ = matrixLib.multiplyMatrix(nextQ, subMatrix);
                allQ.push(nextQUnprocessed);
            }

            return {
                R: R,
                Q: nextQ,
                Q_x: allQ,
            };
        }

        return {
            R: R,
            Q: H_i_next,
        };
    }

    /**
     * Performs QR iteration to determine eigenvalues
     * @param {number[][]} mat - The matrix to find eigenvalues for
     * @param {iter} mat - Number of iterations (default 20)
     * @return {number[][]} Eigenvalue matrix (eigenvalues in diagonal)
     */
    static QReig(mat, iter = 20){
        let QR = null;
        let intermediate = null;
        let nextA = mat;

        for (let i = 0; i < iter; i++){
            QR = matrixLib.QrDecomposeMatrix(nextA);
            nextA = matrixLib.multiplyMatrix(QR.R, QR.Q);
            //intermediate = matrixLib.multiplyMatrix(QR.Q, nextA);
            //nextA = matrixLib.multiplyMatrix(nextA, matrixLib.transposeMatrix(QR.Q));
        }

        let ret = matrixLib.getIdentityMatrix(mat.length);

        for (let j = 0; j < mat.length; j++){
            ret[j][j] = nextA[j][j];
        }

        return ret;
    }

    /**
     * Performs the inverse power method on a matrix to find its eigenvector
     * @param {number[][]} mat - The matrix to find eigenvalues for
     * @param {number} eigenvalue - A approximate eigenvalue
     * @param {{tol: number, iter: number}} options - Maximum iterations or maximum change in norms between b_k and b_k+1 before termination
     * @return {number[][]} Eigenvector corresponding to given eigenvector
     */
    static matrixEigenVector(mat, eigenvalue, b_i = null, options={tol:0, iter: 200}){

        let b_k = (b_i === null) ?        
        matrixLib.getRandomMatrix(mat.length, 1, {min:-10, max:10 , intOnly: false}):
        matrixLib.duplicateMatrix(b_i);
        let b_k_last = matrixLib.getMatrix(mat.length, 1, Infinity);

        let matIdentity = matrixLib.getIdentityMatrix(mat.length);
        matIdentity = matrixLib.multiplyMatrixC(matIdentity, eigenvalue);
        let inv = matrixLib.subMatrix(mat, matIdentity);

        inv = matrixLib.inverseMatrix(inv);
        let b_kx = null;
        let divisor = 0;
        let diff = Infinity;


        for (let i = 0; i < options.iter; i++){
            b_kx = matrixLib.multiplyMatrix(inv, b_k);
            divisor = matrixLib.vectorNorm(b_kx);
            b_k = matrixLib.divideMatrixC(b_kx, divisor);
            b_k = matrixLib.divideMatrixC(b_k, b_k[b_k.length - 1][0]);

            diff = matrixLib.subMatrix(b_k, b_k_last);
            diff = matrixLib.vectorNorm(diff);
            if (diff < options.tol){
                break;
            }

            b_k_last = matrixLib.duplicateMatrix(b_k);
        }

        return b_k;
    }

}

module.exports = {
    matrixLib: matrixLib,
};
