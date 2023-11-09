'use strict';
export default class card3D {
  constructor(tl) {
    this.TL = tl;
    this.opts = { idFront: 'frontface', idBack: 'backface', width: 0, height: 0 }; // template JSON can be oerloaded in instanciation
  }

  getElem(id) {
    return document.getElementById(id);
  }

  // ADD & REGISTER EFFECT
  addEffect(name, opts) {
    /**
     * register effect
     */
    // merge (overload) this.opts with params (opts)
    const mopts = { ...this.opts, ...opts };
    this.opt = JSON.parse(JSON.stringify(mopts));
    // const gsap = this.TL.GSAP;
    // const backFace = this.getElem(mopts.idBack);
    // const frontFace = this.getElem(mopts.idFront);
    // let angleY = Math.abs(gsap.getProperty(frontFace, 'rotateY'));
    // gsap.set(backFace, { rotateY: -180 });

    // let angleX = Math.abs(gsap.getProperty(frontFace, 'rotateX'));
    // gsap.set(backFace, { rotateX: 180 });

    // gsap.set([backFace, frontFace], {
    //   backfaceVisibility: 'hidden',
    // });

    this.TL.GSAP.registerEffect({
      name: name,
      defaults: {
        duration: 1,
        rotate: 0,
        rotateY: 0,
        rotateZ: 0,
        transformOrigin: '0% 0%',
        stagger: 0,
        repeat: 0,
        ease: 'none',
        force3D: true,
        onComplete: function () {},
        onStart: function () {},
        onUpdate: function () {
          // let angleX = Math.abs(gsap.getProperty(this.targets()[0], 'rotateX'));
          // let newAgleX = 0;
          // if (angleX > 0) newAgleX = angleX - 180;
          // let angleY = Math.abs(gsap.getProperty(this.targets()[0], 'rotateY'));
          // let newAgleY = 0;
          // if (angleY > 0) newAgleY = angleY - 180;
          // gsap.set(backFace, { rotateY: newAgleY, rotateX: newAgleX });
          // console.log(angleX);
          // console.log(angleY);
        },
      },
      extendTimeline: true,
      /**
       *
       * rotate ONLY on Y (rotateY) & x/z (rotate)
       * backface not working with rotateY + rotateX
       *
       */
      effect: (targets, config) => {
        return this.TL.GSAP.to(targets, {
          duration: config.duration,
          rotateY: config.rotateY,
          rotate: config.rotate,
          rotatex: config.rotatex,
          rotateZ: config.rotateZ,
          repeat: config.repeat,
          ease: config.ease,
          transformOrigin: config.transformOrigin,
          onComplete: config.onComplete,
          onStart: config.onStart,
          onUpdate: config.onUpdate,
        });
      },
    });
    /**
     * add timeline effect
     */
  }
}
