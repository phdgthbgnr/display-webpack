'use strict';

export default class tweenInCanvas {
  constructor(tl, loops) {
    this.TL = tl;
    this.assets = [];
    this.assetsAtStart = [];
    this.Tick = null; // ticker
    this.isPlaying = false;
    this.ctx = null; // context2d
    this.cWidth = 0; // canvas.width;
    this.cHeight = 0; //. canvas.height;
    this.maxLoop = loops;
    this.nbLoops = 0;
    this.tickGSAPWhileHidden(true);
  }

  addEffect(name, props) {
    const { idCanvas } = props;
    const c = document.getElementById(idCanvas);
    this.ctx = c.getContext('2d');
    const bounds = c.getBoundingClientRect();
    this.cWidth = bounds.width;
    this.cHeight = bounds.height;
    const ref = this;
    this.uniqID = this.IDuniq();
    /**
     * register effect
     */
    this.TL.GSAP.registerEffect({
      name: name,
      effect: (targets, config) => {
        const o = this.addAsset(targets, config.transformOrigin, config.killAtEnd, config.renderAtStart, config.started);
        let KAE = o.killAtEnd;
        let RAS = o.renderAtStart;
        let DAS = o.defaultAtStart;
        let STD = o.started;
        // ---- get single transform from array (tween class)
        if (this.isArray(o)) {
          KAE = o[0].killAtEnd;
          RAS = o[0].renderAtStart;
          DAS = o[0].defaultAtStart;
          STD = o[0].started;
        }
        let tween = this.TL.GSAP.to;
        if (config.direction == 'from') tween = this.TL.GSAP.from;
        if (config.direction == 'set') tween = this.TL.GSAP.set;
        if (config.direction == 'fromTo') tween = this.TL.GSAP.fromTo; // TODO
        return tween(o, {
          duration: config.duration,
          x: config.x,
          y: config.y,
          scale: config.scale,
          rotate: config.rotate,
          ease: config.ease,
          stagger: config.stagger,
          repeat: config.repeat,
          globalAlpha: config.globalAlpha,
          onStart: config.onStart,
          killAtEnd: KAE,
          renderAtStart: RAS,
          defaultAtStart: DAS,
          started: STD,
          enable: config.enable,
          onComplete: function (ref) {
            if (this.vars.killAtEnd) {
              for (let i = 0; i < this.targets().length; i++) {
                const id = this.targets()[i].id;
                ref.clearAsset(id);
              }
            }
          },
          onCompleteParams: [ref],
          onStart: function (ref) {
            for (let i = 0; i < this.targets().length; i++) {
              const target = this.targets()[i];
              ref.killSameIDStarted(target.id);
              target.renderAtStart = true;
              target.started = true;
            }
            if (!ref.isPlaying && ref.Tick == null && ref.assets.length > 0) {
              ref.addTicker();
            }
          },
          onStartParams: [ref],
        });
      },
      defaults: {
        // direction: 'to',
        duration: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        ease: 'none',
        repeat: 0,
        stagger: 0,
        globalAlpha: 1,
        transformOrigin: '50% 50%',
        // onStart: null,
        killAtEnd: false, // if true remove assets from render list
        /**
         * render only when onStart is fired
         * naming totally inconsistent
         * */
        renderAtStart: false,
        defaultAtStart: false,
        started: false,
        enable: true,
      },
      extendTimeline: true,
    });
  }

  /**
   *
   * @param {*} o : DOM img element
   * @param {*} t : transform
   * @param {*} k : killAtEnd
   * @param {*} r : renderAtStart
   * @param {*} s : started
   * @returns
   */
  addAsset(o, t, k, r, s) {
    let props = null;
    if (o.length == 1) {
      props = this.addProps(o[0], t, k, r, s);
    }
    if (o.length > 1) {
      props = [];
      o.forEach((element, i, a) => {
        props.push(this.addProps(element, t, k, r, s));
      });
    }
    // add at start
    this.assets.push(props);
    return props;
  }

  addProps(o, t, k, r, s) {
    const width = o.width;
    const height = o.height;
    const unit = t.replace(/[0-9\.]+/g, '').split(' '); // remove number / keep alphabet
    const value = t.replace(/^[+-]?\d+(\.\d+)?$/, '').split(' '); // remove alphabet / keep number
    /**
     * set transformOrigin
     * set x,y from % to px
     */
    const trf = {
      x: unit[0] == 'px' ? parseFloat(value[0]) : (parseFloat(value[0]) * width) / 100,
      y: unit[1] == 'px' ? parseFloat(value[1]) : (parseFloat(value[1]) * height) / 100,
    };

    const props = {
      duration: 1,
      id: this.setID(o),
      image: o,
      x: 0,
      y: 0,
      width: width,
      height: height,
      scale: 1,
      rotate: 0,
      ease: 'none',
      stagger: 0,
      transformOrigin: trf,
      globalAlpha: 1,
      killAtEnd: k,
      renderAtStart: r,
      defaultAtStart: r,
      started: s,
      enable: true,
    };
    return props;
  }

  addTicker() {
    this.TL.GSAP.ticker.lagSmoothing(1000, 16);
    this.Tick = this.ticks.bind(this);
    this.TL.GSAP.ticker.add(this.Tick);
    this.isPlaying = true;
  }

  killTicker() {
    this.TL.GSAP.ticker.remove(this.Tick);
    this.Tick = null;
    this.isPlaying = false;
  }

  ticks() {
    this.ctx.clearRect(0, 0, this.cWidth, this.cHeight);
    for (let i in this.assets) {
      const a = this.assets[i];
      if (!this.isArray(a) && a.renderAtStart && a.enable) this.render(a);
      if (this.isArray(a)) {
        for (let ii in a) {
          if (a[ii].renderAtStart && a[ii].enable) this.render(a[ii]);
        }
      }
    }
  }

  render(a) {
    const { duration, id, image, x, y, width, height, scale, rotate, transformOrigin, globalAlpha } = a;
    const { w, h } = { w: width * scale, h: height * scale };
    // const { w2, h2 } = { w2: w / 2, h2: h / 2 }; // transformOrigin : center center
    const { w2, h2 } = { w2: transformOrigin.x, h2: transformOrigin.y };
    const { X, Y } = { X: x + w2, Y: y + h2 };
    this.ctx.translate(X, Y);
    this.ctx.globalAlpha = globalAlpha;
    let rad = (rotate * Math.PI) / 180;
    this.ctx.rotate(rad);
    this.ctx.drawImage(image, -w2 * scale, -h2 * scale, w, h);
    this.ctx.rotate(-rad);
    this.ctx.translate(-X, -Y);
  }

  /**
   * @param {} id
   */
  clearAsset(id) {
    for (let i in this.assets) {
      const a = this.assets[i];
      if (!this.isArray(a) && a.id == id && a.started) {
        a.enable = false;
        a.started = false;
      }
      if (this.isArray(a)) {
        for (let ii in a) {
          if (a[ii].id == id && a[ii].started) {
            a[ii].enable = false;
            a[ii].started = false;
          }
        }
      }
    }
  }

  clearAllAssets() {
    this.assets = [];
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.cWidth, this.cHeight);
  }

  setID(o) {
    return this.getIdfromElement(o) + this.concatClassList(o) + this.uniqID;
  }

  getIdfromElement(o) {
    let id = o.getAttribute('id');
    if (id == null) id = '';
    return id;
  }

  getAsset(id) {
    return this.assets[id];
  }

  concatClassList(o) {
    return o.classList.value.replace(/\s+/g, '');
  }
  /**
   *
   * @param {*} id
   * disable previous same ID from render queue
   */
  killSameIDStarted(id) {
    for (let i in this.assets) {
      const a = this.assets[i];
      if (!this.isArray(a) && a.id == id && a.started && a.enable) {
        a.enable = false;
        a.started = false;
      }
      if (this.isArray(a)) {
        for (let ii in a) {
          const aa = a[ii];
          if (aa.id == id && aa.started && aa.enable) {
            aa.enable = false;
            aa.started = false;
          }
        }
      }
    }
  }

  testEnd(tl, callback, params, callbackTimes) {
    const self = this;
    self.nbLoops++;
    console.log('testEnd');
    console.log(self.nbLoops, self.maxLoop);
    if (self.nbLoops < self.maxLoop) {
      self.TL.tLs[tl].pause();
      self.reinitAssets();
      self.killTicker();
      setTimeout(() => {
        this.clearCanvas();
        self.TL.tLs[tl].restart();
      }, 10);
    } else {
      self.killTicker();
      self.TL.tLs[tl].pause();
      if (callback) callback(params);
    }
  }

  reinitAssets() {
    for (let i in this.assets) {
      const a = this.assets[i];
      if (this.isArray(a)) {
        for (let ii in a) {
          const aa = a[ii];
          aa.enable = true;
          aa.renderAtStart = aa.defaultAtStart;
          aa.started = false;
          this.TL.timelines.main.killTweensOf(aa.id);
        }
      } else {
        a.enable = true;
        a.renderAtStart = a.defaultAtStart;
        a.started = false;
        this.TL.timelines.main.killTweensOf(a.id);
      }
    }
  }

  /**
   * for debug only
   */
  getAllAssets() {
    console.log(this.assets);
  }

  isArray(a) {
    return Array.isArray(a);
  }

  IDuniq() {
    const id = Math.random().toString(36).substring(7);
    return id;
  }

  /**
   *
   */
  tickGSAPWhileHidden(value) {
    if (value === false) {
      document.removeEventListener('visibilitychange', this.tickGSAPWhileHidden.fn);
      return clearInterval(this.tickGSAPWhileHidden.id);
    }
    const onChange = () => {
      clearInterval(this.tickGSAPWhileHidden.id);
      if (document.hidden) {
        this.TL.GSAP.ticker.lagSmoothing(0); // keep the time moving forward (don't adjust for lag)
        this.tickGSAPWhileHidden.id = setInterval(this.TL.GSAP.ticker.tick, 500);
      } else {
        this.TL.GSAP.ticker.lagSmoothing(1000, 16); // restore lag smoothing
      }
    };
    document.addEventListener('visibilitychange', onChange);
    this.tickGSAPWhileHidden.fn = onChange;
    onChange(); // in case the document is currently hidden.
  }
}
