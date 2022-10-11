import * as PIXI from "pixi.js";

export class GameMenu extends PIXI.Container {
  constructor(parent = null) {
    super();

    this.parent = parent;

    if (this.parent) {
      this.parent.addChild(this);
    }

    const border = new PIXI.Graphics();
    border.lineStyle(4, 0x0aea5b);
    border.drawRect(0, 0, window.innerWidth, window.innerHeight);
    this.addChild(border);
    // console.log(border);

    const boxButton = new PIXI.Graphics();
    boxButton.lineStyle(2, 0x0aea5b);
    boxButton.drawRect(100, 100, 200, 100);
    border.addChild(boxButton);

    const buttonText = new PIXI.Text("Play Game", {
      fontFamily: "Arial",
      fontSize: 24,
      fill: 0xff1010,
      align: "center",
    });
    boxButton.addChild(buttonText);
  }
}
