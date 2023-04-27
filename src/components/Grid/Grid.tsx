import { clsx } from "clsx";
import { useEffect, useState } from "react";

import { generateSudokuGrid, isSudokuSolved, validateSudoku } from "../../utils/validateSudoku";
import { ModalWinner } from "../ModalWinner";
import "./styles.scss";

interface SudokuGrid {
  error: boolean;
  value: number;
  disabled: boolean;
}

interface Difficulty {
  min: number;
  max: number;
}

function Grid() {
  const [showModalWinner, setShowModalWinner] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<Difficulty>({ min: 10, max: 20 });
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
    const newSudoku = generateSudokuGrid(sudokuGrid, difficulty);
    setSudokuGrid(newSudoku);
  }, [difficulty]);

  useEffect(() => {
    if (isSudokuSolved(sudokuGrid)) {
      setShowModalWinner(true);
    }
  }, [sudokuGrid]);

  return (
    <>
      <div className="container">
        <div className="difficulty">
          <h2>Select a Difficulty</h2>

          <div className="buttons">
            <button onClick={() => setDifficulty({ min: 20, max: 30 })}>Easy</button>
            <button onClick={() => setDifficulty({ min: 30, max: 40 })}>Medium</button>
            <button onClick={() => setDifficulty({ min: 40, max: 50 })}>Hard</button>
            <button onClick={() => setDifficulty({ min: 50, max: 60 })}>Extreme</button>
          </div>
        </div>

        <hr className="separator" />

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

      <ModalWinner openWinnerModal={showModalWinner} />
    </>
  );
}

export default Grid;
