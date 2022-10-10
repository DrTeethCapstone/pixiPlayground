import * as PIXI from "pixi.js";
import { InputText } from "./InputText";
import { PreviousWord } from "./PreviousWord";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
gsap.registerPlugin(PixiPlugin);

export class InputContainer extends PIXI.Container {
  constructor(parent) {
    super();
    this.input = new InputText(this);
    // this.previousGuess = new PreviousWord("Your Old Guess Here", this);
    this.parent = parent;
    if (this.parent) {
      this.parent.addChild(this);
      //INITIAL POSITION OF CONTAINER IF OFF SCREEN
      this.position.y = this.parent.height;
      // console.log(this.height);
    }
    this.visible = false;
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
