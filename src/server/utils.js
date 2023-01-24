import crypto from 'crypto';
import formatDate from 'date-fns/format/index.js';

export const currentDate = () => { return formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss z') };
export const cloneObject = (...obj) => { return Object.assign({}, ...obj) };
export const flattenArray = (arr) => { return [].concat(...arr) };
export const stringToInt = (stringNumber) => {  return !isNaN(stringNumber) ? parseInt(stringNumber) : null };

export const consoleLog = (...msg) => { console.log(`[${currentDate()}]`, ...msg) };
export const consoleWarn = (...msg) => { console.warn(`[${currentDate()}]`, ...msg) };
export const consoleError = (...msg) => { console.error(`[${currentDate()}]`, ...msg) };

// dgacitua: Create a MD5 hash from a string
// https://odino.org/generating-the-md5-hash-of-a-string-in-nodejs/
export const string2hash = (string) => {
  return crypto.createHash('md5').update(string).digest('hex');
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

// dgacitua: Check if variable is a string
// http://stackoverflow.com/a/9436948
export const isString = (testStr) => {
  return (typeof testStr === 'string' || testStr instanceof String);
};

// dgacitua: Heap's method to generate all permutations in an array
// https://stackoverflow.com/a/37580979
export const permute = (permutation) => {
  let length = permutation.length;
  let result = [permutation.slice()];
  let c = new Array(length).fill(0);
  let i = 1, k, p;

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      result.push(permutation.slice());
    }
    else {
      c[i] = 0;
      ++i;
    }
  }

  return result;
};

// dgacitua: Round-Robin allocation of items in an array given an index
export const roundRobinAllocation = (array, i) => {
  let max = array.length;
  let idx = i % max;
  let itm = array[idx];

  return itm;
};

// dgacitua: Report LETICIA's config options
export const reportConfigStatus = (constantsObject) => {
  consoleLog(`
  >>> LETICIA Config Status Report <<<
  | Pilot Mode: ${constantsObject.isPilotMode}
  | Frontend Enabled: ${constantsObject.enableFrontend}
  | OpenAPI Docs Enabled: ${constantsObject.enableApiDocs}
  | Asset Path: ${constantsObject.assetPath}
  | Frontend Path: ${constantsObject.frontendPath}
  | DB Data URL: ${constantsObject.mongoDataUrl}
  | DB User URL: ${constantsObject.mongoUserUrl}
  | Index URL: ${constantsObject.solrUrl}
  >>> End report <<<`);
}