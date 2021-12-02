import { Tile } from './Tile.js';

export class EmptyTile extends Tile {
    constructor(x, y) {
        super(x, y);
        this.nearBombs = 0;
        this.element = this.createElement();
    }

    createElement() {
        const tile = super.createElement();
        tile.addEventListener('click', this.reveal.bind(this));
        return tile;
    }

    reveal(dispatchEvent = true) {
        if (this.state == 0) {
            if (dispatchEvent) this.element.dispatchEvent(new CustomEvent('emptyrevealed', { detail: this, bubbles: true }));
            this.state = 1;
            this.element.classList.add('revealed');
            if (this.nearBombs > 0) {
                this.element.textContent = this.nearBombs
                switch (this.nearBombs) {
                    case 1:
                        this.element.classList.add('blue');
                        break
                    case 2:
                        this.element.classList.add('green');
                        break
                    case 3:
                        this.element.classList.add('red');
                        break
                    case 4:
                        this.element.classList.add('darkblue');
                        break
                    case 5:
                        this.element.classList.add('darkred');
                        break
                }
            };
        }
    }
}
