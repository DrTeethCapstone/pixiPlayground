import * as PIXI from "pixi.js";
import { Score } from "./Score";
import test from "../../img/something.webm";
// console.log(test);
//ANIMATION PLUGIN
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
gsap.registerPlugin(PixiPlugin);

export class ScoreContainer extends PIXI.Container {
  constructor(parent = null) {
    super();
    this.parent = parent;
    this.userScore = 0;

    const bg = new PIXI.Sprite(PIXI.Texture.WHITE);
    bg.alpha = 0;
    bg.width = (window.innerWidth * 50) / 100;
    bg.height = 250;
    bg.anchor.set(0.5, 1);
    this.addChild(bg);

    // const testing = new PIXI.Texture.from(test);
    // console.log(testing);
    // const sprite = new PIXI.Sprite(testing);
    // this.addChild(sprite);
    // const videoControler = sprite.texture.baseTexture.source;
    // videoControler.play;
    // console.log(testing);
    // this.timerContainer = new PIXI.Container();
    // const TCBackground = new PIXI.Sprite.from(img);
    // TCBackground.alpha = 0.3;
    // TCBackground.tint = 0xa30b0b;
    // TCBackground.scale.set(0.2);
    // TCBackground.width = bg.width;
    // TCBackground.height = bg.height * 0.25;
    // this.timerContainer.position.x = TCBackground.width / -2;
    // this.timerContainer.position.y = -this.height;
    // this.timerContainer.addChild(TCBackground);

    this.userScoreContainer = new PIXI.Container();
    const USCBackground = new PIXI.Sprite(PIXI.Texture.WHITE);
    USCBackground.alpha = 0;
    USCBackground.width = bg.width;
    USCBackground.height = bg.height * 0.75;
    this.userScoreContainer.position.x = USCBackground.width / -2;
    this.userScoreContainer.position.y = -USCBackground.height;
    this.userScoreContainer.addChild(USCBackground);

    this.score = new Score(this.userScoreContainer);
    this.userScoreContainer.addChild(this.score);

    // this.addChild(this.timerContainer);
    this.addChild(this.userScoreContainer);

    if (this.parent) {
      this.parent.addChild(this);
      this.position.x = 0;
      this.position.y = this.height * 0.9;
    }
  }
}
