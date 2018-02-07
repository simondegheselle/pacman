import {
  UP,
  LEFT,
  DOWN,
  RIGHT,
  Pacman,
} from './constants.js';

export default class MapSprite {

  drawPills(ctx) {
    if (++this.pillSize > 30) {
      this.pillSize = 0;
    }
    let i = 0;
    while (i < this.height) {
      let j = 0;
      while (j < this.width) {
        if (this.map[i][j] === Pacman.PILL) {
          ctx.beginPath();

          ctx.fillStyle = '#000';
          ctx.fillRect(j * this.blockSize, i * this.blockSize,
            this.blockSize, this.blockSize);

          ctx.fillStyle = '#FFF';
          ctx.arc(j * this.blockSize + this.blockSize / 2,
            i * this.blockSize + this.blockSize / 2,
            Math.abs(5 - this.pillSize / 3),
            0,
            Math.PI * 2, false);
          ctx.fill();
          ctx.closePath();
        }
        j += 1;
      }
      i += 1;
    }
  }

  draw(ctx) {
    let i, j;
    const size = this.blockSize;

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, this.width * size, this.height * size);

    this.drawWall(ctx);

    i = 0;
    while (i < this.height) {
      j = 0;
      while (j < this.width){
        this.drawBlock(i, j, ctx);
        j += 1;
      }
      i += 1;
    }
  }

  drawBlock(y, x, ctx) {
    const layout = this.map[y][x];

    if (layout === Pacman.PILL) {
      return;
    }

    ctx.beginPath();

    if (layout === Pacman.EMPTY || layout === Pacman.BLOCK
      || layout === Pacman.COOKIE) {

      ctx.fillStyle = '#000';
      ctx.fillRect(x * this.blockSize, y * this.blockSize,
        this.blockSize, this.blockSize);

      if (layout === Pacman.COOKIE) {
        ctx.fillStyle = '#FFF';
        ctx.fillRect(x * this.blockSize + this.blockSize / 2.5,
          y * this.blockSize + this.blockSize / 2.5,
          this.blockSize / 6, this.blockSize / 6);
      }
    }
    ctx.closePath();
  }

  drawWall(ctx) {

    let i, j, p, line;

    ctx.strokeStyle = '#2ecc71';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';

    i = 0;
    while (i < Pacman.WALLS.length) {
      line = Pacman.WALLS[i];
      ctx.beginPath();

      j = 0;
      while (j < line.length) {
        p = line[j];
        if (p.move) {
          ctx.moveTo(p.move[0] * this.blockSize, p.move[1] * this.blockSize);
        } else if (p.line) {
          ctx.lineTo(p.line[0] * this.blockSize, p.line[1] * this.blockSize);
        } else if (p.curve) {
          ctx.quadraticCurveTo(p.curve[0] * this.blockSize,
            p.curve[1] * this.blockSize,
            p.curve[2] * this.blockSize,
            p.curve[3] * this.blockSize);
        }

        j += 1;
      }
      ctx.stroke();

      i += 1;
    }
  }
}
