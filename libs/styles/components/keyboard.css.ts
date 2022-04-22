import { style } from '@vanilla-extract/css';

export const styledKeyboard = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const styledRow = style({
  marginBottom: '6px',
  display: 'flex',
});

export const styledTile = style({
  fontWeight: 'bold',
  border: 0,
  width: '75px',
  height: '75px',
  margin: '2px',
  borderRadius: '4px',
  cursor: 'pointer',
  color: '#1a1a1b',
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textTransform: 'uppercase',
  backgroundColor: '#d3d6da',
});
