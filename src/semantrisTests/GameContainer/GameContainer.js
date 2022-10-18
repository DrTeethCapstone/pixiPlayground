import * as PIXI from "pixi.js";

//GAME ELEMENTS
import { InputContainer } from "./InputContainer/InputContainer";
import { WordsContainer } from "./WordsContainer/WordsContainer";
import { ScoreContainer } from "./ScoreContainer/ScoreContainer";

//ANIMATION PLUGINS
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
gsap.registerPlugin(PixiPlugin);

export class GameContainer extends PIXI.Container {
  constructor(parent) {
    super();
    this.stage = parent;

    const bg = new PIXI.Sprite(PIXI.Texture.WHITE);
    bg.tint = 0xc6e2ff;
    bg.alpha = 0;
    bg.width = (window.innerWidth * 50) / 100;
    bg.height = window.innerHeight;
    this.addChild(bg);

    if (this.stage) {
      this.stage.addChild(this);
      this.position.x = this.stage.width / 2;
    }
    this.inputContainer = new InputContainer(this);
    this.wordsContainer = new WordsContainer(this);

    this.ticker = PIXI.Ticker.shared;
    this.ticker.add(() => {
      // console.log("Loading Game Assets");
      if (this.children[1].isLoaded && this.children[2].isLoaded) {
        this.isLoaded = true;
        // console.log("Assets Loaded.");
      }
    });
  }
}
