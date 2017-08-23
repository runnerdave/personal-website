var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var del = require('del');
var zip = require('gulp-zip');
var gutil = require('gulp-util');
var exec = require('gulp-exec');


//image compression
var imagemin = require('gulp-imagemin');
var imageminOptipng = require('imagemin-optipng');
var imageminSvgo = require('imagemin-svgo');
var imageminPngquant = require('imagemin-pngquant');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');
var imageminJpegtran = require('imagemin-jpegtran');

var DIST_PATH = 'public/dist';
var IMAGES_PATH = 'public/resources/**/images/**/*.{png,jpeg,jpg,svg,gif}';

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
        .pipe(gulp.dest(DIST_PATH + '/resources/images'));
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
    return del.sync([DIST_PATH]);
});

gulp.task('export', function () {
    return gulp.src('public/**/*')
        .pipe(zip('website.zip'))
        .pipe(gulp.dest('./'));
});

gulp.task('default', function () {
    console.log('aws key:'+gutil.env.key)
    console.log('user:'+gutil.env.user)
})