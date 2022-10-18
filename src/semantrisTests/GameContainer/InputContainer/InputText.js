import * as PIXI from "pixi.js";
import * as tf from "@tensorflow/tfjs";
import * as use from "@tensorflow-models/universal-sentence-encoder";

//CREATE A NEW INSTANCE OF A USER INPUT FIELD
export class InputText extends PIXI.Text {
  constructor(parent = null) {
    super("type here", {
      fontFamily: "Arial",
      fontSize: 24,
      fill: 0xff1010,
      align: "center",
      dropShadow: true,
      dropShadowAngle: 45,
      dropShadowDistance: 2,
    });

    this.parent = parent;
    this.userGuess = "";
    this.interactive = true;
    this.enabled = false;

    this.worker = new Worker(new URL("./TF_Worker.js", import.meta.url), {
      type: "module",
    });

    this.worker.addEventListener("message", async ({ data }) => {
      const { TFOutput } = data;
      console.log("worker returns this", TFOutput);
    });

    console.log(this.worker);

    if (parent) {
      const container = new PIXI.Container();
      const containerBG = new PIXI.Sprite(PIXI.Texture.WHITE);
      containerBG.width = this.parent.width;
      containerBG.height = this.parent.height / 2;
      container.position.y = -containerBG.height;
      container.position.x = -containerBG.width / 2;
      container.addChild(containerBG);
      this.parent.addChild(container);
      container.addChild(this);
      container.mask = containerBG;
      this.position.x = containerBG.width / 2;
      this.position.y = containerBG.height - this.height;
      this.anchor.set(0.5);
    }

    this.on("pointerdown", (e) => {
      if (!this.enable) {
        this.style.fill = 0x00ff00;
        this.setupKeyboardListener();
        PIXI.Ticker.shared.start();
      }
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

  //QUICK FUNCTION TO CHECK IF A KEY CODE IS A LETTER IN THE ALPHABET
  isLetter(char) {
    return char.length === 1 && char.match(/[a-z]/i);
  }

  //VALIDATION FOR INPUT WORD BEFORE SENDING WORD TO TENSOR
  validateWordInput({ targetString, inputString, target }) {
    if (!inputString.length) {
      return false;
    }
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
      let words = this.wordsContainer.children.slice(1);
      //TARGET WORD OBJECT
      let [targetWord] = words.filter((word) => word.isTarget);
      //ARRAY OF WORDS -- IN STRINGS
      const tensorWords = words.map((word) => word.text);
      const validation = {
        targetString: targetWord.text,
        inputString: this.userGuess.toLowerCase(),
        target: targetWord,
      };
      const prevWordObject = this.parent.parent.children[2].children[1];
      if (this.validateWordInput(validation)) {
        // this.speakToTensor(
        //   [this.userGuess],
        //   tensorWords,
        //   words,
        //   prevWordObject
        // );

        // console.log(words);
        this.worker.postMessage({
          userInput: this.userGuess,
          tensorWords,
        });

        // this.worker.postMessage({
        //   userInput: this.userGuess,
        //   tesnsor: tensorWords,
        //   words: words,
        //   object: prevWordObject,
        // });
      }
      prevWordObject.updateWord(this.userGuess);
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

  //USER INTERACTION WITH TENSOR
  async speakToTensor(target, words, wordObjects, guessObj) {
    // console.log("start", tf.memory().numTensors);
    // TO FIX MEMORY LEAKS, WE NEED TO MANUALLY DEFINE OUR SCOPE
    // USE TF.ENGINE FOR ASYNC FUNCTIONS, TF.TIDY FOR OTHERS
    tf.engine().startScope();
    //TODO: MAYBE TRY TO EMBED SOMEWHERE ELSE SOONER BEFORE TARGET IS AVAILABLE
    const embeddingsFromWords = await this.tensorModel.embed(words);
    const embeddingsFromTarget = await this.tensorModel.embed(target);
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
        wordObjects[j].similarityScore = score[0];
      }
    }
    this.assignSimilarityIndex(wordObjects);
    tf.engine().endScope();
    // console.log("end", tf.memory().numTensors);
  }

  //AFTER RUNNING TENSOR, UPDATE EACH WORD'S INDEX STATE
  assignSimilarityIndex(wordsObjectArray) {
    wordsObjectArray.sort((a, b) => {
      return b.similarityScore - a.similarityScore;
    });
    wordsObjectArray.forEach((word, i) => {
      word.prevIndex = word.index;
      word.index = i;
      word.animateToNewPosition();
    });
  }

  async setupModel() {
    this.tensorModel = await use.load();
    this.parent.parent.isLoaded = true;
    // console.log("Tensorflow model was loaded.");
  }
}

/*
  //USER INTERACTION WITH TENSOR
  async speakToTensor(target, wordObjects, guessObj) {
    console.log("start", tf.memory().numTensors);
    tf.engine().startScope();

    console.log("Start", new Date());
    const embeddingsFromTarget = await this.wordsContainer.tensorModel.embed(
      target
    );
    console.log("End", new Date());

    for (let i = 0; i < target.length; i++) {
      for (let j = i; j < this.wordsContainer.children.length; j++) {
        const wordI = tf.slice(embeddingsFromTarget, [i, 0], [1]);
        const wordJ = tf.slice(this.wordsContainer.wordEmbeddings, [j, 0], [1]);
        const wordITranspose = false;
        const wordJTranspose = true;

        const score = tf
          .matMul(wordI, wordJ, wordITranspose, wordJTranspose)
          .dataSync();
        // console.log(
        //   this.wordsContainer.children[j],
        //   `${this.wordsContainer.children[j].text} -- ${target}`,
        //   score
        // );
        //ADDING THE SIMILARITY SCORE TO EACH WORD OBJECT
        wordObjects[j].similarityScore = score[0];
      }
    }
    // console.log(wordObjects);
    this.assignSimilarityIndex(wordObjects, guessObj);
    tf.engine().endScope();
    console.log("end", tf.memory().numTensors);
  }

  //KEYBOARD
  updateInputText(e, me) {
    if (e.key === "Enter") {
      this.wordsContainer = this.parent.parent.parent.children[2];
      let words = this.wordsContainer.children;
      //TARGET WORD OBJECT
      let [targetWord] = words.filter((word) => word.isTarget);

      const validation = {
        targetString: targetWord.text,
        inputString: this.userGuess.toLowerCase(),
        target: targetWord,
      };
      const prevWordObject = this.parent.parent.children[2].children[1];

      if (this.validateWordInput(validation)) {
        this.speakToTensor([this.userGuess], words, prevWordObject);
      }

      prevWordObject.updateWord(this.userGuess);

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

 */
