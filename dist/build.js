(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Pacman = exports.Pacman = {};
window.Pacman = Pacman;
Pacman.WALL = 0;
Pacman.COOKIE = 1;
Pacman.EMPTY = 2;
Pacman.BLOCK = 3;
Pacman.PILL = 4;

Pacman.FPS = 30;

Pacman.MAP = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 4, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 4, 0], [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0], [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0], [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0], [2, 2, 2, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 2, 2, 2], [0, 0, 0, 0, 1, 0, 1, 0, 0, 3, 0, 0, 1, 0, 1, 0, 0, 0, 0], [2, 2, 2, 2, 1, 1, 1, 0, 3, 3, 3, 0, 1, 1, 1, 2, 2, 2, 2], [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0], [2, 2, 2, 0, 1, 0, 1, 1, 1, 2, 1, 1, 1, 0, 1, 0, 2, 2, 2], [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0], [0, 4, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 4, 0], [0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0], [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0], [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

Pacman.WALLS = [[{ 'move': [0, 9.5] }, { 'line': [3, 9.5] }, { 'curve': [3.5, 9.5, 3.5, 9] }, { 'line': [3.5, 8] }, { 'curve': [3.5, 7.5, 3, 7.5] }, { 'line': [1, 7.5] }, { 'curve': [0.5, 7.5, 0.5, 7] }, { 'line': [0.5, 1] }, { 'curve': [0.5, 0.5, 1, 0.5] }, { 'line': [9, 0.5] }, { 'curve': [9.5, 0.5, 9.5, 1] }, { 'line': [9.5, 3.5] }], [{ 'move': [9.5, 1] }, { 'curve': [9.5, 0.5, 10, 0.5] }, { 'line': [18, 0.5] }, { 'curve': [18.5, 0.5, 18.5, 1] }, { 'line': [18.5, 7] }, { 'curve': [18.5, 7.5, 18, 7.5] }, { 'line': [16, 7.5] }, { 'curve': [15.5, 7.5, 15.5, 8] }, { 'line': [15.5, 9] }, { 'curve': [15.5, 9.5, 16, 9.5] }, { 'line': [19, 9.5] }], [{ 'move': [2.5, 5.5] }, { 'line': [3.5, 5.5] }], [{ 'move': [3, 2.5] }, { 'curve': [3.5, 2.5, 3.5, 3] }, { 'curve': [3.5, 3.5, 3, 3.5] }, { 'curve': [2.5, 3.5, 2.5, 3] }, { 'curve': [2.5, 2.5, 3, 2.5] }], [{ 'move': [15.5, 5.5] }, { 'line': [16.5, 5.5] }], [{ 'move': [16, 2.5] }, { 'curve': [16.5, 2.5, 16.5, 3] }, { 'curve': [16.5, 3.5, 16, 3.5] }, { 'curve': [15.5, 3.5, 15.5, 3] }, { 'curve': [15.5, 2.5, 16, 2.5] }], [{ 'move': [6, 2.5] }, { 'line': [7, 2.5] }, { 'curve': [7.5, 2.5, 7.5, 3] }, { 'curve': [7.5, 3.5, 7, 3.5] }, { 'line': [6, 3.5] }, { 'curve': [5.5, 3.5, 5.5, 3] }, { 'curve': [5.5, 2.5, 6, 2.5] }], [{ 'move': [12, 2.5] }, { 'line': [13, 2.5] }, { 'curve': [13.5, 2.5, 13.5, 3] }, { 'curve': [13.5, 3.5, 13, 3.5] }, { 'line': [12, 3.5] }, { 'curve': [11.5, 3.5, 11.5, 3] }, { 'curve': [11.5, 2.5, 12, 2.5] }], [{ 'move': [7.5, 5.5] }, { 'line': [9, 5.5] }, { 'curve': [9.5, 5.5, 9.5, 6] }, { 'line': [9.5, 7.5] }], [{ 'move': [9.5, 6] }, { 'curve': [9.5, 5.5, 10.5, 5.5] }, { 'line': [11.5, 5.5] }], [{ 'move': [5.5, 5.5] }, { 'line': [5.5, 7] }, { 'curve': [5.5, 7.5, 6, 7.5] }, { 'line': [7.5, 7.5] }], [{ 'move': [6, 7.5] }, { 'curve': [5.5, 7.5, 5.5, 8] }, { 'line': [5.5, 9.5] }], [{ 'move': [13.5, 5.5] }, { 'line': [13.5, 7] }, { 'curve': [13.5, 7.5, 13, 7.5] }, { 'line': [11.5, 7.5] }], [{ 'move': [13, 7.5] }, { 'curve': [13.5, 7.5, 13.5, 8] }, { 'line': [13.5, 9.5] }], [{ 'move': [0, 11.5] }, { 'line': [3, 11.5] }, { 'curve': [3.5, 11.5, 3.5, 12] }, { 'line': [3.5, 13] }, { 'curve': [3.5, 13.5, 3, 13.5] }, { 'line': [1, 13.5] }, { 'curve': [0.5, 13.5, 0.5, 14] }, { 'line': [0.5, 17] }, { 'curve': [0.5, 17.5, 1, 17.5] }, { 'line': [1.5, 17.5] }], [{ 'move': [1, 17.5] }, { 'curve': [0.5, 17.5, 0.5, 18] }, { 'line': [0.5, 21] }, { 'curve': [0.5, 21.5, 1, 21.5] }, { 'line': [18, 21.5] }, { 'curve': [18.5, 21.5, 18.5, 21] }, { 'line': [18.5, 18] }, { 'curve': [18.5, 17.5, 18, 17.5] }, { 'line': [17.5, 17.5] }], [{ 'move': [18, 17.5] }, { 'curve': [18.5, 17.5, 18.5, 17] }, { 'line': [18.5, 14] }, { 'curve': [18.5, 13.5, 18, 13.5] }, { 'line': [16, 13.5] }, { 'curve': [15.5, 13.5, 15.5, 13] }, { 'line': [15.5, 12] }, { 'curve': [15.5, 11.5, 16, 11.5] }, { 'line': [19, 11.5] }], [{ 'move': [5.5, 11.5] }, { 'line': [5.5, 13.5] }], [{ 'move': [13.5, 11.5] }, { 'line': [13.5, 13.5] }], [{ 'move': [2.5, 15.5] }, { 'line': [3, 15.5] }, { 'curve': [3.5, 15.5, 3.5, 16] }, { 'line': [3.5, 17.5] }], [{ 'move': [16.5, 15.5] }, { 'line': [16, 15.5] }, { 'curve': [15.5, 15.5, 15.5, 16] }, { 'line': [15.5, 17.5] }], [{ 'move': [5.5, 15.5] }, { 'line': [7.5, 15.5] }], [{ 'move': [11.5, 15.5] }, { 'line': [13.5, 15.5] }], [{ 'move': [2.5, 19.5] }, { 'line': [5, 19.5] }, { 'curve': [5.5, 19.5, 5.5, 19] }, { 'line': [5.5, 17.5] }], [{ 'move': [5.5, 19] }, { 'curve': [5.5, 19.5, 6, 19.5] }, { 'line': [7.5, 19.5] }], [{ 'move': [11.5, 19.5] }, { 'line': [13, 19.5] }, { 'curve': [13.5, 19.5, 13.5, 19] }, { 'line': [13.5, 17.5] }], [{ 'move': [13.5, 19] }, { 'curve': [13.5, 19.5, 14, 19.5] }, { 'line': [16.5, 19.5] }], [{ 'move': [7.5, 13.5] }, { 'line': [9, 13.5] }, { 'curve': [9.5, 13.5, 9.5, 14] }, { 'line': [9.5, 15.5] }], [{ 'move': [9.5, 14] }, { 'curve': [9.5, 13.5, 10, 13.5] }, { 'line': [11.5, 13.5] }], [{ 'move': [7.5, 17.5] }, { 'line': [9, 17.5] }, { 'curve': [9.5, 17.5, 9.5, 18] }, { 'line': [9.5, 19.5] }], [{ 'move': [9.5, 18] }, { 'curve': [9.5, 17.5, 10, 17.5] }, { 'line': [11.5, 17.5] }], [{ 'move': [8.5, 9.5] }, { 'line': [8, 9.5] }, { 'curve': [7.5, 9.5, 7.5, 10] }, { 'line': [7.5, 11] }, { 'curve': [7.5, 11.5, 8, 11.5] }, { 'line': [11, 11.5] }, { 'curve': [11.5, 11.5, 11.5, 11] }, { 'line': [11.5, 10] }, { 'curve': [11.5, 9.5, 11, 9.5] }, { 'line': [10.5, 9.5] }]];

var KEY = exports.KEY = { 'BACKSPACE': 8, 'TAB': 9, 'NUM_PAD_CLEAR': 12, 'ENTER': 13, 'SHIFT': 16, 'CTRL': 17, 'ALT': 18, 'PAUSE': 19, 'CAPS_LOCK': 20, 'ESCAPE': 27, 'SPACEBAR': 32, 'PAGE_UP': 33, 'PAGE_DOWN': 34, 'END': 35, 'HOME': 36, 'ARROW_LEFT': 37, 'ARROW_UP': 38, 'ARROW_RIGHT': 39, 'ARROW_DOWN': 40, 'PRINT_SCREEN': 44, 'INSERT': 45, 'DELETE': 46, 'SEMICOLON': 59, 'WINDOWS_LEFT': 91, 'WINDOWS_RIGHT': 92, 'SELECT': 93, 'NUM_PAD_ASTERISK': 106, 'NUM_PAD_PLUS_SIGN': 107, 'NUM_PAD_HYPHEN-MINUS': 109, 'NUM_PAD_FULL_STOP': 110, 'NUM_PAD_SOLIDUS': 111, 'NUM_LOCK': 144, 'SCROLL_LOCK': 145, 'EQUALS_SIGN': 187, 'COMMA': 188, 'HYPHEN-MINUS': 189, 'FULL_STOP': 190, 'SOLIDUS': 191, 'GRAVE_ACCENT': 192, 'LEFT_SQUARE_BRACKET': 219, 'REVERSE_SOLIDUS': 220, 'RIGHT_SQUARE_BRACKET': 221, 'APOSTROPHE': 222, 'N': 78 };
Pacman.KEY = KEY;

var NONE = exports.NONE = 4,
    UP = exports.UP = 3,
    LEFT = exports.LEFT = 2,
    DOWN = exports.DOWN = 1,
    RIGHT = exports.RIGHT = 11,
    WAITING = exports.WAITING = 5,
    PAUSE = exports.PAUSE = 6,
    PLAYING = exports.PLAYING = 7,
    COUNTDOWN = exports.COUNTDOWN = 8,
    EATEN_PAUSE = exports.EATEN_PAUSE = 9,
    DYING = exports.DYING = 10;

Pacman.DIRECTIONS = { LEFT: LEFT, UP: UP, DOWN: DOWN, RIGHT: RIGHT };

Pacman.STATES = {
  NONE: 4,
  UP: 3,
  LEFT: 2,
  DOWN: 1,
  RIGHT: 11,
  WAITING: 5,
  PAUSE: 6,
  PLAYING: 7,
  COUNTDOWN: 8,
  EATEN_PAUSE: 9,
  DYING: 10
};

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('./constants.js');

var _map = require('./map.js');

var _map2 = _interopRequireDefault(_map);

var _player = require('./sprites/player.js');

var _player2 = _interopRequireDefault(_player);

var _ghost = require('./sprites/ghost.js');

var _ghost2 = _interopRequireDefault(_ghost);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameMechanics = function () {
  function GameMechanics() {
    _classCallCheck(this, GameMechanics);

    this.state = _constants.WAITING;
    this.stateChanged = true;
    this.tick = 0;
    this.lastTime = 0;
    this.ctx = null;
    this.timer = null;
    this.stored = null;
  }

  _createClass(GameMechanics, [{
    key: 'setState',
    value: function setState(nState) {
      this.state = nState;
      this.stateChanged = true;
    }
  }, {
    key: 'getTick',
    value: function getTick() {
      return this.tick;
    }
  }, {
    key: 'drawScore',
    value: function drawScore(text, position) {
      var x = position.new.x / 10 * this.map.blockSize;
      var y = (position.new.y + 5) / 10 * this.map.blockSize;
      this.drawText('#FFFFFF', text, x, y);
    }
  }, {
    key: 'dialog',
    value: function dialog(text) {
      var width = this.ctx.measureText(text).width;
      var x = (this.map.width * this.map.blockSize - width) / 2;
      var y = this.map.height * 10 + 8;

      this.ctx.fillStyle = '#FFFF00';
      this.ctx.font = '12px Press_Start_2P';
      this.ctx.fillText(text, x, y);
      // this.drawText('#FFFF00', text, x, y);
    }
  }, {
    key: 'drawText',
    value: function drawText(color, text, position) {
      this.ctx.fillStyle = color;
      this.ctx.font = '8px Press_Start_2P';
      this.ctx.fillText(text, position.x, position.y);
    }
  }, {
    key: 'setState',
    value: function setState(nState) {
      this.state = nState;
      this.stateChanged = true;
    }
  }, {
    key: 'drawFooter',
    value: function drawFooter() {
      var topLeft = this.map.height * this.map.blockSize;
      var textBase = topLeft + 17;

      this.ctx.fillStyle = '#000000';
      this.ctx.fillRect(0, topLeft, this.map.width * this.map.blockSize, 30);

      this.ctx.fillStyle = '#FFFF00';

      var i = 0;
      var len = this.player.getLives();
      while (i < len) {
        this.ctx.fillStyle = '#FFFF00';
        this.ctx.beginPath();
        this.ctx.moveTo(150 + 25 * i + this.map.blockSize / 2, topLeft + 1 + this.map.blockSize / 2);

        this.ctx.arc(150 + 25 * i + this.map.blockSize / 2, topLeft + 1 + this.map.blockSize / 2, this.map.blockSize / 2, Math.PI * 0.25, Math.PI * 1.75, false);
        this.ctx.fill();
        i += 1;
      }

      this.ctx.fillStyle = '#FFFF00';
      this.ctx.font = "10px Press_Start_2P";
      this.ctx.fillText('Score:  ' + this.player.getScore(), 30, textBase);
      this.ctx.fillText('Level: ' + this.level, 260, textBase);
    }
  }, {
    key: 'redrawBlock',
    value: function redrawBlock(pos) {
      this.map.drawBlock(Math.floor(pos.y / 10), Math.floor(pos.x / 10), this.ctx);
      this.map.drawBlock(Math.ceil(pos.y / 10), Math.ceil(pos.x / 10), this.ctx);
    }
  }, {
    key: 'mainDraw',
    value: function mainDraw() {

      var p = void 0,
          nScore = void 0;

      this.ghostPos = [];

      var i = 0;
      var len = this.ghosts.length;

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
            this.setState(_constants.EATEN_PAUSE);
            this.timerStart = this.tick;
          } else if (this.ghosts[i].isDangerous()) {
            this.setState(_constants.DYING);
            this.timerStart = this.tick;
          }
        }
      }
    }
  }, {
    key: 'keyPress',
    value: function keyPress(e) {
      if (this.state !== _constants.WAITING && this.state !== _constants.PAUSE) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
  }, {
    key: 'init',
    value: function init(wrapper) {
      var i = void 0,
          len = this.ghostColors.length;
      var ghost = void 0;
      var blockSize = wrapper.offsetWidth / 19;
      var canvas = document.createElement('canvas');

      canvas.setAttribute('width', blockSize * 19 + 'px');
      canvas.setAttribute('height', blockSize * 22 + 30 + 'px');

      wrapper.appendChild(canvas);
      this.ctx = canvas.getContext('2d');

      this.map = new _map2.default(blockSize);
      this.player = new _player2.default(this, this.map);

      for (i = 0; i < len; i += 1) {
        ghost = new _ghost2.default(this, this.map, this.ghostColors[i]);
        this.ghosts.push(ghost);
      }

      this.map.draw(this.ctx);

      this.dialog('Press N to Start');

      document.addEventListener('keydown', function (e) {
        if (!e) {
          return;
        }
        this.keyDown(e);
      }.bind(this), true);
      document.addEventListener('keypress', function (e) {
        if (!e) {
          return;
        }
        this.keyPress(e);
      }.bind(this), true);

      this.timer = window.setInterval(function (self) {
        //Self-executing func which takes 'this' as self
        return function () {
          //Return a function in the context of 'self'
          self.mainLoop(); //Thing you wanted to run as non-window 'this'
        };
      }(this), 1000 / _constants.Pacman.FPS);
    }
  }]);

  return GameMechanics;
}();

exports.default = GameMechanics;

},{"./constants.js":1,"./map.js":6,"./sprites/ghost.js":7,"./sprites/player.js":8}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('./constants.js');

var _gameMechanics = require('./game-mechanics');

var _gameMechanics2 = _interopRequireDefault(_gameMechanics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Game = function (_GameMechanics) {
  _inherits(Game, _GameMechanics);

  function Game(wrapper) {
    _classCallCheck(this, Game);

    var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, wrapper));

    _this.ghosts = [];
    _this.ghostColors = ['#00FFDE', '#FF0000', '#FFB8DE', '#FFB847'];
    _this.eatenCount = 0;
    _this.level = 0;
    _this.ghostPos = null;
    _this.playerPos = null;
    _this.timerStart = null;
    _this.map = null;
    _this.player = null;
    _this.init(wrapper);
    return _this;
  }

  _createClass(Game, [{
    key: 'collided',
    value: function collided(player, ghost) {
      return Math.sqrt(Math.pow(ghost.x - player.x, 2) + Math.pow(ghost.y - player.y, 2)) < 10;
    }
  }, {
    key: 'mainLoop',
    value: function mainLoop() {
      var diff = void 0;

      if (this.state !== _constants.PAUSE) {
        ++this.tick;
      }

      this.map.drawPills(this.ctx);

      if (this.state === _constants.PLAYING) {
        this.mainDraw();
      } else if (this.state === _constants.WAITING && this.stateChanged) {
        this.stateChanged = false;
        this.map.draw(this.ctx);
        this.dialog('Press N to start a New game');
      } else if (this.state === _constants.EATEN_PAUSE && this.tick - this.timerStart > _constants.Pacman.FPS / 3) {
        this.map.draw(this.ctx);
        this.setState(_constants.PLAYING);
      } else if (this.state === _constants.DYING) {
        if (this.tick - this.timerStart > _constants.Pacman.FPS * 2) {
          this.loseLife();
        } else {
          this.redrawBlock(this.userPos);
          for (var i = 0; i < this.ghosts.length; i += 1) {
            this.redrawBlock(this.ghostPos[i].old);
            this.ghostPos.push(this.ghosts[i].draw(this.ctx));
          }
          this.player.drawDead(this.ctx, (this.tick - this.timerStart) / (_constants.Pacman.FPS * 2));
        }
      } else if (this.state === _constants.COUNTDOWN) {

        diff = 5 + Math.floor((this.timerStart - this.tick) / _constants.Pacman.FPS);

        if (diff === 0) {
          this.map.draw(this.ctx);
          this.setState(_constants.PLAYING);
        } else {
          if (diff !== this.lastTime) {
            this.lastTime = diff;
            this.map.draw(this.ctx);
            this.dialog('Starting in: ' + diff);
          }
        }
      }

      this.drawFooter();
    }
  }, {
    key: 'eatenPill',
    value: function eatenPill() {
      this.timerStart = this.tick;
      this.eatenCount = 0;
      for (var i = 0; i < this.ghosts.length; i += 1) {
        this.ghosts[i].makeEatable(this.ctx);
      }
    }
  }]);

  return Game;
}(_gameMechanics2.default);

window.Game = Game;

exports.default = Game;

},{"./constants.js":1,"./game-mechanics":2}],4:[function(require,module,exports){
'use strict';

var _game = require('./game.js');

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./game.js":3}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('./constants.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MapSprite = function () {
  function MapSprite() {
    _classCallCheck(this, MapSprite);
  }

  _createClass(MapSprite, [{
    key: 'drawPills',
    value: function drawPills(ctx) {
      if (++this.pillSize > 30) {
        this.pillSize = 0;
      }
      var i = 0;
      while (i < this.height) {
        var j = 0;
        while (j < this.width) {
          if (this.map[i][j] === _constants.Pacman.PILL) {
            ctx.beginPath();

            ctx.fillStyle = '#000';
            ctx.fillRect(j * this.blockSize, i * this.blockSize, this.blockSize, this.blockSize);

            ctx.fillStyle = '#FFF';
            ctx.arc(j * this.blockSize + this.blockSize / 2, i * this.blockSize + this.blockSize / 2, Math.abs(5 - this.pillSize / 3), 0, Math.PI * 2, false);
            ctx.fill();
            ctx.closePath();
          }
          j += 1;
        }
        i += 1;
      }
    }
  }, {
    key: 'draw',
    value: function draw(ctx) {
      var i = void 0,
          j = void 0;
      var size = this.blockSize;

      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, this.width * size, this.height * size);

      this.drawWall(ctx);

      i = 0;
      while (i < this.height) {
        j = 0;
        while (j < this.width) {
          this.drawBlock(i, j, ctx);
          j += 1;
        }
        i += 1;
      }
    }
  }, {
    key: 'drawBlock',
    value: function drawBlock(y, x, ctx) {
      var layout = this.map[y][x];

      if (layout === _constants.Pacman.PILL) {
        return;
      }

      ctx.beginPath();

      if (layout === _constants.Pacman.EMPTY || layout === _constants.Pacman.BLOCK || layout === _constants.Pacman.COOKIE) {

        ctx.fillStyle = '#000';
        ctx.fillRect(x * this.blockSize, y * this.blockSize, this.blockSize, this.blockSize);

        if (layout === _constants.Pacman.COOKIE) {
          ctx.fillStyle = '#FFF';
          ctx.fillRect(x * this.blockSize + this.blockSize / 2.5, y * this.blockSize + this.blockSize / 2.5, this.blockSize / 6, this.blockSize / 6);
        }
      }
      ctx.closePath();
    }
  }, {
    key: 'drawWall',
    value: function drawWall(ctx) {

      var i = void 0,
          j = void 0,
          p = void 0,
          line = void 0;

      ctx.strokeStyle = '#2ecc71';
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';

      i = 0;
      while (i < _constants.Pacman.WALLS.length) {
        line = _constants.Pacman.WALLS[i];
        ctx.beginPath();

        j = 0;
        while (j < line.length) {
          p = line[j];
          if (p.move) {
            ctx.moveTo(p.move[0] * this.blockSize, p.move[1] * this.blockSize);
          } else if (p.line) {
            ctx.lineTo(p.line[0] * this.blockSize, p.line[1] * this.blockSize);
          } else if (p.curve) {
            ctx.quadraticCurveTo(p.curve[0] * this.blockSize, p.curve[1] * this.blockSize, p.curve[2] * this.blockSize, p.curve[3] * this.blockSize);
          }

          j += 1;
        }
        ctx.stroke();

        i += 1;
      }
    }
  }]);

  return MapSprite;
}();

exports.default = MapSprite;

},{"./constants.js":1}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('./constants.js');

var _mapSprite = require('./map-sprite');

var _mapSprite2 = _interopRequireDefault(_mapSprite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Map = function (_MapSprite) {
  _inherits(Map, _MapSprite);

  function Map(blockSize) {
    _classCallCheck(this, Map);

    var _this = _possibleConstructorReturn(this, (Map.__proto__ || Object.getPrototypeOf(Map)).call(this));

    _this.initMap();
    _this.blockSize = blockSize;
    _this.pillSize = 0;
    return _this;
  }

  _createClass(Map, [{
    key: 'initMap',
    value: function initMap() {
      this.map = _constants.Pacman.MAP;
      this.height = this.map.length;
      this.width = this.map[0].length;
    }
  }, {
    key: 'getBlock',
    value: function getBlock(pos) {
      return this.map[pos.y][pos.x];
    }
  }, {
    key: 'setBlock',
    value: function setBlock(pos, type) {
      this.map[pos.y][pos.x] = type;
    }

    // Laten schrijven door kinderen

  }, {
    key: 'withinMap',
    value: function withinMap(x, y) {
      return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }
  }, {
    key: 'isWall',
    value: function isWall(pos) {
      var withinMap = this.withinMap(pos.x, pos.y);
      var isWallBlock = this.getBlock(pos) === _constants.Pacman.WALL;
      return withinMap && isWallBlock;
    }
  }, {
    key: 'isFloor',
    value: function isFloor(pos) {
      if (!this.withinMap(pos.x, pos.y)) {
        return false;
      }
      var block = this.getBlock(pos);
      return block === _constants.Pacman.EMPTY || block === _constants.Pacman.COOKIE || block === _constants.Pacman.PILL;
    }
  }]);

  return Map;
}(_mapSprite2.default);

exports.default = Map;

},{"./constants.js":1,"./map-sprite":5}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('../constants.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ghost = function () {
  function Ghost(game, map, colour) {
    _classCallCheck(this, Ghost);

    this.position = {
      x: 90,
      y: 80
    };
    this.direction = _constants.LEFT;
    this.due = _constants.LEFT;
    this.eatable = null;
    this.eaten = null;
    this.colour = colour;
    this.game = game;
    this.map = map;
  }

  _createClass(Ghost, [{
    key: 'getNewCoord',
    value: function getNewCoord(dir, current) {
      var speed = void 0;
      if (this.isVunerable()) {
        speed = 0.25;
      } else if (this.isHidden()) {
        speed = 2;
      } else {
        speed = 0.5;
      }
      var xSpeed = dir === _constants.LEFT && -speed || dir === _constants.RIGHT && speed || 0;
      var ySpeed = dir === _constants.DOWN && speed || dir === _constants.UP && -speed || 0;

      var x = this.addBounded(current.x, xSpeed);
      var y = this.addBounded(current.y, ySpeed);
      return { x: x, y: y };
    }

    /* Keep this method  */

  }, {
    key: 'addBounded',
    value: function addBounded(x1, x2) {
      var rem = x1 % 10;
      var result = rem + x2;

      if (rem !== 0 && result > 10) {
        return x1 + (10 - rem);
      } else if (rem > 0 && result < 0) {
        return x1 - rem;
      }

      return x1 + x2;
    }
  }, {
    key: 'onWholeSquare',
    value: function onWholeSquare(x) {
      return x % 10 === 0;
    }
  }, {
    key: 'makeEatable',
    value: function makeEatable() {
      this.direction = this.oppositeDirection(this.direction);
      this.eatable = this.game.getTick();
    }
  }, {
    key: 'eat',
    value: function eat() {
      this.eatable = null;
      this.eaten = this.game.getTick();
    }
  }, {
    key: 'pointToCoord',
    value: function pointToCoord(x) {
      return Math.round(x / 10);
    }
  }, {
    key: 'nextSquare',
    value: function nextSquare(x, dir) {
      var rem = x % 10;
      if (rem === 0) {
        return x;
      } else if (dir === _constants.RIGHT || dir === _constants.DOWN) {
        return x + (10 - rem);
      }
      return x - rem;
    }
  }, {
    key: 'onGridSquare',
    value: function onGridSquare(pos) {
      return this.onWholeSquare(pos.y) && this.onWholeSquare(pos.x);
    }
  }, {
    key: 'secondsAgo',
    value: function secondsAgo(tick) {
      return (this.game.getTick() - tick) / _constants.Pacman.FPS;
    }
  }, {
    key: 'getColour',
    value: function getColour() {
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
  }, {
    key: 'draw',
    value: function draw(ctx) {
      var s = this.map.blockSize;
      var top = this.position.y / 10 * s;
      var left = this.position.x / 10 * s;

      if (this.eatable && this.secondsAgo(this.eatable) > 8) {
        this.eatable = null;
      }

      if (this.eaten && this.secondsAgo(this.eaten) > 3) {
        this.eaten = null;
      }

      var tl = left + s;
      var base = top + s - 3;
      var inc = s / 10;

      var high = void 0;
      if (this.game.getTick() % 10 > 5) {
        high = 3;
      } else {
        high = -3;
      }

      var low = void 0;
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

      var f = s / 12;
      var off = {};
      off[_constants.RIGHT] = [f, 0];
      off[_constants.LEFT] = [-f, 0];
      off[_constants.UP] = [0, -f];
      off[_constants.DOWN] = [0, f];

      ctx.beginPath();
      ctx.fillStyle = '#000';
      ctx.arc(left + 6 + off[this.direction][0], top + 6 + off[this.direction][1], s / 15, 0, 300, false);
      ctx.arc(left + s - 6 + off[this.direction][0], top + 6 + off[this.direction][1], s / 15, 0, 300, false);
      ctx.closePath();
      ctx.fill();
    }
  }, {
    key: 'pane',
    value: function pane(pos) {

      if (pos.y === 100 && pos.x >= 190 && this.direction === _constants.RIGHT) {
        return {
          y: 100,
          x: -10
        };
      }

      if (pos.y === 100 && pos.x <= -10 && this.direction === _constants.LEFT) {
        return this.position = {
          y: 100,
          x: 190
        };
      }

      return false;
    }
  }, {
    key: 'move',
    value: function move(ctx) {

      var oldPos = this.position;
      var onGrid = this.onGridSquare(this.position);
      var npos = null;

      if (this.due !== this.direction) {
        npos = this.getNewCoord(this.due, this.position);

        if (onGrid && this.map.isFloor({
          x: this.pointToCoord(this.nextSquare(npos.x, this.due)),
          y: this.pointToCoord(this.nextSquare(npos.y, this.due))
        })) {
          this.direction = this.due;
        } else {
          npos = null;
        }
      }

      if (npos === null) {
        npos = this.getNewCoord(this.direction, this.position);
      }

      if (onGrid && this.map.isWall({
        y: this.pointToCoord(this.nextSquare(npos.y, this.direction)),
        x: this.pointToCoord(this.nextSquare(npos.x, this.direction))
      })) {

        this.due = this.getRandomDirection();
        return this.move(ctx);
      }

      this.position = npos;

      var tm = this.pane(this.position);
      if (tm) {
        this.position = tm;
      }

      this.due = this.getRandomDirection();

      return {
        new: this.position,
        old: oldPos
      };
    }
  }]);

  return Ghost;
}();

window.Ghost = Ghost;
exports.default = Ghost;

},{"../constants.js":1}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('../constants.js');

var _playerSprite = require('./playerSprite');

var _playerSprite2 = _interopRequireDefault(_playerSprite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Player = function (_PlayerSprite) {
  _inherits(Player, _PlayerSprite);

  function Player(game, map) {
    _classCallCheck(this, Player);

    var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, game, map));

    _this.position = null;
    _this.direction = null;
    _this.eaten = null;
    _this.due = null;
    _this.lives = null;
    _this.score = 5;
    return _this;
  }

  _createClass(Player, [{
    key: 'addScore',
    value: function addScore(nScore) {
      this.score += nScore;
      if (this.score >= 10000 && this.score - nScore < 10000) {
        this.lives += 1;
      }
    }
  }, {
    key: 'getScore',
    value: function getScore() {
      return this.score;
    }
  }, {
    key: 'move',
    value: function move() {
      var npos = null;
      var nextWhole = null;
      var oldPosition = this.position;
      var block = null;

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
        this.direction = _constants.NONE;
      }

      if (this.direction === _constants.NONE) {
        return {
          new: this.position,
          old: this.position
        };
      }

      if (npos.y === 100 && npos.x >= 190 && this.direction === _constants.RIGHT) {
        npos = {
          y: 100,
          x: -10
        };
      }

      if (npos.y === 100 && npos.x <= -12 && this.direction === _constants.LEFT) {
        npos = {
          y: 100,
          x: 190
        };
      }

      this.position = npos;
      nextWhole = this.next(this.position, this.direction);

      block = this.map.getBlock(nextWhole);

      if ((this.isMidSquare(this.position.y) || this.isMidSquare(this.position.x)) && block === _constants.Pacman.COOKIE || block === _constants.Pacman.PILL) {

        this.map.setBlock(nextWhole, _constants.Pacman.EMPTY);
        this.addScore(block === _constants.Pacman.COOKIE ? 10 : 50);
        this.eaten += 1;

        if (this.eaten === 182) {
          this.game.completedLevel();
        }

        if (block === _constants.Pacman.PILL) {
          this.game.eatenPill();
        }
      }

      return {
        new: this.position,
        old: oldPosition
      };
    }
  }]);

  return Player;
}(_playerSprite2.default);

window.Player = Player;
exports.default = Player;

},{"../constants.js":1,"./playerSprite":9}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('../constants.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PlayerSprite = function () {
  function PlayerSprite(game, map) {
    _classCallCheck(this, PlayerSprite);

    this.game = game;
    this.map = map;
    this.keyMap = {};
    this.keyMap[_constants.KEY.ARROW_LEFT] = _constants.LEFT;
    this.keyMap[_constants.KEY.ARROW_UP] = _constants.UP;
    this.keyMap[_constants.KEY.ARROW_RIGHT] = _constants.RIGHT;
    this.keyMap[_constants.KEY.ARROW_DOWN] = _constants.DOWN;
  }

  _createClass(PlayerSprite, [{
    key: 'keyDown',
    value: function keyDown(ev) {
      if (this.keyMap[ev.keyCode] !== 'undefined') {
        this.due = this.keyMap[ev.keyCode];
        ev.preventDefault();
        ev.stopPropagation();
        return false;
      }
      return true;
    }
  }, {
    key: 'getNewCoord',
    value: function getNewCoord(dir, current) {
      return {
        x: current.x + (dir === _constants.LEFT && -2 || dir === _constants.RIGHT && 2 || 0),
        y: current.y + (dir === _constants.DOWN && 2 || dir === _constants.UP && -2 || 0)
      };
    }
  }, {
    key: 'onWholeSquare',
    value: function onWholeSquare(x) {
      return x % 10 === 0;
    }
  }, {
    key: 'pointToCoord',
    value: function pointToCoord(x) {
      return Math.round(x / 10);
    }
  }, {
    key: 'nextSquare',
    value: function nextSquare(x, dir) {
      var rem = x % 10;
      if (rem === 0) {
        return x;
      } else if (dir === _constants.RIGHT || dir === _constants.DOWN) {
        return x + (10 - rem);
      }
      return x - rem;
    }
  }, {
    key: 'next',
    value: function next(pos, dir) {
      return {
        y: this.pointToCoord(this.nextSquare(pos.y, dir)),
        x: this.pointToCoord(this.nextSquare(pos.x, dir))
      };
    }
  }, {
    key: 'onGridSquare',
    value: function onGridSquare(pos) {
      return this.onWholeSquare(pos.y) && this.onWholeSquare(pos.x);
    }
  }, {
    key: 'isOnSamePlane',
    value: function isOnSamePlane(due, dir) {
      return (due === _constants.LEFT || due === _constants.RIGHT) && (dir === _constants.LEFT || dir === _constants.RIGHT) || (due === _constants.UP || due === _constants.DOWN) && (dir === _constants.UP || dir === _constants.DOWN);
    }
  }, {
    key: 'isMidSquare',
    value: function isMidSquare(x) {
      var rem = x % 10;
      return rem > 3 || rem < 7;
    }
  }, {
    key: 'move',
    value: function move() {
      var npos = null;
      var nextWhole = null;
      var oldPosition = this.position;
      var block = null;

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
        this.direction = _constants.NONE;
      }

      if (this.direction === _constants.NONE) {
        return {
          new: this.position,
          old: this.position
        };
      }

      if (npos.y === 100 && npos.x >= 190 && this.direction === _constants.RIGHT) {
        npos = {
          y: 100,
          x: -10
        };
      }

      if (npos.y === 100 && npos.x <= -12 && this.direction === _constants.LEFT) {
        npos = {
          y: 100,
          x: 190
        };
      }

      this.position = npos;
      nextWhole = this.next(this.position, this.direction);

      block = this.map.getBlock(nextWhole);

      if ((this.isMidSquare(this.position.y) || this.isMidSquare(this.position.x)) && block === _constants.Pacman.COOKIE || block === _constants.Pacman.PILL) {

        this.map.setBlock(nextWhole, _constants.Pacman.EMPTY);
        this.addScore(block === _constants.Pacman.COOKIE ? 10 : 50);
        this.eaten += 1;

        if (this.eaten === 182) {
          this.game.completedLevel();
        }

        if (block === _constants.Pacman.PILL) {
          this.game.eatenPill();
        }
      }

      return {
        new: this.position,
        old: oldPosition
      };
    }
  }, {
    key: 'drawDead',
    value: function drawDead(ctx, amount) {

      var size = this.map.blockSize;
      var half = size / 2;

      if (amount >= 1) {
        return;
      }

      ctx.fillStyle = '#FFFF00';
      ctx.beginPath();
      ctx.moveTo(this.position.x / 10 * size + half, this.position.y / 10 * size + half);

      ctx.arc(this.position.x / 10 * size + half, this.position.y / 10 * size + half, half, 0, Math.PI * 2 * amount, true);

      ctx.fill();
    }
  }, {
    key: 'draw',
    value: function draw(ctx) {
      var s = this.map.blockSize;
      var angle = this.calcAngle(this.direction, this.position);

      ctx.fillStyle = '#FFFF00';

      ctx.beginPath();

      ctx.moveTo(this.position.x / 10 * s + s / 2, this.position.y / 10 * s + s / 2);

      ctx.arc(this.position.x / 10 * s + s / 2, this.position.y / 10 * s + s / 2, s / 2, Math.PI * angle.start, Math.PI * angle.end, angle.direction);

      ctx.fill();
    }

    // Angle calculation for drawing

  }, {
    key: 'calcAngle',
    value: function calcAngle(dir, pos) {
      if (dir === _constants.RIGHT && pos.x % 10 < 5) {
        return {
          start: 0.25,
          end: 1.75,
          direction: false
        };
      } else if (dir === _constants.DOWN && pos.y % 10 < 5) {
        return {
          start: 0.75,
          end: 2.25,
          direction: false
        };
      } else if (dir === _constants.UP && pos.y % 10 < 5) {
        return {
          start: 1.25,
          end: 1.75,
          direction: true
        };
      } else if (dir === _constants.LEFT && pos.x % 10 < 5) {
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
  }]);

  return PlayerSprite;
}();

exports.default = PlayerSprite;

},{"../constants.js":1}]},{},[4])

//# sourceMappingURL=build.js.map
