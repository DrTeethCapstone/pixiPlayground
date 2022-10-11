import * as PIXI from "pixi.js";
import { GameContainer } from "./GameContainer/GameContainer";
import { ScoreContainer } from "./GameContainer/ScoreContainer/ScoreContainer";

//ANIMATION PLUGINS
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
gsap.registerPlugin(PixiPlugin);

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

    // this.scoreContainer = new ScoreContainer(this.app.stage);
    // this.scoreContainer.position.set(this.width / 2, this.height / 2);

    //TESTING GAME MENU
    // this.menu = new GameMenu(this.app.stage);

    //CREATE GAME CONTAINER AND STORE ALL GAME CONTAINERS/ELEMENTS INSIDE
    this.gameContainer = new GameContainer(this.app.stage);
    this.gameContainer.position.set(this.width / 2, 0);

    //TIME STATE
    // const timer = new Timer(this.app.stage);
    this.time = 0;

    //THIS CURRENTLY INITIATES THE GAME LOOP
    this.render();
  }

  //CREATE USER INPUT FIELD AND ADD IT TO WORDS CONTAINER < CAN BE SEPARATED
  setupWordsContainer() {
    new InputText(this.inputContainer, this.app.stage);
  }

  //RUNS GAME LOOP AND TRIGGERS THINGS THAT SHOULD RENDER ON EACH FRAME
  render() {
    this.app.ticker.add((delta) => {
      this.time += 0.05;

      if (Math.floor(this.time) === 10) {
        // this.wordsContainer.addWord();
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
