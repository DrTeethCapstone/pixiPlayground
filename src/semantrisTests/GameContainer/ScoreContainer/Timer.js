import * as PIXI from "pixi.js";
import img from "../semantrisTests/img/caution.jpg";

//CREATE A NEW INSTANCE OF TIMER OBJECT
export class Timer extends PIXI.Sprite {
  constructor(parent = null) {
    super(PIXI.Texture.WHITE);
    // this.texture = PIXI.Texture.from(img);
    this.scale.set(0.2);
    this.alpha = 0.2;
    this.parent = parent;
    this.score = 0;
    this.anchor.set(0.5);
    this.position.x = window.innerWidth / 2;
    this.position.y = this.height;

    if (this.parent) {
      this.parent.addChild(this);
    }
  }

  updateScore(val) {
    this.score += val;
    this.text = this.score;
  }
}
