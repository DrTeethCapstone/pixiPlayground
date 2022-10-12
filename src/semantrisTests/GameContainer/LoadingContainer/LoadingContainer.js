// import '@pixi/gif';
import * as PIXI from "pixi.js";
import '@pixi/gif';
import img from "../../img/sunspritesheet.png";
import img1 from "../../img/sun_spritesheets/frame_00_delay-0.06s.gif"
import img2 from "../../img/sun_spritesheets/frame_01_delay-0.06s.gif"
import img3 from "../../img/sun_spritesheets/frame_02_delay-0.06s.gif"
import img4 from "../../img/sun_spritesheets/frame_03_delay-0.06s.gif"
import img5 from "../../img/sun_spritesheets/frame_04_delay-0.06s.gif"
import img6 from "../../img/sun_spritesheets/frame_05_delay-0.06s.gif"
import img7 from "../../img/sun_spritesheets/frame_06_delay-0.06s.gif"
import img8 from "../../img/sun_spritesheets/frame_07_delay-0.06s.gif"
import img9 from "../../img/sun_spritesheets/frame_08_delay-0.06s.gif"
import img10 from "../../img/sun_spritesheets/frame_09_delay-0.06s.gif"
import img11 from "../../img/sun_spritesheets/frame_10_delay-0.06s.gif"
import img12 from "../../img/sun_spritesheets/frame_11_delay-0.06s.gif"
import img13 from "../../img/sun_spritesheets/frame_12_delay-0.06s.gif"
import img14 from "../../img/sun_spritesheets/frame_13_delay-0.06s.gif"
import img15 from "../../img/sun_spritesheets/frame_14_delay-0.06s.gif"
import img16 from "../../img/sun_spritesheets/frame_15_delay-0.06s.gif"
import img17 from "../../img/sun_spritesheets/frame_16_delay-0.06s.gif"
import img18 from "../../img/sun_spritesheets/frame_17_delay-0.06s.gif"
import img19 from "../../img/sun_spritesheets/frame_18_delay-0.06s.gif"
import img20 from "../../img/sun_spritesheets/frame_19_delay-0.06s.gif"

import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
gsap.registerPlugin(PixiPlugin);

export class LoadingContainer extends PIXI.Container {
  constructor(parent = null) {
    super();
    this.parent = parent;
    this.position.set(window.innerWidth / 2, window.innerHeight / 2)

    const arr = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18, img19, img20]
    let textureArray = []

    const arr2 = ["img/sun_spritesheets/frame_00_delay-0.06s.gif"]

    console.log('>>', arr[0], arr2[0])

    for (let i = 0; i < arr.length; i++) {
      let texture = PIXI.Texture.from(arr[i]);
      textureArray.push(texture);
    }

    let animatedSprite = new PIXI.AnimatedSprite(textureArray);
    // animatedSprite.position.set(0.5, 1)
    animatedSprite.play()
    animatedSprite.animationSpeed = 0.4
    this.addChild(animatedSprite)
    // console.log(img1)
  
    if (this.parent) {
      console.log(this.parent, 'running')
      this.parent.addChild(this);
      this.position.x = window.innerWidth / 2;
      this.position.y = (window.innerHeight / 2) - 5;
    }

    const loadingText = new PIXI.Text("Loading...", {
      fontFamily: "Arial",
      fontSize: 24,
      fill: 0xffffff,
      align: "center",
    })
    loadingText.position.set(0.5, 1)
    this.addChild(loadingText)
  }
  // async loadGif() {
  //   console.log(Assets)
  //   const image = await PIXI.Assets.load('img/sun.gif');
  //   return image
  // }
}
