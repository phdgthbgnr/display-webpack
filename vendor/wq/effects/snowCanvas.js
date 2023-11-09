'use strict';

// require('../polyfills/foreachpolyfill'); <- ie11
export default class SnowCanvas {
  constructor(tl) {
    this.TL = tl;
    this.flakes = []; // array of flake objects
    this.Tick = null; // ticker
    this.ctx = null; // context2d
    this.cWidth = 0; // canvas.width;
    this.cHeight = 0; //. canvas.height;
    this.image = null;
    this.isPlaying = false;
  }
  // ADD & REGISTER EFFECT
  addEffect(name, opt) {
    const { idCanvas, quantity, classImage, width, maxWidth, steps } = opt;
    // duplicate nodes
    const c = document.getElementById(idCanvas);
    this.ctx = c.getContext('2d');
    const bounds = c.getBoundingClientRect();
    this.cWidth = bounds.width;
    this.cHeight = bounds.height;
    const cw = c.clientWidth;
    const ch = c.clientHeight;
    this.image = document.getElementsByClassName(classImage)[0];

    for (let i = 0; i < quantity; i++) {
      const d = this.TL.GSAP.utils.random(width, maxWidth, steps);
      const height_f = (maxWidth * this.image.height) / this.image.width;
      const width_f = maxWidth;
      const x = this.TL.GSAP.utils.random(0, cw, cw / quantity);
      this.flakes.push({
        id: 'flake' + Math.random().toString(36).substring(7),
        x: x, // tweened value
        y: -(maxWidth + this.image.height), // tweened value
        width: width_f,
        height: height_f,
        rotate: 0, // tweened value
        scale: d / maxWidth,
        duration: 1,
      });
    }

    /**
     * register effect
     */
    this.TL.GSAP.registerEffect({
      name: name,
      effect: (targets, config) => {
        const tl = new this.TL.GSAP.timeline({});
        tl.to(targets, {
          duration: config.duration,
          ease: config.ease,
          x: (i, e) => {
            let dx = this.TL.GSAP.utils.random(-e.x, e.x, 2);
            dx = dx >= 0 ? '+=' + Math.abs(dx) : '-=' + Math.abs(dx);
            return dx;
          },
          y: this.cHeight,
          rotate: config.rotate,
          onStart: config.onStart,
          duration: (i, e) => {
            return config.duration / e.scale;
          },
          repeatRefresh: config.repeatRefresh,
          stagger: config.stagger,
        });
        return tl;
      },
      defaults: {
        duration: 1,
        ease: 'none',
        x: 0,
        y: ch,
        scale: 1,
        rotate: 360,
        onStart: () => {
          if (!this.isPlaying && this.Tick == null) this.addTicker();
        },
        repeatRefresh: true,
        stagger: {
          each: 0.1,
          repeat: -1,
          repeatDelay: 0,
        },
      },
      extendTimeline: true,
    });
  }

  stopEffect() {
    this.TL.GSAP.ticker.remove(this.Tick);
    this.Tick = null;
    this.isPlaying = false;
  }

  getFlakesArray() {
    if (!this.isPlaying) this.addTicker();
    return this.flakes;
  }

  addTicker() {
    this.TL.GSAP.ticker.lagSmoothing(1000, 16);
    this.Tick = this.render.bind(this);
    this.TL.GSAP.ticker.add(this.Tick);
    this.isPlaying = true;
  }

  render() {
    this.ctx.clearRect(0, 0, this.cWidth, this.cHeight);
    for (let i = 0; i < this.flakes.length; i++) {
      const { id, x, y, width, height, rotate, scale, duration } = this.flakes[i];
      const { w, h } = { w: width * scale, h: height * scale };
      const { w2, h2 } = { w2: w / 2, h2: h / 2 };
      const { X, Y } = { X: x + w2, Y: y + h2 };
      this.ctx.translate(X, Y);
      let rad = (rotate * Math.PI) / 180;
      this.ctx.rotate(rad);
      this.ctx.drawImage(this.image, -w2, -h2, w, h);
      this.ctx.rotate(-rad);
      this.ctx.translate(-X, -Y);
    }
  }
}
