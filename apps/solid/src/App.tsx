import { Component, createEffect, createMemo, createSignal } from 'solid-js';
import { Keyboard } from './components/Keyboard';
import { Board } from './components/Board';

import { getWordOfTheDay } from 'game-settings';
import { LetterState, BoardGrid } from './types';

const updateGrid = (
  grid: BoardGrid,
  index: number,
  func: (row: BoardGrid[0]) => BoardGrid[0]
) => {
  return grid.map((row, rowIndex) => {
    if (rowIndex === index) {
      return func(row);
    }
    return row;
  });
};

const updateTile = (letter: string) => (row: BoardGrid[0]) => {
  const newRow = row.slice();

  for (const tile of newRow) {
    if (!tile.letter) {
      tile.letter = letter;
      break;
    }
  }

  return newRow;
};

const clearLastTile = (row: BoardGrid[0]) => {
  // shallow copy of the row to be able to mutate the tile
  const newRow = row.slice();

  // mutate reference of the tile
  for (const tile of row.reverse()) {
    if (tile.letter) {
      tile.letter = '';
      break;
    }
  }

  return newRow;
};

const App: Component = () => {
  // Get word of the day
  const answer = getWordOfTheDay();

  // Board state. Each tile is represented as { letter, state }
  const [grid, setGrid] = createSignal<BoardGrid>(
    Array.from({ length: 6 }, () =>
      Array.from({ length: 5 }, () => ({
        letter: '',
        state: LetterState.INITIAL,
      }))
    )
  );

  const [currentRowIndex, setCurrentRowIndex] = createSignal(0);

  const fillTile = (letter: string) => {
    setGrid(updateGrid(grid(), currentRowIndex(), updateTile(letter)));
  };

  function clearTile() {
    setGrid(updateGrid(grid(), currentRowIndex(), clearLastTile));
  }

  function completeRow() {
    console.log('complete row');
    setCurrentRowIndex(currentRowIndex() + 1);
  }

  const onKey = (key: string) => {
    if (/^[a-zA-Z]$/.test(key)) {
      fillTile(key.toLowerCase());
    } else if (key === 'Backspace') {
      clearTile();
    } else if (key === 'Enter') {
      completeRow();
    }
  };

  return (
    <>
      <Board grid={grid} />
      <Keyboard onKey={onKey} />
    </>
  );
};

export default App;
