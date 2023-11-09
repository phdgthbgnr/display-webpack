'use strict';

/**
 * USE with Tween In Canvas
 */

export default class TL2 {
  constructor(gsap) {
    // console.time('init');
    const self = this;
    self.GSAP = gsap;
    self.cPLs = {}; // cuepoints List
    self.tLs = {}; // timelines
    self.ended = false;
    self.maskDuration = 0.3;
    try {
      self.eventLoaded = new Event('loaded', { bubbles: true, cancelable: true });
    } catch {
      // for shitty browsers
      self.eventLoaded = document.createEvent('Event');
      self.eventLoaded.initEvent('loaded', true, true);
    }

    self.GSAP.config({
      force3D: true,
    });
    //
    window.addEventListener('load', function handler(e) {
      document.dispatchEvent(self.eventLoaded);
      // window.removeEventListener('load', handler);
      self.loaded();
    });

    this.timelines = self.tLs;
    this.pauseAllTimeLines = this.pATLs;
    this.playTimeLine = this.pLTs;
    this.addTimeLine = this.aTL;
    this.removeTimeLine = this.rTL;
    this.resumeAllTimeLines = this.rATLs;
  }

  removeLoadedEvent(e) {
    console.log(e.currentTarget);
    e.currentTarget.removeEventListener('loaded', this.eventLoaded, true);
  }

  $(id, boo) {
    const elem = null || document.getElementById(id);
    if (elem == null && boo) console.log('%cERREUR : id "' + id + '" introuvable', 'color:#ff1d00;font-size:14px;font-weight:bold');
    return elem;
  }

  swipe(top) {
    this.lmtext.style.top = top;
  }

  loaded() {
    this.mlink = this.$('mentions-link', false);
    this.mlback = this.$('mentions-back', false);
    this.lmtext = this.$('mentions', false);
    if (this.mlink && this.mlback) {
      this.mlink.addEventListener('mouseover', (e) => {
        this.swipe(0);
        this.pATLs();
      });
      this.mlback.addEventListener('click', (e) => {
        this.swipe('100%');
        this.rATLs();
      });
    }
  }

  registerPlugin(p) {
    this.GSAP.registerPlugin(p);
  }
  /**
   * ajout un cuepoint de départ d'animation
   * @param {*} sc : nom du cuepoint
   * @param {*} t : délai de départ :
   * 1ere occurence : defini la position de depart du nouveau cuepoint
   * 2eme et suivant : position temporelle AJOUTEE à la 1ere occurrence
   */
  setCurTime(sc, t) {
    let startTime = 0;
    if (this.has(this.cPLs, sc)) {
      this.cPLs[sc].push(t);
      startTime = this.cPLs[sc][0];
    } else {
      this.cPLs[sc] = [t];
    }
    return startTime + t;
  }

  has(object, key) {
    return Object.prototype.hasOwnProperty.call(object, key);
  }

  /**
   *
   * @param {*} name : Timeline Name
   * @param {*} maxloop : nb max loop
   * @param {*} rf : repeatRefresh (set to falseon main timeline
   */
  aTL(name, maxloop, rf) {
    if (this.has(this.tLs, name)) {
      console.log('Le nom de la timeLine est déjà présent : ' + name);
    } else {
      this.GSAP.defaults({
        // onUpdate: function () {
        //   const o = this.targets()[0];
        //   for (const key in o) {
        //     // console.log(key);
        //   }
        // },
      });
      this.tLs[name] = new this.GSAP.timeline({
        id: name,
        onComplete: this.completeTL,
        onRepeat: this.repeatTL,
        repeat: maxloop - 1,
        repeatRefresh: rf,
        onRepeatParams: [
          {
            name: name,
            maxLoop: maxloop,
            lpD: 0, // loop duration
            customLoops: 0,
            _this: this,
          },
        ],
        onCompleteParams: [
          {
            name: name,
            maxLoop: maxloop,
            lpD: 0, // loop duration
            customLoops: 0,
            _this: this,
          },
        ],
        data: { nbLoop: 0, maxLoop: maxloop, lpD: 0, customLoops: 0 },
      });
      // this.tLs[name].data = {'nbLoop': 0};
      // this.tLs[name].onCompleteParams = {name:name};
    }
  }

  rTL(name) {
    if (this.isTimeLinePresent(name)) {
      this.tLs[name].kill();
      this.tLs[name] = null;
      delete this.tLs[name];
    }
  }

  isTimeLinePresent(name) {
    return this.has(this.tLs, name);
  }

  setMaskDuration(d) {
    if (isNaN(d)) {
      console.log('maskDuration mist be a number');
    } else {
      this.maskDuration = d;
    }
  }
  /**
   *
   * @param {*} e
   * ce callback est appelé à chaque itération de la boucle d'animation
   * elle n'est appelé qu'à la fin dans le cas de l'appel à testLoop
   */
  repeatTL(e) {
    switch (e.name) {
      case 'main':
        // console.log("repeat main");
        // e._this.tLs[e.name].data.nbLoop++;
        //  if(e._this.tLs[e.name].data.nbLoop < e.maxLoop) e._this.tLs[e.name].play(0);
        break;
      case 'flag':
        // e._this.tLs[e.name].play(0);
        break;

      default:
        break;
    }
  }
  /**
   *
   * @param {*} e
   * ce callback est appelé à la fin de toutes les boucles d'itération
   * elle est appelé seulement quand testLoop n'est pas utilisé
   */
  completeTL(e) {
    // console.log('complete ', e.name);
    switch (e.name) {
      case 'main':
        // console.log("complete main");
        // e._this.tLs[e.name].data.nbLoop++;
        // if (e._this.tLs[e.name].data.nbLoop >= e._this.tLs[e.name].data.maxLoop)
        //   e._this.tLs[e.name].pause();
        break;
      case 'flag':
        e._this.tLs[e.name].play(0);
        break;

      default:
        break;
    }
  }

  pATLs() {
    for (let c in this.tLs) {
      this.tLs[c].pause();
    }
  }

  pauseTimeLine(tl) {
    this.tLs[tl].pause();
  }

  rATLs() {
    if (!this.ended) {
      for (let c in this.tLs) {
        this.tLs[c].play();
      }
    }
  }

  pLTs(tl) {
    this.tLs[tl].play();
  }
}
