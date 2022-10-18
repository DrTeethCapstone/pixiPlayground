import * as PIXI from "pixi.js";
import { GameMenu } from "./GameMenu";

export class Sketch {
  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.app = new PIXI.Application({
      backgroundAlpha: 1,
      resolution: window.devicePixelRatio || 1,
      resizeTo: window,
    });

    document.body.appendChild(this.app.view);

    this.time = 200;
    this.background = new GameMenu(this.app.stage);
  }
}
