'use strict';

// import MorphSVGPlugin from '../plugins/MorphSVGPlugin';
require('../polyfills/path2dpolyfills');

export default class ExplodeWithShapes {
  constructor(tl, o) {
    this.TL = tl;
    this.cnvs = document.getElementById(o.idCanvas);
    this.ctx = this.cnvs.getContext('2d');
    this.image = document.getElementById(o.idImage);
    this.left = o.left;
    this.top = o.top;
    this.splitX = o.splitX;
    this.splitY = o.splitY;
    const bounds = this.cnvs.getBoundingClientRect();
    this.cWidth = bounds.width;
    this.cHeight = bounds.height;
    this.width = this.image.width;
    this.height = this.image.height;
    this.grid = [];
    this.randPrefix = Math.random().toString(36).substring(7); // random prefix for id particles
    this.splitWidth = this.width / this.splitX;
    this.splitHeight = this.height / this.splitY;
    this.splitWd = this.splitWidth / 2;
    this.splitHd = this.splitHeight / 2;
    this.assets = {
      star: {
        path: 'M20,0l6.18,12.51,13.82,2L30,24.26,32.37,38,20,31.52,7.64,38,10,24.26,0,14.52l13.82-2S16.08,8,16.49,7.11Z',
        width: 40,
        height: 38,
        path2d: '',
      },
      circle: {
        path: 'M40,20A20,20,0,1,1,20,0,20,20,0,0,1,40,20Z',
        width: 40,
        height: 40,
        path2d: '',
      },
      blob: {
        path: 'M44,10.09c0-8.54-10.63-12.2-16.09-6.26A1.71,1.71,0,0,1,26,4.28a15.36,15.36,0,0,0-11.77.54,1.75,1.75,0,0,1-2.42-1A5.71,5.71,0,0,0,2.62,1.52a5.61,5.61,0,0,0,2.84,9.55c3,1.11-.18,4.87.44,7.16C5.3,21,.14,20.07,0,26.48c0,6.43,7.82,9.26,12.1,5.11a1.74,1.74,0,0,1,2-.35c1.64,1.32,4.87.57,5.76,2.65,7,19,32.24.59,16.34-11.73C32.21,17.91,43.91,20.11,44,10.09Z',
        width: 44,
        height: 42,
        path2d: '',
      },
    };
    this.shape = o.shape;
    this.colorShape = o.colorShape;
    this.clearAfterEndLoop = false;
    this.endAnim = false;
    //
    if (this.shape != 'none') this.scalePath2Slice();
    this.split();
  }

  /**
   * split image splitX * splitY
   * & create object to tween
   */
  split() {
    // this.ctx.drawImage(
    //   this.image,
    //   50, // coord x de la portion d'image
    //   50, // coord y de la portion d'image
    //   50, // largeur de la portion d'image
    //   50, // heutaur de la portion d'image
    //   25, // coord x dans le canvas de la portion d'image
    //   95, // coord y dans le canvas de la portion d'image
    //   50, // largeur de la portion d'image dans le canvas
    //   50 // heuteur de la portion d'image dans le canvas
    // );
    for (let nx = 0; nx < this.splitX; nx++) {
      for (let ny = 0; ny < this.splitY; ny++) {
        // this.ctx.drawImage(this.image, nx * pwidth, ny * pheight, pwidth, pheight, this.left + nx * pwidth, this.top + ny * pheight, pwidth, pheight);
        /**
         * x,y : values tweened by gsap
         * rx : value x to tween relative to the center of the array (rx * x)
         * ry : value y to tween relative to the center of the array (ry * y)
         * dx : position x slice in canvas
         * dy : position y slice in canvas
         */
        // map value x y from 0 / nb slice to -nb slice / nb slice
        const rx = this.TL.GSAP.utils.mapRange(0, this.splitX, -this.splitX / 2, this.splitX / 2, nx);
        const ry = this.TL.GSAP.utils.mapRange(0, this.splitY, -this.splitY / 2, this.splitY / 2, ny);
        this.grid.push({
          id: this.randPrefix + '-' + nx + ny,
          opacity: 1,
          x: 0, // tweened value x by gsap
          y: 0, // tweened value y by gsap
          rx: Math.round(rx), // diretion x tweening
          ry: Math.round(ry), // diretion y tweening
          dx: this.left + nx * this.splitWidth, // position x slice in canvas (tweened)
          dy: this.top + ny * this.splitHeight, // position y slice in canvas (tweened)
          ax: nx * this.splitWidth, // position x in image
          ay: ny * this.splitHeight, // position y in image
          rotate: 0,
          scale: 1,
          // shape: this.assets[this.shape].path,
        });
      }
    }
  }

  scalePath2Slice() {
    // https://stackoverflow.com/questions/37336493/scaling-canvas-path2d-with-svg-path-data-without-scaling-the-entire-canvas
    const m = document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGMatrix();
    const p1 = new Path2D(this.assets[this.shape].path);
    const p2 = new Path2D();
    const scale = this.splitWidth / this.assets[this.shape].width;
    const t = m.scale(scale).translate(-this.assets[this.shape].width / 2, -this.assets[this.shape].width / 2);
    p2.addPath(p1, t);
    this.assets[this.shape].path2d = p2;
  }

  getGrid(b) {
    if (typeof b == 'boolean') this.clearAfterEndLoop = b;
    return this.grid;
  }

  addEffect(name) {
    /**
     * register effect
     */
    let direction = '';
    this.TL.GSAP.registerEffect({
      name: name,
      effect: (targets, config) => {
        direction = config.direction;
        if (config.direction == 'to') {
          const tl = new this.TL.GSAP.timeline({});
          tl.to(targets, {
            x: config.x,
            y: config.y,
            duration: config.duration,
            onStart: config.onStart,
            onUpdate: config.onUpdate,
            onComplete: config.onComplete,
            stagger: config.stagger,
            ease: config.ease,
            opacity: config.opacity,
            rotate: config.rotate,
            scale: config.scale,
          });
          return tl;
        }
        if (config.direction == 'from') {
          const tl = new this.TL.GSAP.timeline({});
          tl.from(targets, {
            x: config.x,
            y: config.y,
            duration: config.duration,
            onStart: config.onStart,
            onUpdate: config.onUpdate,
            onComplete: config.onComplete,
            stagger: config.stagger,
            ease: config.ease,
            opacity: config.opacity,
            rotate: config.rotate,
            scale: config.scale,
          });
          return tl;
        }
      },
      defaults: {
        direction: 'to',
        duration: 1,
        rotate: 0,
        transformOrigin: '0% 0%',
        opacity: 1,
        stagger: 0,
        ease: 'expo.out',
        scale: 1,
        shape: 'star',
        x: 0,
        y: 0,
        onStart: () => {
          this.endAnim = false;
          this.Tick = this.render.bind(this);
          this.TL.GSAP.ticker.add(this.Tick);
        },
        onUpdate: function () {},
        onComplete: () => {
          if (direction == 'from') this.endAnim = true;
          window.addEventListener('loop', (e) => {
            this.TL.GSAP.ticker.remove(this.Tick);
            if (this.clearAfterEndLoop) this.ctx.clearRect(0, 0, this.cWidth, this.cHeight);
          });
        },
      },
      extendTimeline: true,
    });
  }

  drawSlices(i) {
    for (let i = 0; i < this.grid.length; i++) {
      const { id, opacity, x, y, rx, ry, dx, dy, ax, ay, rotate, scale } = this.grid[i];
      const canvasX = dx + x * rx;
      const canvasY = dy + y * ry;
      const splitWd = this.splitWd * scale;
      const splitHd = this.splitHd * scale;
      const offsetX = canvasX + this.splitWd;
      const offsetY = canvasY + this.splitHd;
      this.ctx.translate(offsetX, offsetY);
      let rad = (rotate * Math.PI) / 180;
      this.ctx.rotate(rad);
      this.ctx.globalAlpha = opacity;
      this.ctx.drawImage(this.image, ax, ay, this.splitWidth, this.splitHeight, -splitWd, -splitHd, this.splitWidth * scale, this.splitHeight * scale);

      this.ctx.rotate(-rad);
      this.ctx.translate(-offsetX, -offsetY);
    }
  }

  drawShapes() {
    for (let i = 0; i < this.grid.length; i++) {
      const { id, opacity, x, y, rx, ry, dx, dy, ax, ay, rotate, scale } = this.grid[i];
      let canvasX = dx + x * rx;
      let canvasY = dy + y * ry;
      let rad = (rotate * Math.PI) / 180;
      this.ctx.save();
      this.ctx.translate(canvasX + this.splitWd, canvasY + this.splitHd);
      this.ctx.rotate(rad);
      this.ctx.scale(scale, scale);
      this.ctx.fillStyle = this.colorShape;
      this.ctx.fill(this.assets[this.shape].path2d);
      // this.ctx.globalAlpha = 1;

      this.ctx.restore();
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.cWidth, this.cHeight);
    if (this.endAnim) {
      this.ctx.drawImage(this.image, this.left, this.top, this.width, this.height);
      this.TL.GSAP.ticker.remove(this.Tick);
    }
    if (this.shape != 'none') {
      this.ctx.globalCompositeOperation = 'source-over';
      this.drawShapes();
      this.ctx.globalCompositeOperation = 'source-atop';
    }
    this.drawSlices();
  }

  /*
  _render() {
    this.ctx.clearRect(0, 0, this.cWidth, this.cHeight);
    for (let i = 0; i < this.grid.length; i++) {
      const { id, opacity, x, y, rx, ry, dx, dy, ax, ay, rotate, scale } = this.grid[i];
      let canvasX = (dx + x) * rx;
      let canvasY = (dy + y) * ry;
      let splitWd = (this.splitWidth * scale) / 2;
      let splitHd = (this.splitWidth * scale) / 2;
      let rad = (rotate * Math.PI) / 180;
      this.ctx.translate(canvasX + splitWd, canvasY + splitHd);
      this.ctx.rotate(rad);

      // draw shape
      this.ctx.globalCompositeOperation = 'source-over';
      this.ctx.save();
      this.ctx.scale(scale, scale);
      this.ctx.fillStyle = this.colorShape;
      this.ctx.fill(this.assets[this.shape].path2d);
      this.ctx.restore();

      // draw image
      this.ctx.globalCompositeOperation = 'source-atop';
      this.ctx.globalAlpha = opacity;
      this.ctx.drawImage(
        this.image,
        ax,
        ay,
        this.splitWidth,
        this.splitHeight,
        -splitWd,
        -splitHd,
        this.splitWidth * scale,
        this.splitHeight * scale
      );

      // this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      //this.ctx.context.resetTransform();
      this.ctx.rotate(-rad);
      this.ctx.translate(-(canvasX + splitWd), -(canvasY + splitHd));
      // console.log(scale);
      // this.ctx.restore();
    }
    // this.ctx.fill('evenodd');
  }
  */
}
