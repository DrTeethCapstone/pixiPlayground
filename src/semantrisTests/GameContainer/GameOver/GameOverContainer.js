import * as PIXI from 'pixi.js'
import { GameOver } from './GameOver'
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
import img from './vaporbg.JPG'
import coin from './coin.png'

gsap.registerPlugin(PixiPlugin);

export class GameOverContainer extends PIXI.Container{
    constructor(parent){
        super()
        this.position.set(window.innerWidth/2, window.innerHeight / 2)
        this.parent = parent
        
        // Css style for icons
  const defaultIcon = "url('./coin.png'),auto";
      console.log(this.parent)

// Add custom cursor styles
  // this.parent.renderer.plugins.interaction.cursorStyles.default = defaultIcon;


        if (this.parent) {
          this.parent.stage.addChild(this);
          
        }
        const bg = new PIXI.Sprite.from(img)
        bg.anchor.set(0.5)
        const coinImg = new PIXI.Sprite.from(coin)
        this.addChild(bg)

        // this.on('mousemove', () => {
        //   console.log('hit')
        //   this.cursor = 'pointer'
        // })
    }
    setupFirstChildren(){
        const game = new GameOver('GAME', this)
       
        game.animateGameOn()
        const over = new GameOver('OVER', this)
        over.animateOverOn()
        const score = new GameOver('Score:1000',this)
        // score.animateScoreOn()
        setTimeout(()=>{
          game.animateGameOff()
          over.animateOverOff()
        },4000)
        setTimeout(()=>{
          score.animateScoreOff()
        },4500)
        setTimeout(()=>{
          const message = new GameOver('Insert Coin to Continue', this)
          message.position.x = 0
          message.position.y = -1000
          message.animateMessage()
        },5500)
    }
}
