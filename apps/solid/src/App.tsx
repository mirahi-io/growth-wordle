import { Component, createEffect, createSignal } from 'solid-js';
import { Keyboard } from './components/Keyboard';
import { Board } from './components/Board';

import { getWordOfTheDay } from 'game-settings';
import { LetterState, BoardGrid } from './types';

const App: Component = () => {
  // key clicked by the user
  const [activeKey, setActiveKey] = createSignal('');
  const [answer, setAnswer] = createSignal('');

  // Board state. Each tile is represented as { letter, state }
  const [grid, setGrid] = createSignal<BoardGrid>(
    Array.from({ length: 6 }, () =>
      Array.from({ length: 5 }, () => ({
        letter: '',
        state: LetterState.INITIAL,
      }))
    )
  );

  setAnswer(getWordOfTheDay());

  createEffect(() => console.log(activeKey()), activeKey());

  return (
    <>
      <Board grid={grid()} />
      <Keyboard setActiveKey={setActiveKey} />
    </>
  );
};

export default App;
