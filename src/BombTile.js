import { Tile } from './Tile.js';

const event = new Event('bombrevealed', { bubbles: true });

export class BombTile extends Tile {
    constructor(x, y) {
        super(x, y);
        this.element = this.createElement();
    }
    createElement() {
        const tile = super.createElement();
        tile.addEventListener('click', this.reveal.bind(this));
        // tile.style.background = 'red';
        return tile;
    }

    reveal(dispatchEvent) {
        if (this.state == 0) {
            this.state = 1;
            this.element.classList.add('revealed');
            this.element.style.background = 'red';
            if (dispatchEvent) this.element.dispatchEvent(event);
        }
    }
}
