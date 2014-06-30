var remoteSrc = require('./');
var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('test', function() {
    remoteSrc(['source.js'], {
            stream: false,
            base: 'https://raw.githubusercontent.com/ddliu/gulp-remote-src/master/tests/'
        })
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});