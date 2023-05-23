import fs from "fs";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";

export const otfToTtf = () => {
  // Ищем файлы шрифтов .otf
  return (
    app.gulp
      .src(`${app.path.srcFolder}/assets/fonts/*.otf`, {})
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "FONTS",
            message: "Error: <%= error.message %>"
          })
        )
      )
      // Конвертируем в .ttf
      .pipe(fonter({ formats: ["ttf"] }))
      // Выгружаем в исходную папку
      .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
  );
};

export const ttfToWoff = () => {
  // Ищем файлы шрифтов .ttf
  return (
    app.gulp
      .src(`${app.path.srcFolder}/assets/fonts/*.ttf`, {})
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "FONTS",
            message: "Error: <%= error.message %>"
          })
        )
      )
      // конвертируем в .woff
      .pipe(fonter({ formats: ["woff"] }))
      // выгружаем в папку с результатом
      .pipe(app.gulp.dest(`${app.path.build.fonts}`))
      // ищем файлы шрифтов .ttf
      .pipe(app.gulp.src(`${app.path.srcFolder}/assets/fonts/*.ttf`))
      // конвертируем в .woff2
      .pipe(ttf2woff2())
      // выгружаем в папку с результатом
      .pipe(app.gulp.dest(`${app.path.build.fonts}`))
      // Ищем файлы шрифтов .woff, woff2, eot, svg
      .pipe(app.gulp.src(`${app.path.srcFolder}/assets/fonts/*.{woff,woff2,eot,svg}`))
      // Выгружаем в папку с результатом
      .pipe(app.gulp.dest(`${app.path.build.fonts}`))
  );
};
