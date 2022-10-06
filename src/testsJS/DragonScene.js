import {
  Application,
  Graphics,
  Rectangle,
  Text,
  TextStyle,
  Texture,
  Sprite,
  Container,
  ParticleContainer,
  AnimatedSprite,
  TilingSprite,
  Loader,
  filters,
  blurFilter,
} from "pixi.js";

import { Sound } from "@pixi/sound";

const app = new Application({
  width: 800,
  height: 600,
  backgroundColor: 0xaaaaaa,
});

app.renderer.backgroundColor = 0x23395d;
app.renderer.resize(window.innerWidth, window.innerHeight);
app.renderer.view.style.position = "absolute";

document.body.appendChild(app.view);

// const poly = new Graphics();
// poly
//   .beginFill(0xff66ff)
//   .lineStyle(5, 0xffea00, 1)
//   .drawPolygon([600, 50, 800, 150, 900, 300, 400, 400])
//   .endFill();

// const circle = new Graphics();
// circle
//   .beginFill(0x22acc)
//   .lineStyle(5, 0xffea00, 1)
//   .drawCircle(440, 200, 80)
//   .endFill();

// app.stage.addChild(circle);
// app.stage.addChild(poly);

// const line = new Graphics();
// line.lineStyle(5, 0xffea00, 1).moveTo(50, 100).lineTo(50, 1100);
// app.stage.addChild(line);

// const style = new TextStyle({
//   fontFamily: "Montserrat",
//   fontSize: 48,
//   fill: "deepskyblue",
//   stroke: "#ffffff",
//   strokeThickness: 4,
//   dropShadow: true,
//   dropShadowDistance: 10,
//   dropShadowAngle: Math.PI / 2,
//   dropShadowBlur: 4,
//   dropShadowColor: "$000000",
// });
// const myText = new Text("Hello World!", style);

// app.stage.addChild(myText);

// myText.text = "New Text!";
// myText.style.wordWrap = true;
// myText.style.wordWrapWidth = 100;
// myText.style.align = "center";

// // app.ticker.add((delta) => loop(delta));
// //A TEST LOOP THAT WILL ADD A RANDOM RECTANGLE TO THE SCREEN
// // function loop() {
// //   const rect = new Graphics();
// //   rect
// //     .beginFill(0xffffff)
// //     .drawRect(
// //       Math.random() * app.screen.width,
// //       Math.random() * app.screen.height,
// //       10,
// //       10
// //     )
// //     .endFill();
// //   app.stage.addChild(rect);
// // }

// const char1Sprite = Sprite.from("./images/char1.png");
// app.stage.addChild(char1Sprite);
// char1Sprite.scale.set(0.5);
// char1Sprite.position.set(app.screen.width / 2, app.screen.height / 2);

// //CHANGES THE ANCHOR OF THE SPRITE TO THE CENTER OF IT
// char1Sprite.anchor.set(0.5);

// // CUSTOM LOOP THAT WILL MOVE THE SPRITE
// // function loop() {
// //   char1Sprite.x += 1;
// //   if (char1Sprite.x + char1Sprite.width > app.screen.width) {
// //     char1Sprite.x *= 0;
// //   }
// // }

// // function loop() {
// //   char1Sprite.rotation += 0.01;
// }
// char1Sprite.interactive = true;
// char1Sprite.buttonMode = true;

// char1Sprite.on("pointerdown", () => {
//   char1Sprite.scale.x += 0.1;
//   char1Sprite.scale.y += 0.1;
// });

// document.addEventListener("keydown", (e) => {
//   console.log(e.key);
//   if (e.key === "ArrowRight") {
//     char1Sprite.x += 10;
//   }

//   if (e.key === "ArrowLeft") {
//     char1Sprite.x -= 10;
//   }

//   if (e.key === "ArrowUp") {
//     char1Sprite.y -= 10;
//   }

//   if (e.key === "ArrowDown") {
//     char1Sprite.y += 10;
//   }
// });

// const container = new Container();
// container.x = 200;
// const char2Sprite = Sprite.from("./images/char2.png");
// container.addChild(char2Sprite);
// const char3Sprite = Sprite.from("./images/char3.png");
// container.addChild(char3Sprite);
// app.stage.addChild(container);
// char2Sprite.x = 300;

// const particleContainer = new ParticleContainer(1000, {
//   position: true,
//   rotation: true,
//   vertices: true,
//   tint: true,
//   uvs: true,
// });

const loader = Loader.shared;
// loader.add(["./images/char4.png", "./images/char5.png"]);
// loader.load(setup);

// function setup(loader, resources) {
//   const char4Sprite = Sprite.from(resources["./images/char4.png"].texture);
//   char4Sprite.y = 400;
//   app.stage.addChild(char4Sprite);
// }

// loader.onLoad.add(() => {
//   console.log("on load");
// });

// loader.onError.add(() => {
//   console.log("on error");
// });

// loader.add("tileset", "./images/tileset.png").load(setup);

// function setup(loader, resources) {
//   const texture1 = resources.tileset.texture;
//   const rect1 = new Rectangle(176, 160, 76, 86);
//   texture1.frame = rect1;
//   const spr1 = new Sprite(texture1);
//   spr1.scale.set(2, 2);
//   app.stage.addChild(spr1);

//   const texture2 = new Texture(resources.tileset.texture);
//   const rect2 = new Rectangle(190, 593, 77, 84);
//   texture2.frame = rect2;
//   const spr2 = new Sprite(texture2);
//   spr2.position.set(200, 200);
//   spr2.scale.set(2, 2);
//   app.stage.addChild(spr2);
// }

// loader.add("tileset", "./images/drags.json").load(setup);

// function setup(loader, resources) {
//   const drag11Texture = Texture.from("drag11.png");
//   const drag11Sprite = new Sprite(drag11Texture);
//   drag11Sprite.position.set(300, 300);
//   drag11Sprite.scale.set(2, 2);
//   app.stage.addChild(drag11Sprite);
// }

loader.add("tileset", "./images/drags.json").load(setup);

function setup(loader, resources) {
  const textures = [];
  for (let i = 1; i < 13; i++) {
    const texture = Texture.from(`drag${i}.png`);
    textures.push(texture);
  }
  const drag = new AnimatedSprite(textures);
  drag.position.set(300, 300);
  drag.scale.set(2);
  app.stage.addChild(drag);
  drag.play();
  drag.animationSpeed = 0.1;

  const blurFilter = new filters.BlurFilter();
  drag.filters = [blurFilter];
  blurFilter.blur = 2;
}

const cloudsTexture = Texture.from("./images/clouds.png");
const cloudsSprite = new TilingSprite(
  cloudsTexture,
  app.screen.width,
  app.screen.height
);

cloudsSprite.tileScale.set(0.5);
app.ticker.add(() => {
  cloudsSprite.tilePosition.x += 1;
});
// cloudsSprite.on("pointerdown", toggleMusic);
app.stage.addChild(cloudsSprite);

const sound = Sound.from("./sound/pelimusaa.wav");
sound.volume = 0.2;
sound.play();
