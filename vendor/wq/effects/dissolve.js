'use strict';

export default class Dissolve {
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
        let rx = this.TL.GSAP.utils.mapRange(0, this.splitX, -this.splitX, this.splitX, nx);
        let ry = this.TL.GSAP.utils.mapRange(0, this.splitY, -this.splitY, this.splitY, ny);
        this.grid.push({
          id: this.randPrefix + '-' + nx + ny,
          opacity: 1,
          x: 0, // tweened value x by gsap
          y: 0, // tweened value y by gsap
          rx: rx, // diretion x tweening
          ry: ry, // diretion y tweening
          dx: this.left + nx * this.splitWidth, // position x slice in canvas (tweened)
          dy: this.top + ny * this.splitHeight, // position y slice in canvas (tweened)
          ax: nx * this.splitWidth, // position x in image
          ay: ny * this.splitHeight, // position y in image
          rotate: 0,
          scale: 1,
        });
      }
    }
  }

  getGrid() {
    return this.grid;
  }

  addEffect(name) {
    /**
     * register effect
     */
    this.TL.registerEffect({
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
        x: 0,
        y: 0,
        onStart: () => {
          this.Tick = this.render.bind(this);
          this.TL.GSAP.ticker.add(this.Tick);
        },
        onUpdate: function () {},
        onComplete: () => {
          setTimeout(() => {
            this.TL.GSAP.ticker.remove(this.Tick);
          }, 200);
        },
      },
      extendTimeline: true,
    });
  }

  render() {
    // this.ctx.clearRect(0, 0, this.cWidth, this.cHeight);
    // for (let i = 0; i < this.grid.length; i++) {
    //   let scale = this.grid[i].scale;
    //   let canvasX = this.grid[i].dx + this.grid[i].x * this.grid[i].rx;
    //   let canvasY = this.grid[i].dy + this.grid[i].y * this.grid[i].ry;
    //   let splitWd = this.splitWidth / 2;
    //   let splitHd = this.splitHeight / 2;
    //   this.ctx.globalAlpha = this.grid[i].opacity;
    //   this.ctx.translate(canvasX + splitWd, canvasY + splitHd);
    //   this.ctx.rotate(this.grid[i].rotate);
    //   this.ctx.drawImage(this.image, this.grid[i].ax, this.grid[i].ay, this.splitWidth, this.splitHeight, -splitWd, -splitHd, this.splitWidth, this.splitHeight);
    //   this.ctx.rotate(-this.grid[i].rotate);
    //   this.ctx.translate(-(canvasX + splitWd), -(canvasY + splitHd));
    // }
    this.ctx.clearRect(0, 0, this.cWidth, this.cHeight);
    for (let i = 0; i < this.grid.length; i++) {
      let scale = this.grid[i].scale;
      let canvasX = this.grid[i].dx + this.grid[i].x * this.grid[i].rx;
      let canvasY = this.grid[i].dy + this.grid[i].y * this.grid[i].ry;
      let splitWds = this.splitWd * scale;
      let splitHds = this.splitHd * scale;
      this.ctx.globalAlpha = this.grid[i].opacity;
      this.ctx.translate(canvasX + this.splitWd, canvasY + this.splitHd);
      // this.ctx.translate(canvasX, canvasY);
      // this.ctx.rotate(this.grid[i].rotate);
      this.ctx.drawImage(
        this.image,
        this.grid[i].ax,
        this.grid[i].ay,
        this.splitWidth,
        this.splitHeight,
        -splitWds,
        -splitHds,
        this.splitWidth * scale,
        this.splitHeight * scale
      );
      this.ctx.translate(-(canvasX + this.splitWd), -(canvasY + this.splitHd));
      // this.ctx.rotate(-this.grid[i].rotate);
      // this.ctx.translate(-canvasX, -canvasY);
    }
  }
}
