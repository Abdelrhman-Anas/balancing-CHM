
/** Class aggregating probability methods. */
class probabilityLib{

    /**
     * Checks if probabilities are valid (i.e. between 0 and 1)
     * @param {number} x - probability
     * @param {number} y - probability
     * @return {boolean} true of x and y are valid probabilities
     */
    static valuesOk(x,y){
        if (x < 0 || x > 1 || y < 0 || y > 1){
            return false;
        }
        return true;
    }

    /**
     * Calculates probability of independent X and Y occuring together.
     * @param {number} x - probability of X (0 <= x <= 1)
     * @param {number} y - probability of Y (0 <= y <= 1)
     * @return {number} probability of X and Y occuring
     */
    static XandY(x, y){
        if (probabilityLib.valuesOk(x, y)){
            return x*y;
        }
        return 0;
    }

    /**
     * Calculates probability of independent X and Y - X occurs but not Y.
     * @param {number} x - probability of X (0 <= x <= 1)
     * @param {number} y - probability of Y (0 <= y <= 1)
     * @return {number} probability of X occuring but not Y
     */
    static XandNotY(x, y){
        if (probabilityLib.valuesOk(x, y)){
            return x*(1-y);
        }
        return 0;
    }

    /**
     * Calculates probability of one of independent X and Y occuring.
     * @param {number} x - probability of X (0 <= x <= 1)
     * @param {number} y - probability of Y (0 <= y <= 1)
     * @return {number} probability of X or Y occuring
     */
    static XorY(x, y){
        if (probabilityLib.valuesOk(x, y)){
            return 1-((1-x)*(1-y));
        }
        return 0;
    }

    /**
     * Calculates the conditional probability of X given Y.
     * @param {number} x - probability of X (0 <= x <= 1)
     * @param {number} y - probability of Y (0 <= y <= 1)
     * @return {number} probability of X if Y occured
     */
    static XgivenY(x, y){
        if (probabilityLib.valuesOk(x, y)){
            return (x*y)/y;
        }
        return 0;
    }

    /**
     * Calculates the conditional probability of X given Y not occuring.
     * @param {number} x - probability of X (0 <= x <= 1)
     * @param {number} y - probability of Y (0 <= y <= 1)
     * @return {number} probability of X if Y did not occured
     */
    static XgivenNotY(x, y){
        if (probabilityLib.valuesOk(x, y)){
            return (probabilityLib.XandNotY(x, y))/(1-y);
        }
        return 0;
    }
}

module.exports = {
    probabilityLib: probabilityLib,
};