import * as PIXI from "pixi.js";

export class PreviousWord extends PIXI.Text {
  constructor(word, parent = null) {
    super(word, {
      fontFamily: "Arial",
      fontSize: 24,
      fill: 0xff1010,
      align: "center",
    });

    this.container = new PIXI.Container();
    this.container.addChild(this);
    this.parent = parent;

    if (this.parent) {
      this.parent.addChild(this.container);
    }
  }

  updateWord(word) {
    this.text = word;
  }
}
