import * as PIXI from "pixi.js";

//ANIMATION PLUGINS
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
  }

  //HIGHTLIGHTS WORD IN RED IF GUESS WASN'T VALID
  invalidGuess(num) {
    const originalText = this.text;
    const tempText = `(${originalText.slice(0, num)})${originalText.slice(
      num
    )}`;
    this.text = tempText;
    setTimeout(() => {
      this.text = originalText;
      this.style.fill = 0xffffff;
    }, 1500);
    gsap.to(this.style, { fill: "red", duration: 1 });
  }

  updatePosition() {
    gsap.to(this, { y: -this.height * this.index, duration: 1 });
  }

  removeWord() {
    gsap.to(this, { x: -100, duration: 4 });
    this.parent.removeChild(this);
  }

  //METHOD TO UPDATE WORDS
  updateWord(word) {
    this.text = word;
  }
}
