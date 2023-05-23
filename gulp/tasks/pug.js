import plumber  from 'gulp-plumber'
import pugGulp  from 'gulp-pug'


export const pug = () => {
    return app.gulp
    .src(app.path.src.pug)
    .pipe(plumber())
    .pipe(pugGulp({ }))
    .pipe(app.gulp.dest(app.path.build.pug))
    .pipe(app.plugins.browserSync.stream())
}