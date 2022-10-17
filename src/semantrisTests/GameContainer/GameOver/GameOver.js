import * as PIXI from 'pixi.js'
import { gsap} from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
gsap.registerPlugin(PixiPlugin);


export class GameOver extends PIXI.Text {
    constructor(word, parent = null){
        super(word,{
            fontFamily:'Press Start 2P',
            fontSize: 50,
            align: 'center',
            fill: 0x5dade2,
            
        })
    this.parent = parent
    this.anchor.set(.5)
    if(this.parent){
        this.index = this.parent.children.length
        this.parent.addChild(this)
        this.position.y = this.height*this.index 
    }
    }

    animateGameOn(){
        gsap.fromTo(this,{
            
            y:1200, 
            duration:5,
            ease:"elastic",
            
        },{
            y:-100,
            duration:5,
            ease:"elastic"
        })
        gsap.to(this.style,{
            fill:'purple',
            duration:5,
            fontSize:80
        })

    }
    animateOverOn(){
        gsap.fromTo(this,{
            y:-1200,
            duration:5,
            ease: "elastic",
        },{
            y:0,
            duration:5,
            ease:"elastic"
        })
        gsap.to(this.style,{
            fill: 'purple',
            duration: 5,
            fontSize:80
        })
    }
    animateGameOff(){
        gsap.to(this,{
          x:1000,
          y:1000,
          duration:2
        })}
    animateOverOff(){
        gsap.to(this,{
            x:-1000,
            y:-1000,
            duration:2
        })
    
    }
    animateScoreOn(){
        gsap.to(this,{
            y:-500,
            duration:2
        })
    }
    animateScoreOff(){
        gsap.to(this,{
            y:-150,
            duration:3,
            ease:'elastic'
        })
        gsap.to(this.style,{
            fontSize:80,
            duration:3,
            ease: 'elastic',
            fill:'white'
        })
    }
    animateMessage(){
        gsap.to(this,{
            y:0,
            duration: 3,
            ease: 'elastic'
        })
        gsap.fromTo(this.style,{
            fontSize: 40,
            duration:4,
            fill: "white",
            repeat: 1
        },{ 
            repeat: 100,
            duration: 1,
            fill: '#FBB03B'
        })
    }
    animateLeader(){
        gsap.fromTo(this,{
            x:-1000,
            y:150
        },{
            ease:'elastic',
            duration:3,
            x:300,
            y:150
        })
        gsap.to(this.style,{
            fontSize:25,
            fill:'#b967ff',
        })

    }
}