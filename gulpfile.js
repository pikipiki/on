const gulp        = require('gulp');
const sass        = require('gulp-sass');
const browserSync = require('browser-sync').create()
const concat      = require('gulp-concat')
const babel       = require('gulp-babel')

const root        = "./src/"
const paths       = {
  dist: "./dist/",
  css: `${root}/css`,
  scss: `${root}/scss/**/*.scss`,
  html: `${root}/index.html `,
  libCss: './node_modules/normalize.css/normalize.css',
  js: `${root}/js/*.js`,
  modules: [
    'jquery/dist/jquery.min.js'
  ],
  static: [
    `${root}/img/**/*`,
    `${root}/fonts/**/*`
  ]

}

gulp.task('sass', () => {
  return gulp.src(paths.scss)
    .pipe(sass())
    .pipe(gulp.dest(`${paths.dist}/css`))
    .pipe(browserSync.stream())
})

gulp.task('minJs', () => {
  return gulp.src(paths.js)
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest(`${paths.dist}/js`))
})

gulp.task('serve', ['sass', 'minJs'], () => {
  browserSync.init({
    injectChanges: true,
    server: {
      baseDir: paths.dist
    }
  })
})

gulp.task('watch', () => {
  gulp.watch(paths.scss, ['sass']);
  gulp.watch(paths.html, ['copyHtml']);
  gulp.watch(paths.js, browserSync.reload);
  gulp.watch(paths.html).on('change', browserSync.reload)
})

gulp.task('copyHtml', () => {
  gulp.src(`${root}/index.html`)
    .pipe(gulp.dest(paths.dist));
})

gulp.task('copyStatic', () => {
  gulp.src(paths.static, { base: 'src' })
    .pipe(gulp.dest(paths.dist));
})

gulp.task('copyLibCss', () => {
  gulp.src(paths.libCss)
    .pipe(gulp.dest(`${paths.dist}/css`));
})

gulp.task('modules', () => {
  gulp.src(paths.modules.map((path) => {
    return `./node_modules/${path}`
  }))
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(`${paths.dist}/js`))
})

gulp.task('default', [
  'sass',
  'minJs',
  'copyHtml',
  'copyStatic',
  'copyLibCss',
  'modules',
  'serve',
  'watch'
])