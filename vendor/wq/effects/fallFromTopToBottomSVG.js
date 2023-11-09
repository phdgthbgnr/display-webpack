'use strict';

export default class fallFromTopSVG {
  constructor(tl) {
    this.TL = tl;
    this.originXY = [];
    this.height = 0;
  }

  // ADD & REGISTER EFFECT
  addEffect(name, height) {
    this.height = height;
    /**
     * register effect
     */
    this.TL.registerEffect({
      name: name,
      defaults: {
        startAt: 0,
        duration: 1,
        rotate: 0,
        transformOrigin: '0% 0%',
        stagger: 0,
        onComplete: function () {},
        onStart: function () {},
      },
      extendTimeline: true,
      effect: (targets, config) => {
        let tl = new this.TL.GSAP.timeline({});
        targets.forEach((element, i) => {
          let o = element.getBBox();
          this.originXY.push({ id: element, x: o.x, y: o.y });
          tl.fromTo(
            element,
            {
              y: -o.y - o.height,
            },
            {
              y: this.height,
              duration: config.duration,
              rotate: config.rotate,
              transformOrigin: config.transformOrigin,
              onComplete: config.onComplete,
              onStart: config.onStart,
            },
            config.startAt + config.stagger * i
          );
        });
        return tl;
      },
    });
    /**
     * add timeline effect
     */
  }
}
