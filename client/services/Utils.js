import hrrs from 'human-readable-random-string';

export const getVueObject = (obj) => { return Object.assign({}, obj) };
export const getVueArray = (arr) => { return arr.map(el => Object.assign({}, el)) };
export const isEmptyObject = (obj) => { return Object.keys(obj).length === 0 && obj.constructor === Object };

// dgacitua: Dirty hack to deep copy a variable
export const cloneVariable = (value) => {
  return Object.assign({}, { data: value }).data;
};

// dgacitua: Generate a random UserId string
export const generateUserId = () => {
  return hrrs(8);
};

// dgacitua: Remove all nullish values from array
// https://www.techiedelight.com/remove-falsy-values-from-an-array-in-javascript/
export const cleanArray = (arr) => {
  return arr.filter((e) => { return e != null });
};

// dgacitua: Randomly order elements in an array
// https://stackoverflow.com/a/6274381
export const shuffleArray = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  
  return a;
};