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
import MorphSVGPlugin from '@plugins/MorphSVGPlugin';
// import Bezier from '@modules/Bezier';

// ENREGISTRER LES PLUGINS ICI : ---------------------------
TL.registerPlugin(MorphSVGPlugin);

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
  TL.addTimeLine('main', 2, false);
  TL.setMaskDuration(0.3);

  TL.timelines.mask.to('#maskintro', { duration: TL.maskDuration, autoAlpha: 0 }, TL.setCurTime('mask', 0)); // fondu du masque
  TL.timelines.main
    /**
     *  ecran 0
     */
    /**
     * ecran 1
     */
    .from('#logo', { duration: 1, opacity: 0, y: -30, ease: 'power3.out' }, TL.setCurTime('screen1', 0))
    .to('#hair', { duration: 2, morphSVG: '#hairmoprh', repeat: -1, yoyo: true, ease: 'none' }, TL.setCurTime('screen1', 0))
    .to('#mask-skirt', { duration: 2, morphSVG: '#maskmorph', repeat: -1, yoyo: true, ease: 'none' }, TL.setCurTime('screen1', 0))
    .to('#skirt use', { duration: 2, skewY: 10, repeat: 10, yoyo: true, transformOrigin: '50% 50%' }, TL.setCurTime('screen1', 0))
    .to('#skirt use', { duration: 2, x: '+=5', repeat: 10, yoyo: true, transformOrigin: '50% 50%' }, TL.setCurTime('screen1', 0))
    .to('#skirt use', { duration: 2, y: '+=5', repeat: 10, yoyo: true, transformOrigin: '50% 50%' }, TL.setCurTime('screen1', 0))
    .from('.prods', { duration: 1, xPercent: 50, ease: 'sine.inOut', stagger: 0.05 }, TL.setCurTime('screen1', 0))
    .from('.txts', { duration: 3, xPercent: 100, ease: 'expo.out', stagger: 0.05 }, TL.setCurTime('screen1', 0))
    .from('.flats', { duration: 3, xPercent: 100, ease: 'expo.out', stagger: 0.05 }, TL.setCurTime('screen1', 0))
    .from('.flats', { duration: 4, scaleX: 0, ease: 'expo.out', stagger: 0.05 }, TL.setCurTime('screen1', 0))
    .from('#vectos', { duration: 1.5, xPercent: 70, ease: 'sine.out' }, TL.setCurTime('screen1', 0))
    .from('#new', { duration: 1, scale: 0, ease: 'elastic(1,.85)' }, TL.setCurTime('screen1', 1.5))
    .to('#new', { duration: 0.1, scale: 1.1, repeat: 3, yoyo: true, ease: 'none' }, TL.setCurTime('screen1', 2.5))
    .from('#CTA', { duration: 1, opacity: 0, y: 20, ease: 'power3.out' }, TL.setCurTime('screen1', 1))
    /**
     * ecran 2
     */
    .to('.fade,#txta', { duration: 1, xPercent: -100, ease: 'power1.inOut', stagger: 0.05 }, TL.setCurTime('screen2', 4))
    .from('#ecran2', { duration: 1, xPercent: 100, ease: 'power1.inOut' }, TL.setCurTime('screen2', 0))
    .from('#vahine', { duration: 2, scale: 0.744, x: 84, y: -10, ease: 'sine.out', transformOrigin: '50% 100%' }, TL.setCurTime('screen2', 0))
    .from('.txtbs', { duration: 0.6, opacity: 0, ease: 'none', stagger: 0.2 }, TL.setCurTime('screen2', 0.6))
    .from('#flat3', { duration: 2, scaleX: 0, ease: 'expo.out' }, TL.setCurTime('screen2', 1))
    .from('#new1', { duration: 1, scale: 0, ease: 'elastic(1,.85)' }, TL.setCurTime('screen2', 1.5))
    .to('#new1', { duration: 0.1, scale: 1.1, repeat: 3, yoyo: true, ease: 'none' }, TL.setCurTime('screen2', 2.5))
    /**
     * ecran 3
     */
    .from('#ecran3', { duration: 0.3, opacity: 0 }, TL.setCurTime('screen3', 8))
    .to('.fade2', { duration: 0.6, xPercent: -100, opacity: 0, ease: 'power2.in', stagger: 0.05 }, TL.setCurTime('screen3', 0))
    .to('#vahine', { duration: 0.6, opacity: 0, ease: 'none' }, TL.setCurTime('screen3', 0))
    .from('#pastille', { duration: 1, opacity: 0, y: -50, ease: 'sine.out' }, TL.setCurTime('screen3', 0.4))
    .from('#pictos', { duration: 1, opacity: 0, y: 50, ease: 'sine.out' }, TL.setCurTime('screen3', 0.4))
    .to('#picto1', { duration: 2, rotate: 0, ease: 'sine.out' }, TL.setCurTime('screen3', 0.4))
    /**
     * ecran 4
     */
    .from('#ecran4', { duration: 0.3, opacity: 0 }, TL.setCurTime('screen4', 11.5))
    .to('#pictos', { duration: 0.5, xPercent: 100, ease: 'power2.in' }, TL.setCurTime('screen4', 0))
    .to('#prod3', { duration: 0.6, scale: 0.831, x: 133, ease: 'power2.inOut' }, TL.setCurTime('screen4', 0.2))
    .from('.prodsf', { duration: 1, xPercent: -60, ease: 'sine.out', stagger: 0.05 }, TL.setCurTime('screen4', 0.2))
    .to('#pastille', { duration: 0.1, scale: 0.9, repeat: 5, yoyo: true, ease: 'none' }, TL.setCurTime('screen4', 1.5))

    // .call(TL.testLoopEnd.bind(TL), ['main', 2, true], TL.setCurTime('screen4', 2))

    /**
     * Timeline name
     * display time in console true/false
     * callback
     * callback param
     * boolean : false execute callback when nbLoop >= maxLoop / true execute every testEnd
     *
     */
    .call(TL.testEnd.bind(TL), ['main', null, null, true], TL.setCurTime('screen4', 3.3));
});
