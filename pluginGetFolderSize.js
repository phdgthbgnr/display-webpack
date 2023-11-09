/**
 * https://stackoverflow.com/questions/68716056/how-to-get-only-the-bundle-file-size-of-a-webpack-build-without-all-the-extra-st
 * https://webpack.js.org/contribute/writing-a-plugin/
 * https://morioh.com/p/c78efd8a7500
 * https://stephenzhao.github.io/webpack-cn/docs/plugins.html
 * https://webpack.js.org/contribute/plugin-patterns/
 * */
const PluginName = 'GetAssetsSize';
const path = require('path');
const fs = require('fs');

class PluginGetFoldereSize {
  constructor() {}
  apply(compiler) {
    compiler.hooks.afterEmit.tapAsync(PluginName, (stats, cb) => {
      const mode = stats.compiler.options.mode;
      const name = stats.compiler.options.name; // dev, watch, buildone
      const outputpath = stats.compiler.outputPath;
      const files = stats.assetsInfo;
      const regx = /(.*\.(svg))$/gi; // ignore *.svg -> gitignore (default)
      // const regx2 = /(?:.*[\/|\\])(.*)(?:[\/|\\]HTML5[\/|\\])/gi; // capture between / and /HTML5/ (/xxxxx/HTML5/ or \xxxxx\HTML5\ )
      const regx2 = /(?:.*[\/|\\])(.*)[\/|\\](.*)(?:[\/|\\]HTML5[\/|\\])/gi; // capture family+format
      const sizeFormats = {};

      // files.forEach(function(value, key) {
      for (const [file, value] of files) {
        // console.log(file);
        // remove SVG only on build & watch
        // if (mode != 'development') {
        //   if (file.match(regx)) {
        //     const svgfile = path.resolve(outputpath, file);
        //     fs.unlinkSync(svgfile);
        //   }
        // }

        // get files size in dev or watch mode
        // only one output path
        if (name != 'build') {
          if (file.match(regx) === null) {
            if (!sizeFormats.hasOwnProperty('format')) sizeFormats['format'] = 0;
            sizeFormats['format'] += value.size;
          }
        }

        if (name == 'build') {
          if (file.match(regx) === null) {
            const resx = [...file.matchAll(regx2)][0];
            const prop = resx[1] + ' ' + resx[2];
            if (!sizeFormats.hasOwnProperty(prop)) sizeFormats[prop] = 0;
            sizeFormats[prop] += value.size;
          }
        }
      }

      cb();
      // stats.emittedAssets ? nope -> only assets != html,css,js
      const sizes = ['Bytes', 'Kb', 'Mb', 'Gb', 'Tb'];
      console.log('\r');
      for (let i in sizeFormats) {
        const sizeType = parseInt(Math.floor(Math.log(sizeFormats[i]) / Math.log(1024)).toString());
        const sizeInKBytes = Math.round(sizeFormats[i] / Math.pow(1024, sizeType));
        console.log('\x1b[46m', `${i} : ${sizeInKBytes} ${sizes[sizeType]} (${sizeFormats[i]})`, '\x1b[0m');
        console.log('\r');
      }
    });
  }
}

module.exports = PluginGetFoldereSize;
