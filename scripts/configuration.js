export function electronConfiguration(config) {
  const finalData = {
    S_1: 0,
    S_2: 0,
    P_2: 0,
    S_3: 0,
    P_3: 0,
    S_4: 0,
    D_3: 0,
    P_4: 0,
    S_5: 0,
    D_4: 0,
    P_5: 0,
    S_6: 0,
    F_4: 0,
    D_5: 0,
    P_6: 0,
    S_7: 0,
    F_5: 0,
    D_6: 0,
    P_7: 0,
  };
  
  const atomicNum = config.atomicNumber;
  const keys =  Object.keys(finalData);
  let position = 0;
  for (let i = 0; i < atomicNum; i++) {
    let [sublevel, level] = keys[position].split("_"); 
    if (sublevel === 'S') {
      if (finalData[keys[position]] < 2) {
        finalData[keys[position]] ++;
      } else {
        position++;
        i--;
      };
    } else if (sublevel === 'P') {
      if (finalData[keys[position]] < 6) {
        finalData[keys[position]]++
      } else {
        position++;
        i--;
      }
    } else if (sublevel === 'D') {
      if (finalData[keys[position]] < 10) {
        finalData[keys[position]]++
      } else {
        position++;
        i--;
      };
    } else if (sublevel === 'F') {
      if (finalData[keys[position]] < 14) {
        finalData[keys[position]]++
      } else {
        position++;
        i--;
      };
    } ;
  };
  Object.keys(finalData).forEach(key => {
    if (finalData[key] === 0) delete finalData[key];
  });
  const entries = Object.entries(finalData);
  const [ lastKey, lastVal ] = entries[entries.length - 1];
  const [ BTLastKey,BTLastVal ] = entries[entries.length - 2];
  const [ BBTLastKey,BBTLastValue ] = entries[entries.length - 3];
  
  let [last_sublevel, last_level] = lastKey.split("_"); 
  let [BTLast_sublevel, BTLast_level] = BTLastKey.split("_"); 
  let [BBTLast_sublevel, BBTLast_level] = BBTLastKey.split("_"); 
  if (last_sublevel === 'D') {
    if (lastVal === 4 || lastVal === 9) {
      if (BTLast_sublevel === 'S') {
        finalData[lastKey] ++;
        finalData[BTLastKey] --;
      } else if (BBTLast_sublevel === 'S') {
        finalData[lastKey] ++;
        finalData[BBTLastKey] --;
      };
    };
  };
  if (atomicNum === 41 || atomicNum === 44 || atomicNum === 45) {
    finalData[lastKey] ++;
    finalData[BTLastKey] --;
  } else if (atomicNum === 46) {
    finalData[lastKey] += 2;
    finalData[BTLastKey] -= 2;
  } else if (atomicNum === 78) {
    finalData[lastKey] ++;
    finalData[BBTLastKey] --;
  }; 
  console.table(finalData);
};
//41   Niobium Nb 4d   [Kr] 5s² 4d³ =>  [Kr] 5s¹ 4d⁴   Avoids low d occupancy; promotion effect
  //44   Ruthenium Ru 4d  [Kr] 5s² 4d⁶ =>  [Kr] 5s¹ 4d⁷   Preference for d⁷ over d⁶ + s²
  //45   Rhodium Rh 4d   [Kr] 5s² 4d⁷ =>  [Kr] 5s¹ 4d⁸   Stability adjustment in 4d series
  //46   Palladium Pd 4d  [Kr] 5s² 4d⁸ =>  [Kr] 4d¹⁰ (5s⁰)   Fully filled 4d¹⁰ (no 5s electron)
  //78   Platinum Pt 5d   [Xe] 6s² 4f¹⁴ 5d⁸ =>  [Xe] 6s¹ 4f¹⁴ 5d⁹   Relativistic effects + d stability