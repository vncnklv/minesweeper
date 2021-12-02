import { EmptyTile } from './EmptyTile.js';
import { BombTile } from './BombTile.js';

export class Game {
    constructor(width, height, dificultity = 2) {
        this.width = width;
        this.height = height;
        this.dificultity = dificultity;
        this.board = null;
    }

    generateTiles() {
        const tiles = [];

        let bomb = 0;
        let empty = 0;

        for (let h = 0; h < this.height; h++) {
            for (let w = 0; w < this.width; w++) {
                const coef = Math.random() * 10;

                if (coef < this.dificultity) {
                    tiles.push(new BombTile(w, h));
                    bomb++;
                } else {
                    tiles.push(new EmptyTile(w, h));
                    empty++;
                }
            }
        }

        tiles.forEach(t => {
            if (t instanceof EmptyTile) {
                t.nearBombs = nBombsNear(tiles, t);
            }
        })

        return tiles;
    }

    init() {
        this.board = document.createElement('table');
        this.board.classList.add('board');

        const tiles = this.generateTiles();

        this.board.addEventListener('emptyrevealed', this.emptyRevealed.bind(this, tiles));
        this.board.addEventListener('bombrevealed', this.bombRevealed.bind(this, tiles));

        for (let h = 0; h < this.height; h++) {
            const row = document.createElement('tr');
            for (let w = 0; w < this.width; w++) {
                const td = document.createElement('td');

                const tile = tiles.find(
                    (t) => t.position.x == w && t.position.y == h
                );

                td.append(tile.element);
                row.append(td);
            }

            this.board.append(row);
        }

        return tiles;
    }

    bombRevealed(tiles) {
        this.board.removeEventListener('bombrevealed', this.bombRevealed, false);

        tiles.forEach((t) => {
            if (t instanceof BombTile) {
                t.reveal(false);
            }
        });
    }

    emptyRevealed(tiles, event) {
        const targetTile = event.detail;

        if(targetTile.nearBombs > 0) {
            targetTile.reveal(false);
            return;
        }

        for (const t of tiles) {
            if (t instanceof EmptyTile && t.state == 0 && areAdjacent(targetTile, t)) {
                t.reveal(false);
                if (t.nearBombs == 0) {
                    this.emptyRevealed(tiles, { detail: t });
                }
            }
        }
    }

    display(field) {
        if (this.board == null) {
            throw new Error('Board is not initialized!');
        }

        field.append(this.board);
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
        if ((t.position.x == tile.position.x || t.position.x == tile.position.x + 1 || t.position.x == tile.position.x - 1) &&
            (t.position.y == tile.position.y || t.position.y == tile.position.y + 1 || t.position.y == tile.position.y - 1) &&
            t != tile) {

            if (t instanceof BombTile) {
                bombs++;
            }
        }
    });

    return bombs;
}