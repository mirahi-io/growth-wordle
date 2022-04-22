import { Component, createSignal, Show } from 'solid-js';
import { Keyboard } from './components/Keyboard';
import { Board } from './components/Board';
import { message as messageStyle } from 'styles/components/message.css';
import JSConfetti from 'js-confetti';

import { getWordOfTheDay, allWords } from 'game-settings';
import { LetterState, BoardGrid } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

const updateGrid = (
  grid: BoardGrid,
  index: number,
  // eslint-disable-next-line no-unused-vars
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

  // setup easter egg word
  const easteregg = 'mirai';
  const JsConfetti = new JSConfetti();

  // Board state. Each tile is represented as { letter, state }
  const [grid, setGrid] = createSignal<BoardGrid>(
    Array.from({ length: 6 }, () =>
      Array.from({ length: 5 }, () => ({
        letter: '',
        state: LetterState.INITIAL,
      }))
    )
  );

  const [letterStates, setLetterStates] = createSignal<
    Record<string, LetterState>
  >({});

  const [currentRowIndex, setCurrentRowIndex] = createSignal(0);

  const [message, setMessage] = createSignal('');
  const [shakeRowIndex, setShakeRowIndex] = createSignal(-1);
  const [resultGrid, setResultGrid] = createSignal('');
  const [success, setSuccess] = createSignal(false);

  // Handle keyboard input.
  let allowInput = true;

  const fillTile = (letter: string) =>
    setGrid(updateGrid(grid(), currentRowIndex(), updateTile(letter)));

  const clearTile = () =>
    setGrid(updateGrid(grid(), currentRowIndex(), clearLastTile));

  function completeRow() {
    const transitionTime = 0;
    const newGrid = updateGrid(grid(), currentRowIndex(), (row) => {
      const currentRow = row.slice();
      const guess = currentRow.map((tile) => tile.letter).join('');
      if (guess === easteregg) {
        allowInput = false;
        setTimeout(() => {
          setResultGrid(genResultGrid());
          showMessage(
            [
              'Genius',
              'Magnificent',
              'Impressive',
              'Splendid',
              'Great',
              'Phew',
            ][currentRowIndex()],
            -1
          );
          JsConfetti.addConfetti({
            confettiNumber: 1000,
          });
          setSuccess(true);
        }, transitionTime);
      } else if (currentRow.every((tile) => tile.letter)) {
        if (!allWords.includes(guess) && guess !== answer) {
          shake();
          showMessage(`Not in word list`);
          return row;
        }

        const answerLetters: (string | null)[] = answer.split('');
        // first pass: mark correct ones
        currentRow.forEach((tile, i) => {
          if (answerLetters[i] === tile.letter) {
            tile.state = LetterState.CORRECT;
            setLetterStates({ [tile.letter]: LetterState.CORRECT });
            answerLetters[i] = null;
          }
        });
        // second pass: mark the present
        currentRow.forEach((tile) => {
          if (!tile.state && answerLetters.includes(tile.letter)) {
            tile.state = LetterState.PRESENT;
            answerLetters[answerLetters.indexOf(tile.letter)] = null;
            if (!letterStates()[tile.letter]) {
              letterStates()[tile.letter] = LetterState.PRESENT;
            }
          }
        });
        // 3rd pass: mark absent
        currentRow.forEach((tile) => {
          if (!tile.state) {
            tile.state = LetterState.ABSENT;
            if (!letterStates()[tile.letter]) {
              letterStates()[tile.letter] = LetterState.ABSENT;
            }
          }
        });

        allowInput = false;
        if (currentRow.every((tile) => tile.state === LetterState.CORRECT)) {
          // yay!
          setTimeout(() => {
            setResultGrid(genResultGrid());
            showMessage(
              [
                'Genius',
                'Magnificent',
                'Impressive',
                'Splendid',
                'Great',
                'Phew',
              ][currentRowIndex()],
              -1
            );
            JsConfetti.addConfetti({
              confettiNumber: 1000,
            });
            setSuccess(true);
          }, transitionTime);
        } else if (currentRowIndex() < grid().length - 1) {
          // go the next row
          setCurrentRowIndex((currentrowIndex) => currentrowIndex + 1);
          setTimeout(() => {
            allowInput = true;
          }, transitionTime);
        } else {
          // game over :(
          setTimeout(() => {
            showMessage(answer.toUpperCase(), -1);
          }, transitionTime);
        }
      } else {
        shake();
        showMessage('Not enough letters');
      }

      return currentRow;
    });

    setGrid(newGrid);
  }

  const icons = {
    [LetterState.CORRECT]: '🟩',
    [LetterState.PRESENT]: '🟨',
    [LetterState.ABSENT]: '⬜',
    [LetterState.INITIAL]: null,
  };

  function genResultGrid() {
    return grid()
      .slice(0, currentRowIndex() + 1)
      .map((row) => {
        return row.map((tile) => icons[tile.state]).join('');
      })
      .join('\n');
  }

  function showMessage(msg: string, time = 1000) {
    setMessage(msg);
    if (time > 0) {
      setTimeout(() => {
        setMessage('');
      }, time);
    }
  }

  function shake() {
    setShakeRowIndex(currentRowIndex);
    setTimeout(() => {
      setShakeRowIndex(-1);
    }, 1000);
  }

  const onKey = (key: string) => {
    if (!allowInput) return;
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
      <Show when={message()}>
        <div class={messageStyle}>
          {message()}
          <Show when={resultGrid()}>
            <pre>{resultGrid()}</pre>
          </Show>
        </div>
      </Show>
      <Header title="SWordle"></Header>
      <Board
        grid={grid()}
        shakeRowIndex={shakeRowIndex()}
        currentRowIndex={currentRowIndex()}
        success={success()}
      />
      <Keyboard onKey={onKey} />
      <Footer />
    </>
  );
};

export default App;
