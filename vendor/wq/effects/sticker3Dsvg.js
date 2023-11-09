'use strict';

// import { adajcentHA, opposedAA } from '../modules/mathlib';

export default class sticker3D {
  constructor(tl) {
    this.TL = tl;
  }

  addEffect(name, opt) {
    const width = this.TL.GSAP.getProperty('#' + opt.idName, 'width');
    this.TL.GSAP.registerEffect({
      name: name,
      defaults: {
        duration: 1,
        x: 0,
        ease: 'none',
        skewX: 0,
        rotate: 0,
      },
      extendTimeline: true,
      effect: (targets, config) => {
        if (targets.length == 1) {
          const tl = new this.TL.GSAP.timeline({});
          tl.set('#swipe', { visibility: 'visible' }, 0);
          tl.set('#stickerbackmask1', { scaleY: 2, transformOrigin: '50% 50%' }, 0);
          tl.set('#bgb2', { x: width, transformOrigin: '0% 50%' }, 0)
            .to(
              '#stickerbackmask1',
              {
                duration: config.duration,
                x: -width,
                skewX: config.skewX,
                rotate: config.rotate,
                transformOrigin: '100% 50%',
                ease: config.ease,
              },
              0
            )
            .to(
              '#swipe',
              {
                duration: config.duration,
                x: -width,
                skewX: config.skewX,
                rotate: config.rotate,
                transformOrigin: '50% 50%',
                ease: config.ease,
              },
              0
            )
            .to(
              '#bgb2',
              {
                duration: config.duration,
                x: 0,
                transformOrigin: '100% 50%',
                ease: config.ease,
              },
              0
            )

            .to('#swipe', { duration: 0.3, opacity: 0, transformOrigin: '0% 100%', ease: config.ease }, '-=1');
          return tl;
        } else {
          console.log('No target or more than one target for halo effect');
        }
      },
    });
  }
}
