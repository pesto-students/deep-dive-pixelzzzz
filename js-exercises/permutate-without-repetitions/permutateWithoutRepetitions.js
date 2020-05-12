/**
 * @param {*[]} permutationOptions
 * @return {*[]}
 */
function swap(array, indexFrom, indexTo) {
  let temp = array[indexFrom];
  array[indexFrom] = array[indexTo];
  array[indexTo] = temp;
}

function findPermutations(arrayInput, result, index, length) {
  if (index >= length) {
    result.push([...arrayInput]);
  }
  for (let i = index; i < length; i++) {
    swap(arrayInput, index, i);
    findPermutations(arrayInput, result, index + 1, length);
    swap(arrayInput, index, i);
  }
  return result;
}

function permutateWithoutRepetitions(arrayInput) {
  const resultArray = [];
  return findPermutations(arrayInput, resultArray, 0, arrayInput.length);
}

export { permutateWithoutRepetitions };
