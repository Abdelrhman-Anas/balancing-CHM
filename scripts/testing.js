export function is_it_possible(config1, config2, electronConfiguration) {
  const resultList = {
    possible: true,
    needEnergy: true
  };
  // configurate the elements electrons
  const frist_config = electronConfiguration(config1);
  const fsecond_config = electronConfiguration(config2);
}










//// steps of finding if its possible for making a reaction or not \\\\
// 1) if the elements are too stable
// 2) if the product of the reaction is less stable 
// 3) if both are metals => their is no reaction will occur
// s s p s p s d p s d p s f d p s f d p