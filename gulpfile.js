import gulp from 'gulp'; // Основной модуль
import { path } from './gulp/config/path.js'; // Импорт путей
import { plugins } from './gulp/config/plugins.js'; // Импорт общих плагинов

// Передаем значения в глобальную переменную
global.app = {
  isBuildMax: process.argv.includes('--max'),
  isBuildMin: process.argv.includes('--min'),
  isBuildOptimized: process.argv.includes('--optimized'),
  isBuildDefault:
    !process.argv.includes('--max') &&
    !process.argv.includes('--min') &&
    !process.argv.includes('--optimized'),
  path: path,
  gulp: gulp,
  plugins: plugins,
};

// Импорт задач
import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { pug } from'./gulp/tasks/pug.js'
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { otfToTtf, ttfToWoff } from './gulp/tasks/fonts.js';
import { svgSprive } from './gulp/tasks/svgSprive.js';
import { zip } from './gulp/tasks/zip.js';
import { ftp } from './gulp/tasks/ftp.js';
import { createComponent } from './gulp/tasks/create.js';
import { cleanComponents } from './gulp/tasks/cleanComponents.js';
import { linter } from './gulp/tasks/linter.js';

// Наблюдатель за изменениями в файлах
function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.pug, pug);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.componentsScss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.componentsJs, js);
  gulp.watch(path.watch.images, images);
}

export { svgSprive };

// Последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff);
// Основные задачи
const mainTasks = gulp.series(
  fonts,
  gulp.parallel(linter, copy, pug, html, scss, js, images)
);
// Построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(cleanComponents, gulp.parallel(reset, mainTasks));
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);
const removeEmpty = gulp.series(cleanComponents);

// Экспорт сценариев
export { dev };
export { build };
export { deployZIP };
export { deployFTP };
export { removeEmpty };

// Выполнение сценария по умолчанию
gulp.task('default', dev);
// Создание компонента по команде: gulp create-component --name my-component, где my-component - это имя компонента, которое вы хотите создать
gulp.task('create-component', createComponent);
