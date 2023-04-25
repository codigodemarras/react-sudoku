import { clsx } from "clsx";
import { useState } from "react";

import { validateSudoku } from "../../utils/validateSudoku";
import "./styles.scss";

interface SudokuGrid {
  error: boolean;
  value: number;
}

function Grid() {
  const [sudokuGrid, setSudokuGrid] = useState<SudokuGrid[][]>(() =>
    Array.from({ length: 9 }, () =>
      Array(9).fill({
        error: false,
        value: undefined,
      })
    )
  );

  return (
    <div className="container">
      <div className="grid">
        {sudokuGrid.map((grid, i) => {
          return (
            <div key={`row-${i.toString()}`} className="row">
              {grid?.map((cell, j) => {
                const inputStyles = clsx("cell", {
                  error: cell?.error,
                  third: j === 2 || j === 5,
                });

                return (
                  <input
                    type="text"
                    value={cell?.value || ""}
                    key={`cell-${i.toString()}-${j.toString()}`}
                    className={inputStyles}
                    maxLength={1}
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
