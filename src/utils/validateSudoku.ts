interface SudokuGrid {
  error: boolean;
  value: number | undefined;
  disabled: boolean;
}

interface ValidateSudoku {
  positionX: number;
  positionY: number;
  sudoku: SudokuGrid[][];
  value: number | undefined;
}

interface Difficulty {
  min: number;
  max: number;
}

export const validateSudoku = ({ sudoku, positionX, positionY, value }: ValidateSudoku): any => {
  // Clear errors
  sudoku.forEach(row => row.forEach(cell => (cell.error = false)));

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

export const isSudokuSolved = (grid: SudokuGrid[][]) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col].value === undefined || grid[row][col].error) {
        return false;
      }
    }
  }

  return true;
};

const solveSudoku = (grid: SudokuGrid[][]) => {
  const findEmpty = () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col].value === undefined) {
          return [row, col];
        }
      }
    }

    return null;
  };

  const validateValue = (value: number, row: number, col: number) => {
    // Validate row
    for (let i = 0; i < 9; i++) {
      if (i !== col && grid[row][i].value === value) {
        return false;
      }
    }

    // Validate column
    for (let i = 0; i < 9; i++) {
      if (i !== row && grid[i][col].value === value) {
        return false;
      }
    }

    // Validate 3x3 matrix
    const matrixRow = Math.floor(row / 3) * 3;
    const matrixCol = Math.floor(col / 3) * 3;

    for (let i = matrixRow; i < matrixRow + 3; i++) {
      for (let j = matrixCol; j < matrixCol + 3; j++) {
        if (i !== row && j !== col && grid[i][j].value === value) {
          return false;
        }
      }
    }

    return true;
  };

  const backtrack = () => {
    const empty = findEmpty();

    if (empty === null) {
      return true;
    }

    const [row, col] = empty;

    for (let value = 1; value <= 9; value++) {
      if (validateValue(value, row, col)) {
        grid[row][col].value = value;
        grid[row][col].disabled = true;

        if (backtrack()) {
          return true;
        }

        grid[row][col].value = undefined;
      }
    }

    return false;
  };

  backtrack();

  return grid;
};

export const generateSudokuGrid = (grid: SudokuGrid[][], difficulty: Difficulty): any => {
  for (let row = 0; row < 9; row++) {
    grid[row] = [];

    for (let col = 0; col < 9; col++) {
      grid[row][col] = { value: undefined, error: false, disabled: false };
    }
  }

  solveSudoku(grid);

  const emptyCells = Math.floor(Math.random() * (difficulty.max - difficulty.min)) + difficulty.min;

  for (let i = 0; i < emptyCells; i++) {
    let row, col;

    do {
      row = Math.floor(Math.random() * 9);
      col = Math.floor(Math.random() * 9);
    } while (grid[row][col].value === undefined);

    grid[row][col].value = undefined;
    grid[row][col].disabled = false;
  }

  return [...grid];
};
