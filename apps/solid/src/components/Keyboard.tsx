import { key } from 'styles/components/key.css';
import { Setter, onMount, onCleanup } from 'solid-js';

const rows = [
  'qwertyuiop'.split(''),
  'asdfghjkl'.split(''),
  ['Enter', ...'zxcvbnm'.split(''), 'Backspace'],
];

type KeyboardProps = {
  setActiveKey: Setter<string>;
};

export const Keyboard = ({ setActiveKey }: KeyboardProps) => {
  onMount(() => document.addEventListener('keypress', keyboardListener));
  onCleanup(() => document.removeEventListener('keypress', keyboardListener));

  return (
    <div>
      {rows.map((row) => (
        <div>
          {row.map((subrow) => (
            <button
              class={key({ color: 'neutral' })}
              onClick={() => setActiveKey(subrow)}
            >
              {subrow}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

const keyboardListener = (event: KeyboardEvent) => {
  if (event.key == 'Enter') {
    console.log(event.key);
  } else if (event.key == 'Backspace') {
    console.log(event.key);
  } else if ('abcdefghijklmnopqrstuvwxyz'.includes(event.key.toLowerCase())) {
    console.log(event.key);
  } else if (event.keyCode === 8) {
    console.log(event.keyCode);
  }
};
