import * as PIXI from "pixi.js";
import { InputText } from "./InputText";
import { PreviousWord } from "./PreviousWord";
import { Multiplier } from "./Multiplier";

import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
gsap.registerPlugin(PixiPlugin);

export class InputContainer extends PIXI.Container {
  constructor(parent) {
    super();
    this.parent = parent;
    this.multiplier = 3;

    const bg = new PIXI.Sprite(PIXI.Texture.WHITE);
    bg.anchor.set(0.5, 1);
    bg.height = 150;
    bg.width = this.parent.width;
    this.addChild(bg);

    const interactiveContainer = new PIXI.Container();
    const ICBackground = new PIXI.Sprite(PIXI.Texture.WHITE);
    ICBackground.width = bg.width;
    ICBackground.height = bg.height / 2;
    interactiveContainer.position.y = -ICBackground.height;
    interactiveContainer.position.x = -ICBackground.width / 2;
    interactiveContainer.addChild(ICBackground);
    this.addChild(interactiveContainer);

    this.interaction = new InputText(interactiveContainer);

    const previousGuessContianer = new PIXI.Container();
    const PGCBackground = new PIXI.Sprite(PIXI.Texture.WHITE);
    PGCBackground.tint = 0xececec;
    PGCBackground.width = bg.width;
    PGCBackground.height = bg.height / 2;
    previousGuessContianer.position.y = -PGCBackground.height * 2;
    previousGuessContianer.position.x = -PGCBackground.width / 2;
    previousGuessContianer.addChild(PGCBackground);
    this.addChild(previousGuessContianer);

    this.prevGuess = new PreviousWord(previousGuessContianer);

    this.multiplierContainer = new PIXI.Container();
    const MCBackground = new PIXI.Sprite(PIXI.Texture.WHITE);
    MCBackground.tint = 0xececec;
    MCBackground.width = bg.width;
    MCBackground.height = bg.height / 4;
    this.multiplierContainer.position.y = -MCBackground.height * 4.5;
    this.multiplierContainer.position.x = -PGCBackground.width / 2;
    this.multiplierContainer.addChild(MCBackground);

    this.addChild(this.multiplierContainer);

    if (this.parent) {
      this.parent.addChild(this);
    }
    this.updateMultiplier();
  }

  //UPDATES THE AMOUNT OF MULTIPLIERS DISPLAYING
  updateMultiplier() {
    for (let i = 0; i < this.multiplier; i++) {
      new Multiplier(this.multiplierContainer);
    }
  }

  fromOffScreen() {
    this.visible = true;
    gsap.to(this, {
      y: this.parent.height - this.height * 1.5,
      duration: 1,
      // duration: 3,
    });
  }

  toOffScreen() {
    gsap.to(this, {
      y: this.parent.height + this.height / 2,
      duration: 1,
    });
    this.visible = false;
  }
}
