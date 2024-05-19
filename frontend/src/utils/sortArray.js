function sortArray(orginalArray, fromIndex, toIndex) {

  const array = [...orginalArray];

  const startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;
  const endIndex = toIndex < 0 ? array.length + toIndex : toIndex;

  if (startIndex >= 0 && startIndex < array.length) {
    const [item] = array.splice(startIndex, 1);
    array.splice(endIndex, 0, item);
  }

  return array;
}

export default sortArray;