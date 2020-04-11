export const getVueObject = (obj) => { return Object.assign({}, obj) };
export const getVueArray = (arr) => { return arr.map(el => Object.assign({}, el)) };