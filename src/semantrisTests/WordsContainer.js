import * as PIXI from "pixi.js";
import * as randomWords from "random-words";
import { Word } from "./Words";

//CREATE A NEW INSTANCE OF A PIXI CONTAINER USED TO STORE LIST OF WORDS
export class WordsContainer extends PIXI.Container {
  constructor() {
    super();
    this.starterWords = randomWords(5);
    this.setupFirstChildren();
    this.position.set(window.innerWidth / 2, window.innerHeight / 2);
  }

  //METHOD TO ADD A NEW RANDOM WORD TO THE LIST
  addWord() {
    const newWord = new Word(randomWords());
    this.addChild(newWord);
  }

  //INITAL SETUP OF CHILDREN
  setupFirstChildren() {
    this.starterWords.forEach((word, i) => {
      if (i === 4) {
        const newWord = new Word(word, this, true);
        newWord.isTarget = true;
      } else {
        new Word(word, this);
      }
    });
  }

  //FUNCTION TO REPOSITION CHILDREN IN THEIR CORRECT POSITION
  //RETURNS TRUE OR FALSE IF A WORD IS TOUCHING THE TOP
  positionChildren() {
    const children = this.children.filter((word) => word.isWord);
    for (let i = 0; i < children.length; i++) {
      const word = children[i];
      word.position.y = -word.height * i;
      if (word.getGlobalPosition().y < 0) {
        return true;
      }
    }
  }

  checkChildren() {
    console.log(this.children);
  }
}
