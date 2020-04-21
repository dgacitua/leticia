import crypto from 'crypto';

export const currentDate = () => { return new Date() };
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
}