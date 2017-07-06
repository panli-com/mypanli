import conf from './config.json'

import pkg from './package.json';
import gulp from 'gulp';
import rename from 'gulp-rename';
import notify from 'gulp-notify';
import ejs from "gulp-ejs";

const day = conf.start

const title = conf[day].title
const description = conf[day].description
const keywords = conf[day].keywords
const author = conf[day].author
const version = conf[day].version
const mincss = conf[day].build.css
const minjs = conf[day].build.js

const browserSync = require('browser-sync').create()
const reload = browserSync.reload


gulp.task('ejs', () => gulp.src(`./${day}/src/templates/*.html`)
  .pipe(ejs({
    title: title,
    mincss: mincss,
    minjs: minjs,
    time: new Date().getTime()
  }))
  .pipe(gulp.dest(`./${day}/`))
  .pipe(reload({ stream: true }))
  .pipe(notify({ message: 'ejs task complete' })))


gulp.task('dev', ['ejs'], () => {

  browserSync.init({
    server: `./${day}/`
  })

  gulp.watch([`./${day}/src/**/*.html`], ['ejs'])

})

gulp.task('default', ['dev']);