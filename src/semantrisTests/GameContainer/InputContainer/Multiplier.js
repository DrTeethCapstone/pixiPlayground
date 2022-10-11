import * as PIXI from "pixi.js";

import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
gsap.registerPlugin(PixiPlugin);

export class Multiplier extends PIXI.Graphics {
  constructor(parent) {
    super();
    this.parent = parent;
    if (this.parent) {
      this.parent.addChild(this);
      this.lineStyle(1, 0xececec);
      this.drawRect(1, 0, this.parent.width / 4 - 2, this.parent.height / 2.5);
      this.graphic = new PIXI.Graphics();
      this.graphic.beginFill(0x8954a6);
      this.graphic.drawRect(3, 0, this.width - 5, this.height);
      this.graphic.endFill();
      this.addChild(this.graphic);
      this.position.y = this.height / 2;
      this.position.x = 0;
      // console.log(this.parent.children.slice(1));
      this.positionBasedOnSiblings();
    }
  }
  positionBasedOnSiblings() {
    this.position.x = this.width * (this.parent.children.slice(1).length - 1);
  }
  removeLast() {}
}
