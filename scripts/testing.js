const categories = [
  'nonmetal',
  'Alkali',
  'Alkaline',
  'Metalloids',
  'halogen',
  'Post-transition',
  'Transition'
];
export function is_it_possible(element1, element2, electronConfiguration) {
  const resultList = {
    possible: true,
    needEnergy: true
  };
  //frist element info
  const fristEName = element1.name;
  const fristECategory = element1.category;
  const fristEGroup =element1.group;
  const frist_config = electronConfiguration(element1);
  //second element info
  const secondEName = element2.name;
  const secondECategory = element2.category;
  const secondEGroup = element2.group;
  const fsecond_config = electronConfiguration(element2);

  console.table(frist_config);
  console.table(fsecond_config);

  const sameGroup = filterByGroup(fristEGroup, secondEGroup);
  console.log(sameGroup);
}
// true => a reaction can occur, false => reaction can't occur
function filterByGroup(fristEGroup, secondEGroup, fristECategory, secondECategory) {
  if (fristEGroup === secondEGroup) {
    if (fristECategory === secondECategory && fristECategory === 'halogen') {
      return true;
    } else if (fristECategory === secondECategory && fristECategory === 'Transition') {
      return true;
    } else {
      return false;
    };
  } else {
    return true;
  };
}
// true => a reaction can occur, false => reaction can't occur
function filterByCategory(frisEtCategory, secondECategory) {
  let fristEIdintity;
  let secondEIdintity;
  categories.forEach((cat) => {
    if (frisEtCategory ===) {

    }
  });
}