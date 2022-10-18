import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';
import { TipHighlight } from './TipHighlight';
import { TipText } from './TipText';

gsap.registerPlugin(PixiPlugin);

export class TutorialContainer extends PIXI.Container {
  constructor(parent) {
    super();
    this.parent = parent;
    if (this.parent) {
      this.parent.addChild(this);
    }
    const overlay = new PIXI.Sprite(PIXI.Texture.WHITE);
    overlay.tint = 0x000000;
    // overlay.scale.set(0.2);
    overlay.alpha = 0.8;
    overlay.parent = parent;
    overlay.height = window.innerHeight;
    overlay.width = window.innerWidth;

    this.tipHighlightWords = new TipHighlight(
      320, //TODO: Calculate dimensions?
      150,
      window.innerWidth / 2,
      window.innerHeight - 100,
      this
    );
    this.tipHighlightWords.anchor.set(0.5, 1)
    this.tipTextWords = new TipText(this);
    this.tipTextWords.text =
      'Your objective is to think of the word most closely related to the highlighted word.\nThe closer you are, the more your score!';
    this.tipTextWords.anchor.set(0.5);
    this.tipTextWords.position.x = window.innerWidth / 2;
    this.tipTextWords.position.y = window.innerHeight / 2;

    this.tipHighlightTypeHere = new TipHighlight(
      100, //TODO: Calculate dimensions?
      300,
      window.innerWidth / 2,
      window.innerHeight - this.height,
      this
    );
    this.tipTextTypeHere = new TipText(this);
    this.tipTextTypeHere.text =
      "Type here to get started and press enter when happy to confirm your word.\nYou'll see the list sort the closest matches to the bottom.";

      this.tipTextTypeHere.anchor.set(0.5);
      this.tipTextTypeHere.position.x = window.innerWidth / 2;
      this.tipTextTypeHere.position.y = window.innerHeight / 2;

      this.addChild(overlay);

      this.addChild(this.tipHighlightWords);
      this.addChild(this.tipHighlightTypeHere);
    
      this.playTutorial(this.tipHighlightWords, this.tipTextWords, 3)
      this.playTutorial(this.tipHighlightTypeHere, this.tipTextTypeHere, 20)
  }
  removeAllChildren() {
    while (this.children[0]) {
      this.removeChild(this.children[0]);
    }
  }
  playTutorial(tipHighlight, tipText, time, end=false) {
    setTimeout(() => {
      this.addChild(tipText)
      gsap.to(tipHighlight,
        { alpha: 0.2, duration: 3 },
        );
     }, time * 400);
    
      setTimeout(() => {
        tipText.text = ""
        this.removeChild(tipHighlight)
      }, time * 1000);
  }
}
