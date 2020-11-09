import { cloneDeep, findIndex } from 'lodash';
import { parse, stringify } from 'flatted';

export const getVueObject = (obj) => { return Object.assign({}, obj) };
export const getVueArray = (arr) => { return arr.map(el => Object.assign({}, el)) };
export const isEmptyObject = (obj) => { return Object.keys(obj).length === 0 && obj.constructor === Object };
export const deepCopy = (value) => { return cloneDeep(value) };
export const findIndexInArray = (arr, matchFn) => { return findIndex(arr, matchFn) };
export const parseCircularObject = (circObj) => { return parse(stringify(circObj)) };

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

// dgacitua: Check if array doesn't exist or is empty
// https://www.geeksforgeeks.org/check-if-an-array-is-empty-or-not-in-javascript/
export const isEmptyArray = (arr) => {
  return (typeof arr === 'undefined' || arr === null || arr.length === null || arr.length <= 0);
};