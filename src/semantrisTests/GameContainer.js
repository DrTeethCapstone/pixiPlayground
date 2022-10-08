import * as PIXI from "pixi.js";

export class GameContainer extends PIXI.Container {
  constructor(parent) {
    super();
    this.parent = parent;

    //BACKGROUND PLACED IN CONTAINER FOR VISIBILITY
    const bg = new PIXI.Sprite(PIXI.Texture.WHITE);
    bg.tint = 0xc6e2ff;
    bg.width = (window.innerWidth * 50) / 100;
    bg.height = window.innerHeight;
    //GAME CONATINER ANCHOR POINT IS CENTER - TOP
    bg.anchor.set(0.5, 0);
    this.addChild(bg);

    if (this.parent) {
      this.parent.addChild(this);
      this.position.set(this.parent.width, 0);
    }
  }
}
