import * as PIXI from "pixi.js";

export class TipText extends PIXI.Text {
  constructor(parent = null) {
    super("", {
      fontFamily: "Arial",
      fontSize: 24,
      fill: 0xffffff,
      align: "center",
    });
  }
}