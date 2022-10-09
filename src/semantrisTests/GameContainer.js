import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
gsap.registerPlugin(PixiPlugin);

export class GameContainer extends PIXI.Container {
  constructor(parent) {
    super();
    this.parent = parent;
    this.alpha = 0;
    //BACKGROUND PLACED IN CONTAINER FOR VISIBILITY
    const bg = new PIXI.Sprite(PIXI.Texture.WHITE);
    bg.tint = 0xc6e2ff;
    bg.width = (window.innerWidth * 50) / 100;
    bg.height = window.innerHeight;
    this.addChild(bg);
    //GAME CONATINER ANCHOR POINT IS CENTER - TOP
    bg.anchor.set(0.5, 0);

    // this.visible = false;

    if (this.parent) {
      this.parent.addChild(this);
      this.position.set(this.parent.width, 0);
    }
  }
  animateIn() {
    gsap.to(this, {
      alpha: 1,
      duration: 1,
    });
  }
}
