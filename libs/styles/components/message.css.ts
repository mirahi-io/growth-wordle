import { style } from '@vanilla-extract/css';

export const message = style({
  position: 'absolute',
  left: '50%',
  top: '80px',
  color: '#fff',
  backgroundColor: 'rgba(0, 0, 0, 0.85)',
  padding: '16px 20px',
  zIndex: '2',
  borderRadius: '4px',
  transform: 'translateX(-50%)',
  transition: 'opacity 0.3s ease-out',
  fontWeight: '600',
});
