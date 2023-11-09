const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const RemovePlugin = require('remove-files-webpack-plugin');
const WebpackEmptyFilesCleanUpPlugin = require('webpack-empty-files-cleanup-plugin');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');
const PluginGetFoldereSize = require('./pluginGetFolderSize');
const fs = require('fs');

// load custom sizes (if no size specified in folder format (120x600, etc...))
const configBanner = require('./config-banner');

const version = configBanner.version;
const famille = configBanner.famille;
const title = configBanner.title;
//
let size = { width: 300, height: 600 }; // default size
const defaultFormat = configBanner.format; //size.width + 'x' + size.height; // default folder format (300x600)
let globPath = './' + version + '/' + famille + '/' + '**/src/js/script.js'; // paths for build
let pathImg = '**/src/img/*'; // paths for build
let contextPath = path.resolve(__dirname, './');
const mapHTML = path.resolve(__dirname, version, famille); // root path for template html
const cleanRoot = path.resolve(__dirname, version, famille); // root for clean (build)

/**
 * Set Array formats for source / dst templates
 */
getFormatFromFolder = (paths, dir, file) => {
  // get width / height from folder name ([000..][Xx][000..])
  let res = null;
  let formatExist = true;
  const regx = /([0-9]+)(?:[xX]{1})([0-9]+)/g;
  const resx = [...file.matchAll(regx)][0];
  let size = { width: 0, height: 0 };
  if (resx === undefined) {
    if (configBanner.sizes[file]) {
      size = configBanner.sizes[file];
    } else {
      console.log('Error with misnamed folder ' + file + ' > not found in config-banner.js');
      formatExist = false;
      // process.exit(0);
    }
  } else {
    size = { width: resx[1], height: resx[2] };
  }
  //
  if (fs.statSync(paths).isDirectory() && formatExist) {
    const templatePaths = path.resolve(dir, file, 'HTML5/src/index.html');
    const distPaths = path.resolve(dir, file, 'HTML5/dst/index.html');
    // distSVGPath : path relatif to root for SVG
    if (fs.existsSync(templatePaths)) {
      res = { template: templatePaths, srcSVGPath: path.resolve(templatePaths + '/..').replace(path.resolve(__dirname) + '/', ''), file: distPaths, width: size.width, height: size.height };
    }
  }
  return res;
};
/**
 *
 *  * get width & height from format folder
 * ex : 120x600 -> width:120, height:600
 * ex : 120x600-V1 -> width:120, height:600
 * ex : banner120x600V1 -> width:120, height:600
 */
const getAllFormats = (dir) => {
  const folders = [];
  fs.readdirSync(dir).filter(function (file) {
    const paths = path.join(dir, file);
    const o = getFormatFromFolder(paths, dir, file);
    if (o) folders.push(o);
  });
  return folders;
};

const GLOB = () => {
  return glob.sync(globPath).reduce((acc, path) => {
    const entry = path.replace('/script.js', ''); // remove script.js from path
    acc[entry] = path;
    return acc;
  }, {});
};

module.exports = (env, argv) => {
  console.log('START');
  // define peudo mode ---------------------------------------------------
  let pseudoMode = 'build';
  if (argv.watch && argv.mode == 'production') pseudoMode = 'watch';
  if (argv.watch && argv.mode == 'development') pseudoMode = 'dev';
  if (!argv.watch && argv.mode == 'production' && process.env.npm_config_banner) pseudoMode = 'buildone';
  // ---------------------------------------------------------------------

  console.log('pseudoMode : ', pseudoMode);
  // array for x instance(s) of HtmlWebpackPlugin
  let templateFileMapper = [];
  let format = '';
  if (pseudoMode == 'watch' || pseudoMode == 'dev' || pseudoMode == 'buildone') {
    format = defaultFormat;
    // get entry from CLI ex : npm run build "300x600"
    if (process.env.npm_config_banner) {
      format = process.env.npm_config_banner;
    }
    console.log('FORMAT : ', format);
    contextPath = path.resolve(__dirname, version, famille, format, 'HTML5');
    globPath = './src/js/script.js';
    pathImg = './src/img/**/**';
    // template html for one format
    templateFileMapper.push(getFormatFromFolder(path.resolve(__dirname, version, famille, format), path.resolve(__dirname, version, famille), format));
  } else {
    templateFileMapper = getAllFormats(mapHTML);
  }

  /**
   * create x instances plugin = x formats
   */
  const htmlPlugins = () => {
    return templateFileMapper.map((entry) => {
      // console.log(entry);
      return new HtmlWebpackPlugin({
        template: entry.template,
        filename: entry.file,
        inject: false,
        // vars for template
        width: entry.width,
        height: entry.height,
        distSVGPath: entry.srcSVGPath,
        title: title,
      });
    });
  };

  /**
   * get source path from CLI param - ex: npm run watch --format=120x600
   * path for browserSync
   */
  const getSourcePath = () => {
    if (format) {
      return path.join(__dirname, version + '/' + famille + '/' + format + '/HTML5/');
    }
  };

  const otherPlugins = [
    // HOT RELOAD
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: [getSourcePath() + '/dst'] },
    }),
    // CSS
    new MiniCssExtractPlugin({
      filename: pseudoMode == 'watch' || pseudoMode == 'dev' || pseudoMode == 'buildone' ? './styles.min.css' : './[name]/../../dst/styles.min.css',
    }),
    // PROGRESS HANDLER
    new SimpleProgressWebpackPlugin({
      format: 'compact',
    }),
    //CLEAN DST
    new RemovePlugin({
      // on watch
      // clean only on production mode
      // in development mode only the new/modified image is copied
      watch: {
        include: pseudoMode == 'dev' ? [] : [path.resolve(contextPath, 'dst/img')],
      },
      // on build
      before: {
        root: cleanRoot,
        log: false,
        logWarning: true,
        logError: true,
        logDebug: false,
        test: [
          {
            folder: '.',
            method: (absPath) => {
              const noBackSlashPath = absPath.replace(/\\/g, '/');
              if (format !== '') {
                const pattern = format;
                const regx2 = new RegExp(`(${famille})[\/](${pattern})[\/](HTML5)[\/](dst)[\/](img)`, 'g');
                const resx2 = noBackSlashPath.match(regx2);
                if (resx2) {
                  return true;
                }
              } else {
                const regx = /(HTML5)[\/](dst)[\/](img)$/g;
                const resx = noBackSlashPath.match(regx);
                if (resx) {
                  return true;
                }
              }
            },
            recursive: true,
          },
        ],
      },
    }),
    // COPY ASSETS TO DST
    new CopyWebpackPlugin(
      {
        patterns: [
          {
            from: pathImg,
            noErrorOnMissing: true,
            context: contextPath,
            to({ context, absoluteFilename }) {
              const dist = path.join(absoluteFilename, '..', '..', '..', 'dst/');
              return dist + '/img/[name][ext]';
            },
            force: true,
          },
        ],
      },
      {
        copyUnmodified: true,
      }
    ),

    // inline SVG
    new HtmlWebpackInlineSVGPlugin({
      runPreEmit: true,
      svgoConfig: [
        {
          removeViewBox: false,
        },
        {
          inlineStyles: {
            onlyMatchedOnce: false,
          },
        },
        {
          collapseGroups: false,
        },
      ],
    }),
    // new HtmlWebpackInlineSVGPlugin(),

    // REMOVE EMPTY FILES
    new WebpackEmptyFilesCleanUpPlugin({ verbose: false, dry: false }),

    // get size dst folder
    new PluginGetFoldereSize(getSourcePath() + '/dst'),
  ];

  return {
    //
    mode: argv.mode,
    context: contextPath,
    entry: pseudoMode == 'watch' || pseudoMode == 'dev' || pseudoMode == 'buildone' ? globPath : GLOB,
    output: {
      environment: {
        arrowFunction: false,
        const: false,
      },
      filename: pseudoMode == 'watch' || pseudoMode == 'dev' || pseudoMode == 'buildone' ? './scripts.min.js' : './[name]/../../dst/scripts.min.js', // go to dst/
      path: pseudoMode == 'watch' || pseudoMode == 'dev' || pseudoMode == 'buildone' ? path.resolve(contextPath, 'dst') : contextPath,
      clean: false,
    },
    // WATCH -> force watch to browsersync buildone
    watch: pseudoMode == 'buildone' ? true : false,
    watchOptions: {
      ignored: ['**/node_modules', '**/dst', '**/.git', '**/webpack.config.js', '**/package.json', '**/package-lock.json', '**/config-banner.js'],
    },
    // alias
    resolve: {
      alias: {
        '@plugins': path.resolve(__dirname, './vendor/gsapcore'),
        '@modules': path.resolve(__dirname, './vendor/wq/modules'),
        '@polyfills': path.resolve(__dirname, './vendor/wq/polyfills'),
        '@effects': path.resolve(__dirname, './vendor/wq/effects'),
        '@helpers': path.resolve(__dirname, './vendor/wq/helpers'),
        '@WQ': path.resolve(__dirname, './vendor/wq'),
      },
      extensions: ['*', '.js'],
    },
    module: {
      rules: [
        /**
         * JS
         */
        {
          test: /\.js$/,
          exclude: [/node_modules/, /vendor\/gsapcore/],
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              configFile: path.resolve(__dirname, 'babel.config.js'),
              compact: true,
              cacheDirectory: false,
              sourceMaps: false,
            },
          },
        },
        /**
         * SASS
         */
        {
          test: /\.(s(a|c)ss)$/,
          // use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
          use: [MiniCssExtractPlugin.loader, { loader: 'css-loader', options: { url: false } }, 'postcss-loader', 'sass-loader'],
        },
        //ASSETS (images)
        {
          test: /\.(jpe?g|png|gif)$/i,
          type: 'asset',
        },
      ],
    },

    optimization: {
      // TREESHAKING
      nodeEnv: 'production',
      usedExports: true,
      // UGLIFY
      minimizer: [
        new CssMinimizerPlugin(),
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            compress: {
              drop_console: pseudoMode == 'watch' || pseudoMode == 'dev' ? false : true,
              passes: 1,
            },
            mangle: { toplevel: true },
            format: {
              comments: false,
            },
          },
        }),
        // OPTIMIZE IMAGES
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.imageminMinify,
            options: {
              // Lossly optimization with custom option
              plugins: [['imagemin-pngquant', { strip: true, quality: [configBanner.png.quality.min, configBanner.png.quality.max] }]],
            },
          },
        }),
      ],
    },
    plugins:
      // HTML
      htmlPlugins().concat(otherPlugins),
    // REMOVE OUTPUT
    stats: 'errors-warnings',
  };
};
