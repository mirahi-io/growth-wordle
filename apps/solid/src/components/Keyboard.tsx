import { onMount, onCleanup, For, Show } from 'solid-js';
import {
  styledKeyboard,
  styledKey,
  styledRow,
} from 'styles/components/keyboard.css';

const rows = [
  'qwertyuiop'.split(''),
  'asdfghjkl'.split(''),
  ['Enter', ...'zxcvbnm'.split(''), 'Backspace'],
];

type KeyboardProps = {
  // eslint-disable-next-line no-unused-vars
  onKey: (key: string) => void;
};

export const Keyboard = (props: KeyboardProps) => {
  onMount(() => {
    document.addEventListener('keydown', keyboardListener);
    document.addEventListener('keyup', cleanKey);
  });
  onCleanup(() => {
    document.removeEventListener('keydown', keyboardListener);
    document.removeEventListener('keyup', cleanKey);
  });

  // handle the keyboard input from the user
  const keyboardListener = (event: KeyboardEvent) => {
    if (event.key == 'Enter') {
      props.onKey(event.key);
    } else if (event.key == 'Backspace') {
      props.onKey(event.key);
    } else if ('abcdefghijklmnopqrstuvwxyz'.includes(event.key.toLowerCase())) {
      props.onKey(event.key);
    }
  };

  const cleanKey = () => props.onKey('');

  return (
    <div class={styledKeyboard}>
      <For each={rows} fallback={<div>Loading...</div>}>
        {(row) => (
          <div class={styledRow}>
            <For each={row} fallback={<div>Loading...</div>}>
              {(key) => (
                <button
                  class={
                    key === 'Backspace' || key === 'Enter'
                      ? styledKey({ size: 'big' })
                      : styledKey()
                  }
                  onClick={() => {
                    props.onKey(key);
                    props.onKey('');
                  }}
                >
                  <Show when={key === 'Backspace'} fallback={key}>
                    Delete
                  </Show>
                </button>
              )}
            </For>
          </div>
        )}
      </For>
    </div>
  );
};
