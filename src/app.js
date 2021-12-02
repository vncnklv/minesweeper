import { Game } from './Game.js';

const startBtn = document.getElementById('startBtn');
startBtn.addEventListener('click', init);

let tiles = null;

function init() {
    const g = new Game(15, 25);
    tiles = g.init();
    g.display(document.querySelector('body'));
    startBtn.remove();
}
