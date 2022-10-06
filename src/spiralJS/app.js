import { Application, Container, Graphics, Sprite, Texture } from "pixi.js";
import city from "../../public/images/city.png";
import river from "../../public/images/river.png";
import clouds from "../../public/images/spiralClouds.png";

export class Sketch {
  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.app = new Application({
      backgroundColor: 0xffffff,
      resolution: window.devicePixelRatio || 1,
      resizeTo: window,
    });

    document.body.appendChild(this.app.view);

    this.container = new Container();
    this.spiralContainer = new Container();

    //FIBINACHI SEQUENCE - GOLDEN SPIRAL SEQUENCE LOGIC
    this.phi = 0.5 + Math.sqrt(5) / 2;
    this.center = 0.7237;
    this.app.stage.addChild(this.container);
    this.app.stage.addChild(this.spiralContainer);
    this.time = 0;
    // this.add();
    // this.scrollEvent();
    this.addStuff();
    this.addLines();
    this.render();
  }

  scrollEvent() {
    document.addEventListener("mousewheel", (e) => {
      this.scrollTarget = e.wheelDelta / 3;
    });
  }

  getBlock() {
    let block = new Sprite(Texture.WHITE);
    block.tint = 0xff0000 * Math.random();
    block.alpha = 0.5;
    block.width = 10;
    block.height = 10;
    return block;
  }

  getRiver() {
    let sprite = Sprite.from(river);
    this.container.addChild(sprite);
    return sprite;
  }

  getCity() {
    let sprite = Sprite.from(city);
    this.container.addChild(sprite);
    return sprite;
  }

  getClouds() {
    let sprite = Sprite.from(clouds);
    sprite.alpha = 0.5;
    this.container.addChild(sprite);
    return sprite;
  }

  addLines() {
    this.ctx = new Graphics();
    this.ctx.lineStyle(2, 0x00000, 0.2);
    let lastRight = this.width;
    let lastBottom = lastRight / this.phi;
    let tempHorizontal, tempVeritcal;

    this.ctx.moveTo(0, lastBottom);
    this.ctx.lineTo(lastRight, lastBottom);
    this.ctx.moveTo(lastRight, lastBottom);
    this.ctx.arc(lastRight, lastBottom, this.width, 0.5 * Math.PI, Math.PI);

    let lastLeft = lastRight / this.phi;
    this.ctx.moveTo(lastLeft, 0);
    this.ctx.lineTo(lastLeft, lastBottom);
    this.ctx.moveTo(lastLeft, lastBottom);
    this.ctx.arc(lastLeft, lastBottom, lastLeft, Math.PI, 1.5 * Math.PI);

    let lastTop = lastBottom / this.phi;
    this.ctx.moveTo(lastLeft, lastTop);
    this.ctx.lineTo(lastRight, lastTop);
    this.ctx.moveTo(lastLeft, lastTop);
    this.ctx.arc(lastLeft, lastTop, lastTop, 1.5 * Math.PI, 0);

    lastRight = lastRight - (lastRight - lastLeft) / this.phi;
    this.ctx.moveTo(lastRight, lastTop);
    this.ctx.lineTo(lastRight, lastBottom);
    this.ctx.moveTo(lastRight, lastTop);
    this.ctx.arc(lastRight, lastTop, lastBottom - lastTop, 0, 0.5 * Math.PI);

    tempVeritcal = lastBottom - (lastBottom - lastTop) / this.phi;
    this.ctx.moveTo(lastLeft, tempVeritcal);
    this.ctx.lineTo(lastRight, tempVeritcal);
    this.ctx.moveTo(lastRight, tempVeritcal);
    this.ctx.arc(
      lastRight,
      tempVeritcal,
      lastBottom - tempVeritcal,
      0.5 * Math.PI,
      Math.PI
    );
    lastBottom = tempVeritcal;

    tempHorizontal = lastLeft + (lastRight - lastLeft) / this.phi;
    this.ctx.moveTo(tempHorizontal, lastTop);
    this.ctx.lineTo(tempHorizontal, lastBottom);
    this.ctx.moveTo(tempHorizontal, lastBottom);
    this.ctx.arc(
      tempHorizontal,
      lastBottom,
      tempHorizontal - lastLeft,
      Math.PI,
      1.5 * Math.PI
    );
    lastLeft = tempHorizontal;

    tempVeritcal = lastTop + (lastBottom - lastTop) / this.phi;
    this.ctx.moveTo(lastLeft, tempVeritcal);
    this.ctx.lineTo(lastRight, tempVeritcal);
    this.ctx.moveTo(lastLeft, tempVeritcal);
    this.ctx.arc(
      lastLeft,
      tempVeritcal,
      lastRight - lastLeft,
      1.5 * Math.PI,
      0
    );
    lastTop = tempVeritcal;

    tempHorizontal = lastRight - (lastRight - lastLeft) / this.phi;
    this.ctx.moveTo(tempHorizontal, lastTop);
    this.ctx.lineTo(tempHorizontal, lastBottom);
    this.ctx.moveTo(tempHorizontal, lastTop);
    this.ctx.arc(
      tempHorizontal,
      lastTop,
      lastRight - tempHorizontal,
      0,
      0.5 * Math.PI
    );
    lastRight = tempHorizontal;

    tempVeritcal = lastBottom - (lastBottom - lastTop) / this.phi;
    this.ctx.moveTo(lastLeft, tempVeritcal);
    this.ctx.lineTo(lastRight, tempVeritcal);
    this.ctx.moveTo(lastRight, tempVeritcal);
    this.ctx.arc(
      lastRight,
      tempVeritcal,
      lastRight - lastLeft,
      0.5 * Math.PI,
      Math.PI
    );
    lastBottom = tempVeritcal;

    tempHorizontal = lastLeft + (lastRight - lastLeft) / this.phi;
    this.ctx.moveTo(tempHorizontal, lastTop);
    this.ctx.lineTo(tempHorizontal, lastBottom);
    this.ctx.moveTo(tempHorizontal, lastBottom);
    this.ctx.arc(
      tempHorizontal,
      lastBottom,
      tempHorizontal - lastLeft,
      Math.PI,
      1.5 * Math.PI
    );
    lastLeft = tempHorizontal;

    tempVeritcal = lastTop + (lastBottom - lastTop) / this.phi;
    this.ctx.moveTo(lastRight, tempVeritcal);
    this.ctx.lineTo(lastLeft, tempVeritcal);
    this.ctx.moveTo(lastLeft, tempVeritcal);
    this.ctx.arc(
      lastLeft,
      tempVeritcal,
      lastRight - lastLeft,
      1.5 * Math.PI,
      0
    );
    lastBottom = tempVeritcal;

    this.spiralContainer.addChild(this.ctx);
  }

  addStuff() {
    this.centerX = this.width * this.center;
    this.centerY = (this.width * this.center) / this.phi;

    this.container.pivot.set(this.centerX, this.centerY);
    this.container.position.set(this.centerX, this.centerY);

    for (let i = -10; i < 30; i++) {
      let riverContainer = new Container();
      let cityContainer = new Container();
      let cloudsContainer = new Container();
      let angle = (i * Math.PI) / 2;
      let scale = Math.pow(1 / this.phi, i);

      let river = this.getRiver();
      river.width = this.width / this.phi;
      river.height = this.width / this.phi;
      river.position.set(-this.centerX, -this.centerY);

      let city = this.getCity();
      city.width = this.width / this.phi;
      city.height = this.width / this.phi;
      city.position.set(-this.centerX, -this.centerY);

      let clouds = this.getClouds();
      clouds.width = this.width / this.phi;
      clouds.height = this.width / this.phi;
      clouds.position.set(-this.centerX, -this.centerY);

      riverContainer.position.set(this.centerX, this.centerY);
      riverContainer.rotation = angle;
      riverContainer.scale.set(scale * 0.75);

      cityContainer.position.set(this.centerX, this.centerY);
      cityContainer.rotation = angle;
      cityContainer.scale.set(scale);

      cloudsContainer.position.set(this.centerX, this.centerY);
      cloudsContainer.rotation = angle;
      cloudsContainer.scale.set(scale * 0.5);

      riverContainer.addChild(river);
      cityContainer.addChild(city);
      cloudsContainer.addChild(clouds);

      this.container.addChild(cityContainer);
      this.container.addChild(riverContainer);
      this.container.addChild(cloudsContainer);
    }
  }

  add() {
    let block = new Sprite(Texture.WHITE);
    block.tint = 0xff0000;
    block.width = 100;
    block.height = 100;
    this.container.addChild(block);

    const riverSprite = this.getRiver();
    this.container.addChild(riverSprite);
  }

  render() {
    this.app.ticker.add((delta) => {
      this.time += 0.001;
      this.container.rotation = this.time;
      this.container.scale.set(
        Math.pow(1 / this.phi, this.time / (Math.PI / 2))
      );
    });
  }
}
