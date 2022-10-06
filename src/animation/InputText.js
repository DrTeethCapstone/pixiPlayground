import * as PIXI from "pixi.js";
import { Word } from "./Words";
import * as tf from "@tensorflow/tfjs";
import * as use from "@tensorflow-models/universal-sentence-encoder";

export class InputText extends PIXI.Text {
  constructor(parent = null) {
    super("type here", {
      fontFamily: "Arial",
      fontSize: 24,
      fill: 0xff1010,
      align: "center",
    });

    this.enabled = false;
    this.testGuess = "";
    this.wordsContainer = parent;
    this.inputContainer = new PIXI.Container();
    this.model = null;

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
  updateInputText(e, me) {
    if (e.key === "Enter") {
      let words = this.wordsContainer.children.filter((word) => word.isWord);

      const tensorWords = words.map((word) => word.text);
      this.speakToTensor(this.testGuess, tensorWords);

      words = words.filter((word) => {
        // if (word.text === this.testGuess) {
        //   return false;
        // }
        // return true;
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
  async speakToTensor(target, words) {
    console.log(target, words);
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
  async setupModel() {
    this.model = await use.load(); //tensor
    console.log("model loaded");
  }
}

// for (let i = 0; i < words.length; i++) {
//   for (let j = i; j < words.length; j++) {
//     const wordI = tf.slice(embeddings, [i, 0], [1]);
//     const wordJ = tf.slice(embeddings, [j, 0], [1]);
//     const wordITranspose = false;
//     const wordJTranspose = true;

//     const score = tf
//       .matMul(wordI, wordJ, wordITranspose, wordJTranspose)
//       .dataSync();
//     console.log(`${words[i]} -- ${words[j]}`, score);
//     // console.log(`oidasnfoasnfsaodinfdso`, words);
//     // console.log(`ummmmm`, score);
//     return score;
//   }
// }

// console.log(target, words);
// const embeddings = await this.model.embed(words);
// const embeddings2 = await this.model.embed([target]);
// for (let i = 0; i < words.length; i++) {
//   const wordI = tf.slice(embeddings, [i, 0], [1]);
//   const wordJ = tf.slice(embeddings2, [i, 0], [1]);
//   const wordITranspose = false;
//   const wordJTranspose = true;
//   const score = tf
//     .matMul(wordI, wordJ, wordITranspose, wordJTranspose)
//     .dataSync();
//   console.log(`${words[i]} -- ${target}`, score);
// }
// console.log(`these are your words`, words);
