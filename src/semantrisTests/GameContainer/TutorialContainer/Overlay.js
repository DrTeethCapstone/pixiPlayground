import * as PIXI from "pixi.js";

export class Overlay extends PIXI.Sprite {
  constructor(height, width, parent = null) {
    super(PIXI.Texture.WHITE);
    this.tint = 0x000000;
    // this.scale.set(0.2);
    this.alpha = 0.8;
    this.parent = parent;
    this.height = height;
    this.width = width;
    this.anchor.set(0.5);
    this.position.x = window.innerWidth / 2;
    // this.position.y = this.height;
    this.position.y = window.innerHeight / 2;
  }
}