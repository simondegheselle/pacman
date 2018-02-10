import { UP, LEFT, DOWN, RIGHT, NONE, Pacman, KEY } from '../constants.js';

export default class PlayerSprite {

  constructor(game, map) {
    this.game = game;
    this.map = map;
    this.keyMap = {};
    this.keyMap[KEY.ARROW_LEFT] = LEFT;
    this.keyMap[KEY.ARROW_UP] = UP;
    this.keyMap[KEY.ARROW_RIGHT] = RIGHT;
    this.keyMap[KEY.ARROW_DOWN] = DOWN;
  }

  keyDown(ev) {
    if (this.keyMap[ev.keyCode] !== 'undefined') {
      this.due = this.keyMap[ev.keyCode];
      ev.preventDefault();
      ev.stopPropagation();
      return false;
    }
    return true;
  }

  getNewCoord(dir, current) {
    return {
      x: current.x + (dir === LEFT && -2 || dir === RIGHT && 2 || 0),
      y: current.y + (dir === DOWN && 2 || dir === UP && -2 || 0)
    };
  }

  onWholeSquare(x) {
    return x % 10 === 0;
  }

  pointToCoord(x) {
    return Math.round(x / 10);
  }

  nextSquare(x, dir) {
    const rem = x % 10;
    if (rem === 0) {
      return x;
    } else if (dir === RIGHT || dir === DOWN) {
      return x + (10 - rem);
    }
    return x - rem;
  }

  next(pos, dir) {
    return {
      y: this.pointToCoord(this.nextSquare(pos.y, dir)),
      x: this.pointToCoord(this.nextSquare(pos.x, dir))
    };
  }

  onGridSquare(pos) {
    return this.onWholeSquare(pos.y) && this.onWholeSquare(pos.x);
  }

  isOnSamePlane(due, dir) {
    return (due === LEFT || due === RIGHT) && (dir === LEFT || dir === RIGHT) || (due === UP || due === DOWN) && (dir === UP || dir === DOWN);
  }

  isMidSquare(x) {
    const rem = x % 10;
    return rem > 3 || rem < 7;
  }

  move() {
    let npos = null;
    let nextWhole = null;
    const oldPosition = this.position;
    let block = null;

    if (this.due !== this.direction) {
      npos = this.getNewCoord(this.due, this.position);

      if (this.isOnSamePlane(this.due, this.direction) || this.onGridSquare(this.position) && this.map.isFloor(this.next(npos, this.due))) {
        this.direction = this.due;
      } else {
        npos = null;
      }
    }

    if (npos === null) {
      npos = this.getNewCoord(this.direction, this.position);
    }

    if (this.onGridSquare(this.position) && this.map.isWall(this.next(npos, this.direction))) {
      this.direction = NONE;
    }

    if (this.direction === NONE) {
      return {
        new: this.position,
        old: this.position
      };
    }

    if (npos.y === 100 && npos.x >= 190 && this.direction === RIGHT) {
      npos = {
        y: 100,
        x: -10
      };
    }

    if (npos.y === 100 && npos.x <= -12 && this.direction === LEFT) {
      npos = {
        y: 100,
        x: 190
      };
    }

    this.position = npos;
    nextWhole = this.next(this.position, this.direction);

    block = this.map.getBlock(nextWhole);

    if ((this.isMidSquare(this.position.y) || this.isMidSquare(this.position.x)) && block === Pacman.COOKIE || block === Pacman.PILL) {

      this.map.setBlock(nextWhole, Pacman.EMPTY);
      this.addScore(block === Pacman.COOKIE ? 10 : 50);
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

  drawDead(ctx, amount) {

    const size = this.map.blockSize;
    const half = size / 2;

    if (amount >= 1) {
      return;
    }

    ctx.fillStyle = '#FFFF00';
    ctx.beginPath();
    ctx.moveTo(this.position.x / 10 * size + half, this.position.y / 10 * size + half);

    ctx.arc(this.position.x / 10 * size + half, this.position.y / 10 * size + half, half, 0, Math.PI * 2 * amount, true);

    ctx.fill();
  }

  draw(ctx) {
    const s = this.map.blockSize;
    const angle = this.calcAngle(this.direction, this.position);

    ctx.fillStyle = '#FFFF00';

    ctx.beginPath();

    ctx.moveTo(this.position.x / 10 * s + s / 2, this.position.y / 10 * s + s / 2);

    ctx.arc(this.position.x / 10 * s + s / 2, this.position.y / 10 * s + s / 2, s / 2, Math.PI * angle.start, Math.PI * angle.end, angle.direction);

    ctx.fill();
  }

  // Angle calculation for drawing
  calcAngle(dir, pos) {
    if (dir === RIGHT && pos.x % 10 < 5) {
      return {
        start: 0.25,
        end: 1.75,
        direction: false
      };
    } else if (dir === DOWN && pos.y % 10 < 5) {
      return {
        start: 0.75,
        end: 2.25,
        direction: false
      };
    } else if (dir === UP && pos.y % 10 < 5) {
      return {
        start: 1.25,
        end: 1.75,
        direction: true
      };
    } else if (dir === LEFT && pos.x % 10 < 5) {
      return {
        start: 0.75,
        end: 1.25,
        direction: true
      };
    }
    return {
      start: 0,
      end: 2,
      direction: false
    };
  }
}
//# sourceMappingURL=playerSprite.js.map