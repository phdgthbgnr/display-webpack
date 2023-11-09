'use strict';

import { opposed } from '../modules/mathlib';

export default class haloCTA {
  constructor(tl) {
    this.TL = tl;
    this.opt = null;
    this.invert = false;
    this.parent = null;
    this.allowHover = true;
    this.duration = 0;
  }

  // ADD & REGISTER EFFECT
  addEffect(name, opt) {
    /**
     * register effect
     */
    const _self = this;
    _self.opt = opt;
    if (_self.opt.invertOnHalo && _self.opt.classInvert != '' && _self.opt.parent != '') {
      _self.invert = true;
      _self.parent = document.getElementById(_self.opt.parent);
      if (_self.opt.haloOnHover) {
        _self.parent.addEventListener('mouseover', _self.Hover.bind(_self), false);
        // this.parent.addEventListener(
        //   'mouseout',
        //   () => {
        //     const halo = document.getElementById(this.opt.idName);
        //     const tweens = this.TL.GSAP.getTweensOf(halo);
        //     console.log(tweens);
        //     tweens.forEach((elt) => {
        //       console.log(elt);
        //       elt.pause(0);
        //     });
        //   },
        //   false
        // );
      }
    }
    _self.TL.registerEffect({
      name: name,
      defaults: {
        duration: 1,
        transformOrigin: '0% 50%',
        x: 0,
        ease: 'none',
        onStart: () => {
          _self.allowHover = false;
        },
        onComplete: () => {
          _self.allowHover = true;
          if (_self.invert) {
            _self.parent.classList.remove(_self.opt.classInvert);
          }
        },
      },
      extendTimeline: true,
      effect: (targets, config) => {
        if (targets.length == 1) {
          const target = targets[0];
          const ctaWidth = _self.TL.GSAP.getProperty(target, 'width');
          const haloID = '#' + _self.opt.idName;
          const haloHeight = _self.TL.GSAP.getProperty(haloID, 'height');
          const haloWidth = _self.TL.GSAP.getProperty(haloID, 'width');
          const opp = opposedAA(20, haloHeight);
          const tl = new _self.TL.GSAP.timeline({});
          _self.duration = config.duration;
          tl.call(_self.addInvert.bind(_self), [], 0);
          tl.fromTo(
            haloID,
            { x: -(haloWidth + opp) },
            {
              duration: config.duration,
              x: ctaWidth + opp,
              ease: config.ease,
              transformOrigin: config.transformOrigin,
              onComplete: config.onComplete,
              onStart: config.onStart,
            },
            0
          );
          return tl;
        } else {
          console.log('No target or more than one target for halo effect');
        }
      },
    });
  }

  addInvert() {
    if (this.invert) {
      this.parent.classList.add(this.opt.classInvert);
    }
  }

  Hover() {
    if (this.allowHover) this.TL.GSAP.effects.halo('#CTA', { duration: this.duration }, 0);
  }
}
