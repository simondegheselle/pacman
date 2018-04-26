import { UP, LEFT, DOWN, RIGHT, Pacman } from '../constants.js';

class Ghost {

  constructor(game, map, colour) {
    this.position = {
      x: 90,
      y: 80,
    };
    this.direction = this.getRandomDirection();
    this.due = this.getRandomDirection();
    this.eatable = null;
    this.eaten = null;
    this.colour = colour;
    this.game = game;
    this.map = map;
  }

  getNewCoord(dir, current) {
    let speed;
    if (this.isVunerable()) {
      speed = 0.25;
    } else if (this.isHidden()) {
      speed = 2;
    } else {
      speed = 0.5;
    }
    const xSpeed = dir === LEFT && -speed || dir === RIGHT && speed || 0;
    const ySpeed = dir === DOWN && speed || dir === UP && -speed || 0;

    const x = this.addBounded(current.x, xSpeed);
    const y = this.addBounded(current.y, ySpeed);
    return { x, y };
  }


  /* Keep this method  */
  addBounded(x1, x2) {
    const rem = x1 % 10;
    const result = rem + x2;

    if (rem !== 0 && result > 10) {
      return x1 + (10 - rem);
    } else if (rem > 0 && result <  0) {
      return x1 - rem;
    }

    return x1 + x2;
  }

  // TODO
  isVunerable() {
    return this.eatable !== null;
  }

  // TODO
  isDangerous() {
    return this.eaten === null;
  }

  // TODO
  isHidden() {
    return !this.isVunerable() && !this.isDangerous();
  }

  // TODO
  getRandomDirection() {
    let moves;
    if (this.direction === LEFT || this.direction === RIGHT) {
      moves = [UP, DOWN];
    } else {
      moves = [LEFT, RIGHT];
    }
    return moves[Math.floor(Math.random() * 2)];
  }

  reset() {
    this.eaten = null;
    this.eatable = null;
    this.position = {
      x: 90,
      y: 80,
    };
    this.direction = this.getRandomDirection();
    this.due = this.getRandomDirection();
  }

  onWholeSquare(x) {
    return x % 10 === 0;
  }

  // TODO
  oppositeDirection(dir) {
    let oppositeDirection;
    /* No switch statements allowed? Got a esinting error */
    switch (dir) {
      case LEFT:
        oppositeDirection = RIGHT;
        break;
      case RIGHT:
        oppositeDirection = LEFT;
        break;
      case UP:
        oppositeDirection = DOWN;
        break;
      case DOWN:
        oppositeDirection = UP;
        break;
    }
    return oppositeDirection;
  }

  makeEatable() {
    this.direction = this.oppositeDirection(this.direction);
    this.eatable = this.game.getTick();
  }

  eat() {
    this.eatable = null;
    this.eaten = this.game.getTick();
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

  onGridSquare(pos) {
    return this.onWholeSquare(pos.y) && this.onWholeSquare(pos.x);
  }

  secondsAgo(tick) {
    return (this.game.getTick() - tick) / Pacman.FPS;
  }

  getColour() {
    if (this.eatable) {
      if (this.secondsAgo(this.eatable) > 5) {
        if (this.game.getTick() % 20 > 10) {
          return '#FFFFFF';
        }
        return '#0000BB';
      }
      return '#0000BB';
    } else if (this.eaten) {
      return '#222';
    }
    return this.colour;
  }

  draw(ctx) {
    const s = this.map.blockSize;
    const top = this.position.y / 10 * s;
    const left = this.position.x / 10 * s;

    if (this.eatable && this.secondsAgo(this.eatable) > 8) {
      this.eatable = null;
    }

    if (this.eaten && this.secondsAgo(this.eaten) > 3) {
      this.eaten = null;
    }

    const tl = left + s;
    const base = top + s - 3;
    const inc = s / 10;

    let high;
    if (this.game.getTick() % 10 > 5) {
      high = 3;
    } else {
      high = -3;
    }

    let low;
    if (this.game.getTick() % 10 > 5) {
      low = -3;
    } else {
      low = 3;
    }

    ctx.fillStyle = this.getColour();
    ctx.beginPath();

    ctx.moveTo(left, base);

    ctx.quadraticCurveTo(left, top, left + s / 2, top);
    ctx.quadraticCurveTo(left + s, top, left + s, base);

    // Wavy things at the bottom
    ctx.quadraticCurveTo(tl - inc * 1, base + high, tl - inc * 2, base);
    ctx.quadraticCurveTo(tl - inc * 3, base + low, tl - inc * 4, base);
    ctx.quadraticCurveTo(tl - inc * 5, base + high, tl - inc * 6, base);
    ctx.quadraticCurveTo(tl - inc * 7, base + low, tl - inc * 8, base);
    ctx.quadraticCurveTo(tl - inc * 9, base + high, tl - inc * 10, base);

    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = '#FFF';
    ctx.arc(left + 6, top + 6, s / 6, 0, 300, false);
    ctx.arc(left + s - 6, top + 6, s / 6, 0, 300, false);
    ctx.closePath();
    ctx.fill();

    const f = s / 12;
    const off = {};
    off[RIGHT] = [f, 0];
    off[LEFT] = [-f, 0];
    off[UP] = [0, -f];
    off[DOWN] = [0, f];

    ctx.beginPath();
    ctx.fillStyle = '#000';
    ctx.arc(left + 6 + off[this.direction][0], top + 6 + off[this.direction][1],
      s / 15, 0, 300, false);
    ctx.arc(left + s - 6 + off[this.direction][0],
      top + 6 + off[this.direction][1],
      s / 15, 0, 300, false);
    ctx.closePath();
    ctx.fill();

  }

  pane(pos) {

    if (pos.y === 100 && pos.x >= 190 && this.direction === RIGHT) {
      return {
        y: 100,
        x: -10,
      };
    }

    if (pos.y === 100 && pos.x <= -10 && this.direction === LEFT) {
      return this.position = {
        y: 100,
        x: 190,
      };
    }

    return false;
  }

  move(ctx) {

    const oldPos = this.position;
    const onGrid = this.onGridSquare(this.position);
    let npos = null;

    if (this.due !== this.direction) {
      npos = this.getNewCoord(this.due, this.position);

      if (onGrid
        && this.map.isFloor({
          x: this.pointToCoord(this.nextSquare(npos.x, this.due)),
          y: this.pointToCoord(this.nextSquare(npos.y, this.due)),
        })) {
        this.direction = this.due;
      } else {
        npos = null;
      }
    }

    if (npos === null) {
      npos = this.getNewCoord(this.direction, this.position);
    }

    if (onGrid
      && this.map.isWall({
        y: this.pointToCoord(this.nextSquare(npos.y, this.direction)),
        x: this.pointToCoord(this.nextSquare(npos.x, this.direction)),
      })) {

      this.due = this.getRandomDirection();
      return this.move(ctx);
    }

    this.position = npos;

    const tm = this.pane(this.position);
    if (tm) {
      this.position = tm;
    }

    this.due = this.getRandomDirection();

    return {
      new: this.position,
      old: oldPos,
    };
  }

}

window.Ghost = Ghost;
export default Ghost;