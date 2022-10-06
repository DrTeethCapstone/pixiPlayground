import * as PIXI from "pixi.js";
import { WordsContainer } from "./WordsContainer";
import { Word } from "./Words";
import { InputText } from "./InputText";

export class Sketch {
  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.app = new PIXI.Application({
      backgroundColor: 0x000000,
      resolution: window.devicePixelRatio || 1,
      resizeTo: window,
    });

    this.time = 0;

    document.body.appendChild(this.app.view);
    this.wordsContainer = new WordsContainer();
    this.setupWordsContainer();
    this.app.stage.addChild(this.wordsContainer);
    this.app.stage.on("pointerdown", (e) => console.log("omg"));
    this.render();
  }

  setupWordsContainer() {
    new InputText("type here", this.wordsContainer);
    this.wordsContainer.positionChildren();
  }
  render() {
    this.app.ticker.add((delta) => {
      this.time += 0.1;
      if (Math.floor(this.time) === 10) {
        // this.wordsContainer.addWord();
        this.time = 0;
      }
      this.wordsContainer.positionChildren();
    });
  }
}
