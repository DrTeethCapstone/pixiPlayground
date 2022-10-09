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

    this.parent = parent;
    this.anchor.set(0.5, 1);
    this.isWord = true;

    if (isTarget) {
      this.isTarget = isTarget;
      this.style.fill = 0xffffff;
    }

    if (this.parent) {
      this.index = this.parent.children.length;
      this.parent.addChild(this);
      this.position.y = -this.parent.getGlobalPosition().y;
    }

    // this.updatePosition();
  }
  updateIndex() {}

  updatePosition() {
    gsap.to(this, { y: -this.height * this.index, duration: 1 });
  }

  //METHOD TO UPDATE WORDS
  updateWord(word) {
    this.text = word;
  }
}
