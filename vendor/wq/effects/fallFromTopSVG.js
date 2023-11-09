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
    this.TL.registerEffect({
      name: name,
      defaults: {
        startAt: 0,
        duration: 1,
        rotate: 0,
        transformOrigin: '0% 0%',
        stagger: 0,
        // repeatRefresh: true,
        onComplete: function () {},
        onStart: function () {},
      },
      extendTimeline: true,
      effect: (targets, config) => {
        let tl = new this.TL.GSAP.timeline({});
        targets.forEach((element, i) => {
          let id = Math.random().toString(36).substring(7);
          element.id = id;
          let o = element.getBBox();
          this.originXY[id] = { id: element, x: o.x, y: o.y };
          tl.from(
            element,
            {
              y: -o.y - o.height,
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
