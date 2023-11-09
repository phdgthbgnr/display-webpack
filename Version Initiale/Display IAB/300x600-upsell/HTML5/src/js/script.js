'use strict';
import gsap from '@WQ/normal'; // with CSS normal mode
// import gsap from '@WQ/minimal'; // without CSS : for tween in canvas
// import gsap from '@WQ/all'; // with all GSAP plugins (never used ?)
import './../css/sass/content.scss';
// window.Bezier = require('./vendor/bezier').Bezier; // not working in ie11
// window.Warp = require('./vendor/warp.js'); // not working in ie11
/*
 * DECLARATION DES PLUGINS
 *
 * EaselPlugin :          EaselPlugin.min.js
 * CSSRulePlugin :        CSSRulePlugin.min.js
 * MotionPathPlugin :     MotionPathPlugin.min.js
 * PixiPlugin :           PixiPlugin.min.js
 * ScrollToPlugin :       ScrollToPlugin.min.js
 * TextPlugin :           TextPlugin.min.js
 * Draggable :            Draggable.min.js
 * DrawSVGPlugin :        DrawSVGPlugin.min.js
 * Physics2DPlugin :      Physics2DPlugin.min.js
 * PhysicsPropsPlugin :   PhysicsPropsPlugin.min.js
 * InertiaPlugin :        InertiaPlugin.min.js
 * MorphSVGPlugin :       MorphSVGPlugin.min.js
 * ScrollTrigger :        ScrollTrigge.min.js
 * Flip :                 Flip.js
 * InertiaPlugin          InertiaPlugin.js
 * ScrambleTestPlugin :   ScrambleTestPlugin.js
 * ScrollTrigger :        ScrollTrigger.js
 * SplitText :            SplitText.js
 *
 *
 * CustomEase : CustomEase.min.js
 *    -> CustomBounce : CustomBounce.min.js
 *    -> CustomWiggle : CustomWiggle.min.js
 *
 * Extra Eases : EasePack.js
 *    --> RoughEase : import { RoughEase } from '@plugins/EasePack';
 *    --> ExpoScaleEase : import { ExpoScaleEase } from "@plugins/EasePack";
 *    --> import { SlowMo } from "@plugins/EasePack";
 *
 * TL.registerPlugin(RoughEase); // etc...
 *
 * https://greensock.com/docs/v3/Plugins/SplitTextPlugin
 *
 **/
// import core gsap + TL (REQUIRED) ------------------------
// gsap -> TL.GSAP
import TL2 from '@WQ/TL2';
const TL = new TL2(gsap);

// plugin BLUR
// require('@modules/blurplugingsap.js')(TL);

// polyfill path2D
// require('@polyfills/path2dpolyfills.js');

// EFFECTS -------------------------------------------------
// import rainSVG from '@effects/rainSVG';
// const rainSVG1 = new rainSVG(TL);

// import { distance } from '@helpers/various';
// console.log(distance(3, 5, 10, 12));

// import { degToRad } from '@helpers/trigo-lib';
// console.log(degToRad(30));
// ---------------------------------------------------------

// OPTIONAL ------------------------------------------------
// pour l'ajout de la compatibilité ie11 classlist sur les élements SVG, décommenter la ligne d'import dans vendor/gsapcore/cssClass.js)
// import method CSS.addClass & CSS.removeClass
// ajoute ou supprime une class css sur un élément
// import CSS from '@core/cssClass';

// ---------------------------------------------------------

// IMPORTER LES PLUGINS / MODULES ICI: ---------------------
import DrawSVGPlugin from '@plugins/DrawSVGPlugin';
// import Bezier from '@modules/Bezier';

// ENREGISTRER LES PLUGINS ICI : ---------------------------
TL.registerPlugin(DrawSVGPlugin);

// APPELER ICI les Class custom
// import myClass from './customclass/myClass';
// const myclass = new myClass();

// gsap ----------------------------------------------------
// gsap s'appelle avec TL.GSAP

// Méthodes disponibles de l'objet TL :

// .call(CSS.addClass, ['#CTA', 'invert'], TL.setCurTime('screen1', 1)) : ajoute une classe css sur un élément
// .call(CSS.removeClass, ['#CTA', 'invert'], TL.setCurTime('screen1', 1)) : supprime une classe css sur un élément

// .call(TL.playTimeLine.bind(TL), ['test'], TL.setCurTime('screen1', 1)) : joue une timeline
// .call(TL.pauseTimeLine.bind(TL), ['main'], TL.setCurTime('screen3', 1)) : pause une timeline
// .call(TL.jumpTo.bind(TL), ['main', 'screen3', 0], TL.setCurTime('screen0', 1)) : saute à l'intérieur d'une timeline sur un index temporel d'un écran spécifique

// .call(TL.testLoop.bind(TL), ['main', 2, true], TL.setCurTime('screen4', 2)) : x boucles jusqu'à ce test et continue jusqu'au dernier écran
// .call(TL.testLoopEnd.bind(TL), ['main', 2, true], TL.setCurTime('screen4', 2)) :  : x boucles de la durée totale de l'animation et arrêt à ce test
// .call(TL.testEnd.bind(TL), ['main', true, null, null], TL.setCurTime('screen5', 4)); x boucles de la totalité de l'animation

// CustomEase.create('hop', 'M0,0 C0,0 0.056,0.442 0.175,0.442 0.294,0.442 0.332,0 0.332,0 0.332,0 0.414,1 0.671,1 0.991,1 1,0 1,0');

document.addEventListener('loaded', (e) => {
  TL.addTimeLine('mask', 1, false);
  TL.addTimeLine('main', 3, false);
  TL.addTimeLine('pigeon1', 0, false);
  TL.addTimeLine('pigeon2', 0, false);
  TL.setMaskDuration(0.3);

  const tubes = '#b1,#b2,#b3,#b4,#b5,#b6,#b7';
  const tubesf = '#b1f,#b2f,#b3f,#b4f,#b5f,#b6f,#b7f';

  TL.timelines.pigeon1
    .to('#wing11', { duration: 0.15, opacity: 0, repeat: 10, yoyo: true, ease: 'none', repeatDelay: 0.1 }, 0)
    .to('#wing12', { duration: 0.15, opacity: 1, repeat: 10, yoyo: true, ease: 'none', repeatDelay: 0.1 }, 0);

  TL.timelines.pigeon2
    .to('#wing21', { duration: 0.15, opacity: 1, repeat: 10, yoyo: true, ease: 'none', repeatDelay: 0.1 }, 0)
    .to('#wing22', { duration: 0.15, opacity: 0, repeat: 10, yoyo: true, ease: 'none', repeatDelay: 0.1 }, 0);

  TL.timelines.mask.to('#maskintro', { duration: TL.maskDuration, autoAlpha: 0 }, TL.setCurTime('mask', 0)); // fondu du masque
  TL.timelines.main
    /**
     * ecran 1
     */
    // .call(TL.jumpTo.bind(TL), ['main', 'screen2', 0], TL.setCurTime('screen1', 0))
    .from('#ecran1', { duration: 0.3, opacity: 0 }, TL.setCurTime('screen1', 0))
    .set('#vectos', { visibility: 'visible' }, TL.setCurTime('screen1', 0))
    .from('#balloons', { duration: 4, scale: 0.633, y: 150, ease: 'sine.out', transformOrigin: '50% 50%' }, TL.setCurTime('screen1', 0))
    .to('#screens', { duration: 4, yPercent: 66, ease: 'sine.out', transformOrigin: '50% 0%' }, TL.setCurTime('screen1', 0))
    .to(tubes, { duration: 0.2, scaleY: 0.75, repeat: 23, yoyo: true, transformOrigin: '50% 100%', stagger: -0.01, ease: 'sine.inOut' }, TL.setCurTime('screen1', 0))
    .from('#clouds11', { duration: 3, xPercent: -60, ease: 'none' }, TL.setCurTime('screen1', 0))
    .from('#clouds12', { duration: 3, xPercent: 60, ease: 'none' }, TL.setCurTime('screen1', 0))
    .from('#clouds21', { duration: 3, xPercent: -100, ease: 'none' }, TL.setCurTime('screen1', 0))
    .from('#clouds22', { duration: 3, xPercent: 100, ease: 'none' }, TL.setCurTime('screen1', 0))
    .from('#clouds31', { duration: 5, xPercent: 100, ease: 'none' }, TL.setCurTime('screen1', 0))
    .from('#sat', { duration: 5, xPercent: -100, ease: 'none' }, TL.setCurTime('screen1', 0))
    .fromTo('#pigeon1', { x: -280 }, { duration: 2, x: 100, ease: 'none', stagger: 0.3 }, TL.setCurTime('screen1', 0.3))
    .fromTo('#pigeon2', { x: -290 }, { duration: 2, x: 100, ease: 'none', stagger: 0.3 }, TL.setCurTime('screen1', 0.3))
    .to('#balloons', { duration: 2, scale: 2.5, y: -200, ease: 'sine.in', transformOrigin: '50% 50%' }, TL.setCurTime('screen1', 4))
    .to('#screens', { duration: 2, yPercent: 100, ease: 'sine.in', transformOrigin: '50% 50%' }, TL.setCurTime('screen1', 4))
    .set('#mentions-link', { visibility: 'visible' }, TL.setCurTime('screen1', 0))
    .from('.claims', { duration: 0.6, opacity: 0, y: 50, ease: 'power2.inOut', stagger: 0.15 }, TL.setCurTime('screen1', 0))
    // .from('#CTA', { duration: 1, blur: 20 }, TL.setCurTime('screen1', 1))
    /**
     * ecran 2
     */
    .from('#ecran2,#end', { duration: 0.3, opacity: 0, ease: 'none' }, TL.setCurTime('screen2', 5))
    .to('#ecran1', { duration: 0.3, opacity: 0, ease: 'none' }, TL.setCurTime('screen2', 0))
    .from('.argus', { duration: 0.6, opacity: 0, y: 50, ease: 'power2.inOut', stagger: 0.15 }, TL.setCurTime('screen2', 0))
    .from('#livebox', { duration: 0.2, opacity: 0, ease: 'none' }, TL.setCurTime('screen2', 0))
    .from('#borderbox', { duration: 0.5, drawSVG: 0, ease: 'power2.inOut' }, TL.setCurTime('screen2', 0.2))
    .from('#box', { duration: 0.5, opacity: 0, ease: 'none' }, TL.setCurTime('screen2', 0.7))
    .from('.argubs', { duration: 0.6, opacity: 0, x: 50, ease: 'elastic(1,.85)', stagger: 0.3 }, TL.setCurTime('screen2', 1.5))
    .from('.bullets', { duration: 0.6, opacity: 0, x: -30, ease: 'elastic(1,.85)', stagger: 0.3 }, TL.setCurTime('screen2', 1.5))
    .from('#cloud1f', { duration: 4, xPercent: -60, ease: 'none' }, TL.setCurTime('screen2', 0))
    .from('#cloud2f', { duration: 4, xPercent: 60, ease: 'none' }, TL.setCurTime('screen2', 0))
    .from('#stars > *', { duration: 0.5, rotate: -90, scale: 0, ease: 'sine.inOut', transformOrigin: '50% 50%', stagger: -1 }, TL.setCurTime('screen2', 0.5))
    // .fromTo('#balloon', { x: -200, y: 50 }, { duration: 0.6, x: -25, y: 20, ease: 'none', transformOrigin: '100% 50%' }, TL.setCurTime('screen3', 0))
    //
    .fromTo('#balloonf', { x: -300 }, { duration: 1, x: -133, ease: 'none', transformOrigin: '50% 50%' }, TL.setCurTime('screen2', 0))
    .to('#balloonf', { duration: 2, x: -60, ease: 'none', transformOrigin: '500% 50%' }, TL.setCurTime('screen2', 1))
    .from(tubesf, { duration: 2, scaleY: 0, transformOrigin: '50% 100%', stagger: 0.285, ease: 'elastic(1,.85)' }, TL.setCurTime('screen2', 1))
    .to('#balloonf', { duration: 1.5, x: 200, ease: 'none', transformOrigin: '50% 50%' }, TL.setCurTime('screen2', 3))

    /**
     * Timeline name
     * display time in console true/false
     * callback
     * callback param
     * boolean : false execute callback when nbLoop >= maxLoop / true execute every testEnd
     *
     */
    .call(TL.testEnd.bind(TL), ['main', false, null, null, true], TL.setCurTime('screen2', 4.7));
});
