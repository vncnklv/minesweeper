export class Tile {
    constructor(x, y, state = 0) {
        this.state = state; // -1  - flaged, 1 - revealed, 0 - unclicked
        this.position = { x, y };
        this.element = this.createElement();
    }

    createElement() {
        const tile = document.createElement('div');
        tile.classList.add('tile');

        tile.addEventListener('contextmenu', this.changeState.bind(this), false);

        return tile;
    }

    changeState(e) {
        e.preventDefault();

        if (this.state == 0) {
            this.state = -1;
            this.element.classList.add('flaged');
        } else if (this.state == -1) {
            this.state = 0;
            this.element.classList.remove('flaged');
        }

        return false;
    }

    display(field) {
        field.append(this.element);
    }
}
