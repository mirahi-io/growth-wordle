import { key } from 'styles/components/key.css';
import { Setter } from 'solid-js';

const enum LetterState {
  INITIAL = 0,
  CORRECT = 'correct',
  PRESENT = 'present',
  ABSENT = 'absent',
}

const rows = [
  'qwertyuiop'.split(''),
  'asdfghjkl'.split(''),
  ['Enter', ...'zxcvbnm'.split(''), 'Backspace'],
];

type KeyboardProps = {
  setActiveKey: Setter<string>;
};

export const Keyboard = ({ setActiveKey }: KeyboardProps) => {
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
