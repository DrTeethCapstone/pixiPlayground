import * as PIXI from "pixi.js";
import { GameContainer } from "./GameContainer";
import { InputContainer } from "./InputContainer";
import { WordsContainer } from "./WordsContainer";
import { InputText } from "./InputText";
import { Timer } from "./Timer";
import { Word } from "./Words";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
gsap.registerPlugin(PixiPlugin);
//GAME STORE AT APP LEVEL

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

    //TODO: ADD SCORE ACCESSIBILITY TO SKETCH LEVEL
    this.score = 0;

    //CREATE GAME CONTAINER AND STORE ALL GAME CONTAINERS/ELEMENTS INSIDE
    this.gameContainer = new GameContainer(this.app.stage);
    this.inputContainer = new InputContainer(this.gameContainer);
    this.wordsContainer = new WordsContainer(this.gameContainer);

    this.animateElementsIn();
    //TIME STATE
    // const timer = new Timer(this.app.stage);
    this.time = 0;

    this.render();
  }
  animateElementsIn() {
    this.inputContainer.fromOffScreen();
  }
  animateInWords() {
    // gsap.to(this.wordsContainer, {
    //   y: this.gameContainer.height - this.wordsContainer.height,
    //   duration: 1,
    // });
    // this.wordsContainer.setupFirstChildren();
  }

  //CREATE USER INPUT FIELD AND ADD IT TO WORDS CONTAINER < CAN BE SEPARATED
  setupWordsContainer() {
    new InputText(this.wordsContainer, this.app.stage);
  }

  //RUNS GAME LOOP AND TRIGGERS THINGS THAT SHOULD RENDER ON EACH FRAME
  render() {
    this.app.ticker.add((delta) => {
      this.time += 0.05;

      if (Math.floor(this.time) === 10) {
        this.wordsContainer.addWord();
        this.time = 0;
      }

      // if (this.wordsContainer.positionChildren()) {
      //   console.log("gameover!!!");
      //   console.log(this.wordsContainer);
      //   this.app.stop();
      // }
    });
  }
}
