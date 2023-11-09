'use strict';
// require('../polyfills/foreachpolyfill'); <- ie11
export default class Snow {
  constructor(tl) {
    this.TL = tl;
    this.TLS = [];
  }
  // ADD & REGISTER EFFECT
  addEffect(name, opt) {
    const { idContener, quantity, classImage, width, maxWidth, steps } = opt;
    // duplicate nodes
    const c = document.getElementById(idContener);
    const cw = c.clientWidth;
    const ch = c.clientHeight;
    const n = document.getElementsByClassName(classImage)[0];
    for (let i = 0; i < quantity; i++) {
      const p = n.cloneNode(true);
      const d = this.TL.GSAP.utils.random(width, maxWidth, steps);
      p.height = (maxWidth * p.height) / p.width;
      p.width = maxWidth;
      const scale = d / maxWidth;
      this.TL.GSAP.set(p, { scale: scale });
      p.id = 'flake' + Math.random().toString(36).substring(7);
      const x = this.TL.GSAP.utils.random(0, cw, cw / quantity);
      this.TL.GSAP.set(p, { x: x, y: -(maxWidth + p.height) });
      c.appendChild(p);
    }

    /**
     * register effect
     */
    this.TL.GSAP.registerEffect({
      name: name,
      effect: (targets, config) => {
        targets[0].childNodes.forEach((element, i, a) => {
          const tl = new this.TL.GSAP.timeline({});
          this.TLS.push(tl);
          const scale = this.TL.GSAP.getProperty(element, 'scale');
          let dx = this.TL.GSAP.utils.random(-config.x, config.x, 2);
          dx = dx >= 0 ? '+=' + Math.abs(dx) : '-=' + Math.abs(dx);
          return tl.to(element, {
            ease: config.ease,
            duration: config.duration,
            y: config.y + element.height,
            delay: config.delay * i,
            repeat: config.repeat,
            repeatRefresh: config.repeatRefresh,
            rotate: config.rotate,
            duration: config.duration / scale,
            force3D: config.force3D,
            x: dx,
            transformOrigin: config.transformOrigin,
          });
        });
      },
      defaults: {
        duration: 1,
        ease: 'none',
        y: ch,
        delay: 0.1,
        repeat: -1,
        repeatRefresh: false,
        rotate: 360,
        force3D: true,
        x: 20,
        transformOrigin: '50% 50%',
      },
      extendTimeline: true,
    });
  }

  stopEffect() {
    this.TLS.forEach((element) => {
      element.pause();
    });
  }
}
