// Получаем имя папки проекта
import * as nodePath from "path";
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`;
const srcFolder = `./src`;

export const path = {
  build: {
    js: `${buildFolder}/js/`,
    css: `${buildFolder}/css/`,
    html: `${buildFolder}/`,
    pug: `${buildFolder}/`,
    pages: `${buildFolder}/`,
    images: `${buildFolder}/images/`,
    fonts: `${buildFolder}/fonts/`,
    files: `${buildFolder}/files/`
  },
  src: {
    images: `${srcFolder}/assets/images/**/*.{jpg,jpeg,png,gif,webp}`,
    pug: `${srcFolder}/*.pug`,
    svg: `${srcFolder}/assets/images/**/*.svg`,
    svgicons: `${srcFolder}/assets/images/svg/*.svg`,
    html: `${srcFolder}/*.html`,
    pages: `${srcFolder}/html/views/*.html`,
    js: `${srcFolder}/styles/js/main.js`,
    componentsJs: `${srcFolder}/html/components/**/*.js`,
    scss: `${srcFolder}/styles/scss/main.scss`,
    componentsScss: `${srcFolder}/html/components/**/*.scss`,
    files: `${srcFolder}/files/**/*.*`
  },
  watch: {
    js: `${srcFolder}/styles/js/**/*.js`,
    pug: `${srcFolder}/**/*.pug`,
    componentsJs: `${srcFolder}/html/components/**/*.js`,
    scss: `${srcFolder}/styles/scss/**/*.scss`,
    componentsScss: `${srcFolder}/html/components/**/*.scss`,
    html: `${srcFolder}/**/*.html`,
    pages: `${srcFolder}/html/views/*.html`,
    images: `${srcFolder}/**/*.{jpg,jpeg,png,svg,gif,webp,ico}`,
    files: `${srcFolder}/files/**/*.*`
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  ftp: `test`
};
