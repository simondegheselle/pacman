import { UP, LEFT, DOWN, RIGHT, Pacman } from './constants.js';

import MapSprite from './map-sprite';

export default class Map extends MapSprite {

  constructor(blockSize) {
    super();
    this.initMap();
    this.blockSize = blockSize;
    this.pillSize = 0;
  }

  initMap() {
    this.map = Pacman.MAP;
    this.height = this.map.length;
    this.width = this.map[0].length;
  }

  getBlock(pos) {
    return this.map[pos.y][pos.x];
  }

  setBlock(pos, type) {
    this.map[pos.y][pos.x] = type;
  }

  // Laten schrijven door kinderen
  withinMap(x, y) {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  isWall(pos) {
    const withinMap = this.withinMap(pos.x, pos.y);
    const isWallBlock = this.getBlock(pos) === Pacman.WALL;
    return withinMap && isWallBlock;
  }

  isFloor(pos) {
    if (!this.withinMap(pos.x, pos.y)) {
      return false;
    }
    const block = this.getBlock(pos);
    return block === Pacman.EMPTY || block === Pacman.COOKIE || block === Pacman.PILL;
  }
}
//# sourceMappingURL=map.js.map