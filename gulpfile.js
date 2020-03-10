// Initialize modules
const {src, dest, watch, series, parallel} = require('gulp');

const autoprefixer = require('autoprefixer'),
      browserSync = require('browser-sync'),
      cssnano = require('cssnano'),
      clean = require('gulp-clean'),
      concat = require('gulp-concat'),
      postcss = require('gulp-postcss'),
      replace = require('gulp-replace'),
      rename = require('gulp-rename'),
      npmDist = require('gulp-npm-dist'),
      sass = require('gulp-sass'),
      sourcemaps = require('gulp-sourcemaps'),
      imagemin = require('gulp-imagemin');

const srcFolder = 'src/',
      distFolder = 'dist/',
      themeFileStyleName = 'style',
      themeFileScriptName = 'theme'

const files = {
    sassPath: srcFolder + '/scss/',
    sassStylePath: srcFolder + '/scss/' + themeFileStyleName + '.scss',
    jsPath: srcFolder + 'assets/js/' + themeFileScriptName + '.js',
}

// This task Compiles sass into css - no sourcemaps, no autoprefixing, no minification
function sassDevTask(){
    return src(files.sassStylePath)
        .pipe(sass({ outputStyle: 'expanded'})).on('error', sass.logError)
        .pipe(dest(srcFolder + 'assets/css'))
        .pipe(browserSync.stream());
}

// This task Compiles sass into css - sourcemaps, autoprefixing, minification
function sassBuildTask(){
    return src(files.sassStylePath)
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'expanded'})).on('error', sass.logError)
        .pipe(dest(srcFolder + 'assets/css'))
        .pipe(concat(themeFileStyleName + '.css'))
        .pipe(dest(srcFolder + 'assets/css'))
        .pipe(postcss([autoprefixer([
            "last 2 major version",
            ">= 1%",
            "Chrome >= 45",
            "Firefox >= 38",
            "Edge >= 12",
            "Explorer >= 10",
            "iOS >= 9",
            "Safari >= 9",
            "Android >= 4.4",
            "Opera >= 30"], { cascade: true }), cssnano()]))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(distFolder + 'assets/css'));
}

// Copy 3rd party modules to the vendor directory based on our package.json dependencies
function copyVendorTask() {
    return src(npmDist({
        copyUnminified: true
    }),{
        base: './node_modules/'
    }).pipe(rename(function (path) {
        path.dirname = path.dirname.replace(/\/distribute/, '').replace(/\\distribute/, '').replace(/\/dist/, '').replace(/\\dist/, '');
    })).pipe(dest(srcFolder + 'assets/vendors'));
}

// Generate a string and place it into html <link> and <script> tags
// for cache purpose. example: 'style.min.css?cb=123'
const cbString = new Date().getTime();

function cacheBustTask() {
    return src([srcFolder + '**/*.html'])
        .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
        .pipe(dest(srcFolder + '.'));
}

// Watch task
function watchTask() {
    browserSync.init({
        server: {
            baseDir: "src/"
        }
    });
    watch(srcFolder + '**/*.html').on('change', browserSync.reload);
    watch(srcFolder + 'scss/**/*.scss', series(sassDevTask));
    watch(files.jsPath).on('change', browserSync.reload);
}

//--------------------------------------------------------------------------------------------
// GULP default task - type 'gulp' in your terminal to execute all tasks listed below
// 1. copyVendorTask - Generate vendor folder inside src/assets/vendors
// 2. sassDevTask - Compiles sass into css - no sourcemaps, no autoprefixing, no minification
// 3. cacheBustTask - Generate a string and place it into html <link> and <script> tags
// 4. watchTask - Watches for HTML, CSS and JS changes
//--------------------------------------------------------------------------------------------
exports.default = series(
    copyVendorTask,
    sassDevTask,
    watchTask
);

// Clean the 'dist' folder
function cleanTask(){
    return src(distFolder, { allowEmpty: true })
        .pipe(clean());
}

// Copy files from src folder into dist folder
function copyTask() {
    return src([
        srcFolder + '**/*.*',
        '!' + srcFolder + "/scss/**/*.scss",
        '!' + srcFolder + "/documentation/**/*.*"
    ], { allowEmpty: true })
        .pipe(dest(distFolder));
}

// Minifies images
function minImgTask() {
    return src(srcFolder + 'assets/img/*')
        .pipe(imagemin([
            imagemin.gifsicle(), 
            imagemin.mozjpeg(), 
            imagemin.optipng(), 
            imagemin.svgo()
        ]))
        .pipe(dest(distFolder + 'assets/img'));
}

//--------------------------------------------------------------------------------------
// GULP dist task - type 'gulp dist' in your terminal to execute all tasks listed below
// 1. cleanTask - clean the 'dist' folder
// 2. copyTask - Copy files from src folder into dist folder
// 3. sassBuildTask - Compiles sass into css - no sourcemaps, no autoprefixing, no minification
// 4. minImgTask - Minifies images
//--------------------------------------------------------------------------------------
exports.dist = series(
    cleanTask,
    copyTask,
    cacheBustTask,
    parallel(sassBuildTask, minImgTask)
);