import * as PIXI from "pixi.js";

//TENSOR IMPORTS
import * as tf from "@tensorflow/tfjs";
import * as use from "@tensorflow-models/universal-sentence-encoder";
import * as randomWords from "random-words";
import { Word } from "./WordsContainer/Words";

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
    this.tensorModel;

    // this.wordsInStringArray = randomWords(500);
    // this.wordsInObjectArray = this.convertWords(this.wordsInStringArray);

    const bg = new PIXI.Sprite(PIXI.Texture.WHITE);
    bg.tint = 0xc6e2ff;
    bg.width = (window.innerWidth * 50) / 100;
    bg.height = window.innerHeight;
    bg.anchor.set(0.5, 0);
    this.addChild(bg);

    this.inputContainer = new InputContainer(this);
    this.scoreContainer = new ScoreContainer(this);
    this.wordsContainer = new WordsContainer(this);
    this.wordsContainer.setupFirstChildren();
    this.wordsContainer.children.forEach((word) => word.updatePosition());

    if (this.stage) {
      this.stage.addChild(this);
    }
  }

  animateElementsIn() {
    this.wordsContainer.setupFirstChildren();
    this.inputContainer.fromOffScreen();
    this.wordsContainer.children.forEach((word) => word.updatePosition());
  }

  async setupModel() {
    console.log("Tensors at start: ", tf.memory().numTensors);
    console.log("Loading TF model..");
    this.tensorModel = await use.load();
    console.log("TF model loaded.");
    console.log("Tensors at end: ", tf.memory().numTensors);
  }

  async sortScoredWords() {
    console.log("Sorting started...");
    this.prescoredWords.sort((a, b) => {
      return b.similarityScore.score - a.similarityScore.score;
    });
    console.log("Sorting completed.", { array: this.prescoredWords });
  }
}

/*
    // this.prepare();

    // this.interactive = true;
    // this.on("pointerdown", async (e) => {
    //   console.log("Start of user interaction.");
    //   await this.prepareTensorEmbeddings(
    //     ["baby"],
    //     [randomWords()],
    //     this.wordsInObjectArray
    //   );
    //   // await this.sortScoredWords();
    //   console.log("End of user interaction.");
    // });
    // this.setupModel();
    // this.prepareTensorEmbeddings(["container"], testWords);
======================
  // convertWords(array) {
  //   console.log("String string to object conversion...");
  //   const returnArray = array.map((word) => new Word(word));
  //   console.log("Completed conversion.");
  //   return returnArray;
  // }

  // async prepare() {
  //   console.log("Prepartions started");
  //   await this.setupModel();

  //   await this.prepareTensorEmbeddings(
  //     ["container"],
  //     this.wordsInStringArray,
  //     this.wordsInObjectArray
  //   );

  //   await this.prepareTensorEmbeddings(
  //     ["student"],
  //     this.wordsInStringArray,
  //     this.wordsInObjectArray
  //   );

  //   await this.prepareTensorEmbeddings(
  //     ["baby"],
  //     this.wordsInStringArray,
  //     this.wordsInObjectArray
  //   );

  //   await this.prepareTensorEmbeddings(
  //     ["sushi"],
  //     this.wordsInStringArray,
  //     this.wordsInObjectArray
  //   );

  //   await this.prepareTensorEmbeddings(
  //     ["pilot"],
  //     this.wordsInStringArray,
  //     this.wordsInObjectArray
  //   );

  //   await this.prepareTensorEmbeddings(
  //     ["earthquake"],
  //     this.wordsInStringArray,
  //     this.wordsInObjectArray
  //   );

  //   console.log("Prepartions Completed");
  // }

  // async prepareTensorEmbeddings(target, words, wordObjArr) {
  //   try {
  //     console.log("Tensors at start: ", tf.memory().numTensors);
  //     console.log("Preparing Embeddings...");
  //     tf.engine().startScope();

  //     //TODO: MAYBE TRY TO EMBED SOMEWHERE ELSE SOONER BEFORE TARGET IS AVAILABLE
  //     const embeddingsFromWords = await this.tensorModel.embed(words);
  //     console.log("Loaded Embeddings from words array.");
  //     const embeddingsFromTarget = await this.tensorModel.embed(target);
  //     console.log("Loaded Embeddings from target.");

  //     //TODO: THIS DOESN'T RETURN THE SAME INFORMATION THAT ON GOOGLE'S REF
  //     for (let i = 0; i < target.length; i++) {
  //       for (let j = i; j < words.length; j++) {
  //         const wordI = tf.slice(embeddingsFromTarget, [i, 0], [1]);
  //         const wordJ = tf.slice(embeddingsFromWords, [j, 0], [1]);
  //         const wordITranspose = false;
  //         const wordJTranspose = true;

  //         const score = tf
  //           .matMul(wordI, wordJ, wordITranspose, wordJTranspose)
  //           .dataSync();

  //         const [targetWord] = target;
  //         wordObjArr[j].similarityScores.push({ targetWord, score: score[0] });
  //       }
  //     }

  //     tf.engine().endScope();
  //     console.log("Embeddings loaded.");
  //     console.log("Prescored words: ", { words: this.wordsInObjectArray });
  //     console.log("Tensors at end: ", tf.memory().numTensors);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

*/
