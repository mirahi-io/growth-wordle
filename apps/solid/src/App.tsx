import { Component, createEffect, createSignal } from 'solid-js';
import { button } from 'styles/components/button.css';
import styles from './App.module.css';
import { Keyboard } from './components/Keyboard';
import { Board } from './components/Board';

import { getWordOfTheDay } from 'game-settings';

const App: Component = () => {
  // key clicked by the user
  const [activeKey, setActiveKey] = createSignal('');

  createEffect(() => console.log(activeKey()));

  return (
    <div class={styles.App}>
      <button class={button({ color: 'neutral' })}>test</button>
      <Board wordOfTheDay={getWordOfTheDay()} />
      <Keyboard setActiveKey={setActiveKey} />
    </div>
  );
};

export default App;
