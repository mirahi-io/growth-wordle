import { recipe } from '@vanilla-extract/recipes';
import { keyframes, style } from '@vanilla-extract/css';

const boardHeight = 'min(420px, calc(var(--vh, 100vh) - 310px))';

export const board = style({
  display: 'grid',
  gridTemplateRows: 'repeat(6, 1fr)',
  gridGap: '5px',
  padding: '10px',
  boxSizing: 'border-box',
  height: `${boardHeight}`,
  width: `min(350px, calc(${boardHeight} / 6 * 5))`,
  margin: '0px auto',
});

const boardRowJump = keyframes({
  '0%': { transform: 'translateY(0px)' },
  '20%': {
    transform: 'translateY(5px)',
  },
  '60%': {
    transform: 'translateY(-25px)',
  },
  '90%': {
    transform: 'translateY(3px)',
  },
  '100%': {
    transform: 'translateY(0px)',
  },
});

const boardRowShake = keyframes({
  '0%': {
    transform: 'translate(1px)',
  },
  '10%': {
    transform: 'translate(-2px)',
  },
  '20%': {
    transform: 'translate(2px)',
  },
  '30%': {
    transform: 'translate(-2px)',
  },
  '40%': {
    transform: 'translate(2px)',
  },
  '50%': {
    transform: 'translate(-2px)',
  },
  '60%': {
    transform: 'translate(2px)',
  },
  '70%': {
    transform: 'translate(-2px)',
  },
  '80%': {
    transform: 'translate(2px)',
  },
  '90%': {
    transform: 'translate(-2px)',
  },
  '100%': {
    transform: 'translate(1px)',
  },
});

export const boardRow = recipe({
  base: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridGap: '5px',
  },

  variants: {
    jump: {
      true: {
        animation: `${boardRowJump} 0.5s`,
      },
    },
    shake: {
      true: {
        animation: `${boardRowShake} 0.5s`,
      },
    },
  },
});

const boardTileZoom = keyframes({
  '0%': {
    transform: 'scale(1.1)',
  },
  '100%': {
    transform: 'scale(1)',
  },
});

export const boardTile = recipe({
  base: {
    width: '100%',
    fontSize: '2rem',
    lineHeight: '2rem',
    fontWeight: 'bold',
    verticalAlign: 'middle',
    textTransform: 'uppercase',
    userSelect: 'none',
    position: 'relative',
    '@media': {
      '(max-height: 680px)': {
        fontSize: '3vh',
      },
    },
  },
  variants: {
    filled: {
      true: {
        animation: `${boardTileZoom} 0.2s`,
      },
    },
    state: {
      0: {},
      correct: {
        color: '#fff !important',
        backgroundColor: '#6aaa64 !important',
      },
      present: {
        color: '#fff !important',
        backgroundColor: '#c9b458 !important',
      },
      absent: {
        color: '#fff !important',
        backgroundColor: '#787c7e !important',
      },
    },
  },
});

const boardTileLetter = style({
  boxSizing: 'border-box',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  transition: 'transform 0.6s',
  backfaceVisibility: 'hidden',
});

export const boardTileLetterFront = recipe({
  base: [
    boardTileLetter,
    {
      border: '2px solid #d3d6da',
    },
  ],
  variants: {
    filled: {
      true: {
        borderColor: '#999',
      },
    },
    back: {
      true: {
        transform: 'rotateX(180deg)',
      },
    },
    revealed: {
      true: {
        transform: 'rotateX(0deg)',
      },
    },
  },
});

export const boardTileLetterBack = recipe({
  base: [
    boardTileLetter,
    {
      transform: 'rotateX(180deg)',
    },
  ],
  variants: {
    state: {
      0: {},
      correct: {
        color: '#fff !important',
        backgroundColor: '#6aaa64 !important',
      },
      present: {
        color: '#fff !important',
        backgroundColor: '#c9b458 !important',
      },
      absent: {
        color: '#fff !important',
        backgroundColor: '#787c7e !important',
      },
    },
  },
});
