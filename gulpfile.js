/* ---------------------------------------- */
/* Déclaration des variables pour les tasks */
/* ---------------------------------------- */
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const cleanCss = require("gulp-clean-css");
const htmlMin = require("gulp-htmlmin");
const uglify = require("gulp-uglify");
const browserSync = require("browser-sync").create();
const sourcemaps = require("gulp-sourcemaps");
const imagemin = require("gulp-imagemin");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const handlebarsCompiler = require("gulp-compile-handlebars");

// Function to delete cache from require over data
const cleanCache = () => {
  Object.keys(require.cache).forEach((key) => {
    if (!key.includes("/src/data/")) return;
    delete require.cache[key];
  });
};
/* --------------------- */
/* Déclaration des tasks */
/* --------------------- */
function hbsToHtml() {
  console.log("templating...");
  cleanCache();
  const templateData = require("./src/data/");

  return gulp
    .src("src/views/*.hbs")
    .pipe(
      handlebarsCompiler(templateData, {
        batch: ["src/views/partials"],
        helpers: {
          ifEquals: function (arg1, arg2, options) {
            return arg1 == arg2 ? options.fn(this) : options.inverse(this);
          },
        },
      })
    )
    .pipe(
      rename(function (path) {
        path.extname = ".html";
      })
    )
    .pipe(gulp.dest("./dist"))
    .pipe(browserSync.stream());
}

function sassTasks() {
  console.log("sass processing...");
  return gulp
    .src("./src/sass/*.scss")
    .pipe(
      plumber({
        errorHandler: notify.onError("Error 'SassTasks': <%= error.message %>"),
      })
    )
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 6 versions"],
        cascade: false,
      })
    )
    .pipe(
      cleanCss({
        compatibility: "ie8",
      })
    )
    .pipe(
      rename(function (path) {
        path.basename += ".min";
      })
    )
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream());
}

function jsTasks() {
  console.log("js processing...");
  return (
    gulp
      .src("./src/scripts/**/*.js")
      .pipe(
        plumber({
          errorHandler: notify.onError("Error 'JsTasks': <%= error.message %>"),
        })
      )
      // .pipe(babel({ presets: ['es2015'] }))
      .pipe(uglify())
      .pipe(gulp.dest("./dist/scripts"))
      .pipe(browserSync.stream())
  );
}

function imageTasks() {
  console.log("images processing");
  return gulp
    .src("./src/assets/*")
    .pipe(
      imagemin(
        [
          imagemin.gifsicle({ interlaced: true }),
          imagemin.mozjpeg({ quality: 75, progressive: true }),
          imagemin.optipng({ optimizationLevel: 5 }),
          imagemin.svgo({
            plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
          }),
        ],
        { verbose: true }
      )
    )
    .pipe(gulp.dest("dist/assets"))
    .pipe(browserSync.stream());
}

function initBrowserSync() {
  browserSync.init({
    port: 3000,
    server: {
      baseDir: "./dist/",
    },
  });
}

/* ------------------- */
/* Exécution des tasks */
/* ------------------- */
const init = () => {
  gulp.watch("./src/assets/*").on("change", imageTasks);
  gulp.watch("./src/views/**/*.hbs").on("change", hbsToHtml);
  gulp.watch("./src/data/**/*.js").on("change", hbsToHtml);
  gulp.watch("./src/sass/*/*.scss").on("change", sassTasks);
  gulp.watch("./src/scripts/**/*.js").on("change", jsTasks);
  gulp.watch("./dist/**/*").on("change", browserSync.reload);
  imageTasks();
  hbsToHtml();
  sassTasks();
  jsTasks();
  initBrowserSync();
};

gulp.task("default", init);
