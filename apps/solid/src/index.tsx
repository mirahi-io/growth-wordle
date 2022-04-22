/* @refresh reload */
import { render } from 'solid-js/web';

import 'styles/global.css';
import App from './App';

// resize for scaling the board size
window.addEventListener('resize', onResize);
// set size on startup
onResize();

function onResize() {
  // get actual vh on mobile
  document.body.style.setProperty('--vh', window.innerHeight + 'px');
}

render(() => <App />, document.getElementById('root') as HTMLElement);
