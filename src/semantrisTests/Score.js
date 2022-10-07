import * as PIXI from "pixi.js";

//CREATE A NEW INSTANCE OF THE SCORE OBJECT
export class Score extends PIXI.Text {
  constructor(parent = null) {
    super(0, {
      fontFamily: "Arial",
      fontSize: 64,
      fill: 0xadd3e6,
      align: "center",
    });

    //TODO: POSITION SCORE WITH A LIGHT BACKGROUND AND UNDER ALL THE TEXT ON THE SCREEN
    const bg = new PIXI.Sprite(PIXI.Texture.WHITE);
    bg.width = 100;
    bg.height = 100;

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
