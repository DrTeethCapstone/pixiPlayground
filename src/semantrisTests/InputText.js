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
    // console.log(new PreviousWord());

    //ONLY ENABLED IF USER CLICKS ON FIELD
    this.enabled = false;
    this.testGuess = "";
    this.wordsContainer = parent;
    this.inputContainer = new PIXI.Container();
    this.model = null;
    this.stage = stage;
    this.score = new Score(this.stage);
    this.currentSimilarityScores = [];

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

    if (parent) {
      parent.addChild(this.inputContainer);
    }
    this.on("pointerdown", (e) => {
      // gsap.to(this, { rotation: 6.28, duration: 1 });
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

  // loadAssets() {
  //   const loader = PIXI.Loader;
  //   loader.load("img/");
  // }

  //VALIDATION FOR INPUT WORD BEFORE SENDING WORD TO TENSOR
  validateWordInput(target, inputString) {
    return inputString === target;
  }

  //KEYBOARD
  updateInputText(e, me) {
    if (e.key === "Enter") {
      //ARRAY OF WORD OBJECTS
      let words = this.wordsContainer.children.filter((word) => word.isWord);
      console.log(words);
      //TARGET WORD OBJECT
      let [targetWord] = words.filter((word) => word.isTarget);
      //ARRAY OF WORDS - JUST THE STRINGS
      const tensorWords = words.map((word) => word.text);

      // console.log("what is target word", targetWord);
      // console.log(targetWord);
      this.results = this.validateWordInput(targetWord.text, this.testGuess);
      console.log(this.results);

      this.speakToTensor([this.testGuess], tensorWords);

      words.forEach((word) => {
        if (word.text === this.testGuess) {
          console.log("match");
          this.wordsContainer.removeChild(word);
          this.score.updateScore(25);
          this.wordsContainer.addWord(true);
        } else {
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
    await this.model.embed(words);
    return tf.slice(embeddingsFromWords, [j, 0], [1]);
  }

  //USER INTERACTION WITH TENSOR
  async speakToTensor(target, words) {
    //TODO: MAYBE TRY TO EMBED SOMEWHERE ELSE SOONER BEFORE TARGET IS AVAILABLE
    const embeddingsFromWords = await this.model.embed(words);
    const embeddingsFromTarget = await this.model.embed(target);
    //TODO: THIS DOESN'T RETURN THE SAME INFORMATION THAT ON GOOGLE'S REF
    for (let i = 0; i < target.length; i++) {
      for (let j = i; j < words.length; j++) {
        const wordI = tf.slice(embeddingsFromTarget, [i, 0], [1]);
        const wordJ = tf.slice(embeddingsFromWords, [j, 0], [1]);
        const wordITranspose = false;
        const wordJTranspose = true;
        const score = tf
          .matMul(wordI, wordJ, wordITranspose, wordJTranspose)
          .dataSync();
        // console.log(`${words[j]} -- ${target}`, score);
        this.currentSimilarityScores.push({ word: words[j], score: score[0] });
      }
    }
  }

  //PRETRAINED MODEL
  async setupModel() {
    this.model = await use.load();
    console.log("model loaded");
  }
}
