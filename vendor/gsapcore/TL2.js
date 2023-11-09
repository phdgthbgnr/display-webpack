'use strict';
import gsap from './gsap';

export default class TL2 {
  constructor() {
    // console.time('init');
    const self = this;
    self.GSAP = gsap;
    self.cPLs = {}; // cuepoints List
    self.tLs = {}; // timelines
    self.ended = false;
    self.maskDuration = 0.3;
    self.eventLoaded = document.createEvent('Event');
    self.eventLoaded.initEvent('loaded', true, true);
    // msg Log
    self.log1 = ' DUREE : ';
    self.log2 = ' BOUCLE : ';
    self.log3 = ' DUREE TOTALE : ';
    //
    window.addEventListener('load', (e) => {
      document.dispatchEvent(self.eventLoaded);
      this.loaded();
    });
    this.timelines = self.tLs;
    this.pauseAllTimeLines = this.pATLs;
    this.playTimeLine = this.pLTs;
    this.addTimeLine = this.aTL;
    this.removeTimeLine = this.rTL;
    this.resumeAllTimeLines = this.rATLs;
    this.getTime = this.gTm;
  }

  $(id, boo) {
    const elem = null || document.getElementById(id);
    if (elem == null && boo) this.LogColor('%cERREUR : id "' + id + '" introuvable', 'color:#ff1d00;font-size:14px;font-weight:bold');
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
      });
      this.mlback.addEventListener('click', (e) => {
        this.swipe('100%');
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
      this.Log('Le nom de la timeLine est déjà présent : ' + name);
    } else {
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
    if (this.has(this.tLs, name)) {
      delete this.tLs[name];
    }
  }

  isTimeLinePresent(name) {
    return this.has(this.tLs, name);
  }

  setMaskDuration(d) {
    if (isNaN(d)) {
      this.Log('maskDuration mist be a number');
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
        // self.Log("repeat main");
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
    // self.Log('complete ', e.name);
    switch (e.name) {
      case 'main':
        // self.Log("complete main");
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

  // duration
  getDuration(name) {
    // indépendant de timeScale
    return this.tLs[name].duration();
  }
  // totalDuration
  getTotalDuration(name) {
    // indépendant de timeScale
    return this.tLs[name].totalDuration();
  }
  // time
  gTm(name) {
    // renvoie la position actuelle de la tête de lecture
    // indépendant de timeScale
    // self.Log(this.tLs[name].time());
    return this.tLs[name].time();
  }
  // totalTime
  getTotalTime(name) {
    // renvoie la durée totale des animations (duree des tweening - indépendant du delay de départ)
    // indépendant de timeScale
    return this.tLs[name].totalTime();
  }
  // endTime
  getEndTime(name) {
    // ~ incrémente totaldurations
    // dépend de timeScale()
    return this.tLs[name].endTime();
  }
  // totalProgress
  getTotalProgress(name) {
    /*
     * 0   = beginning
     * 0.5 = halfway
     * 1   = end
     */
    return this.tLs[name].totalProgress();
  }
  // TODO
  getAllcuePoints() {
    for (let c in this.cPLs) {
      // self.Log(this.cPLs[c]);
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

  jumpTo(tl, sc, t) {
    const self = this;
    if (self.has(self.cPLs, sc)) {
      let res = true;
      self.cPLs[sc].forEach(function (e) {
        if (t > e) res = false;
      });
      if (res) {
        const t2 = self.cPLs[sc][0] + t;
        self.tLs[tl].seek(t2);
      } else {
        self.Log('Given duration exceed cuepoint on ' + sc + ' : ' + t);
      }
    } else {
      self.Log('no ' + sc + ' in cuepointslist');
    }
  }

  testEnd(tl, bool, callback, params) {
    const self = this;
    if (self.tLs[tl].data.customLoops == 0) self.tLs[tl].data.nbLoop++;
    if (self.tLs[tl].data.nbLoop >= self.tLs[tl].data.maxLoop) {
      if (bool && self.tLs[tl].data.lpD == 0) {
        self.Log('a ' + self.log1, self.gTm(tl));
        self.Log('a ' + self.log2, self.tLs[tl].data.nbLoop);
        self.Log('a ' + self.log3, self.gTm(tl) * self.tLs[tl].data.nbLoop + self.maskDuration);
        self.Log('------------------');
      }
      if (bool && self.tLs[tl].data.lpD > 0) {
        const duration = self.tLs[tl].data.lpD + (self.getTotalTime(tl) - self.tLs[tl].data.lpD / self.tLs[tl].data.customLoops);
        self.Log('b ' + self.log1, duration - self.tLs[tl].data.lpD);
        self.Log('b ' + self.log2, self.tLs[tl].data.nbLoop);
        self.Log('b ' + self.log3, duration + self.maskDuration);
        self.Log('------------------');
      }
      self.pATLs();
      self.ended = true;
    } else {
      if (self.tLs[tl].data.lpD == 0) {
        if (bool) {
          self.Log('c ' + self.log1, self.gTm(tl));
          self.Log('c ' + self.log2, self.tLs[tl].data.nbLoop);
          self.Log('c ' + self.log3, self.gTm(tl) * self.tLs[tl].data.nbLoop);
          self.Log('------------------');
        }
        self.tLs[tl].play(0);
      }
    }
    if (callback) callback(params);
  }

  testLoop(tl, nb, bool) {
    const self = this;
    self.tLs[tl].data.customLoops = nb;
    self.tLs[tl].data.nbLoop++;
    self.tLs[tl].data.lpD = self.gTm(tl) * self.tLs[tl].data.nbLoop;
    if (bool) {
      self.Log('d ' + self.log1, self.tLs[tl].data.lpD);
      self.Log('d ' + self.log2, self.tLs[tl].data.nbLoop);
      self.Log('------------------');
    }
    // self.Log(this.tLs[tl].data.lpD + this.tLs[tl].data.lpD / this.tLs[tl].data.customLoops);
    if (self.tLs[tl].data.nbLoop < nb) {
      self.tLs[tl].restart();
    }
  }

  Log() {
    if (typeof arguments == 'object') {
      const args = Array.prototype.slice.call(arguments);
      console.log(args.join(''));
    } else {
      console.log(arguments);
    }
  }

  LogColor(e, c) {
    console.log(e, c);
  }
}
