import * as PIXI from "pixi.js";
import { WordsContainer } from "./WordsContainer";
import { InputText } from "./InputText";
import { Timer } from "./Timer";

// [x] GAME OVER WHEN WORDS HIT TOP OF SCREEN
// [x] ADD SCORING SYSTEM
// [x] REMOVE WORDS
//[x] TIMER

// 60 base line
//sort list based on likiness

export class Sketch {
  //CREATE AND ADD A NEW INSTANCE OF THE CANVAS WITH STYLES
  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.app = new PIXI.Application({
      backgroundColor: 0x000000,
      resolution: window.devicePixelRatio || 1,
      resizeTo: window,
    });
    document.body.appendChild(this.app.view);

    //TIME STATE
    this.time = 0;
    const timer = new Timer(this.app.stage);

    //CREATE CONTAINER TO STORE WORDS AND ADD TO CANVAS
    this.wordsContainer = new WordsContainer();
    this.app.stage.addChild(this.wordsContainer);

    //WHEN CANVAS LOADS, SETUP TO INITAL WORDS FOR THE GAME AND RUN RENDER/GAMELOOP
    this.setupWordsContainer();
    this.render();
  }

  //CREATE USER INPUT FIELD AND ADD IT TO WORDS CONTAINER < CAN BE SEPARATED
  setupWordsContainer() {
    new InputText(this.wordsContainer, this.app.stage);
    this.wordsContainer.positionChildren();
  }

  //RUNS GAME LOOP AND TRIGGERS THINGS THAT SHOULD RENDER ON EACH FRAME
  render() {
    this.app.ticker.add((delta) => {
      this.time += 0.05;
      if (Math.floor(this.time) === 10) {
        this.wordsContainer.addWord();
        this.time = 0;
      }
      if (this.wordsContainer.positionChildren()) {
        console.log("gameover!!!");
        this.app.stop();
      }
    });
  }
}
