export const getVueObject = (obj) => { return Object.assign({}, obj) };
export const getVueArray = (arr) => { return arr.map(el => Object.assign({}, el)) };

// dgacitua: Dirty hack to deep copy a variable
export const cloneVariable = (value) => {
  return Object.assign({}, { data: value }).data;
}

// dgacitua: https://stackoverflow.com/a/6274381
export const shuffleArray = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  
  return a;
}