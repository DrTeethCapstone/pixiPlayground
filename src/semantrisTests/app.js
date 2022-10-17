import * as PIXI from "pixi.js";
// import { GameContainer } from "./GameContainer/GameContainer";
// import { GameMenu } from "./GameMenu";
//ANIMATION PLUGINS
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
import {GameOverContainer} from "./GameContainer/GameOver/GameOverContainer"
gsap.registerPlugin(PixiPlugin);

export class Sketch {
  //CREATE AND ADD A NEW INSTANCE OF THE CANVAS WITH STYLES
  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.app = new PIXI.Application({
      backgroundAlpha: 0,
      resolution: window.devicePixelRatio || 1,
      resizeTo: window,
      backgroundColor: 0x000000,
    });

    document.body.appendChild(this.app.view);
    this.gameOverContainer = new GameOverContainer(this.app.stage)

    //CREATE GAME CONTAINER AND STORE ALL GAME CONTAINERS/ELEMENTS INSIDE
    // this.background = new GameMenu(this.app.stage);
    // this.gameContainer = new GameContainer(this.app.stage);
    // this.gameContainer.position.set(this.width / 2, 0);
    this.time = 0;
    this.gameOverContainer.position.set(this.width/2, this.height/2)
    this.gameOverContainer.setupFirstChildren(300)
    // const test = new GameMenu(this.app.stage);
    
    //THIS CURRENTLY INITIATES THE GAME LOOP
    this.render();
  }
  //RUNS GAME LOOP AND TRIGGERS THINGS THAT SHOULD RENDER ON EACH FRAME
  render() {
    this.app.ticker.add((delta) => {
      // const wordsContainer = this.gameContainer.children[3];
      // const wordsContainer = this.gameContainer.children[2];
      this.time += 0.05;
      if (Math.floor(this.time) === 10) {
        // wordsContainer.addWord(false);
        this.time = 0;
      }
      //   console.log("gameover!!!");
      //   this.app.stop();
    });
  }
}
