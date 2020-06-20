function unroll(squareArray) {
  let result = [];

  if (squareArray.length === 0) {
    return result;
  }

  let startRow = 0;
  let startColumn = 0;

  let endRow = squareArray.length - 1;
  let endColumn = squareArray[0].length - 1;

  while (startColumn <= endColumn && startRow <= endRow) {
    //Go through columns
    for (let i = startColumn; i <= endColumn; i++) {
      result.push(squareArray[startRow][i]);
    }
    startRow++;
    // Go through rows
    for (let i = startRow; i <= endRow; i++) {
      result.push(squareArray[i][endColumn]);
    }
    endColumn--;
    if (startRow <= endRow) {
      //Go through columns backwards
      for (let i = endColumn; i >= startColumn; i--) {
        result.push(squareArray[endRow][i]);
      }
    }
    endRow--;
    if (startColumn <= endColumn) {
      //Go through rows backwards
      for (let i = endRow; i >= startRow; i--) {
        result.push(squareArray[i][startColumn]);
      }
    }
    startColumn++;
  }
  return result;
}

module.exports = unroll;
