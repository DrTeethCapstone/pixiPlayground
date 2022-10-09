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

    this.interactive = true;
    this.model = null;
    this.parent = parent;
    this.userGuess = "";
    //ONLY ENABLED IF USER CLICKS ON FIELD
    this.enabled = false;

    /////////////////////////////////////////////////////
    this.stage = stage;
    this.currentSimilarityScores = [];

    //WHITE BACKGROUND FOR INPUT FIELD
    const bg = new PIXI.Sprite(PIXI.Texture.WHITE);
    bg.tint = 0xffffff;
    bg.anchor.set(0.5);
    bg.height = this.height + 10;
    bg.width = 300;

    this.inputContainer = new PIXI.Container();
    this.anchor.set(0.5);
    this.inputContainer.addChild(bg);
    this.inputContainer.addChild(this);

    if (parent) {
      parent.addChild(this.inputContainer);
    }

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

  //VALIDATION FOR INPUT WORD BEFORE SENDING WORD TO TENSOR
  validateWordInput(target, inputString) {
    return inputString === target;
  }

  //KEYBOARD
  updateInputText(e, me) {
    if (e.key === "Enter") {
      //ARRAY OF WORD OBJECTS
      let words = this.parent.parent.parent.children[2].children;
      //TARGET WORD OBJECT
      let [targetWord] = words.filter((word) => word.isTarget);

      //ARRAY OF WORDS -- IN STRINGS
      const tensorWords = words.map((word) => word.text);
      console.log({ words, targetWord, tensorWords });
      // console.log("what is target word", targetWord);
      // console.log(targetWord);
      this.results = this.validateWordInput(
        targetWord.text,
        this.userGuess.toLowerCase()
      );
      console.log(this.results);

      this.speakToTensor([this.userGuess], tensorWords, words);

      // words.forEach((word) => {
      //   if (word.text === this.userGuess) {
      //     console.log("match");
      //     this.parent.removeChild(word);
      //     this.score.updateScore(25);
      //     this.parent.addWord(true);
      //   } else {
      //   }
      // });

      this.userGuess = "";
      me.text = "";
    } else if (e.key === "Backspace") {
      this.userGuess = this.userGuess.slice(0, this.userGuess.length - 1);
      me.text = this.userGuess;
    } else {
      if (this.isLetter(e.key)) {
        this.userGuess += e.key.toLowerCase();
        me.text = this.userGuess;
      }
    }
  }
  //QUICK FUNCTION TO CHECK IF A KEY CODE IS A LETTER IN THE ALPHABET
  isLetter(char) {
    return char.length === 1 && char.match(/[a-z]/i);
  }

  //TODO: MAYBE STORE THIS SOMEWHERE BEFORE USING SPEAK TO TENSOR
  async createTensorWordList(words) {
    await this.model.embed(words);
    return tf.slice(embeddingsFromWords, [j, 0], [1]);
  }

  //USER INTERACTION WITH TENSOR
  async speakToTensor(target, words, wordObjects) {
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
        // console.log({ words, score: score[0], wordsJ: words[j] });
        this.currentSimilarityScores.push({ word: words[j], score: score[0] });
        wordObjects[j].similarityScore = score[0];
        // console.log({ words, wordObjects });
      }
    }
    this.assignSimilarityIndex(wordObjects);
  }

  assignSimilarityIndex(wordsObjectArray) {
    wordsObjectArray.sort((a, b) => {
      return b.similarityScore - a.similarityScore;
    });
    wordsObjectArray.forEach((word, i) => {
      word.index = i;

      //THIS WILL ANIMATE THE WORDS INTO THE NEW PLACE
      word.updatePosition();
    });
  }

  //PRETRAINED MODEL
  async setupModel() {
    this.model = await use.load();
    console.log("model loaded");
  }
}
