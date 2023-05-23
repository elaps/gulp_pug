import gulp from 'gulp';
import filter from 'gulp-filter';
import clean from 'gulp-clean';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

export function cleanComponents() {
  const componentsDir = 'src/html/components/';
  const components = fs.readdirSync(componentsDir, { withFileTypes: true });

  // Фильтры для выбора файлов компонентов
  const htmlFilter = filter('**/*.html', { restore: true });
  const jsFilter = filter('**/*.js', { restore: true });
  const scssFilter = filter('**/*.scss', { restore: true });

  function removeEmpty() {
    // Проверяем каждую папку внутри components на наличие файлов
    components.forEach((component) => {
      if (component.isDirectory()) {
        const componentPath = path.join(componentsDir, component.name);
        if (fs.existsSync(componentPath)) {
          const files = fs.readdirSync(componentPath);

          // Если папка пустая, удаляем ее
          if (files.length === 0) {
            console.log(
              chalk.red.bgBlue.bold(`Удалена пустая папка - ${componentPath}`)
            );
            fs.rmdirSync(componentPath);
          }
        }
      }
    });
  }

  return gulp
    .src(`${componentsDir}/**/*.{html,js,scss}`)
    .pipe(htmlFilter)
    .pipe(jsFilter)
    .pipe(scssFilter)
    .pipe(
      filter((file) => {
        // Фильтрация пустых файлов
        return file.stat.size !== 0;
      })
    )
    .pipe(gulp.dest(`${componentsDir}`))
    .pipe(clean({ force: true }))
    .on('error', (err) => {
      console.error(err.message);
    })
    .on('end', () => {
      // Выводим список компонентов
      const components = fs.readdirSync('src/html/components');
      console.log(chalk.red('Components:'));
      components.forEach((component) => {
        console.log(`- ${component}`);
      });
    })
    .on('finish', () => {
      gulp
        .src(`${componentsDir}/**/*.{html,js,scss}`)
        .pipe(
          filter((file) => {
            // Фильтрация пустых файлов
            return file.stat.size == 0;
          })
        )
        .pipe(clean({ force: true }))
        .on('data', (file) => {
          console.log(
            chalk.red.bgYellow.bold(`Удален пустой файл - ${file.path}`)
          );

          const scssConfigPath = 'src/styles/scss/config/base/components.scss';
          const scssConfig = fs.readFileSync(scssConfigPath, 'utf-8');

          // Регулярное выражение для поиска импортов с расширением .scss
          const importRegex =
            /@import\s+(["'])\.\.\/\.\.\/html\/components\/([\w-]+)\/([\w-]+)\.scss\1;/g;

          // Поиск и удаление импортов удаленных файлов scss
          let newConfig = scssConfig.replace(
            importRegex,
            (match, p1, component, file) => {
              const componentPath = path.join(
                'src',
                'html',
                'components',
                component,
                `${file}.scss`
              );
              if (fs.existsSync(componentPath)) {
                return match;
              } else {
                console.log(
                  chalk.red.bgYellow.bold(`Удален импорт - ${match}`)
                );
                return '';
              }
            }
          );

          // Перезапись файла components.scss
          fs.writeFileSync(scssConfigPath, newConfig);

          const jsImportsPath = 'src/styles/js/imports.js';
          const jsImports = fs.readFileSync(jsImportsPath, 'utf-8');

          // Регулярное выражение для поиска импортов с расширением .js
          const jsImportRegex =
            /import\s+(["'])\.\.\/\.\.\/html\/components\/([\w-]+)\/([\w-]+)\.js\1;/g;

          // Поиск и удаление импортов удаленных файлов js
          let newJsImports = jsImports.replace(
            jsImportRegex,
            (match, p1, component, file) => {
              const componentPath = path.join(
                'src',
                'html',
                'components',
                component,
                `${file}.js`
              );
              if (fs.existsSync(componentPath)) {
                return match;
              } else {
                console.log(
                  chalk.red.bgYellow.bold(`Удален импорт - ${match}`)
                );
                return '';
              }
            }
          );

          // Перезапись файла imports.js
          fs.writeFileSync(jsImportsPath, newJsImports);
        })
        .on('data', () => {
          removeEmpty();
        });
    });
}
