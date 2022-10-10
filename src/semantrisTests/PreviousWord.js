import * as PIXI from "pixi.js";

export class PreviousWord extends PIXI.Text {
  constructor(word, parent = null) {
    super(word, {
      fontFamily: "Arial",
      fontSize: 20,
      fill: 0xff1010,
      align: "center",
    });

    const bg = new PIXI.Sprite(PIXI.Texture.WHITE);
    bg.tint = 0xffffff;
    bg.anchor.set(0.5, 1);
    bg.height = 50;
    bg.width = 300;

    this.anchor.set(0.5, 1);
    this.container = new PIXI.Container();
    this.container.addChild(bg);
    this.container.addChild(this);
    this.parent = parent;

    if (this.parent) {
      this.parent.addChild(this.container);
    }

    // console.log(this.parent.children[0].height);
    // this.position.y = this.parent.height - this.parent.children[0].height * 2;
  }

  updateWord(word) {
    this.text = word;
  }
}
