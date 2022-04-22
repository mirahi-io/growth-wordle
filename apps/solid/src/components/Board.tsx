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
};

export const Board = (props: Props) => {
  return (
    <div class={board}>
      <For each={props.grid} fallback={<div>Loading...</div>}>
        {(row) => (
          <div class={boardRow()}>
            <For each={row} fallback={<div>Loading...</div>}>
              {(tile, index) => (
                <div class={boardTile()}>
                  <div
                    class={boardTileLetterFront({
                      filled: !!tile.letter,
                      revealed: !!tile.state,
                    })}
                    style={{
                      transitionDelay: `${index() * 300}ms`,
                    }}
                  >
                    {tile.letter}
                  </div>
                  <div
                    class={boardTileLetterBack({
                      state: tile.state,
                    })}
                    style={{
                      transitionDelay: `${index() * 300}ms`,
                      animationDelay: `${index() * 100}ms`,
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
