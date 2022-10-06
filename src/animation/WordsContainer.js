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
    children.forEach((word, i) => {
      word.position.y = -word.height * i;
    });
  }
}
