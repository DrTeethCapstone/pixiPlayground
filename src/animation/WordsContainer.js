import * as PIXI from "pixi.js";
import * as randomWords from "random-words";
import { Word } from "./Words";

export class WordsContainer extends PIXI.Container {
  constructor() {
    super();
    this.position.set(window.innerWidth / 2, window.innerHeight / 2);
    this.starterWords = randomWords(5);
    this.setupFirstChildren();
  }

  checkWordsContainer() {}

  addWord() {
    const newWord = new Word(randomWords());
    this.addChild(newWord);
  }
  setupFirstChildren() {
    this.starterWords.forEach((word) => {
      new Word(word, this);
    });
  }
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
}
