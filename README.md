# gulp-remote-src

`gulp.src` on URL.

## Usage

```js
var remoteSrc = require('gulp-remote-src');

remoteSrc(['a.js', 'b/c.js'], {
        base: 'https://github.com/xxx/xxx/',
    })
    .pipe(uglify())
    .pipe(gulp.dest('xx'));

```