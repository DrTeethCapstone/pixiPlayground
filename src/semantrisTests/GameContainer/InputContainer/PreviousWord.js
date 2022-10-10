import * as PIXI from "pixi.js";

export class PreviousWord extends PIXI.Text {
  constructor(parent = null) {
    super(" ", {
      fontFamily: "Arial",
      fontSize: 24,
      fill: 0xff1010,
      align: "center",
    });

    this.parent = parent;

    if (this.parent) {
      this.parent.addChild(this);
      this.position.x = this.parent.width / 2;
      this.position.y = this.parent.height - this.parent.height / 4;
      this.anchor.set(0.5, 1);
    }
  }

  updateWord(word) {
    this.text = word;
  }
}
