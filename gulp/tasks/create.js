import gulp from 'gulp';
import file from 'gulp-file';
import inject from 'gulp-inject-string';
import appendPrepend from 'gulp-append-prepend';
import fs from 'fs';

export const createComponent = () => {
  const componentName = process.argv[4] || '';

  if (!componentName) {
    console.error('Component name is not provided!');
    return;
  }

  // Создать файл my-component.html
  file(`${componentName}.html`, '', { src: true }).pipe(
    gulp.dest(`src/html/components/${componentName}`)
  );

  // Создать файл my-component.scss
  const componentsScss = fs.readFileSync(
    'src/styles/scss/config/base/components.scss',
    'utf8'
  );
  const myComponentScss = `@import '../../html/components/${componentName}/${componentName}.scss';\n`;
  const updatedComponentsScss = componentsScss + myComponentScss; // Swap the order of the two strings

  fs.writeFileSync(
    'src/styles/scss/config/base/components.scss',
    updatedComponentsScss
  );

  file(`${componentName}.scss`, '', { src: true })
    .pipe(gulp.dest(`src/html/components/${componentName}`))
    .pipe(inject.prepend(myComponentScss))
    .pipe(
      appendPrepend.appendFile('src/styles/scss/config/base/components.scss')
    ); // Use appendFile method

  // Создать файл my-component.js
  file(`${componentName}.js`, '', { src: true })
    .pipe(gulp.dest(`src/html/components/${componentName}`))
    .on('end', () => {
      // Добавить импорт в файл imports.js
      const importsFilePath = 'src/styles/js/imports.js';
      const currentImports = fs.readFileSync(importsFilePath, 'utf8');
      const newImport = `import '../../html/components/${componentName}/${componentName}.js';\n`;
      const updatedImports = currentImports + newImport;
      fs.writeFileSync(importsFilePath, updatedImports);
    });

  return Promise.resolve();
};
