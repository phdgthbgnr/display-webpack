'use strict';

// import MorphSVGPlugin from '../plugins/MorphSVGPlugin';
require('../polyfills/path2dpolyfills'); // require for ie11

export default class CustomShape {
  constructor(tl, o) {
    this.TL = tl;
    this.cnvs = document.getElementById(o.idCanvas);
    this.ctx = this.cnvs.getContext('2d');
    this.image = document.getElementById(o.idImage);
    this.Tick = this.render.bind(this);
    this.left = o.left;
    this.top = o.top;
    const bounds = this.cnvs.getBoundingClientRect();
    this.cWidth = bounds.width;
    this.cHeight = bounds.height;
    this.width = this.image.width;
    this.height = this.image.height;
    this.randPrefix = Math.random().toString(36).substring(7); // random prefix for id particles
    this.clearAfterEndLoop = false;
    this.assets = {
      star: {
        path: 'M20,0l6.18,12.51,13.82,2L30,24.26,32.37,38,20,31.52,7.64,38,10,24.26,0,14.52l13.82-2S16.08,8,16.49,7.11Z',
        width: 40,
        height: 38,
        path2d: '',
      },
      circle: 'M43.36,21.27A21.11,21.11,0,1,1,22.24.16,21.12,21.12,0,0,1,43.36,21.27Z',
      blob: 'M44,10.61C44,2.15,33.56-1.48,28.19,4.4a1.65,1.65,0,0,1-1.82.46,15,15,0,0,0-11.57.53,1.7,1.7,0,0,1-2.37-1A5.59,5.59,0,0,0,3.37,2.12a5.57,5.57,0,0,0,2.79,9.47c2.9,1.09-.17,4.82.43,7.1C6,21.45.94,20.51.8,26.86a7,7,0,0,0,11.88,5.07,1.7,1.7,0,0,1,2-.35c1.61,1.3,4.78.56,5.65,2.62C27.21,53,52,34.78,36.35,22.57,32.44,18.37,43.93,20.54,44,10.61Z',
      diamond: 'M22.13,42.12l-13.54-21,6.45-10c.57-.86,7.09-11,7.09-11l13.53,21Z',
    };
    this.shape = o.shape;
    this.colorShape = o.colorShape;
    //
    this.ob = { id: 'id-' + this.randPrefix, x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, w: this.width, h: this.height };
    this.scalePath2Image();
  }

  /**
   *
   * @param {*} b : boolean clear canvas at endloop
   * @returns
   */
  getObject(b) {
    if (typeof b == 'boolean') this.clearAfterEndLoop = b;
    return this.ob;
  }

  scalePath2Image() {
    // https://stackoverflow.com/questions/37336493/scaling-canvas-path2d-with-svg-path-data-without-scaling-the-entire-canvas
    const m = document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGMatrix();
    const p1 = new Path2D(this.assets[this.shape].path);
    const p2 = new Path2D();
    const scale = this.width / this.assets[this.shape].width;
    const t = m.scale(scale).translate(-this.assets[this.shape].width / 2, -this.assets[this.shape].width / 2);
    p2.addPath(p1, t);
    this.assets[this.shape].path2d = p2;
  }

  addEffect(name) {
    /**
     * register effect
     */
    this.TL.GSAP.registerEffect({
      name: name,
      effect: (targets, config) => {
        if (config.direction == 'to') {
          return this.TL.GSAP.to(targets, {
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
        }
        if (config.direction == 'from') {
          return this.TL.GSAP.from(targets, {
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
          this.TL.GSAP.ticker.add(this.Tick);
        },
        onUpdate: function () {},
        onComplete: () => {
          window.addEventListener('loop', (e) => {
            this.TL.GSAP.ticker.remove(this.Tick);
            if (this.clearAfterEndLoop) this.ctx.clearRect(0, 0, this.cWidth, this.cHeight);
          });
        },
      },
      extendTimeline: true,
    });
  }

  render() {
    this.ctx.clearRect(0, 0, this.cWidth, this.cHeight);

    // draw shape
    const { id, x, y, rotate, scale, opacity, w, h } = this.ob;
    let W = w * scale;
    let H = h * scale;
    let X = this.left + (x + w / 2);
    let Y = this.top + (y + h / 2);
    let rad = (rotate * Math.PI) / 180;
    this.ctx.globalCompositeOperation = 'source-out';
    this.ctx.globalAlpha = opacity;
    this.ctx.translate(X, Y);
    this.ctx.rotate(rad);
    this.ctx.drawImage(this.image, -(W / 2), -(H / 2), W, H);

    this.ctx.save();
    this.ctx.globalCompositeOperation = 'destination-atop';
    this.ctx.scale(scale, scale);
    this.ctx.fillStyle = this.colorShape;
    this.ctx.fill(this.assets[this.shape].path2d);
    this.ctx.restore();

    this.ctx.rotate(-rad);
    this.ctx.translate(-X, -Y);
  }
}

// https://sodocumentation.net/html5-canvas/topic/5547/compositing

// https://stackoverflow.com/questions/18379818/canvas-image-masking-overlapping
