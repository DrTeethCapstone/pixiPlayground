import {
  Application,
  Texture,
  Sprite,
  AnimatedSprite,
  TilingSprite,
  Rectangle,
} from "pixi.js";

//INITIALIZE THE CANVAS WITH THESE DEFAULTS
const app = new Application({
  width: window.innerWidth,
  height: window.innerHeight,
  resizeTo: window,
  antialias: true,
  //   backgroundAlpha: 0,
});

//ADD CANVAS TO THE DOM
document.getElementById("root").appendChild(app.view);

app.loader
  .add([
    "./images/drags.json",
    "images/zombieWalk.json",
    "images/zombieIdle.json",
    "images/simpleTileset.png",
  ])
  .load(setup);

let dragon;

function setup(loader, resources) {
  console.log("Assets loaded.");

  const dragonTextures = [];
  for (let i = 1; i < 13; i++) {
    const texture = Texture.from(`drag${i}.png`);
    dragonTextures.push(texture);
  }
  dragon = new AnimatedSprite(dragonTextures);
  dragon.position.set(app.screen.width - 146, 30);
  dragon.scale.set(1);
  dragon.play();
  dragon.animationSpeed = 0.1;

  const cageTexture = new Texture(
    resources["images/simpleTileset.png"].texture
  );
  const cageRect = new Rectangle(32, 32, 32, 32);
  cageTexture.frame = cageRect;
  const cage = new TilingSprite(cageTexture, app.view.width, 128);
  cage.position.set(0, 0);
  cage.scale.set(2);

  const cageBorderTexture = new Texture(
    resources["images/simpleTileset.png"].texture
  );
  const cageBorderRect = new Rectangle(64, 32, 32, 32);
  cageBorderTexture.frame = cageBorderRect;
  const cageBorder = new TilingSprite(cageBorderTexture, app.view.width, 32);
  cageBorder.position.set(0, 224);

  const zombie = Sprite.from("Idle (1).png");
  zombie.position.set(app.view.width / 2, app.view.height / 2);
  zombie.anchor.set(0.5);
  zombie.scale.set(0.5);

  const floorTexture = new Texture(
    resources["images/simpleTileset.png"].texture
  );
  const floorRect = new Rectangle(192, 0, 32, 32);
  floorTexture.frame = floorRect;
  const floor = new TilingSprite(floorTexture, app.view.width, 96);
  floor.position.set(window.innerWidth / 2, window.innerHeight - 16);
  floor.anchor.set(0.5);

  app.stage.addChild(cage);
  app.stage.addChild(cageBorder);
  app.stage.addChild(dragon);
  app.stage.addChild(zombie);
  app.stage.addChild(floor);
}

const cloudsTexture = Texture.from("./images/clouds.png");
const cloudsSprite = new TilingSprite(
  cloudsTexture,
  app.screen.width,
  app.screen.height
);

app.stage.addChild(cloudsSprite);

app.ticker.add(() => {
  cloudsSprite.tilePosition.x -= 0.3;
  // dragon.tilePosition.x -= 0.3;
  console.log(dragon);
});

console.log(app.stage.children);
