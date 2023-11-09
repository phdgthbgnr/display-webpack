/**
 * UNIQUEMENT LA TIMELINE
 * plus d'accès direct au DOM
 * on doit passer par des objets
 */

import { gsap, TweenLite, TimelineLite, TimelineMax } from '@core/gsap-core.js';
// import { CSSPlugin } from '../CSSPlugin.js';
// var gsapWithCSS = gsap.registerPlugin(CSSPlugin) || gsap,
// to protect from tree shaking
// TweenMaxWithCSS = gsapWithCSS.core.Tween;
export {
  // gsapWithCSS as gsap,
  // gsapWithCSS as default,
  // CSSPlugin,
  // TweenMaxWithCSS as TweenMax,
  gsap,
  gsap as default,
  TweenLite,
  TimelineMax,
  TimelineLite,
};
