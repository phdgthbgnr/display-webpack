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
  constructor(file) {
    // receive file to get size
    this.file = file;
  }
  apply(compiler) {
    // compiler.hooks.assetEmitted.tap('PluginGetFoldereSize', (file, { content, source, outputPath, compilation, targetPath }) => {
    compiler.hooks.afterEmit.tapAsync(PluginName, (stats, cb) => {
      // Get output file
      const mode = stats.compiler.options.mode;
      const outputpath = stats.compiler.outputPath;
      const files = stats.assets;
      let sizeInBytes = 0;
      // delete svg
      if (mode != 'development') {
        for (var o in files) {
          const regx = /(.*\.(svg))$/gi; // ignore *.svg -> gitignore (default)
          if (o.match(regx)) {
            const svgfile = path.resolve(outputpath, o);
            fs.unlinkSync(svgfile);
          }
        }
      }
      for (var o in files) {
        const regx = /(.*\.(svg))$/gi; // ignore *.svg -> gitignore (default)
        if (o.match(regx) === null) sizeInBytes += files[o]._size;
      }
      const sizes = ['Bytes', 'Kb', 'Mb', 'Gb', 'Tb'];
      const sizeType = parseInt(Math.floor(Math.log(sizeInBytes) / Math.log(1024)).toString());
      const sizeInKBytes = Math.round(sizeInBytes / Math.pow(1024, sizeType));
      console.log('\n');
      console.log('| TOTAL SIZE : ');
      console.log('--------------------------');
      console.log(`| ${sizeInKBytes} ${sizes[sizeType]} (${sizeInBytes})`);
      console.log('--------------------------');
      console.log('\n\n\n\n\n\r');
      cb();
    });
  }
}

module.exports = PluginGetFoldereSize;
