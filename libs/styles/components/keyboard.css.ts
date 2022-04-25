import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const styledKeyboard = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const styledRow = style({
  display: 'flex',
});

export const styledTile = recipe({
  base: {
    fontWeight: 'bold',
    fontSize: '0.5rem',
    border: 0,
    margin: '3px',
    borderRadius: '4px',
    cursor: 'pointer',
    color: '#1a1a1b',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textTransform: 'uppercase',
    backgroundColor: '#d3d6da',
    '@media': {
      'screen and (min-width: 768px)': {
        fontSize: '0.7rem',
        margin: '4px',
      },
      'screen and (min-width: 1024px)': {
        fontSize: '1rem',
        margin: '4px',
      },
    },
  },

  variants: {
    size: {
      normal: {
        width: '30px',
        height: '30px',
        '@media': {
          'screen and (min-width: 768px)': {
            width: '50px',
            height: '50px',
          },
          'screen and (min-width: 1024px)': {
            width: '75px',
            height: '75px',
          },
        },
      },
      big: {
        width: '60px',
        height: '30px',
        '@media': {
          'screen and (min-width: 768px)': {
            width: '100px',
            height: '50px',
          },
          'screen and (min-width: 1024px)': {
            width: '125px',
            height: '75px',
          },
        },
      },
    },
  },

  defaultVariants: {
    size: 'normal',
  },
});
