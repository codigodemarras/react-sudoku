interface SudokuGrid {
  error: boolean;
  value: number | undefined;
}

interface ValidateSudoku {
  positionX: number;
  positionY: number;
  sudoku: SudokuGrid[][];
  value: number | undefined;
}

export const validateSudoku = ({ sudoku, positionX, positionY, value }: ValidateSudoku): any => {
  // Clear errors
  sudoku.forEach((row) => row.forEach((cell) => (cell.error = false)));

  sudoku[positionY][positionX] = {
    ...sudoku[positionY][positionX],
    value,
  };

  // Validate rows
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const value = sudoku[row][col].value;
      if (value !== undefined) {
        for (let i = col + 1; i < 9; i++) {
          if (value === sudoku[row][i].value) {
            sudoku[row][col].error = true;
            sudoku[row][i].error = true;
          }
        }
      }
    }
  }

  // Validate columns
  for (let col = 0; col < 9; col++) {
    for (let row = 0; row < 9; row++) {
      const value = sudoku[row][col].value;
      if (value !== undefined) {
        for (let i = row + 1; i < 9; i++) {
          if (value === sudoku[i][col].value) {
            sudoku[row][col].error = true;
            sudoku[i][col].error = true;
          }
        }
      }
    }
  }

  // Validate 3x3 matrices
  for (let matrixRow = 0; matrixRow < 3; matrixRow++) {
    for (let matrixCol = 0; matrixCol < 3; matrixCol++) {
      for (let i = matrixRow * 3; i < matrixRow * 3 + 3; i++) {
        for (let j = matrixCol * 3; j < matrixCol * 3 + 3; j++) {
          const value = sudoku[i][j].value;
          if (value !== undefined) {
            for (let x = matrixRow * 3; x < matrixRow * 3 + 3; x++) {
              for (let y = matrixCol * 3; y < matrixCol * 3 + 3; y++) {
                if (value === sudoku[x][y].value && (i !== x || j !== y)) {
                  sudoku[i][j].error = true;
                  sudoku[x][y].error = true;
                }
              }
            }
          }
        }
      }
    }
  }

  return [...sudoku];
};
