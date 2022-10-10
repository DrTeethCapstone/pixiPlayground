import * as PIXI from "pixi.js";

import { InputContainer } from "./InputContainer/InputContainer";
import { WordsContainer } from "./WordsContainer/WordsContainer";

//ANIMATION PLUGINS
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
gsap.registerPlugin(PixiPlugin);

export class GameContainer extends PIXI.Container {
  constructor(parent) {
    super();
    this.stage = parent;
    // this.alpha = 0;

    //BACKGROUND PLACED IN CONTAINER FOR VISIBILITY AND SETS INITAL HEIGHT FOR CONTAINER
    const bg = new PIXI.Sprite(PIXI.Texture.WHITE);
    bg.tint = 0xc6e2ff;
    bg.width = (window.innerWidth * 50) / 100;
    bg.height = window.innerHeight;
    bg.anchor.set(0.5, 0);
    this.addChild(bg);

    this.inputContainer = new InputContainer(this);
    this.inputContainer.interaction.setupModel();
    this.wordsContainer = new WordsContainer(this);
    this.wordsContainer.setupFirstChildren();
    this.wordsContainer.children.forEach((word) => word.updatePosition());
    this.inputContainer.position.y = this.height - this.inputContainer.height;
    // this.inputContainer.input.setupModel();
    //GAME CONATINER ANCHOR POINT IS CENTER - TOP
    // this.visible = false;

    if (this.stage) {
      this.stage.addChild(this);
      // this.position.set(this.stage.width, 1);
    }
  }
  animateElementsIn() {
    this.wordsContainer.setupFirstChildren();
    this.inputContainer.fromOffScreen();
    this.wordsContainer.children.forEach((word) => word.updatePosition());
  }
}
