import * as PIXI from "pixi.js";

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
    bg.width = (window.innerWidth * 50) / 100;
    bg.height = window.innerHeight;
    bg.anchor.set(0.5, 0);
    this.addChild(bg);

    this.inputContainer = new InputContainer(this);
    this.wordsContainer = new WordsContainer(this);
    this.wordsContainer.setupFirstChildren();
    this.wordsContainer.children.forEach((word) => word.updatePosition());
    this.scoreContainer = new ScoreContainer(this);

    if (this.stage) {
      this.stage.addChild(this);
    }
  }

  animateElementsIn() {
    this.wordsContainer.setupFirstChildren();
    this.inputContainer.fromOffScreen();
    this.wordsContainer.children.forEach((word) => word.updatePosition());
  }
}
