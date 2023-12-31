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
// import CSS from '@WQ/cssClass';

// ---------------------------------------------------------

// IMPORTER LES PLUGINS / MODULES ICI: ---------------------
// import CustomEase from '@plugins/CustomEase';
// import Bezier from '@modules/Bezier';

// ENREGISTRER LES PLUGINS ICI : ---------------------------
// TL.registerPlugin(CustomEase);

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
  TL.setMaskDuration(0.3);

  TL.timelines.mask.to('#maskintro', { duration: TL.maskDuration, autoAlpha: 0 }, TL.setCurTime('mask', 0)); // fondu du masque
  TL.timelines.main
    /**
     *  ecran 0
     */
    .from('#logo', { duration: 0.8, opacity: 0, y: 70, ease: 'power3.out' }, TL.setCurTime('screen0', 0))
    // .call(TL.pauseTimeLine.bind(TL), ['main'], TL.setCurTime('screen0', 1))
    /**
     * ecran 1
     */
    .from('#ecran1', { duration: 0.3, opacity: 0, ease: 'power2.out' }, TL.setCurTime('screen1', 1.5))
    .from('#CTA', { duration: 0.5, opacity: 0, ease: 'power2.out' }, TL.setCurTime('screen1', 0))
    .from('#rect', { duration: 0.5, scaleX: 0, ease: 'power3.out' }, TL.setCurTime('screen1', 0))
    .from('.visus', { duration: 0.5, opacity: 0, x: 30, ease: 'sine.out', stagger: 0.15 }, TL.setCurTime('screen1', 0))
    .from('#logo1', { duration: 0.6, scale: 0, ease: 'elastic(1,.85)' }, TL.setCurTime('screen1', 0.3))
    .from('#claim', { duration: 0.5, opacity: 0, x: -30, ease: 'sine.out' }, TL.setCurTime('screen1', 0.3))
    .from('#txt', { duration: 0.6, opacity: 0, y: -20, ease: 'power2.out' }, TL.setCurTime('screen1', 0.3))
    // .from('#txt1', { duration: 0.6, scaleX: 0, ease: 'elastic(1,.85)' }, TL.setCurTime('screen1', 0.5))
    // .from('#das', { duration: 0.4, opacity: 0, ease: 'power2.out' }, TL.setCurTime('screen1', 0.5))
    .to('.tel21', { duration: 1, y: -3, repeat: 10, yoyo: true, ease: 'sine.inOut' }, TL.setCurTime('screen1', 0.5))
    .to('.tel2', { duration: 1, y: -3, repeat: 10, yoyo: true, ease: 'sine.inOut' }, TL.setCurTime('screen1', 0.7))
    /**
     * ecran 2
     */
    // .from('#ecran2', { duration: 0.3, opacity: 0, ease: 'power2.out' }, TL.setCurTime('screen2', 4.5))
    // .to('#das', { duration: 0.4, opacity: 0, ease: 'power2.out' }, TL.setCurTime('screen2', 0))
    // .from('#claquos', { duration: 0.4, scale: 0, transformOrigin: '50% 50%', ease: 'power2.out' }, TL.setCurTime('screen2', 0.2))
    // .to('#tomove', { duration: 3, rotate: '+=180', transformOrigin: '0% 50%' }, TL.setCurTime('screen2', 0.4))
    // .from('#clic', { duration: 0.6, opacity: 0, x: 50, ease: 'power3.out' }, TL.setCurTime('screen2', 0.4))
    // .to('#txt1', { duration: 0.05, scale: 0.95, repeat: 7, yoyo: true, repeatDelay: 0.02, ease: 'none' }, TL.setCurTime('screen2', 3))

    /**
     * Timeline name
     * callback
     * callback param
     * execute testEnd every loop : true / only at end : false
     *
     */
    .call(TL.testEnd.bind(TL), ['main', null, null, true], TL.setCurTime('screen1', 8));
});
