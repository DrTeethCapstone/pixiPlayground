import { Application, Container, Graphics, Sprite } from "pixi.js";
//BOILERPLATE SKETCH
export class Sketch {
  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.app = new Application({
      backgroundColor: 0x1099bb,
      resizeTo: window,
      antialias: true,
      resolution: 1,
    });

    this.scrollTarget = 0;
    this.scroll = 0;
    this.currentScroll = 0;

    //ADD THE CANVAS TO THE DOM
    document.body.appendChild(this.app.view);

    //THIS CONTAINER WILL HOLD ALL THE THINGS
    this.container = new Container();

    //ADD THE CONTAINER TO THE CANVAS
    this.app.stage.addChild(this.container);

    this.add();
    this.resize();
    this.setupResize();
    this.render();
    this.scrollEvent();
  }

  //SCROLL EVENT FUNCTION
  scrollEvent() {
    document.addEventListener("mousewheel", (e) => {
      this.scrollTarget = e.wheelDelta / 3;
    });
  }

  //FUNCTION TO ADD A NEW SPRITE TO THE CANVAS
  add() {
    const imgURL = "./images/sliderWallpaper.jpg";
    this.slides = [1, 2, 3, 4, 5].map(() => Sprite.from(imgURL));
    this.objs = [];
    this.margin = 400;

    this.slides.forEach((slide, i) => {
      //CREATE A CONTAINER TO HOLD THE SPRITE THAT'S GOING TO BE ADDED TO THE GLOBAL CONTAINER
      const c = new Container();
      //CREATE A SPRITE USING THE IMAGE AS A TEXTURE
      let image = Sprite.from("./images/sliderWallpaper.jpg");
      image.scale.set(0.4);
      image.anchor.set(0.5);
      //ADD THE SPRITE TO THE CONTAINER SPRITE CONTAINER
      c.addChild(image);
      //ADD THE CONTAINER TO THE GLOBAL CONTAINER
      this.container.addChild(c);
      c.pivot.x = -this.width / 2;
      c.pivot.y = -this.height / 2 - i * this.margin;

      //DRAWING AN AREA TO USE AS A MASK WITH PIXI GRAPHICS
      //THIS VERSION REQUIRES SOME MATHING, BUT IT GIVES A CURVED LINE
      const mask = new Graphics();
      mask.beginFill(0xff0000);
      let mx = 2560 * 0.18;
      let my = 1440 * 0.1;
      let points = [
        {
          x: mx,
          y: -my,
        },
        {
          x: -mx,
          y: -my,
        },
        {
          x: -mx,
          y: my,
        },
        {
          x: mx,
          y: my,
        },
      ];
      let DISTORTION = 100;
      let koef = 0.2;
      const controlPoints = [
        {
          x: 0.5 * points[0].x + 0.5 * points[1].x,
          y: 0.5 * points[0].y + 0.5 * points[1].y + DISTORTION,
        },
        {
          x: 0.5 * points[1].x + 0.5 * points[2].x + DISTORTION * koef,
          y: 0.5 * points[1].y + 0.5 * points[2].y,
        },
        {
          x: 0.5 * points[2].x + 0.5 * points[3].x,
          y: 0.5 * points[2].y + 0.5 * points[3].y + DISTORTION,
        },
        {
          x: 0.5 * points[3].x + 0.5 * points[0].x - DISTORTION * koef,
          y: 0.5 * points[3].y + 0.5 * points[0].y,
        },
      ];
      mask.moveTo(points[0].x, points[0].y);
      mask.quadraticCurveTo(
        controlPoints[0].x,
        controlPoints[0].y,
        points[1].x,
        points[1].y
      );
      mask.quadraticCurveTo(
        controlPoints[1].x,
        controlPoints[1].y,
        points[2].x,
        points[2].y
      );
      mask.quadraticCurveTo(
        controlPoints[2].x,
        controlPoints[2].y,
        points[3].x,
        points[3].y
      );
      mask.quadraticCurveTo(
        controlPoints[3].x,
        controlPoints[3].y,
        points[0].x,
        points[0].y
      );
      //ADD MASK TO SPRITE CONTAINER
      c.addChild(mask);
      //ASSIGN THE VALUE OF MASK TO THE SPRITE'S CONTAINER MASK PROPTERY
      c.mask = mask;

      this.objs.push({ mask: mask, container: c, image: image });
    });
  }

  updateTheMasks() {
    this.objs.forEach((slide) => {
      slide.mask.clear();
      slide.mask.beginFill(0xff0000);
      let mx = 2560 * 0.18;
      let my = 1440 * 0.1;
      let DISTORTION = this.scroll * 5;
      let koef = 0.2;

      let points = [
        {
          x: mx,
          y: -my,
        },
        {
          x: -mx,
          y: -my,
        },
        {
          x: -mx,
          y: my,
        },
        {
          x: mx,
          y: my,
        },
      ];

      if (DISTORTION < 0) {
        points[2].x += Math.abs(DISTORTION) * 0.4;
        points[2].y -= Math.abs(DISTORTION) * 0.4;
        points[3].x -= Math.abs(DISTORTION) * 0.4;
        points[3].y -= Math.abs(DISTORTION) * 0.4;
      } else {
        points[0].x -= Math.abs(DISTORTION) * 0.4;
        points[0].y += Math.abs(DISTORTION) * 0.4;
        points[1].x += Math.abs(DISTORTION) * 0.4;
        points[1].y += Math.abs(DISTORTION) * 0.4;
      }
      const controlPoints = [
        {
          x: 0.5 * points[0].x + 0.5 * points[1].x,
          y: 0.5 * points[0].y + 0.5 * points[1].y + DISTORTION,
        },
        {
          x:
            0.5 * points[1].x + 0.5 * points[2].x + Math.abs(DISTORTION * koef),
          y: 0.5 * points[1].y + 0.5 * points[2].y,
        },
        {
          x: 0.5 * points[2].x + 0.5 * points[3].x,
          y: 0.5 * points[2].y + 0.5 * points[3].y + DISTORTION,
        },
        {
          x:
            0.5 * points[3].x + 0.5 * points[0].x - Math.abs(DISTORTION * koef),
          y: 0.5 * points[3].y + 0.5 * points[0].y,
        },
      ];
      slide.mask.moveTo(points[0].x, points[0].y);
      slide.mask.quadraticCurveTo(
        controlPoints[0].x,
        controlPoints[0].y,
        points[1].x,
        points[1].y
      );
      slide.mask.quadraticCurveTo(
        controlPoints[1].x,
        controlPoints[1].y,
        points[2].x,
        points[2].y
      );
      slide.mask.quadraticCurveTo(
        controlPoints[2].x,
        controlPoints[2].y,
        points[3].x,
        points[3].y
      );
      slide.mask.quadraticCurveTo(
        controlPoints[3].x,
        controlPoints[3].y,
        points[0].x,
        points[0].y
      );
    });
  }
  setupResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }
  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.app.view.style.width = this.width + "px";
    this.app.view.style.height = this.height + "px";
  }
  render() {
    this.app.ticker.add((delta) => {
      this.scroll -= (this.scroll - this.scrollTarget) * 0.1;
      this.scroll *= 0.9;
      this.direction = Math.sign(this.scroll);
      this.currentScroll += this.scroll;
      this.updateTheMasks();
    });
  }
}

// add() {
//     //CREATE A CONTAINER TO HOLD THE SPRITE THAT'S GOING TO BE ADDED TO THE GLOBAL CONTAINER
//     const imgUrl = "./images/sliderWallpaper.jpg";
//     this.slides = [1, 2, 3, 4, 5].map(() => Sprite.from(imgUrl));
//     console.log(this.slides);
//     this.objs = [];

//     this.margin = 300;

//     this.slides.forEach((slide, i) => {
//       const c = new Container();
//       c.pivot.x = -this.width / 2;
//       c.pivot.y = -this.height / 2;
//       const mask = new Graphics();
//       mask.beginFill(0xff0000);
//       let mx = 2560 * 0.18;
//       let my = 1440 * 0.1;
//       let points = [
//         {
//           x: mx,
//           y: -my,
//         },
//         {
//           x: -mx,
//           y: -my,
//         },
//         {
//           x: -mx,
//           y: my,
//         },
//         {
//           x: mx,
//           y: my,
//         },
//       ];
//       let DISTORTION = 100;
//       let koef = 0.2;
//       const controlPoints = [
//         {
//           x: 0.5 * points[0].x + 0.5 * points[1].x,
//           y: 0.5 * points[0].y + 0.5 * points[1].y + DISTORTION,
//         },
//         {
//           x: 0.5 * points[1].x + 0.5 * points[2].x + DISTORTION * koef,
//           y: 0.5 * points[1].y + 0.5 * points[2].y,
//         },
//         {
//           x: 0.5 * points[2].x + 0.5 * points[3].x,
//           y: 0.5 * points[2].y + 0.5 * points[3].y + DISTORTION,
//         },
//         {
//           x: 0.5 * points[3].x + 0.5 * points[0].x - DISTORTION * koef,
//           y: 0.5 * points[3].y + 0.5 * points[0].y,
//         },
//       ];
//       mask.moveTo(points[0].x, points[0].y);
//       mask.quadraticCurveTo(
//         controlPoints[0].x,
//         controlPoints[0].y,
//         points[1].x,
//         points[1].y
//       );
//       mask.quadraticCurveTo(
//         controlPoints[1].x,
//         controlPoints[1].y,
//         points[2].x,
//         points[2].y
//       );
//       mask.quadraticCurveTo(
//         controlPoints[2].x,
//         controlPoints[2].y,
//         points[3].x,
//         points[3].y
//       );
//       mask.quadraticCurveTo(
//         controlPoints[3].x,
//         controlPoints[3].y,
//         points[0].x,
//         points[0].y
//       );
//       c.addChild(mask);
//       c.mask = mask;
//       this.container.addChild(c);
//     });
//   }

//THIS VERSION CREATES A RECTANGLE BUT EVENTUALLY WE WANT A CURVED LINE
// const mask = new Graphics();
// mask.beginFill(0xff0000);
// let mx = 2560 * 0.18;
// let my = 1440 * 0.1;
// mask.moveTo(mx, my);
// mask.lineTo(mx, -my);
// mask.lineTo(-mx, -my);
// mask.lineTo(-mx, my);
// mask.endFill();
