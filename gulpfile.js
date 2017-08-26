const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const zip = require('gulp-zip');
const gutil = require('gulp-util');
const exec = require('gulp-exec');
const concat = require('gulp-concat');
const cleanCss = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');


//image compression
const imagemin = require('gulp-imagemin');
const imageminOptipng = require('imagemin-optipng');
const imageminSvgo = require('imagemin-svgo');
const imageminPngquant = require('imagemin-pngquant');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const imageminJpegtran = require('imagemin-jpegtran');

const DIST_PATH = 'public/dist';
const DIST_RESOURCES_PATH = DIST_PATH + '/resources';
const DIST_VENDOR_PATH = DIST_PATH + '/vendor';
const IMAGES_PATH = 'public/resources/**/images/**/*.{png,jpeg,jpg,svg,gif}';
const CSS_PATH = 'public/resources/css';
const ZIP_FILE = 'website.zip';
const VENDOR_PATH = 'public/vendor/**/*';

//Styles
gulp.task('styles', function () {

    return gulp.src(CSS_PATH + '/styles.css')
        .pipe(plumber(function (err) {
            console.log('Styles task error!');
            console.log(err);
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(concat('styles.css'))
        .pipe(cleanCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DIST_RESOURCES_PATH + '/css'));
});

//Queries
gulp.task('queries', function () {

    return gulp.src(CSS_PATH + '/queries.css')
        .pipe(plumber(function (err) {
            console.log('queries task error!');
            console.log(err);
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(concat('queries.css'))
        .pipe(cleanCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DIST_RESOURCES_PATH + '/css'));
});

//Vendor
gulp.task('vendor', function () {
    return gulp.src(VENDOR_PATH)
        .pipe(gulp.dest(DIST_VENDOR_PATH))
})

// Images
gulp.task('images', function () {
    return gulp.src(IMAGES_PATH)
        .pipe(imagemin(
            [
                imageminOptipng(),
                imageminSvgo(),
                imageminPngquant(),
                imageminJpegRecompress(),
                imageminJpegtran()
            ]
        ))
        .pipe(gulp.dest(DIST_RESOURCES_PATH));
});

gulp.task('scp', function() {
    const options = {
        continueOnError: false, // default = false, true means don't emit error event
        pipeStdout: false, // default = false, true means stdout is written to file.contents
    };
    const reportOptions = {
        err: true, // default = true, false means don't write err
        stderr: true, // default = true, false means don't write stderr
        stdout: true // default = true, false means don't write stdout
    }
    return gulp.src('website.zip')
        .pipe(exec('scp -i ' + gutil.env.key + ' <%= file.path %> ' + gutil.env.user + ':"exchange/"'))
        .pipe(exec.reporter(reportOptions))
        .on('error', function(err) {
            console.log(err);
        });
});

gulp.task('clean', function () {
    return del.sync([DIST_PATH, ZIP_FILE]);
});

gulp.task('export', function () {
    return gulp.src(['public/index.html', "public/dist/**/*"])
        .pipe(zip(ZIP_FILE))
        .pipe(gulp.dest('./'));
});

gulp.task('default', ['clean', 'images', 'vendor', 'styles', 'queries'], function () {
    console.log('aws key:'+gutil.env.key)
    console.log('user:'+gutil.env.user)
})