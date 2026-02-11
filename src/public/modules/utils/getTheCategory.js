const metals = ['alkali metal', 'alkaline earth metal', 'transition metal', 'Post-transition Metal', 'metal'];
const nonmetals = ['halogen', 'nonmetal'];
function getTheCategory(elegroupBlock) {
  let eleCategory;
  for (let i = 0;i < metals.length; i++) {
    const cat = metals[i];
    if (cat === elegroupBlock) {
      eleCategory = 'metal'
      return eleCategory;
    };
  };
  for (let i = 0;i < nonmetals.length; i++) {
    const cat = nonmetals[i];
    if (cat === elegroupBlock) {
      eleCategory = 'nonmetal' 
      return eleCategory;
    };
  };
  if (eleCategory === undefined) {
    eleCategory = elegroupBlock;
    return eleCategory;
  };
};
export default getTheCategory;