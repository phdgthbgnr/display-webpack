export default class rainSVG {
  constructor(tl) {
    this.TL = tl;
  }

  addEffect(name) {
    this.TL.GSAP.registerEffect({
      name: name,
      effect: (targets, config) => {
        // let
      },
    });
  }
}
