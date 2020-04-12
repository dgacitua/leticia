export const consoleLog = (...msg) => { console.log(`[${currentDate()}]`, ...msg) };
export const consoleWarn = (...msg) => { console.warn(`[${currentDate()}]`, ...msg) };
export const consoleError = (...msg) => { console.error(`[${currentDate()}]`, ...msg) };