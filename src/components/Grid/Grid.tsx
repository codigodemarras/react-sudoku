import { clsx } from "clsx";
import { useEffect, useState } from "react";

import { generateSudokuGrid, validateSudoku } from "../../utils/validateSudoku";
import "./styles.scss";

interface SudokuGrid {
  error: boolean;
  value: number;
  disabled: boolean;
}

function Grid() {
  const [sudokuGrid, setSudokuGrid] = useState<SudokuGrid[][]>(() =>
    Array.from({ length: 9 }, () =>
      Array(9).fill({
        error: false,
        value: undefined,
        disabled: false,
      })
    )
  );

  useEffect(() => {
    const newSudoku = generateSudokuGrid(sudokuGrid);
    setSudokuGrid(newSudoku);
  }, []);

  return (
    <div className="container">
      <div className="grid">
        {sudokuGrid.map((grid, i) => {
          return (
            <div key={`row-${i.toString()}`} className="row">
              {grid?.map((cell, j) => {
                const inputStyles = clsx("cell", {
                  error: cell?.error,
                });

                return (
                  <input
                    className={inputStyles}
                    disabled={cell?.disabled}
                    key={`cell-${i.toString()}-${j.toString()}`}
                    maxLength={1}
                    readOnly={cell?.disabled}
                    type="text"
                    value={cell?.value || ""}
                    onChange={({ target }) => {
                      const newSudoku = validateSudoku({
                        sudoku: sudokuGrid,
                        positionX: j,
                        positionY: i,
                        value: target?.value ? parseInt(target?.value) : undefined,
                      });

                      setSudokuGrid(newSudoku);
                    }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Grid;
