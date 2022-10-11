import * as PIXI from "pixi.js";

//CREATE A NEW INSTANCE OF THE SCORE OBJECT
export class Score extends PIXI.Text {
  constructor(parent = null) {
    super("0", {
      fontFamily: "Arial",
      fontSize: 128,
      fill: 0xadd3e6,
      align: "center",
    });

    this.parent = parent;

    if (this.parent) {
      this.parent.addChild(this);
      this.position.x = this.parent.width / 2 - this.width * 0.5;
      this.position.y = this.parent.height / 3;
    }
  }

  updateScore(val) {
    this.score += val;
    this.text = this.score;
  }
}
