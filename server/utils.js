export const currentDate = () => { return new Date() };
export const cloneObject = (...obj) => { return Object.assign({}, ...obj) };
export const flattenArray = (arr) => { return [].concat(...arr) };
export const stringToInt = (stringNumber) => {  return !isNaN(stringNumber) ? parseInt(stringNumber) : null };

export const consoleLog = (...msg) => { console.log(`[${currentDate()}]`, ...msg) };
export const consoleWarn = (...msg) => { console.warn(`[${currentDate()}]`, ...msg) };
export const consoleError = (...msg) => { console.error(`[${currentDate()}]`, ...msg) };