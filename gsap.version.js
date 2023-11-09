module.exports = {
  current: '3.7.1',
};

/*

LAST VERSION for members plugins : 3.6.0

https://greensock.com/tags/release/


3.6.0 :  FLIP plugin

https://greensock.com/blog/blog/3-6/

___________________________________________________________________________________________________

3.7.1 : 

Percentage based position parameter options for timelines

gsap.utils.selector() : It returns an Array rather than a NodeList, so you get access to convenient array methods like .filter() and .map().

gsap.utils.toArray() : This will find all the descendant elements of myElement with the class of "box" : gsap.utils.toArray(".box", myElement)

https://greensock.com/blog/blog/3-7/

tl.to(".other", {x: 100, duration: 2});
// insert 25% of the way through the most recently added animation. 
// In this case - 0.5s into the 2s duration.
tl.to(".class", {x: 100}, "<25%");

tl.to(".other", {x: 100, duration: 2});
// insert 25% of the way from the end of the most recently added animation. 
// In this case - 0.5s from the end of the 2s duration.
tl.to(".class", {x: 100}, ">-25%");

___________________________________________________________________________________________________

3.8.0

containerAnimation - vertical scrolling can animate a container horizontally; now you can set up ScrollTriggers on that horizontal movement. It's like having nested ScrollTriggers!

preventOverlaps & fastScrollEnd - when you jump to a section, do you have lingering animations that overlap? These features can save the day.

isInViewport() - a simple way to check if an element is in the viewport

positionInViewport() - find out exactly where an element is in relation to the viewport

Directional snapping - by default, snapping will now always go in the direction that the user last scrolled. Much more intuitive! There's even a .snapDirectional() utility method.


https://greensock.com/blog/blog/3-8/

___________________________________________________________________________________________________

3.9.1 : keyframe options

https://greensock.com/blog/blog/3-9/


- Percentage :
gsap.to(".elem", {
 keyframes: {
  "0%":   { x: 100, y: 100},
  "75%":  { x: 0 },
  "100%": { x: 50, y: 50 }
 },
 duration: 2,
})

gsap.to(".elem", {
 keyframes: {
  "0%":   { x: 100, y: 100},
  "75%":  { x: 0, y: 0, ease: 'sine.out'}, // finetune with individual eases
  "100%": { x: 50, y: 50 },
   easeEach: 'expo.inOut' // ease between keyframes
 },
 ease: 'none' // ease the entire keyframe block
 duration: 2,
})

- Array of values

gsap.to(".elem", {
 keyframes: {
  x: [100, 0, 50],
  y: [100, 0, 50]
 },
 duration: 2
})


gsap.to(".elem", {
 keyframes: {
  x: [100, 0, 50],
  y: [100, 0, 50]
  easeEach: 'sine.inOut' // ease between keyframes
  ease: 'expo.out' // ease the entire keyframe block
 },
 duration: 2,
})

___________________________________________________________________________________________________

3.10 : Observer plugin, quickTo(), ScrollTrigger. normalizeScroll(), "*=" and "/=" relative prefixes 

ScrollSmoother (Club greensock)

https://greensock.com/blog/blog/3-10/

___________________________________________________________________________________________________

3.11 : matchMedia(), getContexct(), 

https://greensock.com/blog/blog/3-11/

*/
