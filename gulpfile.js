var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var del = require('del');
var zip = require('gulp-zip');
var gutil = require('gulp-util');
var exec = require('gulp-exec');
var concat = require('gulp-concat');
var cleanCss = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');


//image compression
var imagemin = require('gulp-imagemin');
var imageminOptipng = require('imagemin-optipng');
var imageminSvgo = require('imagemin-svgo');
var imageminPngquant = require('imagemin-pngquant');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');
var imageminJpegtran = require('imagemin-jpegtran');

var DIST_PATH = 'public/dist/resources';
var IMAGES_PATH = 'public/resources/**/images/**/*.{png,jpeg,jpg,svg,gif}';
var CSS_PATH = 'public/resources/css/**/*.css';
var ZIP_FILE = 'website.zip';

//Styles
gulp.task('styles', function () {
    console.log('starting styles task');

    return gulp.src([CSS_PATH])
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
        .pipe(gulp.dest(DIST_PATH + '/css'));
});

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
        .pipe(gulp.dest(DIST_PATH));
});

gulp.task('scp', function() {
    var options = {
        continueOnError: false, // default = false, true means don't emit error event
        pipeStdout: false, // default = false, true means stdout is written to file.contents
    };
    var reportOptions = {
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

gulp.task('default', function () {
    console.log('aws key:'+gutil.env.key)
    console.log('user:'+gutil.env.user)
})