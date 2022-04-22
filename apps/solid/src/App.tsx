import type { Component } from 'solid-js';
import { button } from 'styles/components/button.css';
import styles from './App.module.css';
import logo from './logo.svg';
import { getWordOfTheDay } from 'game-settings';

const App: Component = () => {
  return (
    <div class={styles.App}>
      {getWordOfTheDay()}
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button class={button({ color: 'neutral' })}>test</button>
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
      </header>
    </div>
  );
};

export default App;
