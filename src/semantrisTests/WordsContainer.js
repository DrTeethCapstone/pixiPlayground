import * as PIXI from "pixi.js";
import * as randomWords from "random-words";
import { Word } from "./Words";

//CREATE A NEW INSTANCE OF A PIXI CONTAINER USED TO STORE LIST OF WORDS
export class WordsContainer extends PIXI.Container {
  constructor(parent) {
    super();
    this.parent = parent;
    this.starterWords = randomWords(5);

    if (this.parent) {
      this.parent.addChild(this);
      this.position.y =
        this.parent.height - this.parent.children[1].height - 10;
    }
    this.setupFirstChildren();
  }

  //METHOD TO ADD A NEW RANDOM WORD TO THE LIST
  addWord(target) {
    if (target) {
      const newTarget = new Word(randomWords(), this, true);
      newTarget.updatePosition();
    } else {
      const word = new Word(randomWords(), this);
      word.updatePosition();
    }
    // target
    //   ? new Word(randomWords(), this, true)
    //   : new Word(randomWords(), this);
  }

  //TAKE THE ARRAY OF RANDOM WORDS AND CREATE NEW WORD OBJECTS
  setupFirstChildren() {
    this.starterWords.forEach((word, i) => {
      if (i === 4) {
        const target = new Word(word, this, true);
        target.updatePosition();
        target.isTarget = true;
      } else {
        const newWord = new Word(word, this);
        newWord.updatePosition();
      }
    });
  }

  //FUNCTION TO REPOSITION CHILDREN IN THEIR CORRECT POSITION
  //RETURNS TRUE OR FALSE IF A WORD IS TOUCHING THE TOP
  // positionChildren() {
  //   const children = this.children.filter((word) => word.isWord);
  //   for (let i = 0; i < children.length; i++) {
  //     const word = children[i];
  //     word.position.y = -word.height * i;
  //     if (word.getGlobalPosition().y < 0) {
  //       return true;
  //     }
  //   }
  // }
}
