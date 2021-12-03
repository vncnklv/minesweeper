import { Game } from './Game.js';

const form = document.querySelector('form');
form.addEventListener('submit', init);

function init(e) {
    e.preventDefault();

    const formData = new FormData(form);
    let width = Number(formData.get('width'))
    let height = Number(formData.get('height'));

    if (width <= 0) {
        width = 10;
    }

    if (height <= 0) {
        height = 15;
    }

    const g = new Game(width, height);
    g.init();
    g.display(document.querySelector('body'));

    console.log(g);

    form.reset();
    form.remove();
}
