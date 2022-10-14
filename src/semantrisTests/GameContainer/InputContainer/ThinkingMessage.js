import * as PIXI from "pixi.js";

export class ThinkingMessage extends PIXI.Text {
  constructor(parent = null) {
    super("", {
      fontFamily: "Arial",
      fontSize: 18,
      fill: 0x200145,
      align: "center",
    });
  }
}