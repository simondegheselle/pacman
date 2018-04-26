import {
  UP,
  LEFT,
  DOWN,
  RIGHT,
  NONE,
  Pacman,
  KEY,
} from '../constants.js';

import PlayerSprite from './playerSprite';

export default class Player extends PlayerSprite {

  constructor(game, map) {
    super(game, map);
    this.position = null;
    this.direction = null;
    this.eaten = null;
    this.due = null;
    this.lives = null;
    this.score = 5;
  }

  addScore(nScore) {
    this.score += nScore;
    if (this.score >= 10000 && this.score - nScore < 10000) {
      this.lives += 1;
    }
  }

  getScore() {
    return this.score;
  }

  getLives() {
    return this.lives;
  }

  move() {
    let npos = null;
    let nextWhole = null;
    const oldPosition = this.position;
    let block = null;

    if (this.due !== this.direction) {
      npos = this.getNewCoord(this.due, this.position);

      if (this.isOnSamePlane(this.due, this.direction)
        || this.onGridSquare(this.position)
        && this.map.isFloor(this.next(npos, this.due))) {
        this.direction = this.due;
      } else {
        npos = null;
      }
    }

    if (npos === null) {
      npos = this.getNewCoord(this.direction, this.position);
    }

    if (this.onGridSquare(this.position)
        && this.map.isWall(this.next(npos, this.direction))) {
      this.direction = NONE;
    }

    if (this.direction === NONE) {
      return {
        new: this.position,
        old: this.position,
      };
    }

    if (npos.y === 100 && npos.x >= 190 && this.direction === RIGHT) {
      npos = {
        y: 100,
        x: -10,
      };
    }

    if (npos.y === 100 && npos.x <= -12 && this.direction === LEFT) {
      npos = {
        y: 100,
        x: 190,
      };
    }

    this.position = npos;
    nextWhole = this.next(this.position, this.direction);

    block = this.map.getBlock(nextWhole);

    if ((this.isMidSquare(this.position.y) || this.isMidSquare(this.position.x))
    && block === Pacman.COOKIE || block === Pacman.PILL) {

      this.map.setBlock(nextWhole, Pacman.EMPTY);
      this.addScore(block === Pacman.COOKIE ?
       10 :
       50);
      this.eaten += 1;

      if (this.eaten === 182) {
        this.game.completedLevel();
      }

      if (block === Pacman.PILL) {
        this.game.eatenPill();
      }
    }

    return {
      new: this.position,
      old: oldPosition
    };
  }
}
