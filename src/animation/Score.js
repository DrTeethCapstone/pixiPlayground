import * as PIXI from "pixi.js";

//CREATE A NEW INSTANCE OF THE SCORE OBJECT
export class Score extends PIXI.Text {
  constructor(parent = null) {
    super(0, {
      fontFamily: "Arial",
      fontSize: 48,
      fill: 0xadd3e6,
      align: "center",
    });

    this.parent = parent;
    this.score = 0;
    this.anchor.set(0.5);
    this.position.x = window.innerWidth / 2;
    this.position.y = this.height;

    console.log(parent);
    if (this.parent) {
      this.parent.addChild(this);
    }
  }

  updateScore(val) {
    this.score += val;
    this.text = this.score;
  }
}
