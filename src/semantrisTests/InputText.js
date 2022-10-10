import * as PIXI from "pixi.js";
import * as tf from "@tensorflow/tfjs";
import * as use from "@tensorflow-models/universal-sentence-encoder";
import { Score } from "./Score";
import { PreviousWord } from "./PreviousWord";

//CREATE A NEW INSTANCE OF A USER INPUT FIELD
export class InputText extends PIXI.Text {
  constructor(parent = null) {
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
    this.wordsContainer = null;
    //ONLY ENABLED IF USER CLICKS ON FIELD
    this.enabled = false;

    //WHITE BACKGROUND FOR INPUT FIELD
    const bg = new PIXI.Sprite(PIXI.Texture.WHITE);
    bg.tint = 0xffffff;
    bg.anchor.set(0.5);
    bg.height = 50;
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
  validateWordInput({ targetString, inputString, target }) {
    if (targetString.length <= 3 && inputString.length >= 3) {
      if (targetString.slice(0, 3) === inputString.slice(0, 3)) {
        target.invalidGuess(3);
        return false;
      }
    } else if (targetString.length > 3 && inputString.length > 3) {
      if (targetString.slice(0, 4) === inputString.slice(0, 4)) {
        target.invalidGuess(4);
        return false;
      }
    }
    return true;
  }

  //KEYBOARD
  updateInputText(e, me) {
    if (e.key === "Enter") {
      //ARRAY OF WORD OBJECTS
      this.wordsContainer = this.parent.parent.parent.children[2];
      let words = this.wordsContainer.children;
      //TARGET WORD OBJECT
      let [targetWord] = words.filter((word) => word.isTarget);
      //ARRAY OF WORDS -- IN STRINGS
      const tensorWords = words.map((word) => word.text);

      const validation = {
        targetString: targetWord.text,
        inputString: this.userGuess.toLowerCase(),
        target: targetWord,
      };

      if (this.validateWordInput(validation)) {
        this.speakToTensor([this.userGuess], tensorWords, words);
      }

      this.userGuess = "";
      me.text = "";
    } else if (e.key === "Backspace") {
      this.userGuess = this.userGuess.slice(0, this.userGuess.length - 1);
      me.text = this.userGuess;
    } else {
      //ONLY ALPHABET CHARACTERS AND SPACES ARE ACCEPTED
      if (this.isLetter(e.key) || e.key === " ") {
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

        //ADDING=THE SIMILARITY SCORE TO EACH WORD OBJECT
        wordObjects[j].similarityScore = score[0];

        // embeddingsFromTarget.dispose();
        // LOOKING INTO MEMORY MANAGEMENT, CURRENTLY CREATING TENSORS STORING INFINITY
        wordI.dispose();
        wordJ.dispose();
        console.log(tf.memory().numTensors);
      }
    }
    this.assignSimilarityIndex(wordObjects);
  }

  //AFTER RUNNING TENSOR, UPDATE EACH WORD'S INDEX STATE
  assignSimilarityIndex(wordsObjectArray) {
    wordsObjectArray.sort((a, b) => {
      return b.similarityScore - a.similarityScore;
    });
    wordsObjectArray.forEach((word, i) => {
      word.index = i;
      //THIS WILL ANIMATE THE WORDS INTO THE NEW PLACE
      word.updatePosition();
    });
    //REMOVE TOP 4 WORDS IF TARGET HAS AN INDEX OF 3 OR LESS
    this.wordsContainer.checkTargetPosition();
  }

  //PRETRAINED MODEL
  async setupModel() {
    this.model = await use.load();
    console.log("model loaded");
  }
}
