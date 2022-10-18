import * as PIXI from "pixi.js";

//ANIMATION PLUGINS
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
gsap.registerPlugin(PixiPlugin);

//CREATE A NEW INSTANCE OF A WORD OBJECT
export class Word extends PIXI.Text {
  //REQUIRES A STRING TO BE CREATED, PARENT CONTAINER OPTIONAL
  constructor(word, parent = null, isTarget = false) {
    super(word);

    this.style = new PIXI.TextStyle({
      fontSize: 25,
      fill: 0x8a0b83,
    });

    this.parent = parent;
    this.anchor.set(0, 1);
    this.isWord = true;
    this.similarityScores = 0;

    if (isTarget) {
      this.isTarget = isTarget;
      this.style.fill = 0xffffff;
    }

    if (this.parent) {
      this.index = this.parent.children.length;
      this.parent.addChild(this);
      this.position.y = this.parent.height - this.height * this.index;
      this.position.x = this.parent.width / 2 - this.width / 2;
    }
  }

  addTargetStyles() {
    if (this.isTarget) {
      this.style = new PIXI.TextStyle({
        // fontFamily: "Arcade",
        fontSize: 25,
        fill: 0xffffff,
        dropShadow: true,
        dropShadowDistance: 1,
        dropShadowColor: 0x000,
      });
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
    if (this.index > -1) {
      gsap.to(this, {
        y: this.parent.height - this.height * this.index,
        duration: 1,
      });
    }
  }
  animateToNewPosition() {
    const startY = this.parent.height - this.height * this.prevIndex;
    const endY = this.parent.height - this.height * this.index;
    if (this.prevIndex > this.index) {
      // console.log(startY, endY, Math.floor(endY - startY) / 2, this.text);
      gsap.to(this, {
        x: 0,
        y:
          this.parent.height -
          this.height * this.index -
          Math.floor(endY - startY) / 2,
        duration: 0.4,
      });
      gsap.to(this, {
        x: this.parent.width / 2 - this.width / 2,
        y: this.parent.height - this.height * this.index,
        delay: 0.4,
        duration: 0.4,
      });
    } else {
      gsap.to(this, {
        x: this.parent.width - this.width,
        y:
          this.parent.height -
          this.height * this.index -
          Math.floor(endY - startY) / 2,
        duration: 0.4,
      });
      gsap.to(this, {
        x: this.parent.width / 2 - this.width / 2,
        y: this.parent.height - this.height * this.index,
        delay: 0.4,
        duration: 0.4,
      });
    }
  }

  removeWord() {
    //TODO: ANIMATE THINGS OFF THE SCREEN, REINDEX THE CHILDREN, ANIMATE NEW POSITIONS, REMOVE THINGS OFF SCREEN
    // gsap.to(this, { x: -100, duration: 4 });
    // this.parent.removeChild(this);
  }

  updateWord(word) {
    this.text = word;
  }
}
