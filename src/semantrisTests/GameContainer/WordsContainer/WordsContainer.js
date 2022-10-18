import * as PIXI from "pixi.js";
import * as randomWords from "random-words";
import { Word } from "./Words";

//ANIMATION PLUGINS
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
gsap.registerPlugin(PixiPlugin);
//CREATE A NEW INSTANCE OF A PIXI CONTAINER USED TO STORE LIST OF WORDS
export class WordsContainer extends PIXI.Container {
  constructor(parent) {
    super();
    this.parent = parent;
    this.target = null;
    this.isLoaded = false;

    const bg = new PIXI.Sprite(PIXI.Texture.WHITE);
    bg.tint = 0x00ff;
    bg.alpha = 0;
    bg.width = this.parent.width;
    bg.height = this.parent.height - this.parent.children[1].height * 2;
    this.addChild(bg);

    this.position.y = -this.height;
    if (this.parent) {
      this.parent.addChild(this);
    }
    this.setupFirstChildren();
  }

  setupFirstChildren() {
    for (let i = 0; i < 9; i++) {
      new Word(randomWords(), this);
    }
    const target = new Word(randomWords(), this, true);
    this.target = target;
    this.isLoaded = true;
  }

  //COVERTS STRINGS TO WORD OBJECTS
  convertWords(array, isTarget) {
    console.log("Starting string to object conversion...");
    const returnArray = array.map((word) => new Word(word, null, isTarget));
    console.log("Completed conversion.");
    return returnArray;
  }

  checkTargetPosition(prevGuessObject) {
    if (this.target) {
      //CHECK TO SEE IF TARGET WAS REPOSITIONED TO BOTTOM FOUR
      if (this.target.index <= 3) {
        for (let i = 0; i < 4; i++) {
          //REMOVE THE BTTOM FOUR CHILDREN
          this.removeChild(this.children[0]);
        }
        this.target = null;
        //UPDATE THE REMAINING CHILDREN INDEXES
        this.children.forEach((word, i) => (word.index = i));
        prevGuessObject.parent.parent.updateMultiplier(true);
      } else {
        prevGuessObject.parent.parent.updateMultiplier(false);
      }
    }
  }

  fromOffScreen() {
    this.visible = true;
    gsap.to(this, {
      y: 0,
      duration: 1,
    });
  }
}
