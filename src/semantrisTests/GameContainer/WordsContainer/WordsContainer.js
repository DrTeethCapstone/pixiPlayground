import * as PIXI from "pixi.js";
import * as randomWords from "random-words";
import { Word } from "./Words";

//CREATE A NEW INSTANCE OF A PIXI CONTAINER USED TO STORE LIST OF WORDS
export class WordsContainer extends PIXI.Container {
  constructor(parent) {
    super();
    this.parent = parent;
    this.starterWords = randomWords(9);
    this.target = null;

    if (this.parent) {
      this.parent.addChild(this);
      this.position.y =
        this.parent.children[0].height - this.parent.children[1].height;
    }
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
  }

  //TAKE THE ARRAY OF RANDOM WORDS AND CREATE NEW WORD OBJECTS AND UPDATE THEIR POSIITON
  setupFirstChildren() {
    this.starterWords.forEach((word) => {
      new Word(word, this);
    });
    const target = new Word(randomWords(), this, true);
    this.target = target;
  }

  dropChildrenPosition() {
    this.children.forEach((word) => word.updatePosition());
    while (this.children.length < 9) {
      const newWord = new Word(randomWords(), this);
      newWord.updatePosition();
    }
    if (this.children.length === 9) {
      const target = new Word(randomWords(), this, true);
      target.updatePosition();
      this.target = target;
    }
  }

  checkTargetPosition(prevGuessObject) {
    if (this.target) {
      if (this.target.index <= 3) {
        for (let i = 0; i < 4; i++) {
          this.removeChild(this.children[0]);
        }
        this.children.forEach((word, i) => (word.index = i));
        prevGuessObject.parent.parent.updateMultiplier(true);
      } else {
        prevGuessObject.parent.parent.updateMultiplier(false);
      }
    }
    this.dropChildrenPosition();
  }
}
