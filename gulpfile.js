const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const htmlMinifier = require('gulp-html-minifier2');

function html(){
    return gulp.src('src/html/*.html')
    .pipe(htmlMinifier({collapseWhitespace:true}))
    .pipe(gulp.dest('build/html'))
};
gulp.task(html);

function scss(){
    return gulp.src('src/css/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 10 versions']
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('build/css/dist'))
};
gulp.task(scss);

function css(){
    return gulp.src('src/css/*.css')
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 10 versions']
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('build/css'))
};
gulp.task(css);

function javascript(){
  return gulp.src('src/js/*.js')
  .pipe(gulp.dest('build/js'));
};
gulp.task(javascript);

function media(){
    return gulp.src('src/media/*.{png,jpg}')
    .pipe(gulp.dest('build/media'));
}
gulp.task(media);

function icon() {
    return gulp.src('src/media/Icons/*.svg')
    .pipe(gulp.dest('build/media/Icons'))
}
gulp.task(icon);

function watch(){
    gulp.watch('src/css/*.scss', gulp.series(scss));
    gulp.watch('src/css/*.css', gulp.series(css));
    gulp.watch('src/html/*.html', gulp.series(html));
    gulp.watch('src/js/*js', gulp.series(javascript));
    gulp.watch('src/media/*.{png,jpg}', gulp.series(media));
    gulp.watch('src/media/Icons/*svg', gulp.series(icon));
};
gulp.task(watch);

gulp.task('default', gulp.parallel('watch','html','scss', 'css', 'javascript', 'media', 'icon'));
