import gsap from '../gsapcore/gsap-core.js';
import CSSPlugin from './gsapcore/CSSPlugin.js';
var gsapWithCSS = gsap.registerPlugin(CSSPlugin) || gsap, // to protect from tree shaking
  TweenMaxWithCSS = gsapWithCSS.core.Tween;

export { gsapWithCSS as gsap, gsapWithCSS as default, CSSPlugin, TweenMaxWithCSS as TweenMax };
export {
  TweenLite,
  TimelineMax,
  TimelineLite,
  Power0,
  Power1,
  Power2,
  Power3,
  Power4,
  Linear,
  Quad,
  Cubic,
  Quart,
  Quint,
  Strong,
  Elastic,
  Back,
  SteppedEase,
  Bounce,
  Sine,
  Expo,
  Circ,
  wrap,
  wrapYoyo,
  distribute,
  random,
  snap,
  normalize,
  getUnit,
  clamp,
  splitColor,
  toArray,
  mapRange,
  pipe,
  unitize,
  interpolate,
  shuffle,
  selector,
} from '../gsapcore/gsap-core.js';
export * from '../gsapcore/CSSRulePlugin.js';
export * from '../gsapcore/CustomEase.js';
export * from '../gsapcore/Draggable.js';
export * from '../gsapcore/EaselPlugin.js';
export * from '../gsapcore/EasePack.js';
export * from '../gsapcore/Flip.js';
export * from '../gsapcore/MotionPathPlugin.js';
export * from '../gsapcore/Observer.js';
export * from '../gsapcore/PixiPlugin.js';
export * from '../gsapcore/ScrollToPlugin.js';
export * from '../gsapcore/ScrollTrigger.js';
export * from '../gsapcore/TextPlugin.js';

//BONUS EXPORTS
//export * from "./DrawSVGPlugin.js";
//export * from "./Physics2DPlugin.js";
//export * from "./PhysicsPropsPlugin.js";
//export * from "./ScrambleTextPlugin.js";
//export * from "./CustomBounce.js";
//export * from "./CustomWiggle.js";
//export * from "./GSDevTools.js";
//export * from "./InertiaPlugin.js";
//export * from "./MorphSVGPlugin.js";
//export * from "./MotionPathHelper.js";
//export * from "./ScrollSmoother.js";
//export * from "./SplitText.js";
