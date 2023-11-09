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

// .call(TL.testLoop.bind(TL), ['main', 2], TL.setCurTime('screen4', 2)) : x boucles jusqu'à ce test et continue jusqu'au dernier écran
// .call(TL.testLoopEnd.bind(TL), ['main', 2], TL.setCurTime('screen4', 2)) :  : x boucles de la durée totale de l'animation et arrêt à ce test
// .call(TL.testEnd.bind(TL), ['main', null, null, true], TL.setCurTime('screen5', 4)); x boucles de la totalité de l'animation

// CustomEase.create('hop', 'M0,0 C0,0 0.056,0.442 0.175,0.442 0.294,0.442 0.332,0 0.332,0 0.332,0 0.414,1 0.671,1 0.991,1 1,0 1,0');

document.addEventListener('loaded', (e) => {
  TL.addTimeLine('mask', 1, false);
  TL.addTimeLine('main', 2, false);
  TL.addTimeLine('roues', 1, false);
  TL.setMaskDuration(0.3);

  TL.timelines.roues
    .to('#roue1', { duration: 4, rotate: 360, repeat: -1, ease: 'none', transformOrigin: '50% 50%' }, TL.setCurTime('roues', 0))
    .to('#roue2', { duration: 4, rotate: -360, repeat: -1, ease: 'none', transformOrigin: '50% 50%' }, TL.setCurTime('roues', 0));

  TL.timelines.mask.to('#maskintro', { duration: TL.maskDuration, autoAlpha: 0 }, TL.setCurTime('mask', 0)); // fondu du masque
  TL.timelines.main
    /**
     * ecran 1
     */
    // .call(TL.jumpTo.bind(TL), ['main', 'screen7', 0], TL.setCurTime('screen1', 0))
    .from('#logo', { duration: 0.8, opacity: 0, y: 80, ease: 'power4.out' }, TL.setCurTime('screen1', 0))
    // .from('#CTA', { duration: 1, blur: 20 }, TL.setCurTime('screen1', 1))
    /**
     * ecran 2
     */
    .from('#ecran2,#shapes1,#shapes2,#titre,#footer', { duration: 0.3, opacity: 0 }, TL.setCurTime('screen2', 1.5))
    .set('#mentions-link,#roues,#vectos', { visibility: 'visible' }, TL.setCurTime('screen2', 0))
    .from('.claims', { duration: 0.6, opacity: 0, xPercent: 50, ease: 'power3.inOut', stagger: 0.1 }, TL.setCurTime('screen2', 0))
    .from('#roues2', { duration: 0.8, xPercent: 100, ease: 'power3.out' }, TL.setCurTime('screen2', 0))
    .from('#roues1', { duration: 0.8, xPercent: -100, ease: 'power3.out' }, TL.setCurTime('screen2', 0))
    .from('#tel', { duration: 0.6, xPercent: 100, ease: 'power4.out' }, TL.setCurTime('screen2', 0))
    .from('.jambes', { duration: 0.8, xPercent: 100, ease: 'power4.out' }, TL.setCurTime('screen2', 0))
    .from('#outils', { duration: 1, xPercent: 100, ease: 'power4.out' }, TL.setCurTime('screen2', 0))
    .from('#CTA', { duration: 0.4, opacity: 0, y: -20, ease: 'power4.out' }, TL.setCurTime('screen2', 1))
    /**
     * ecran 3
     */
    .from('#ecran3', { duration: 0.3, opacity: 0 }, TL.setCurTime('screen3', 2.2))
    .from('#soleil', { duration: 1, x: 14, y: 63, ease: 'power4.out' }, TL.setCurTime('screen3', 0))
    .to('#jambe', { duration: 1, rotate: 5, ease: 'power1.inOut' }, TL.setCurTime('screen3', 0))
    .to('#jambe1', { duration: 1, rotate: -15, ease: 'power1.inOut' }, TL.setCurTime('screen3', 0))

    /**
     * ecran 4
     */
    .from('#ecran4', { duration: 0.3, opacity: 0 }, TL.setCurTime('screen4', 4))
    .to('#shapes2,#ecran2,#ecran3', { duration: 0.3, opacity: 0 }, TL.setCurTime('screen4', 0))
    .from('#feuille', { duration: 1, rotate: -30, opacity: 0, ease: 'power2.out' }, TL.setCurTime('screen4', 0))
    .from('#feuille1', { duration: 1, rotate: 30, opacity: 0, ease: 'power2.out' }, TL.setCurTime('screen4', 0))
    .to('#roues1', { duration: 0.6, x: 71, y: 227, ease: 'power2.inOut' }, TL.setCurTime('screen4', 0))
    .to('#roues2', { duration: 0.6, x: -123, y: -211, ease: 'power2.inOut' }, TL.setCurTime('screen4', 0))
    .from('.txts', { duration: 0.8, opacity: 0, xPercent: -50, ease: 'power3.inOut', stagger: 0.15 }, TL.setCurTime('screen4', 0.3))
    .from('#key', { duration: 1, opacity: 0, xPercent: -100 }, TL.setCurTime('screen4', 0.5))
    .from('#samsung', { duration: 1, xPercent: 100, ease: 'power3.out' }, TL.setCurTime('screen4', 0))
    .from('.nomas', { duration: 0.6, opacity: 0, xPercent: -30, ease: 'elastic(1,.85)', stagger: 0.15 }, TL.setCurTime('screen4', 0.5))
    .from('#das', { duration: 0.6, opacity: 0, x: 30, ease: 'power3.out' }, TL.setCurTime('screen4', 0.8))
    // .call(TL.testLoopEnd.bind(TL), ['main', 2, true], TL.setCurTime('screen4', 2))
    /**
     * ecran 5
     */
    .from('#ecran5', { duration: 0.3, opacity: 0 }, TL.setCurTime('screen5', 6.5))
    .to('#ecran4', { duration: 0.3, opacity: 0 }, TL.setCurTime('screen5', 0))
    .to('#key', { duration: 0.5, x: -40, y: 9, rotate: -65, ease: 'power3.inOut' }, TL.setCurTime('screen5', 0))
    .to('#roues1', { duration: 0.6, x: 111, y: 166, ease: 'power2.inOut' }, TL.setCurTime('screen5', 0))
    .to('#roues2', { duration: 0.6, x: -81, y: -279, ease: 'power2.inOut' }, TL.setCurTime('screen5', 0))
    .set('#fond', { visibility: 'visible' }, TL.setCurTime('screen5', 0))
    .from('#fond', { y: 50, ease: 'power4.out' }, TL.setCurTime('screen5', 0))
    .from('#iphone', { duration: 1, xPercent: 100, ease: 'power3.out' }, TL.setCurTime('screen5', 0))
    .from('.nombs', { duration: 0.6, opacity: 0, xPercent: -30, ease: 'elastic(1,.85)', stagger: 0.15 }, TL.setCurTime('screen5', 0.5))
    .from('#das1', { duration: 0.6, opacity: 0, x: 30, ease: 'power3.out' }, TL.setCurTime('screen5', 0.8))
    /**
     * ecran 6
     */
    .from('#ecran6', { duration: 0.3, opacity: 0 }, TL.setCurTime('screen6', 9))
    .to('#ecran5', { duration: 0.3, opacity: 0 }, TL.setCurTime('screen6', 0))
    .to('#key', { duration: 0.5, x: 23, y: 79, rotate: -6, ease: 'power3.inOut' }, TL.setCurTime('screen6', 0))
    .to('#roues1', { duration: 0.6, x: 184, y: 71, ease: 'power2.inOut' }, TL.setCurTime('screen6', 0))
    .to('#roues2', { duration: 0.6, x: -20, y: -373, ease: 'power2.inOut' }, TL.setCurTime('screen6', 0))
    .from('#fond5,#fond4', { duration: 0.4, yPercent: 150, ease: 'power3.out', stagger: -0.5 }, TL.setCurTime('screen6', 0))
    .from('#galaxy', { duration: 1, xPercent: 100, ease: 'power3.out' }, TL.setCurTime('screen6', 0))
    .from('.nomcs', { duration: 0.6, opacity: 0, xPercent: -30, ease: 'elastic(1,.85)', stagger: 0.15 }, TL.setCurTime('screen6', 0.5))
    .from('#das2', { duration: 0.6, opacity: 0, x: 30, ease: 'power3.out' }, TL.setCurTime('screen6', 0.8))
    /**
     * ecran 7
     */
    .from('#ecran7', { duration: 0.3, opacity: 0 }, TL.setCurTime('screen7', 11.5))
    .to('#ecran6,#titre', { duration: 0.3, opacity: 0 }, TL.setCurTime('screen7', 0))
    .to('#roues1,#roues2', { duration: 0.6, x: 500, ease: 'power3.in', stagger: 0.15 }, TL.setCurTime('screen7', 0))
    .to('#key', { duration: 0.4, x: -300, ease: 'power3.in' }, TL.setCurTime('screen7', 0))
    .from('.txtfs', { duration: 0.6, opacity: 0, y: 30, ease: 'power3.inOut', stagger: 0.15 }, TL.setCurTime('screen7', 0))
    .from('.argus', { duration: 0.6, scale: 0.3, opacity: 0, ease: 'elastic(1,.85)', transformOrigin: '50% 200px', stagger: 0.2 }, TL.setCurTime('screen7', 0.6)) //transformOrigin = center &
    .from('.telf', { duration: 0.6, opacity: 0, scale: 0.6, ease: 'elastic(1,.85)', stagger: -0.1 }, TL.setCurTime('screen7', 0))
    .from('#livraison', { duration: 0.6, opacity: 0, y: 20, ease: 'power4.out' }, TL.setCurTime('screen7', 1.5))
    .to('#livraison', { duration: 0.06, opacity: 0, repeat: 7, yoyo: true, ease: 'none', repeatDelay: 0.03 }, TL.setCurTime('screen7', 2.5))
    /**
     * Timeline name
     * display time in console true/false
     * callback
     * callback param
     * boolean : false execute callback when nbLoop >= maxLoop / true execute every testEnd
     *
     */
    .call(TL.testEnd.bind(TL), ['main', null, null, true], TL.setCurTime('screen7', 3.4));
});
