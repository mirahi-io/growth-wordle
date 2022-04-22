import { key } from 'styles/components/key.css';
import { Setter, onMount, onCleanup, createSignal } from 'solid-js';
import JSConfetti from 'js-confetti';

const rows = [
  'qwertyuiop'.split(''),
  'asdfghjkl'.split(''),
  ['Enter', ...'zxcvbnm'.split(''), 'Backspace'],
];

type KeyboardProps = {
  onKey: (key: string) => void;
};

export const Keyboard = ({ onKey }: KeyboardProps) => {
  onMount(() => {
    document.addEventListener('keydown', keyboardListener);
    document.addEventListener('keyup', cleanKey);
    easterEgg();
  });
  onCleanup(() => {
    document.removeEventListener('keydown', keyboardListener);
    document.removeEventListener('keyup', cleanKey);
  });

  const keyboardListener = (event: KeyboardEvent) => {
    if (event.key == 'Enter') {
      onKey(event.key);
    } else if (event.key == 'Backspace') {
      onKey(event.key);
    } else if ('abcdefghijklmnopqrstuvwxyz'.includes(event.key.toLowerCase())) {
      onKey(event.key);
    }
  };

  const cleanKey = () => onKey('');

  return (
    <div>
      {rows.map((row) => (
        <div>
          {row.map((keyValue) => (
            <button
              class={key({ color: 'neutral' })}
              onClick={() => {
                onKey(keyValue);
                onKey('');
              }}
            >
              {keyValue === 'Backspace' ? (
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path
                    fill="currentColor"
                    d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
                  ></path>
                </svg>
              ) : (
                keyValue
              )}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

const easterEgg = () => {
  const pattern = ['m', 'i', 'r', 'a', 'i'];
  const [current, setCurrent] = createSignal(0);
  const jsConfetti = new JSConfetti();

  onMount(() => document.addEventListener('keydown', keyHandler));
  onCleanup(() => document.removeEventListener('keydown', keyHandler));

  const keyHandler = (e: KeyboardEvent) => {
    // If the key isn't in the pattern, or isn't the current key in the pattern, reset
    if (pattern.indexOf(e.key) < 0 || e.key !== pattern[current()]) {
      setCurrent(0);
      return;
    }

    // Update how much of the pattern is complete
    setCurrent((prev) => prev + 1);

    // If complete, alert and reset
    if (pattern.length === current()) {
      setCurrent(0);

      jsConfetti.addConfetti();

      jsConfetti.addConfetti({
        emojis: ['🌈', '❤️', '💥', '✨', '💫', '🌸'],
      });

      jsConfetti.addConfetti({
        confettiRadius: 6,
        confettiNumber: 2000,
      });

      jsConfetti
        .addConfetti()
        .then(() => console.log('Confetti animation completed!'));
    }
  };
};
