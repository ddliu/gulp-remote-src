# gulp-remote-src

[![Build Status](https://travis-ci.org/ddliu/gulp-remote-src.png)](https://travis-ci.org/ddliu/gulp-remote-src)

Remote `gulp.src`.

## Installation

Install package with NPM and add it to your development dependencies:

    npm install --save-dev gulp-remote-src

## Usage

```js
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var remoteSrc = require('gulp-remote-src');

gulp.task('remote', function() {
    
remoteSrc(['app.js', 'jquery.js'], {
        stream: false,
        base: 'http://myapps.com/assets/',
    })
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
})
```

## Options

- `base`

    Url base.

- `stream`

    Pipe out files as stream or not. Note that some plugins does not support streaming.

## Changelog

### v0.1.0 (2014-06-30)

First release.