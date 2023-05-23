import gulp from 'gulp';
import eslint from 'gulp-eslint';

export function linter() {
  return gulp
    .src(['src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}
