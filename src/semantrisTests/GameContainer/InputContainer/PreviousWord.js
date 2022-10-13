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
      const container = new PIXI.Container();
      const containerBG = new PIXI.Sprite(PIXI.Texture.WHITE);
      containerBG.tint = 0xececec;
      containerBG.width = this.parent.width;
      containerBG.height = this.parent.height / 2;
      container.position.y = -containerBG.height * 2;
      container.position.x = -containerBG.width / 2;
      container.addChild(containerBG);
      this.parent.addChild(container);
      container.addChild(this);
      this.position.x = this.parent.width / 2;
      this.position.y = this.parent.height - this.parent.height / 4;
      this.anchor.set(0.5, 1);
    }
  }

  updateWord(word) {
    if (!word.length) {
      this.text = "Please Enter a Valid Guess";
    } else {
      this.text = word;
    }
  }
}
