import * as PIXI from "pixi.js";
import { Word } from "./Words";

export class InputText extends PIXI.Text {
  constructor(word, parent = null) {
    super(word, {
      fontFamily: "Arial",
      fontSize: 24,
      fill: 0xff1010,
      align: "center",
    });

    this.enabled = false;
    this.testGuess = "";
    this.wordsContainer = parent;
    this.inputContainer = new PIXI.Container();

    const bg = new PIXI.Sprite(PIXI.Texture.WHITE);
    bg.tint = 0xffffff;
    bg.anchor.set(0.5);
    bg.height = this.height + 10;
    bg.width = 300;

    this.anchor.set(0.5);
    this.inputContainer.addChild(bg);
    this.inputContainer.addChild(this);

    this.inputContainer.position.y += this.inputContainer.height;
    this.interactive = true;

    if (parent) parent.addChild(this.inputContainer);
    this.on("pointerdown", (e) => {
      this.style.fill = 0x00ff00;
      this.setupKeyboardListener();
    });
  }
  setupKeyboardListener() {
    if (!this.enabled) {
      this.enabled = true;
      window.addEventListener("keydown", (e) => {
        this.updateInputText(e, this);
      });
    }
  }
  updateInputText(e, me) {
    if (e.key === "Enter") {
      let words = this.wordsContainer.children.filter((word) => word.isWord);
      words = words.filter((word) => {
        if (word.text === this.testGuess) {
          this.wordsContainer.removeChild(word);
          this.wordsContainer.positionChildren();
          return false;
        }
        return true;
      });
      this.testGuess = "";
      me.text = "";
    } else if (e.key === "Backspace") {
      this.testGuess = this.testGuess.slice(0, this.testGuess.length - 1);
      me.text = this.testGuess;
    } else {
      this.testGuess += e.key;
      me.text = this.testGuess;
    }
  }
}
