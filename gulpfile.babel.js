import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import cssnano from 'gulp-cssnano';
import concat from 'gulp-concat';
import minimist from 'minimist';
import htmlmin from 'gulp-htmlmin';
import uglify from 'gulp-uglify';
import imagemin from 'gulp-imagemin';
import imageminPngquant from 'imagemin-pngquant';
import fs from 'fs';
import path from 'path';
import plumber from 'gulp-plumber';
import eslint from 'gulp-eslint';
import notify from 'gulp-notify';
import del from 'del';
import browserSync from 'browser-sync';
import fileExists from 'file-exists';
// import tap from 'gulp-tap';
import buffer from 'gulp-buffer';
import bro from 'gulp-bro';
import size from 'gulp-size';
import babelify from 'babelify';
import pathExists from 'path-exists';
import deleteEmpty from 'delete-empty';
// import { on } from 'gulp-notify/lib/notify';
// import gulpif from 'gulp-if';
// import babel from 'gulp-babel';
// import recursiveFolder from 'gulp-recursive-folder';
// import cache from 'gulp-cache';
// "imagemin-optipng": "^7.1.0",
// "gulp-cache": "^1.1.3",
// "pngquant": "^3.0.0"

// install pngquant :
// npm install --save-dev pngquant --msvs_version=2017

// A VOIR :
// https://www.npmjs.com/package/pingo-bin

// ------------------------------------------------------------
// arguments for targeting a specific format
// format : decli ciblée (ex : 300x600)
// vers : version ciblée (ex: Version Initiale)
// gulp watch --format 300x600 --vers 'version Initiale' --subfolder 'Display - IAB'

const options = {
  string: ['format', 'vers', 'subfolder'],
  default: { format: '300x600', vers: 'Version Initiale', subfolder: 'Display IAB' },
};

const paths = {
  css: {
    src: ['src/css/sass/content.scss'],
    dest: 'dst/',
    watch: ['src/css/sass/**/*.scss'],
  },
  js: {
    src: 'src/js/*.js',
    dest: 'dst/',
    watch: ['src/js/**/*.js'],
  },
  modulesjs: {
    src: 'src/js/modules/app.js',
  },
  html: {
    src: 'src/*.html',
    dest: 'dst/',
    watch: 'src/*.html',
  },
  img: {
    src: ['src/img/*'],
    dest: 'dst/img/',
    watch: 'src/img/**',
  },
  videos: {
    src: ['src/videos/*'],
    dest: 'dst/videos/',
    watch: 'src/videos/**',
  },
  zip: {
    src: 'dst/**',
    dest: '',
  },
};

const option = minimist(process.argv.slice(2), options);

const quality = { min: 0.7, max: 0.8 };

// ------------------------------------------------------------
const optionsRecursive = {
  source: './' + option.vers + '/' + option.subfolder,
  target: option.vers + '/' + option.subfolder,
};

const autoprefixerOptions = {
  overrideBrowsersList: ['ie > 8', 'last 3 versions'],
  cascade: false,
};

const condition = function (file) {
  if (file.path.indexOf('min.js') < 0) {
    return true;
  } else {
    return false;
  }
};

function getFolders(dir) {
  return fs.readdirSync(dir).filter(function (file) {
    return fs.statSync(path.join(dir, file)).isDirectory();
  });
}

function checkBadPath(p) {
  // TODO : path.resolve
  var pt = path.join(p);
  // console.log(path.resolve(pt))
  fs.stat(pt, function (err, stat) {
    if (err !== null) {
      console.log('BAD PATH vers/format :', p);
      process.exit();
    }
  });
}

function is_Path(p) {
  return pathExists.sync(p);
}

// TASKS (compile / build)

const taskCss = (src, dest) => {
  return gulp
    .src(src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(cssnano({ zindex: false }))
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest(dest));
};

const taskHtml = (src, dest) => {
  return gulp
    .src(src)
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest(dest));
};

const taskScript = (src, dest) => {
  return gulp
    .src(src, { read: true })
    .pipe(plumber({ onLast: true, errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(eslint({ fix: true }))
    .pipe(eslint.failAfterError())
    .pipe(
      bro({
        transform: [babelify.configure({ presets: ['@babel/preset-env'], plugins: ['@babel/plugin-transform-runtime'] })],
      })
    )
    .pipe(buffer())
    .pipe(uglify())
    .pipe(concat('scripts.min.js'))

    .pipe(gulp.dest(dest));
};

const taskImg = (src, dest) => {
  return gulp
    .src(src)
    .pipe(
      imagemin([
        imageminPngquant({
          speed: 3,
          quality: [quality.min, quality.max], //lossy settings
          dithering: 1,
          strip: true,
        }),
      ]),
      imagemin.svgo({
        plugins: [
          {
            removeViewBox: false,
          },
        ],
      })
    )
    .pipe(gulp.dest(dest));
};

const taskVideos = (src, dest) => {
  del([path.join(dest + '*.mp4'), path.join(dest + '*.ogv'), path.join(dest + '*.webm')]);
  return gulp.src(src).pipe(gulp.dest(dest));
};

// COMPILE ---------------------------------------------------
/**
 * HTML
 */
const compileMarkup = (p) => {
  let src = './' + option.vers + '/' + option.subfolder + '/' + option.format + '/HTML5/' + paths.html.src;
  let dest = './' + option.vers + '/' + option.subfolder + '/' + option.format + '/HTML5/' + paths.html.dest;
  return taskHtml(src, dest);
};
/**
 * JS
 */
const compileScript = () => {
  let src = './' + option.vers + '/' + option.subfolder + '/' + option.format + '/HTML5/' + paths.js.src;
  let dest = './' + option.vers + '/' + option.subfolder + '/' + option.format + '/HTML5/' + paths.js.dest;
  del([path.join(dest + '*.js')]);
  return taskScript(src, dest);
};
/**
 * CSS
 */
const compileStyle = (taskDone) => {
  let src = './' + option.vers + '/' + option.subfolder + '/' + option.format + '/HTML5/' + paths.css.src;
  let dest = './' + option.vers + '/' + option.subfolder + '/' + option.format + '/HTML5/' + paths.css.dest;
  if (!is_Path(src)) return taskDone();
  return taskCss(src, dest);
};
/**
 * Images
 */
const compressImg = () => {
  let src = './' + option.vers + '/' + option.subfolder + '/' + option.format + '/HTML5/' + paths.img.src;
  let dest = './' + option.vers + '/' + option.subfolder + '/' + option.format + '/HTML5/' + paths.img.dest;
  del([path.join(dest + '*.jpg'), path.join(dest + '*.jpeg'), path.join(dest + '*.png'), path.join(dest + '*.gif'), path.join(dest + '*.svg'), path.join(dest + '*.tmp')]);
  return taskImg(src, dest);
};
/**
 * Videos
 */
const copyVideos = () => {
  let src = './' + option.vers + '/' + option.subfolder + '/' + option.format + '/HTML5/' + paths.videos.src;
  let dest = './' + option.vers + '/' + option.subfolder + '/' + option.format + '/HTML5/' + paths.videos.dest;
  return taskVideos(src, dest);
};
/**
 * get size folder dst
 */
const getSize = (taskDone) => {
  let dest = './' + option.vers + '/' + option.subfolder + '/' + option.format + '/HTML5/' + paths.html.dest;
  const s = size({ showTotal: true, pretty: true, title: 'Poids format : ' });
  // return gulp.src(dest + '/**/*').pipe(size({ showTotal: true, pretty: true }));
  if (!is_Path(dest)) return taskDone();
  return gulp
    .src(dest + '/**/*')
    .pipe(s)
    .pipe(notify({ onLast: true, message: () => s.prettySize + ' / ' + s.size + ' B' }));
};
/**
 * delete empty folders
 */
const delEmpty = (taskDone) => {
  let dest = './' + option.vers + '/' + option.subfolder + '/' + option.format + '/HTML5/' + paths.html.dest;
  const pathDest = path.resolve(dest);
  deleteEmpty.sync(pathDest);
  return taskDone();
};

// WATCH ---------------------------------------------------
/**
 * markup
 */
const watchMarkup = () => {
  let p = './' + option.vers + '/' + option.subfolder + '/' + option.format + '/HTML5/';
  let w = p + paths.html.watch;
  checkBadPath(p);
  gulp.watch(w, gulp.series(compileMarkup, reload));
};
/**
 * script
 */
const watchScript = () => {
  let p = './' + option.vers + '/' + option.subfolder + '/' + option.format + '/HTML5/';
  let w = p + paths.js.watch;
  checkBadPath(p);
  gulp.watch(w, gulp.series(compileScript, reload));
};
/**
 * style
 */
const watchStyle = () => {
  let p = './' + option.vers + '/' + option.subfolder + '/' + option.format + '/HTML5/';
  let w = p + paths.css.watch;
  checkBadPath(p);
  gulp.watch(w, gulp.series(compileStyle, reload));
};
/**
 * Images
 */
const watchImage = () => {
  let p = './' + option.vers + '/' + option.subfolder + '/' + option.format + '/HTML5/';
  let w = p + paths.img.watch;
  checkBadPath(p);
  gulp.watch(w, gulp.series(compressImg, reload));
};
/**
 *
 * videos
 */
const watchVideos = () => {
  let p = './' + option.vers + '/' + option.subfolder + '/' + option.format + '/HTML5/';
  let w = p + paths.videos.watch;
  if (is_Path(p)) gulp.watch(w, gulp.series(copyVideos, reload));
};
/**
 * watch size folder dst
 */
const watchSize = () => {
  let dest = './' + option.vers + '/' + option.subfolder + '/' + option.format + '/HTML5/' + paths.html.dest;
  return gulp.watch(dest, gulp.series(getSize));
};
/**
 * watch empty folder in dst
 */
const watchEmpty = () => {
  let dest = './' + option.vers + '/' + option.subfolder + '/' + option.format + '/HTML5/' + paths.html.dest;
  return gulp.watch(dest, gulp.series(delEmpty));
};

// BUILD ---------------------------------------------------

const buildAll = (done) => {
  let folders = getFolders(optionsRecursive.source);
  console.log(folders);
  /**
   * Images
   */
  const buildImg = folders.map((folder) => {
    const compimg = (taskDone) => {
      let src = optionsRecursive.source + '/' + folder + '/HTML5/' + paths.img.src;
      let dest = optionsRecursive.source + '/' + folder + '/HTML5/' + paths.img.dest;
      del([path.join(dest + '*.jpg'), path.join(dest + '*.jpeg'), path.join(dest + '*.png'), path.join(dest + '*.gif'), path.join(dest + '*.svg'), path.join(dest + '*.tmp')]);
      return taskImg(src, dest);
    };
    return compimg;
  });
  /**
   * markup
   */
  const buildHtml = folders.map((folder) => {
    const comphtml = (taskDone) => {
      let src = optionsRecursive.source + '/' + folder + '/HTML5/' + paths.html.src;
      let dest = optionsRecursive.source + '/' + folder + '/HTML5/' + paths.html.dest;
      return taskHtml(src, dest);
    };
    return comphtml;
  });
  /**
   * Script
   */
  const buildScript = folders.map((folder) => {
    const compscript = (taskDone) => {
      let src = optionsRecursive.source + '/' + folder + '/HTML5/' + paths.js.src;
      let dest = optionsRecursive.source + '/' + folder + '/HTML5/' + paths.js.dest;
      del([path.join(dest + '*.js')]);
      return taskScript(src, dest);
    };
    return compscript;
  });
  /**
   * CSS
   */
  // .src(src, { allowEmpty: true })
  const buildCss = folders.map((folder) => {
    const compcss = (taskDone) => {
      let src = optionsRecursive.source + '/' + folder + '/HTML5/' + paths.css.src;
      let dest = optionsRecursive.source + '/' + folder + '/HTML5/' + paths.css.dest;
      if (!fileExists.sync(src)) return taskDone();
      return taskCss(src, dest);
    };
    return compcss;
  });

  /**
   * Videos
   */
  const buildVideos = folders.map((folder) => {
    const copyVideos = () => {
      let src = './' + option.vers + '/' + option.subfolder + '/' + option.format + '/HTML5/' + paths.videos.src;
      let dest = './' + option.vers + '/' + option.subfolder + '/' + option.format + '/HTML5/' + paths.videos.dest;
      return taskVideos(src, dest);
    };
    return copyVideos;
  });

  /**
   * SIZE
   */
  const buildSize = folders.map((folder) => {
    const getSize = (taskDone) => {
      let dest = optionsRecursive.source + '/' + folder + '/HTML5/' + paths.html.dest;
      if (!is_Path(dest)) return taskDone();
      const s = size({ showTotal: true, pretty: true, title: 'Poids format ' + folder + ': ' });
      // return gulp.src(dest + '/**/*').pipe(size({ showTotal: true, pretty: true }));
      return gulp.src(dest + '/**/*').pipe(s);
    };
    return getSize;
  });

  /**
   * Empty Folder
   */
  const buildEmpty = folders.map((folder) => {
    const emptyFolder = (taskDone) => {
      let dest = './' + option.vers + '/' + option.subfolder + '/' + option.format + '/HTML5/' + paths.html.dest;
      const pathDest = path.resolve(dest);
      deleteEmpty.sync(pathDest);
      return taskDone();
    };
    return emptyFolder;
  });
  //
  return gulp.series(...buildImg, ...buildHtml, ...buildScript, ...buildCss, ...buildVideos, ...buildSize, ...buildEmpty, (seriesDone) => {
    seriesDone();
    done();
  })();
};

const server = browserSync.create();

const reload = (done) => {
  server.reload();
  done();
};

const serve = (done) => {
  server.init({
    server: {
      baseDir: './' + option.vers + '/' + option.subfolder + '/' + option.format + '/HTML5/' + paths.html.dest,
    },
  });
  done();
};

const watching = gulp.parallel(watchImage, watchMarkup, watchScript, watchStyle, watchVideos, watchSize, watchEmpty);
const buildall = gulp.parallel(buildAll);
const building = gulp.series(compressImg, compileMarkup, compileScript, compileStyle, copyVideos, getSize, delEmpty);
const build = gulp.series(building, serve);
const watch = gulp.series(building, serve, watching);
watch.description = 'watch for changes to all source';

const defaultTasks = watch;

export { watch, build, buildall };

export default defaultTasks;
