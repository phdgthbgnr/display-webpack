/**
 * just feed in the starting ease and the ending ease (and optionally an ease to do ﻿the blending), and it'll return a new Ease that's...blended!
 * example usage:
 * gsap.to("#target", {duration: 2, x: 100, ease: blendEases("back.in(1.2)", "bounce")});
 * https://greensock.com/docs/v3/HelperFunctions#blend-eases
 */
const blendEases = (startEase, endEase, blender) => {
  var parse = function (ease) {
      return typeof ease === 'function' ? ease : gsap.parseEase('power4.inOut');
    },
    s = gsap.parseEase(startEase),
    e = gsap.parseEase(endEase),
    blender = parse(blender);
  return function (v) {
    var b = blender(v);
    return s(v) * (1 - b) + e(v) * b;
  };
};

export { blendEases };
