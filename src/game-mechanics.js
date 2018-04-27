import {
  WAITING,
  COUNTDOWN,
  PAUSE,
  PLAYING,
  EATEN_PAUSE,
  DYING,
  Pacman,
  KEY,
} from './constants.js';

import Map from './map.js';
import Player from './sprites/player.js';
import Ghost from './sprites/ghost.js';

export default class GameMechanics {

  constructor() {
    this.state = WAITING;
    this.stateChanged = true;
    this.tick = 0;
    this.lastTime = 0;
    this.ctx = null;
    this.timer = null;
    this.stored = null;
  }

  setState(nState) {
    this.state = nState;
    this.stateChanged = true;
  }

  getTick() {
    return this.tick;
  }

  drawScore(text, position) {
    const x = position.new.x / 10 * this.map.blockSize;
    const y = (position.new.y + 5) / 10 * this.map.blockSize;
    this.drawText('#FFFFFF', text, x, y);
  }

  dialog(text) {
    const width = this.ctx.measureText(text).width;
    const x = (this.map.width * this.map.blockSize - width) / 2;
    const y = this.map.height * 10 + 8;


    this.ctx.fillStyle = '#FFFF00';
    this.ctx.font = '12px Press_Start_2P';
    this.ctx.fillText(text, x, y);
    // this.drawText('#FFFF00', text, x, y);
  }

  drawText(color, text, position) {
    this.ctx.fillStyle = color;
    this.ctx.font = '8px Press_Start_2P';
    this.ctx.fillText(text, position.x, position.y);
  }

  setState(nState) {
    this.state = nState;
    this.stateChanged = true;
  }

  drawFooter() {
    const topLeft = this.map.height * this.map.blockSize;
    const textBase = topLeft + 17;

    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, topLeft, this.map.width * this.map.blockSize, 30);

    this.ctx.fillStyle = '#FFFF00';

    let i = 0;
    const len = this.player.getLives();
    while (i < len) {
      this.ctx.fillStyle = '#FFFF00';
      this.ctx.beginPath();
      this.ctx.moveTo(150 + 25 * i + this.map.blockSize / 2,
        topLeft + 1 + this.map.blockSize / 2);

      this.ctx.arc(150 + 25 * i + this.map.blockSize / 2,
        topLeft + 1 + this.map.blockSize / 2,
        this.map.blockSize / 2, Math.PI * 0.25, Math.PI * 1.75, false);
      this.ctx.fill();
      i += 1;
    }

    this.ctx.fillStyle = '#FFFF00';
    this.ctx.font = "10px Press_Start_2P";
    this.ctx.fillText(`Score:  ${this.player.getScore()}`, 30, textBase);
    this.ctx.fillText(`Level: ${this.level}`, 260, textBase);
  }

  redrawBlock(pos) {
    this.map.drawBlock(Math.floor(pos.y / 10),
    Math.floor(pos.x / 10), this.ctx);
    this.map.drawBlock(Math.ceil(pos.y / 10),
    Math.ceil(pos.x / 10), this.ctx);
  }

  mainDraw() {

    let p, nScore;

    this.ghostPos = [];

    let i = 0;
    let len = this.ghosts.length;

    while (i < len) {
      this.ghostPos.push(this.ghosts[i].move(this.ctx));
      i += 1;
    }

    p = this.player.move(this.ctx);

    for (i = 0, len = this.ghosts.length; i < len; i += 1) {
      this.redrawBlock(this.ghostPos[i].old);
    }
    this.redrawBlock(p.old);

    for (i = 0, len = this.ghosts.length; i < len; i += 1) {
      this.ghosts[i].draw(this.ctx);
    }
    this.player.draw(this.ctx);

    this.userPos = p.new;

    for (i = 0, len = this.ghosts.length; i < len; i += 1) {
      if (this.collided(this.userPos, this.ghostPos[i].new)) {
        if (this.ghosts[i].isVunerable()) {
          this.ghosts[i].eat();
          this.eatenCount += 1;
          nScore = this.eatenCount * 50;
          this.drawScore(nScore, this.ghostPos[i]);
          this.player.addScore(nScore);
          this.setState(EATEN_PAUSE);
          this.timerStart = this.tick;
        } else if (this.ghosts[i].isDangerous()) {
          this.setState(DYING);
          this.timerStart = this.tick;
        }
      }
    }
  }

  keyPress(e) {
    if (this.state !== WAITING && this.state !== PAUSE) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  init(wrapper) {
    let i, len = this.ghostColors.length;
    let ghost;
    let blockSize = wrapper.offsetWidth / 19;
    let canvas = document.createElement('canvas');

    canvas.setAttribute('width', blockSize * 19 + 'px');
    canvas.setAttribute('height', blockSize * 22 + 30 + 'px');

    wrapper.appendChild(canvas);
    this.ctx = canvas.getContext('2d');

    this.map = new Map(blockSize);
    this.player = new Player(this, this.map);

    for (i = 0; i < len; i += 1) {
      ghost = new Ghost(this, this.map, this.ghostColors[i]);
      this.ghosts.push(ghost);
    }

    this.map.draw(this.ctx);

    this.dialog('Press N to Start');

    document.addEventListener('keydown', function(e) {
      if (!e) {
       return;
      }
      this.keyDown(e);
    }.bind(this), true);
    document.addEventListener('keypress', function(e) {
      if (!e) {
       return;
      }
      this.keyPress(e);
    }.bind(this), true);

    this.timer = window.setInterval((function(self) { //Self-executing func which takes 'this' as self
         return function() {   //Return a function in the context of 'self'
             self.mainLoop(); //Thing you wanted to run as non-window 'this'
         }
     })(this), 1000 / Pacman.FPS);
  }
}
