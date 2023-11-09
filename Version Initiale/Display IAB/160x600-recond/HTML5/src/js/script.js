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

// ---------------------------------------------------------

// OPTIONAL ------------------------------------------------
// pour l'ajout de la compatibilité ie11 classlist sur les élements SVG, décommenter la ligne d'import dans vendor/gsapcore/cssClass.js)
// import method CSS.addClass & CSS.removeClass
// ajoute ou supprime une class css sur un élément
// import CSS from '@core/cssClass';

// ---------------------------------------------------------

// IMPORTER LES PLUGINS / MODULES ICI: ---------------------
import DrawSVGPlugin from '@plugins/DrawSVGPlugin';
import MotionPathPlugin from '@plugins/MotionPathPlugin';
// import Bezier from '@modules/Bezier';

// ENREGISTRER LES PLUGINS ICI : ---------------------------
TL.registerPlugin(DrawSVGPlugin);
TL.registerPlugin(MotionPathPlugin);

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

  // const arrow1s = TL.GSAP.utils.toArray('#fleches1 > g');
  let headArrows1 = [];
  TL.GSAP.utils.toArray('#fleches1 > g').forEach((element) => {
    headArrows1.push({ head: element.children[0], line: element.children[1] });
  });

  // const arrow1s = TL.GSAP.utils.toArray('#fleches2 > g');
  let headArrows2 = [];
  TL.GSAP.utils.toArray('#fleches2 > g').forEach((element) => {
    headArrows2.push({ head: element.children[0], line: element.children[1] });
  });

  let headArrows3 = [];
  TL.GSAP.utils.toArray('#fleches3 > g').forEach((element) => {
    headArrows3.push({ head: element.children[0], line: element.children[1] });
  });

  let headArrows4 = [];
  TL.GSAP.utils.toArray('#fleches4 > g').forEach((element) => {
    headArrows4.push({ head: element.children[0], line: element.children[1] });
  });

  const setMotionPath = (a) => {
    const tl = new TL.GSAP.timeline();
    a.forEach((e) => {
      const subtl = new TL.GSAP.timeline();
      subtl.from(e.line, { duration: 1, drawSVG: 0, ease: 'power3.inOut' }, 0).to(
        e.head,
        {
          motionPath: {
            path: e.line,
            align: e.line,
            alignOrigin: [1, 0.5],
            start: 0,
            end: 1,
            autoRotate: true,
          },
          duration: 1,
          ease: 'power3.inOut',
        },
        0
      );
      tl.add(subtl, 0);
    });
    return tl;
  };

  TL.timelines.mask.to('#maskintro', { duration: TL.maskDuration, autoAlpha: 0 }, TL.setCurTime('mask', 0)); // fondu du masque
  TL.timelines.main

    /**
     * ecran 1
     */
    .from('.intro', { duration: 0.6, opacity: 0, x: 80, ease: 'power4.out', stagger: '.15' }, TL.setCurTime('screen1', 0))
    .from('#intro', { duration: 0.6, opacity: 0, y: 60, ease: 'power4.out', stagger: '.15' }, TL.setCurTime('screen1', 0.6))
    // .from('#CTA', { duration: 1, blur: 20 }, TL.setCurTime('screen1', 1))
    /**
     * common
     */
    .from('#common,#arrows', { duration: 0.3, opacity: 0 }, TL.setCurTime('common', 1.5))
    .to('.intros', { duration: 0.3, x: -60, opacity: 0, ease: 'power4.out', stagger: 0.06 }, TL.setCurTime('common', 0))
    .from('#footer', { duration: 0.3, opacity: 0 }, TL.setCurTime('common', 0.2))
    .from('#claim', { duration: 0.8, opacity: 0, y: -80, ease: 'elastic(1,.85)' }, TL.setCurTime('common', 0.2))
    .from('#claim1', { duration: 0.8, opacity: 0, y: 50, ease: 'power4.out' }, TL.setCurTime('common', 0.2))
    .add(setMotionPath(headArrows1), TL.setCurTime('common', 0))
    .set('#fleches1', { opacity: 1 }, TL.setCurTime('common', 0))
    .set('#mentions-link', { visibility: 'visible' }, TL.setCurTime('common', 0))
    /**
     * ecran 2
     */
    .from('#ecran2', { duration: 0.3, opacity: 0 }, TL.setCurTime('screen2', 3.5))
    .to('#fleches1', { duration: 0.3, opacity: 0 }, TL.setCurTime('screen2', 0))
    .add(setMotionPath(headArrows2), TL.setCurTime('screen2', 0))
    .set('#fleches2', { opacity: 1 }, TL.setCurTime('screen2', 0))
    .to('#claim', { duration: 0.5, y: -272, scale: 0.836, ease: 'elastic(1,.85)' }, TL.setCurTime('screen2', 0))
    .to('#claim1', { duration: 0.5, y: -285, scale: 0.747, ease: 'elastic(1,.85)' }, TL.setCurTime('screen2', 0.1))
    .from('#tel', { duration: 0.8, x: 140, ease: 'power3.out' }, TL.setCurTime('screen2', 0.4))
    .from('#nom', { duration: 0.5, scaleX: 0, ease: 'elastic(1,.85)' }, TL.setCurTime('screen2', 0.6))
    .from('#das', { duration: 0.5, opacity: 0, x: -50, ease: 'sine.out' }, TL.setCurTime('screen2', 0.6))
    .from('#kit', { duration: 0.5, opacity: 0, x: -50, ease: 'sine.out' }, TL.setCurTime('screen2', 0.8))
    .from('#CTA', { duration: 0.5, opacity: 0, y: 10, ease: 'power3.out' }, TL.setCurTime('screen2', 1))
    // .from('#clic', { duration: 0.6, opacity: 0, x: 50, ease: 'elastic(1,.85)' }, TL.setCurTime('screen2', 1))
    // .from('#claquos', { duration: 0.4, scale: 0, transformOrigin: '50% 50%', ease: 'power2.out' }, TL.setCurTime('screen2', 1))
    // .to('#tomove', { duration: 4, rotate: '+=180', transformOrigin: '0% 50%' }, TL.setCurTime('screen2', 1.2))

    /**
     * ecran 3
     */
    .from('#ecran3', { duration: 0.3, opacity: 0 }, TL.setCurTime('screen3', 6.5))
    .to('#fleches2', { duration: 0.3, opacity: 0 }, TL.setCurTime('screen3', 0))
    .to('#nom', { duration: 0.4, scaleX: 0, ease: 'elastic.in(1,.85)' }, TL.setCurTime('screen3', 0))
    .to('#tel', { duration: 0.6, scale: 0.89, x: 1, y: 47, ease: 'elastic.in(1,.85)' }, TL.setCurTime('screen3', 0))
    .from('#txt', { duration: 0.6, opacity: 0, x: -50, ease: 'elastic(1,.85)' }, TL.setCurTime('screen3', 0.2))
    .from('#txt1', { duration: 0.6, opacity: 0, x: 50, ease: 'elastic(1,.85)' }, TL.setCurTime('screen3', 0.2))
    .from('#txt2', { duration: 0.6, opacity: 0, y: 50, ease: 'power4.out' }, TL.setCurTime('screen3', 0.4))
    .from('#txt3', { duration: 0.6, opacity: 0, x: -50, ease: 'power4.out' }, TL.setCurTime('screen3', 0.6))
    .from('#paiement', { duration: 0.5, opacity: 0, x: -50, ease: 'elastic(1,.85)' }, TL.setCurTime('screen3', 0.8))
    .add(setMotionPath(headArrows3), TL.setCurTime('screen3', 0))
    .set('#fleches3', { opacity: 1 }, TL.setCurTime('screen3', 0))
    /**
     * ecran 4
     */
    .from('#ecran4', { duration: 0.3, opacity: 0 }, TL.setCurTime('screen4', 9.5))
    .set('#CTA,#footer,.common,#ecran3,#ecran2,#fleches3', { opacity: 0 }, TL.setCurTime('screen4', 0))
    .set('#mentions-link', { visibility: 'hidden' }, TL.setCurTime('screen4', 0))
    .from('#logo', { duration: 0.6, opacity: 0, y: -80, ease: 'elastic(1,.85)' }, TL.setCurTime('screen4', 0))
    .from('#logo1', { duration: 0.6, opacity: 0, y: 80, ease: 'power4.out' }, TL.setCurTime('screen4', 0.1))
    // .call(TL.testLoopEnd.bind(TL), ['main', 2, true], TL.setCurTime('screen4', 2))
    /**
     * ecran 5
     */
    .from('#ecran5', { duration: 0.3, opacity: 0 }, TL.setCurTime('screen5', 11))
    .to('#ecran4', { duration: 0.3, opacity: 0, ease: 'none' }, TL.setCurTime('screen5', 0))
    .add(setMotionPath(headArrows4), TL.setCurTime('screen5', 0))
    .set('#fleches4', { opacity: 1 }, TL.setCurTime('screen5', 0))
    // .set('#claquos', { scale: 0, transformOrigin: '50% 50%' }, TL.setCurTime('screen5', 0))
    .set('#mentions-link', { visibility: 'visible' }, TL.setCurTime('screen5', 0))
    .to('#CTA,#footer', { duration: 0.4, opacity: 1, ease: 'power4.out' }, TL.setCurTime('screen5', 0))
    .to('#common', { duration: 0.5, opacity: 1, ease: 'none' }, TL.setCurTime('screen5', 0))
    .from('#txtf', { duration: 0.6, opacity: 0, x: -50, ease: 'elastic(1,.85)' }, TL.setCurTime('screen5', 0.2))
    .from('#txt1f', { duration: 0.6, opacity: 0, x: 50, ease: 'elastic(1,.85)' }, TL.setCurTime('screen5', 0.2))
    .from('#txt2f', { duration: 0.6, opacity: 0, y: 50, ease: 'power4.out' }, TL.setCurTime('screen5', 0.4))
    .from('#txt3f', { duration: 0.6, opacity: 0, x: -50, ease: 'power4.out' }, TL.setCurTime('screen5', 0.6))
    .from('#telf', { duration: 0.8, x: 140, ease: 'power3.out' }, TL.setCurTime('screen5', 0.4))
    .from('#dasf', { duration: 0.5, opacity: 0, x: -50, ease: 'sine.out' }, TL.setCurTime('screen5', 0.6))
    .from('#kitf', { duration: 0.5, opacity: 0, x: -50, ease: 'sine.out' }, TL.setCurTime('screen5', 0.8))
    .from('#paiementf', { duration: 0.5, opacity: 0, x: -50, ease: 'elastic(1,.85)' }, TL.setCurTime('screen5', 0.5))
    // .from('#clicf', { duration: 0.6, opacity: 0, x: 50, ease: 'elastic(1,.85)' }, TL.setCurTime('screen5', 1))
    // .to('#claquos', { duration: 0.4, scale: 1, transformOrigin: '50% 50%', ease: 'power2.out' }, TL.setCurTime('screen5', 1))
    // .to('#paiement', { duration: 0.08, opacity: 0, repeat: 5, repeatDelay: 0.02, yoyo: true, ease: 'none' }, TL.setCurTime('screen5', 1.5))

    /**
     * Timeline name
     * display time in console true/false
     * callback
     * callback param
     * boolean : false execute callback when nbLoop >= maxLoop / true execute every testEnd
     *
     */
    .call(TL.testEnd.bind(TL), ['main', false, null, null, true], TL.setCurTime('screen5', 3.5));
});
