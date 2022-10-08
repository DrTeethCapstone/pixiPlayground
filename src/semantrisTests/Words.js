import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
gsap.registerPlugin(PixiPlugin);

//CREATE A NEW INSTANCE OF A WORD OBJECT
export class Word extends PIXI.Text {
  //REQUIRES A STRING TO BE CREATED, PARENT CONTAINER OPTIONAL
  constructor(word, parent = null, isTarget = false) {
    super(word, {
      fontFamily: "Arial",
      fontSize: 24,
      fill: 0x5dade2,
      align: "center",
    });

    if (isTarget) {
      this.isTarget = isTarget;
      this.style.fill = 0xffffff;
    }

    this.parent = parent;
    this.isWord = true;
    this.anchor.set(0.5, 1);

    if (this.parent) {
      this.index = this.parent.children.length;
      this.parent.addChild(this);
      this.position.y = -this.parent.getGlobalPosition().y;
      console.log(this.position.y);
    }
    this.updatePosition();
  }

  updatePosition() {
    gsap.to(this, { y: -this.height * this.index, duration: 1 });
  }

  //METHOD TO UPDATE WORDS
  updateWord(word) {
    this.text = word;
  }
}
