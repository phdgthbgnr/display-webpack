'use strict';
// import gsap from '@WQ/normal'; // with CSS normal mode
import gsap from '@WQ/minimal'; // without CSS : for tween in canvas
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
 * PLUGINS SANS DECLARATION :
 *
 * rough(), slow(), expoScale() : EasePack.min.js
 *
 * CustomEase : CustomEase.min.js
 *    -> CustomBounce : CustomBounce.min.js
 *    -> CustomWiggle : CustomWiggle.min.js
 *
 * https://greensock.com/docs/v3/Plugins/SplitTextPlugin
 *
 **/
// import core gsap + TL (REQUIRED) ------------------------
// gsap -> TL.GSAP
import TL2 from '@WQ/TL2';
const TL = new TL2(gsap);
TL.GSAP.defaults({ overwrite: true });

// plugin BLUR
// require('@modules/blurplugingsap.js')(TL);

// polyfill path2D
// require('@polyfills/path2dpolyfills.js');

// EFFECTS -------------------------------------------------
import tweenInCanvas from '@effects/tweenInCanvas';
const TIC = new tweenInCanvas(TL, 3);
TIC.addEffect('tic', {
  idCanvas: 'cnvs',
});

// ---------------------------------------------------------

// OPTIONAL ------------------------------------------------
// pour l'ajout de la compatibilité ie11 classlist sur les élements SVG, décommenter la ligne d'import dans vendor/wq/cssClass.js)
// import method CSS.addClass & CSS.removeClass
// ajoute ou supprime une class css sur un élément
// import CSS from '@core/cssClass';

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
  TL.addTimeLine('main', 1, false);

  TL.timelines.main
    /**
     * ecran 1
     */
    // .call(TL.jumpTo.bind(TL), ['main', 'screen6', 0], TL.setCurTime('screen1', 0))
    .tic('#bg', { direction: 'set', x: 0, y: 0, renderAtStart: true }, TL.setCurTime('screen1', 0))
    .tic('.argu', { direction: 'from', duration: 0.5, x: 60, ease: 'power4.out', stagger: 0.15, globalAlpha: 0 }, TL.setCurTime('screen1', 0))
    .tic('#argu4', { direction: 'from', duration: 0.6, y: 60, globalAlpha: 0, ease: 'power4.out', renderAtStart: true }, TL.setCurTime('screen1', 0.7))
    // .call(TL.pauseTimeLine.bind(TL), ['main'], TL.setCurTime('screen1', 1))
    /**
     * ecran 2
     */
    .tic('.argus', { duration: 0.3, x: -300, ease: 'power2.inOut', stagger: 0.1, killAtEnd: true }, TL.setCurTime('screen2', 2))
    .tic('#cond', { direction: 'from', y: 10, duration: 0.2, ease: 'none' }, TL.setCurTime('screen2', 0))
    .tic('#claim', { direction: 'from', duration: 0.5, y: -30, ease: 'elastic(1,.85)', globalAlpha: 0 }, TL.setCurTime('screen2', 0.3))
    .tic('#claim1', { direction: 'from', duration: 0.5, x: -150, globalAlpha: 0, ease: 'elastic(1,.85)', globalAlpha: 0 }, TL.setCurTime('screen2', 0.3))
    .tic('#logo', { direction: 'from', duration: 0.5, scale: 0, ease: 'elastic(1,.85)', transformOrigin: '240px 102px' }, TL.setCurTime('screen2', 0.5))
    .tic('#offre', { direction: 'from', duration: 0.6, scale: 0, rotate: -20, ease: 'elastic(1,.85)', transformOrigin: '50% 278px' }, TL.setCurTime('screen2', 0.5))
    .tic('#cta', { direction: 'from', duration: 0.4, globalAlpha: 0, y: 50, ease: 'back.out(1,5)' }, TL.setCurTime('screen2', 0.7))
    .tic('#kit', { direction: 'from', duration: 0.4, globalAlpha: 0, y: -50, ease: 'back.out(1,5)' }, TL.setCurTime('screen2', 0.7))
    // .call(TL.pauseTimeLine.bind(TL), ['main'], TL.setCurTime('screen2', 0.5))
    /**
     * ecran 3
     */
    .tic('#offre', { duration: 0.6, x: -300, ease: 'elastic.in(1,.85)' }, TL.setCurTime('screen3', 4.5))
    .tic('#mobile1', { direction: 'from', duration: 0.6, globalAlpha: 0, x: -50, ease: 'elastic(1,.85)' }, TL.setCurTime('screen3', 0.6))
    .tic('#mobile11', { direction: 'from', duration: 0.6, globalAlpha: 0, y: 50, ease: 'elastic(1,.85)' }, TL.setCurTime('screen3', 0.6))
    .tic('.das', { direction: 'from', duration: 0.4, globalAlpha: 0, x: -50, ease: 'power2.inOut', stagger: 0.1 }, TL.setCurTime('screen3', 0.6))
    .tic('#logo', { duration: 0.1, scale: 0.9, repeat: 3, yoyo: true, ease: 'none', transformOrigin: '240px 102px' }, TL.setCurTime('screen3', 1))
    .tic('#click1', { direction: 'from', duration: 0.4, globalAlpha: 0, x: 50, ease: 'elastic(1,85)', renderAtStart: true }, TL.setCurTime('screen3', 1))
    .tic('#click', { direction: 'from', duration: 0.4, globalAlpha: 0, x: -50, ease: 'elastic(1,85)' }, TL.setCurTime('screen3', 1))
    /**
     * ecran 4
     */
    .tic('#mobile1', { duration: 0.4, x: -100, globalAlpha: 0, ease: 'elastic.in(1,.85)', killAtEnd: true }, TL.setCurTime('screen4', 7))
    .tic('#mobile11', { duration: 0.4, x: 100, globalAlpha: 0, ease: 'elastic.in(1,.85)', killAtEnd: true }, TL.setCurTime('screen4', 0))
    .tic('.das', { duration: 0.4, globalAlpha: 0, x: -50, ease: 'power3.out', stagger: 0.1, killAtEnd: true }, TL.setCurTime('screen4', 0))
    .tic('#mobile2', { direction: 'from', duration: 0.6, globalAlpha: 0, x: -50, ease: 'elastic(1,.85)' }, TL.setCurTime('screen4', 0.5))
    .tic('#mobile21', { direction: 'from', duration: 0.6, globalAlpha: 0, y: 50, ease: 'elastic(1,.85)' }, TL.setCurTime('screen4', 0.5))
    .tic('.dasb', { direction: 'from', duration: 0.4, globalAlpha: 0, x: -50, ease: 'power2.inOut', stagger: 0.1 }, TL.setCurTime('screen4', 0.5))
    .tic('#logo', { duration: 0.1, scale: 0.9, repeat: 3, yoyo: true, ease: 'none', transformOrigin: '240px 102px' }, TL.setCurTime('screen4', 1))
    /**
     * ecran 5
     */
    .tic('#bg', { direction: 'from', duration: 0.3, globalAlpha: 0, ease: 'none' }, TL.setCurTime('screen5', 9.5))
    .tic('#logo1', { direction: 'from', duration: 0.6, globalAlpha: 0, y: -80, ease: 'elastic(1,.85)' }, TL.setCurTime('screen5', 0.2))
    .tic('#logo2', { direction: 'from', duration: 0.6, globalAlpha: 0, y: 80, ease: 'power4.out' }, TL.setCurTime('screen5', 0.3))
    /**
     * ecran 6
     */
    .tic('.logos', { duration: 0.3, globalAlpha: 0, ease: 'none' }, TL.setCurTime('screen6', 11))
    .tic('#cond', { direction: 'from', y: 10, duration: 0.2, ease: 'none' }, TL.setCurTime('screen6', 0))
    .tic('#claim', { direction: 'from', duration: 0.6, y: 30, ease: 'elastic(1,.85)' }, TL.setCurTime('screen6', 0))
    .tic('#claim1', { direction: 'from', duration: 0.5, x: -150, globalAlpha: 0, ease: 'elastic(1,.85)', globalAlpha: 0 }, TL.setCurTime('screen6', 0))
    .tic('#logo', { direction: 'from', duration: 0.5, scale: 0, ease: 'elastic(1,.85)', transformOrigin: '240px 102px' }, TL.setCurTime('screen6', 0.2))
    .tic('#tel', { direction: 'from', scale: 0, ease: 'elastic(1,.85)', transformOrigin: '110px 350px' }, TL.setCurTime('screen6', 0.3))
    .tic('#tel1', { direction: 'from', scale: 0, ease: 'elastic(1,.85)', transformOrigin: '192px 344px' }, TL.setCurTime('screen6', 0.5))
    .tic('#offref', { direction: 'from', y: '+=50', ease: 'power4.out' }, TL.setCurTime('screen6', 0.8))
    .tic('#clickf', { direction: 'from', duration: 0.6, scale: 0, ease: 'elastic(1,.85)', transformOrigin: '50% 454px' }, TL.setCurTime('screen6', 1))
    .tic('#kit', { direction: 'from', duration: 0.4, globalAlpha: 0, y: 30, ease: 'back.out(1,5)' }, TL.setCurTime('screen6', 1.3))
    .tic('#cta', { direction: 'from', duration: 0.4, globalAlpha: 0, y: 50, ease: 'back.out(1,5)' }, TL.setCurTime('screen6', 1.5))
    .tic('#logo', { duration: 0.1, scale: 0.9, repeat: 3, yoyo: true, ease: 'none', transformOrigin: '240px 102px' }, TL.setCurTime('screen6', 2))
    // .call(TIC.getAllAssets.bind(TIC), [], TL.setCurTime('screen6', 3.4))
    /**
     * Timeline name
     * callback
     * callback param
     * boolean : false execute callback when nbLoop >= maxLoop / true execute every testEnd
     *
     */
    .call(TIC.testEnd.bind(TIC), ['main', TIC.killTicker.bind(TIC), null, true], TL.setCurTime('screen6', 3.5));
});
