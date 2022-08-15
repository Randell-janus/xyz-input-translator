// An array of the allowed letter inputs
export const ALLOWED_LETTERS = ["x", "y", "z"];

// A function that appends grid indices to an array until the end argument is appended
// The args are the starting point and end point of the line to be drawn
export const getRequiredParts = (start, end, condition) => {
  let counter = 0;
  const arr = [start];

  while (!arr.includes(end)) {
    arr.push(arr[0 + counter] + condition);
    counter++;
  }

  return arr;
};

// An object with methods to draw all possible lines in a square grid
export const draw = {
  slash: (start, end, inputSize) => {
    return getRequiredParts(start, end, parseInt(inputSize) - 1);
  },

  backSlash: (start, end, inputSize) => {
    return getRequiredParts(start, end, parseInt(inputSize) + 1);
  },

  verticalSlash: (start, end, inputSize) => {
    return getRequiredParts(start, end, parseInt(inputSize));
  },

  horizontalSlash: (start, end) => {
    return getRequiredParts(start, end, 1);
  },
};

// A function responsible for client side form validation
export const inputIsValid = (string, size) => {
  const sizeIsValid = size >= 3 && size % 2 !== 0;

  return [...string].every(
    (character) => ALLOWED_LETTERS.includes(character) && sizeIsValid
  );
};
