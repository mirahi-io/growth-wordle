import { Component, createEffect, createSignal } from 'solid-js';
import { button } from 'styles/components/button.css';
import styles from './App.module.css';
import { Keyboard } from './components/Keyboard';
import logo from './logo.svg';

const App: Component = () => {
  // key clicked by the user
  const [activeKey, setActiveKey] = createSignal('');

  createEffect(() => console.log(activeKey()));

  return (
    <div class={styles.App}>
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
      <Keyboard setActiveKey={setActiveKey} />
    </div>
  );
};

export default App;
