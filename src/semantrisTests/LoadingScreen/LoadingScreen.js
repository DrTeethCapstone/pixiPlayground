import * as PIXI from "pixi.js";

import { GameMenu } from "../GameMenu";
import { GameContainer } from "../GameContainer/GameContainer";
import { setupTensorModel } from "../GameContainer/InputContainer/TF_Worker";

export class LoadingScreen extends PIXI.Container {
  constructor(parent = null) {
    super();
    this.parent = parent;

    const bgSprite = PIXI.Sprite.from(PIXI.Texture.WHITE);
    bgSprite.alpha = 0;
    bgSprite.height = window.innerHeight;
    bgSprite.width = window.innerWidth / 2;
    this.addChild(bgSprite);

    if (this.parent) {
      this.parent.addChild(this);
      this.position.x = this.parent.width / 2;
    }

    this.textObj = new PIXI.Text("Loading", {
      fill: 0xff00,
    });
    this.addChild(this.textObj);
    this.textObj.position.x = this.width / 2 - this.textObj.width / 2;
    this.textObj.position.y = this.height / 2 - this.textObj.height / 2;

    this.time = 0;

    this.ticker = PIXI.Ticker.shared;

    this.ticker.add(() => {
      this.time += 0.05;
      if (!this.gameContainer.isLoaded) {
        if (Math.floor(this.time) === 5) {
          this.updateText("Loading.");
        }
        if (Math.floor(this.time) === 10) {
          this.updateText("Loading..");
        }
        if (Math.floor(this.time) === 15) {
          this.updateText("Loading...");
          this.time = 0;
        }
      }

      if (this.gameContainer.isLoaded && this.parent) {
        this.ticker.stop();
        this.gameContainer.isLoaded = false;
        this.parent.removeChild(this);
        this.gameContainer.children[1].fromOffScreen();
        this.gameContainer.children[2].fromOffScreen();
        this.gameContainer.position.x = window.innerWidth / 4;
      }
    });

    this.loadAssets();
  }

  loadAssets() {
    this.gameContainer = new GameContainer();
    this.test = new GameMenu();
    this.parent.addChild(this.test);
    this.parent.addChild(this.gameContainer);
  }

  updateText(string) {
    this.textObj.text = string;
  }
}
