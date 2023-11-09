// "PLUGIN" BLUR
// à mettre après la déclaration de la timeLine
// require('@modules/blurplugingsap.js')(TL);
//
module.exports = function (TL) {
  const blurProperty = TL.GSAP.utils.checkPrefix('filter'),
    blurExp = /blur\((.+)?px\)/,
    getBlurMatch = (target) => (TL.GSAP.getProperty(target, blurProperty) || '').match(blurExp) || [];

  TL.GSAP.registerPlugin({
    name: 'blur',
    get(target) {
      return +getBlurMatch(target)[1] || 0;
    },
    init(target, endValue) {
      let data = this,
        filter = TL.GSAP.getProperty(target, blurProperty),
        endBlur = 'blur(' + endValue + 'px)',
        match = getBlurMatch(target)[0],
        index;
      if (filter === 'none') {
        filter = '';
      }
      if (match) {
        index = filter.indexOf(match);
        endValue = filter.substr(0, index) + endBlur + filter.substr(index + match.length);
      } else {
        endValue = filter + endBlur;
        filter += filter ? ' blur(0px)' : 'blur(0px)';
      }
      data.target = target;
      data.interp = TL.GSAP.utils.interpolate(filter, endValue);
    },
    render(progress, data) {
      data.target.style[blurProperty] = data.interp(progress);
    },
  });
};
