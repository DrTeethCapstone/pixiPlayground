import * as PIXI from "pixi.js";
import * as randomWords from "random-words";
import { Word } from "./Words";

//TENSOR IMPORTS
import * as tf from "@tensorflow/tfjs";
import * as use from "@tensorflow-models/universal-sentence-encoder";

//CREATE A NEW INSTANCE OF A PIXI CONTAINER USED TO STORE LIST OF WORDS
export class WordsContainer extends PIXI.Container {
  constructor(parent) {
    super();
    this.parent = parent;
    this.starterWords = randomWords(9);
    this.target = null;

    // this.tensorModel;
    // this.wordsAsStringsArray = randomWords(500);
    // this.wordsAsObjectsArray = this.convertWords(this.wordsAsStringsArray);
    // this.targetsAsStringsArray = randomWords(50);
    // this.targetsAsObjectsArray = this.convertWords(this.targetsAsStringsArray);
    // this.prepareSimilarities();

    if (this.parent) {
      this.parent.addChild(this);
      this.position.y =
        this.parent.children[0].height - this.parent.children[1].height;
    }
  }

  async setupTensorModel() {
    console.log("Tensors at start: ", tf.memory().numTensors);
    console.log("Loading TF model..");
    this.tensorModel = await use.load();
    console.log("TF model loaded.");
    console.log("Tensors at end: ", tf.memory().numTensors);
  }

  //COVERTS STRINGS TO WORD OBJECTS
  convertWords(array) {
    console.log("Starting string to object conversion...");
    const returnArray = array.map((word) => new Word(word));
    console.log("Completed conversion.");
    return returnArray;
  }

  async prepareTensorEmbeddings(words, wordObjArr) {
    try {
      console.log("Tensors at start: ", tf.memory().numTensors);
      console.log("Preparing Embeddings...");

      tf.engine().startScope();
      const target = [randomWords()];
      const embeddingsFromWords = await this.tensorModel.embed(words);
      console.log("Loaded Embeddings from words array.");
      const embeddingsFromTarget = await this.tensorModel.embed(target);
      console.log("Loaded Embeddings from target.");

      for (let i = 0; i < target.length; i++) {
        for (let j = i; j < words.length; j++) {
          const wordI = tf.slice(embeddingsFromTarget, [i, 0], [1]);
          const wordJ = tf.slice(embeddingsFromWords, [j, 0], [1]);

          const wordITranspose = false;
          const wordJTranspose = true;

          const score = tf
            .matMul(wordI, wordJ, wordITranspose, wordJTranspose)
            .dataSync();

          const [targetWord] = target;
          wordObjArr[j].similarityScores.push({ targetWord, score: score[0] });
        }
      }
      tf.engine().endScope();
      console.log("Embeddings loaded.");
      console.log("Prescored words: ", { words: this.wordsAsObjectsArray });
      console.log("Tensors at end: ", tf.memory().numTensors);
    } catch (error) {
      console.error(error);
    }
  }

  async prepareSimilarities() {
    console.log("Prepartions started");
    await this.setupTensorModel();
    for (let i = 0; i < 50; i++) {
      await this.prepareTensorEmbeddings(
        this.wordsAsStringsArray,
        this.wordsAsObjectsArray
      );
    }
    console.log("Prepartions Completed");
  }

  addWord(target) {
    // console.log(this.target);
    if (target) {
      const newTarget = new Word(randomWords(), this, true);
      newTarget.updatePosition();
    } else {
      const word = new Word(randomWords(), this);
      word.updatePosition();
    }
  }
  //TAKE THE ARRAY OF RANDOM WORDS AND CREATE NEW WORD OBJECTS AND UPDATE THEIR POSIITON
  setupFirstChildren() {
    this.starterWords.forEach((word) => {
      new Word(word, this);
    });
    const target = new Word(randomWords(), this, true);
    this.target = target;
  }
  dropChildrenPosition() {
    this.children.forEach((word) => word.updatePosition());
    while (this.children.length < 9) {
      const newWord = new Word(randomWords(), this);
      newWord.updatePosition();
    }
    if (this.children.length === 9) {
      const target = new Word(randomWords(), this, true);
      target.updatePosition();
      this.target = target;
    }
  }
  checkTargetPosition(prevGuessObject) {
    if (this.target) {
      //CHECK TO SEE IF TARGET WAS REPOSITIONED TO TOP FOUR
      if (this.target.index <= 3) {
        for (let i = 0; i < 4; i++) {
          //REMOVE THE TOP FOUR CHILDREN
          this.removeChild(this.children[0]);
        }
        this.target = null;
        // this.addWord(true);
        //UPDATE THE REMAINING CHILDREN INDEXES
        this.children.forEach((word, i) => (word.index = i));
        prevGuessObject.parent.parent.updateMultiplier(true);
      } else {
        prevGuessObject.parent.parent.updateMultiplier(false);
      }
    }
    this.dropChildrenPosition();
  }
}

/*
  //METHOD TO ADD A NEW RANDOM WORD TO THE LIST
  addWord(target) {
    // console.log(this.target);
    if (target) {
      const newTarget = new Word(randomWords(), this, true);
      newTarget.updatePosition();
    } else {
      const word = new Word(randomWords(), this);
      word.updatePosition();
    }
  }
  //TAKE THE ARRAY OF RANDOM WORDS AND CREATE NEW WORD OBJECTS AND UPDATE THEIR POSIITON
  setupFirstChildren() {
    this.starterWords.forEach((word) => {
      new Word(word, this);
    });
    const target = new Word(randomWords(), this, true);
    this.target = target;
  }
  dropChildrenPosition() {
    this.children.forEach((word) => word.updatePosition());
    while (this.children.length < 9) {
      const newWord = new Word(randomWords(), this);
      newWord.updatePosition();
    }
    if (this.children.length === 9) {
      const target = new Word(randomWords(), this, true);
      target.updatePosition();
      this.target = target;
    }
  }
    checkTargetPosition(prevGuessObject) {
    if (this.target) {
      //CHECK TO SEE IF TARGET WAS REPOSITIONED TO TOP FOUR
      if (this.target.index <= 3) {
        for (let i = 0; i < 4; i++) {
          //REMOVE THE TOP FOUR CHILDREN
          this.removeChild(this.children[0]);
        }
        this.target = null;
        // this.addWord(true);
        //UPDATE THE REMAINING CHILDREN INDEXES
        this.children.forEach((word, i) => (word.index = i));
        prevGuessObject.parent.parent.updateMultiplier(true);
      } else {
        prevGuessObject.parent.parent.updateMultiplier(false);
      }
    }
    this.dropChildrenPosition();
  }
*/
