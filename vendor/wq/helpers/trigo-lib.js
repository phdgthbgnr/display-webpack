'use strict';

//http://golf.shinh.org/p.rb?Triangle+ASCII+art <- draw lovely triangle

/**
 * convert degree to radian
 */
export const degToRad = (deg) => {
  return (deg * Math.PI) / 180;
};
// convert radian to degree
export const radToDeg = (rad) => {
  return (rad * 180.0) / Math.PI;
};

// Sine of the angle = Opposite side length / Hypotenuse length.
// sin θ = Opposite / Hypotenuse
// Cosine of the angle = Adjacent side length / Hypotenuse length
// cos θ = Adjacent / Hypotenuse
// Tangent of the angle = Opposite side length / Adjacent side length
// tan θ = Opposite / Adjacent

// https://math.stackexchange.com/questions/483931/length-of-hypotenuse-using-one-side-length-and-angle
// http://mathadoc.sesamath.net/Documents/mp/cap/captrigo/fct_trigo.PDF

/**
 * calculate length opposed side of a right triangle (rectangle)
 *
 *           |\
 *           |_\  angle
 *           |  \
 * adjacent  |   \
 *           |    \
 *           |     \
 *           |______\
 *               ? opposed
 */
export const opposedAA = (angle, adjacent) => {
  return Math.tan(degToRad(angle)) * adjacent;
};
/**
 * calculate angle from adjacent / opposed of a right triangle
 *
 *           |\
 *           |_\  ? angle
 *           |  \
 * adjacent  |   \
 *           |    \
 *           |     \
 *           |______\
 *              opposed
 */
export const angleAO = (adjacent, opposed) => {
  return radToDeg(Math.atan(opposed / adjacent));
};
/**
 * calculate hypotenuse from adjacent / opposed of a right triangle
 *
 *           |\
 *           |_\
 *           |  \
 * adjacent  |   \ ? hypo
 *           |    \
 *           |     \
 *           |______\
 *              opposed
 */
export const hypoAO = (adjacent, opposed) => {
  return Math.sqrt(adjacent * adjacent + opposed * opposed);
};
/**
 * calculate hypotenuse from angle / adjacent of a right triangle
 *
 *           |\
 *           |_\  angle
 *           |  \
 * adjacent  |   \ ? hypo
 *           |    \
 *           |     \
 *           |______\
 *
 */
export const hypoAA = (adjacent, angle) => {
  return adjacent / Math.cos(degToRad(angle));
};
/**
 * calculate hypotenuse from opposed / angle a right triangle
 *
 *           |\
 *           |_\  angle
 *           |  \
 *           |   \ ? hypo
 *           |    \
 *           |     \
 *           |______\
 *               opposed
 */
export const hypoOA = (opposed, angle) => {
  return opposed / Math.sin(degToRad(angle));
};
/**
 * calculate adjacent from angle / hypothenuse a right triangle
 *
 *            |\
 *            |_\  angle
 *            |  \
 * adjacent ? |   \  hypo
 *            |    \
 *            |     \
 *            |______\
 *
 */
export const adajcentHA = (hypo, angle) => {
  return hypo * Math.cos(degToRad(angle));
};
