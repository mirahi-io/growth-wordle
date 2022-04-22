import { For } from 'solid-js';
import { BoardGrid } from '../types';
import {
  board,
  boardRow,
  boardTile,
  boardTileLetterFront,
  boardTileLetterBack,
} from 'styles/components/board.css';

type Props = {
  grid: BoardGrid;
  shakeRowIndex: number;
  currentRowIndex: number;
  success: boolean;
};

export const Board = (props: Props) => {
  return (
    <div class={board}>
      <For each={props.grid} fallback={<div>Loading...</div>}>
        {(row, rowIndex) => (
          <div
            class={boardRow({
              shake: props.shakeRowIndex === rowIndex(),
              jump: props.success && props.currentRowIndex === rowIndex(),
            })}
          >
            <For each={row} fallback={<div>Loading...</div>}>
              {(tile, index) => (
                <div
                  class={boardTile({
                    filled: !!tile.letter,
                  })}
                >
                  <div
                    class={boardTileLetterFront({
                      filled: !!tile.letter,
                      revealed: !!tile.state,
                    })}
                    style={{
                      'transition-delay': `${index() * 300}ms`,
                      '-webkit-backface-visibility': 'hidden',
                    }}
                  >
                    {tile.letter}
                  </div>
                  <div
                    class={boardTileLetterBack({
                      state: tile.state,
                      revealed: !!tile.state,
                    })}
                    style={{
                      'transition-delay': `${index() * 300}ms`,
                      'animation-delay': `${index() * 100}ms`,
                      '-webkit-backface-visibility': 'hidden',
                    }}
                  >
                    {tile.letter}
                  </div>
                </div>
              )}
            </For>
          </div>
        )}
      </For>
    </div>
  );
};
