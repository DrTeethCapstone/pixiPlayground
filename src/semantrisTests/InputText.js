import * as PIXI from "pixi.js";
import * as tf from "@tensorflow/tfjs";
import * as use from "@tensorflow-models/universal-sentence-encoder";
import { Score } from "./Score";
import { PreviousWord } from "./PreviousWord";

//CREATE A NEW INSTANCE OF A USER INPUT FIELD
export class InputText extends PIXI.Text {
  constructor(parent = null, stage) {
    super("type here", {
      fontFamily: "Arial",
      fontSize: 24,
      fill: 0xff1010,
      align: "center",
    });
    console.log(new PreviousWord());

    //ONLY ENABLED IF USER CLICKS ON FIELD
    this.enabled = false;
    this.testGuess = "";
    this.wordsContainer = parent;
    this.inputContainer = new PIXI.Container();
    this.model = null;
    this.stage = stage;
    this.score = new Score(this.stage);

    //WHITE BACKGROUND FOR INPUT FIELD
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

    //lOADS THE MODEL WHEN THEN USER INPUT IS LOADED
    this.setupModel();
  }

  setupKeyboardListener() {
    if (!this.enabled) {
      this.enabled = true;
      window.addEventListener("keydown", (e) => {
        this.updateInputText(e, this);
      });
    }
  }

  //KEYBOARD
  updateInputText(e, me) {
    if (e.key === "Enter") {
      let words = this.wordsContainer.children.filter((word) => word.isWord);
      const tensorWords = words.map((word) => word.text);
      this.speakToTensor(this.testGuess, tensorWords);

      words.forEach((word) => {
        if (word.text === this.testGuess) {
          console.log("match");
          this.wordsContainer.removeChild(word);
          this.score.updateScore(25);
        }
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

  //TODO: MAYBE STORE THIS SOMEWHERE BEFORE USING SPEAK TO TENSOR
  async createTensorWordList(words) {
    return await this.model.embed(words);
  }

  //USER INTERACTION WITH TENSOR
  async speakToTensor(target, words) {
    //TODO: MAYBE TRY TO EMBED SOMEWHERE ELSE SOONER BEFORE TARGET IS AVAILABLE
    const embeddings = await this.model.embed(words);
    const embeddings2 = await this.model.embed([target]);
    //TODO: THIS DOESN'T RETURN THE SAME INFORMATION THAT ON GOOGLE'S REF
    for (let i = 0; i < words.length; i++) {
      for (let j = i; j < target.length; j++) {
        const wordI = tf.slice(embeddings, [i, 0], [1]);
        const wordJ = tf.slice(embeddings2, [0, 0], [1]);
        const wordITranspose = false;
        const wordJTranspose = true;
        const score = tf
          .matMul(wordI, wordJ, wordITranspose, wordJTranspose)
          .dataSync();
        console.log(`${words[i]} -- ${target}`, score);
      }
    }
    console.log(`these are your words`, words);
  }

  //PRETRAINED MODEL
  async setupModel() {
    this.model = await use.load();
    console.log("model loaded");
  }
}
