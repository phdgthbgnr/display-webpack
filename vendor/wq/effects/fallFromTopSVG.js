'use strict';
export default class fallFromTopSVG {
  constructor(tl) {
    this.TL = tl;
    this.originXY = [];
  }

  // ADD & REGISTER EFFECT
  addEffect(name) {
    /**
     * register effect
     */
    this.TL.GSAP.registerEffect({
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
        let tl = new this.TL.GSAP.timeline({ repeatRefresh: true });
        targets.forEach((element, i) => {
          const id = Math.random().toString(36).substring(7);
          element.id = id;
          const o = element.getBBox();
          // this.originXY[id] = { id: element, x: o.x, y: o.y };
          const offsetY = o.y + o.height;
          tl.from(
            element,
            {
              y: -offsetY,
              duration: config.duration,
              rotate: config.rotate,
              transformOrigin: config.transformOrigin,
              onComplete: config.onComplete,
              onStart: config.onStart,
              onStartParams: this.originXY[id],
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
