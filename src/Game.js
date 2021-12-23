import { EmptyTile } from './EmptyTile.js';
import { BombTile } from './BombTile.js';

export class Game {
    constructor(width, height, dificultity = 2) {
        this.width = width;
        this.height = height;
        this.dificultity = dificultity;
        this.board = null;
        this.tiles = [];
    }

    generateTiles() {
        for (let h = 0; h < this.height; h++) {
            for (let w = 0; w < this.width; w++) {
                const coef = Math.random() * 10;

                if (coef < this.dificultity) {
                    this.tiles.push(new BombTile(w, h));
                } else {
                    this.tiles.push(new EmptyTile(w, h));
                }
            }
        }

        this.tiles.forEach(t => {
            if (t instanceof EmptyTile) {
                t.nearBombs = nBombsNear(this.tiles, t);
            }
        })
    }

    init() {
        this.board = document.createElement('table');
        this.board.classList.add('board');

        this.generateTiles();

        this.board.addEventListener('emptyrevealed', this.emptyRevealed.bind(this));
        this.board.addEventListener('bombrevealed', this.bombRevealed.bind(this));

        for (let h = 0; h < this.height; h++) {
            const row = document.createElement('tr');
            for (let w = 0; w < this.width; w++) {
                const td = document.createElement('td');

                const tile = this.tiles.find(t => t.position.x == w && t.position.y == h);

                td.append(tile.element);
                row.append(td);
            }

            this.board.append(row);
        }
    }

    bombRevealed() {
        this.board.removeEventListener('bombrevealed', this.bombRevealed, false);

        this.tiles.forEach((t) => {
            t.reveal(false);
        });

        console.log('You Lose');
    }

    emptyRevealed(event) {
        const targetTile = event.detail;

        if (targetTile.nearBombs > 0) {
            targetTile.reveal(false);
        } else {
            this.tiles.forEach(t => {
                if (t instanceof EmptyTile && t.state == 0 && areAdjacent(targetTile, t)) {
                    t.reveal(false);

                    if (t.nearBombs == 0) {
                        this.emptyRevealed({ detail: t });
                    }

                }
            })
        }

        if(this.checkForWin() == true) console.log("You win!");
    }

    display(field) {
        if (this.board == null) {
            throw new Error('Board is not initialized!');
        }

        field.append(this.board);
    }

    checkForWin() {
        return !this.tiles.some(t => t instanceof EmptyTile && t.state == 0);
    }
}

function areAdjacent(tile1, tile2) {
    if (((tile1.position.x == tile2.position.x || tile1.position.x == tile2.position.x + 1 || tile1.position.x == tile2.position.x - 1) &&
        (tile1.position.y == tile2.position.y || tile1.position.y == tile2.position.y + 1 || tile1.position.y == tile2.position.y - 1) &&
        tile1 != tile2)) {
        return true;
    }
}

function nBombsNear(tiles, tile) {
    let bombs = 0;

    tiles.forEach(t => {
        if (areAdjacent(t, tile) && t instanceof BombTile) {
            bombs++;
        }
    });

    return bombs;
}