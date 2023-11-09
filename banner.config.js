module.exports = {
  title: 'Sosh Precommande Xiaomi RedmiNote 12',
  version: 'Version Initiale',
  famille: 'Display',
  format: '300x600',
  png: { options: { strip: true, dithering: 0.5, quality: [0.5, 0.7], speed: 6 } },
  // preset : default, photo, picture, drawing, icon and text
  // method : 0 - 6 (fastest - slowest) - default : 4
  webp: { use: false, options: { quality: 40, alphaQuality: 50, preset: 'default', method: 4 } },
  // speed : 0 (slowest/smallest) and 8 (fastest/largest) - default : 5.
  avif: { use: false, options: { quality: 60, speed: 2, test: /^((?!\.svg).)*$/i } },
  sizes: {
    'no-size': { width: 160, height: 600 }, // because 160x600 not in the folder name : no-size
    banner: { width: 300, height: 250 },
  },
};
