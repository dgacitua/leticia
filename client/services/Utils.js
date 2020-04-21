import { createHash } from 'crc-hash';

export const getVueObject = (obj) => { return Object.assign({}, obj) };
export const getVueArray = (arr) => { return arr.map(el => Object.assign({}, el)) };

// dgacitua: Dirty hack to deep copy a variable
export const cloneVariable = (value) => {
  return Object.assign({}, { data: value }).data;
};

// dgacitua: Create a CRC32 hash from a string
export const crc32hash = (string) => {
  return createHash('crc32').update(string).digest('hex');
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