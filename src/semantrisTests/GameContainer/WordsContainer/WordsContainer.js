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
    this.wordsAsStrings = randomWords(100);
    this.wordsAsObjects = this.convertWords(this.wordsAsStrings, false);
    this.targetsAsStrings = randomWords(100);
    this.targetsAsObjects = this.convertWords(this.targetsAsStrings, true);
    this.tensorModel;

    if (this.parent) {
      this.parent.addChild(this);
      this.position.y =
        this.parent.children[0].height - this.parent.children[1].height;
    }
    this.prepare();
  }

  //PREPARE WORDS CONTAINER WITH CHIDLREN, TENSOR MODEL, AND START STARTER WORDS EMBEDDED
  async prepare() {
    await this.setupTensorModel();
    await this.prepareEmbeddings();
    this.setupFirstChildren();

    // console.log({
    //   words: this.wordsAsStrings,
    //   embeddings: this.wordEmbeddings,
    //   objects: this.wordsAsObjects,
    //   targets: this.targetsAsStrings,
    //   tarObjects: this.targetsAsObjects,
    // });
  }

  setupFirstChildren() {
    while (this.children.length < 9) {
      // console.log("shiftinggggg", this.wordsAsObjects);
      const word = this.wordsAsObjects.shift();
      // console.log(`shiftinggggg`, this.wordsAsObjects);
      console.log(word);

      this.addChild(word);
      word.updateParent();
      word.updatePosition();
    }
    console.log(this.wordEmbeddings.slice);

    const target = this.targetsAsObjects.shift();
    this.addChild(target);
    target.updateParent();
    target.updatePosition();
  }

  async setupTensorModel() {
    console.log(
      "Loading Tensor Model. Current Tensors: ",
      tf.memory().numTensors
    );
    this.tensorModel = await use.load();
    console.log("TF model loaded. Tensors at end: ", tf.memory().numTensors);
  }

  async prepareEmbeddings() {
    console.log("Starting Embeddings", new Date());
    this.wordEmbeddings = await this.tensorModel.embed(this.wordsAsStrings);
    console.log("Finished", new Date(), { embeddings: this.wordEmbeddings });
  }

  //COVERTS STRINGS TO WORD OBJECTS
  convertWords(array, isTarget) {
    console.log("Starting string to object conversion...");
    const returnArray = array.map((word) => new Word(word, null, isTarget));
    console.log("Completed conversion.");
    return returnArray;
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
        //UPDATE THE REMAINING CHILDREN INDEXES
        this.children.forEach((word, i) => (word.index = i));
        prevGuessObject.parent.parent.updateMultiplier(true);
      } else {
        prevGuessObject.parent.parent.updateMultiplier(false);
      }
    }
  }
}
