import React from 'react';
import { getGuessStatuses } from '../../lib/statuses';
import { unicodeSplit } from '../../lib/words';
import { Cell } from './Cell';

type Props = {
  guess: string;
  isRevealing?: boolean;
};

export const CompletedRow = ({ guess, isRevealing }: Props) => {
  const statuses = getGuessStatuses(guess);
  const splitGuess = unicodeSplit(guess);

  return (
    <div className="flex justify-center mb-1">
      {splitGuess.map((letter, i) => (
        <Cell
          key={i}
          value={letter}
          status={statuses[i]}
          position={i}
          isRevealing={isRevealing}
          isCompleted
        />
      ))}
    </div>
  );
};
