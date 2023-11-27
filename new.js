function getDifference(setA, setB) {
    return new Set(
      [...setA].filter(element => !setB.has(element))
    );
  }
  
  const set1 = new Set(['Vivek','Singh']);
  const set2 = new Set(['Vivek']);
  
  console.log(getDifference(set1, set2)); // 👉️ {}
const a=getDifference(set1, set2);
console.log(...a)
  console.log(getDifference(set1,set2).size)
  