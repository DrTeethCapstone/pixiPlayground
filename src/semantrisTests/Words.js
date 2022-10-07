import * as PIXI from "pixi.js";

//CREATE A NEW INSTANCE OF A WORD OBJECT
export class Word extends PIXI.Text {
  //REQUIRES A STRING TO BE CREATED, PARENT CONTAINER OPTIONAL
  constructor(word, parent = null, isTarget) {
    super(word, {
      fontFamily: "Arial",
      fontSize: 24,
      fill: 0x5dade2,
      align: "center",
    });

    if (isTarget) {
      this.style.fill = 0xffffff;
    }

    this.parent = parent;
    this.isWord = true;
    this.anchor.set(0.5);

    if (this.parent) {
      this.parent.addChild(this);
    }
  }

  //METHOD TO UPDATE WORDS
  updateWord(word) {
    this.text = word;
  }
}
