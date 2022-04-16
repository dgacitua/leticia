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

// dgacitua: Check if variable is an array (empty or not)
// https://stackoverflow.com/a/20956445
export const isArray = (arr) => {
  return Array.isArray(arr) && arr.length >= 0;
};

// dgacitua: Check if array doesn't exist or is empty
// https://www.geeksforgeeks.org/check-if-an-array-is-empty-or-not-in-javascript/
export const isEmptyArray = (arr) => {
  return (typeof arr === 'undefined' || arr === null || arr.length === null || arr.length <= 0);
};

// dgacitua: Convert seconds to HH:MM:SS
// https://stackoverflow.com/a/34841026
export const toHHMMSS = (secs) => {
  let sec_num = parseInt(secs, 10);
  let hours   = Math.floor(sec_num / 3600);
  let minutes = Math.floor(sec_num / 60) % 60;
  let seconds = sec_num % 60;

  return [hours,minutes,seconds]
    .map(v => v < 10 ? "0" + v : v)
    .filter((v,i) => v !== "00" || i > 0)
    .join(":");
};

// dgacitua: Export value of nested object where key can be null
// https://stackoverflow.com/a/23809123
export const getNestedValue = (obj, key) => {
  return key.split(".").reduce((o, x) => {
      return (typeof o == "undefined" || o === null) ? o : o[x];
  }, obj);
};

// dgacitua: Get word bounds at position
// https://stackoverflow.com/a/58403800
export const getWordBoundsAtPosition = (str, position) => {
  const isSpace = (c) => /\s/.exec(c);
  let start = position - 1;
  let end = position;

  while (start >= 0 && !isSpace(str[start])) {
    start -= 1;
  }
  start = Math.max(0, start + 1);

  while (end < str.length && !isSpace(str[end])) {
    end += 1;
  }
  end = Math.max(start, end);

  return [start, end];
};

/*
export const findNextWordPosition = (text, snippet) => {
  let indexOf = text.indexOf(snippet);
  let lastWordLength = snippet.split(' ').splice(-1).length;

  if (indexOf >= 0) {
    return getWordBoundsAtPosition(text, indexOf + lastWordLength + 1);
  }
  else {
    return getWordBoundsAtPosition(text, 0);
  }
};
*/

// https://stackoverflow.com/a/12661863
export const findNextWordPosition = (needle, haystack) => {
  if (!needle || !haystack) {
      return [0, 0];
  }
  else {
      let re = new RegExp('((\\S+[\\b\\s]?)' + needle + '([\\b\\s]?\\S+))', 'i');
      let matches = haystack.match(re);

      //console.log('matches', matches);
      
      if (matches) {
          let foundWords = haystack.match(re)[0];
          let lastWordPos = getWordBoundsAtPosition(haystack, foundWords.length);
          
          console.log('lwp', lastWordPos);

          return lastWordPos;
      }
      else {
          return [0, 0];
      }
  }
};