import * as PIXI from "pixi.js";

export class Word extends PIXI.Text {
  constructor(word, parent = null) {
    super(word, {
      fontFamily: "Arial",
      fontSize: 24,
      fill: 0x5dade2,
      align: "center",
    });

    this.index = 0;
    this.parent = parent;
    this.children = [];
    this.isWord = true;
    this.anchor.set(0.5);

    if (this.parent) {
      this.parent.addChild(this);
    }
  }
  updateWord(word) {
    this.text = word;
  }
}
