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
  onMount(() => {
    document.addEventListener('keydown', keyboardListener);
    document.addEventListener('keyup', cleanKey);
  });
  onCleanup(() => {
    document.removeEventListener('keydown', keyboardListener);
    document.removeEventListener('keyup', cleanKey);
  });

  const keyboardListener = (event: KeyboardEvent) => {
    if (event.key == 'Enter') {
      setActiveKey(event.key);
    } else if (event.key == 'Backspace') {
      setActiveKey(event.key);
    } else if ('abcdefghijklmnopqrstuvwxyz'.includes(event.key.toLowerCase())) {
      setActiveKey(event.key);
    }
  };

  const cleanKey = () => setActiveKey('');

  return (
    <div>
      {rows.map((row) => (
        <div>
          {row.map((keyValue) => (
            <button
              class={key({ color: 'neutral' })}
              onClick={() => {
                setActiveKey(keyValue);
                setActiveKey('');
              }}
            >
              {keyValue}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};
