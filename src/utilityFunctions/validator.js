const maxLimiter = (target, max) =>  target.trim().length > max;
const digitLimiter = (target) =>  /\d/.test(target);
const containsLetter = (target) => /[a-zA-Z]/.test(target);


export const numberValidator = (number,size) => {
  return !maxLimiter(number, size) && !containsLetter(number);
}

export const textValidator = (text,size) => {
  return !maxLimiter(text, size) && !digitLimiter(text);
}
