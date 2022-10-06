import { Container, Texture, TilingSprite } from "pixi.js";

class Background {
  constructor(imgUrl) {
    this.container = new Container();
    this.imgUrl = imgUrl;
    this.texture = Texture.from(this.imgUrl);
  }
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
});

console.log(app.stage);
