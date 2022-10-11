import * as PIXI from "pixi.js";

//CREATE A NEW INSTANCE OF THE SCORE OBJECT
export class Score extends PIXI.Text {
  constructor(parent = null) {
    super("0", {
      fontFamily: "Arial",
      fontSize: 128,
      fill: 0x000000,
      align: "center",
    });

    this.alpha = 0.5;
    this.parent = parent;

    if (this.parent) {
      this.parent.addChild(this);
      this.updatePosition();
      this.position.y = this.parent.height / 3;
    }
  }

  updatePosition() {
    this.position.x = this.parent.width / 2 - this.width / 2;
  }

  updateScore(val) {
    this.parent.parent.userScore += val;
    this.text = this.parent.parent.userScore;
    this.updatePosition();
  }
}
