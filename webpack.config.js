import * as pathNode from "path";

const srcFolder = "src";
const builFolder = "dist";

const path = {
  src: pathNode.resolve(srcFolder),
  build: pathNode.resolve(builFolder)
};

export const webpackConfig = isMode => ({
  entry: ["@babel/polyfill", `${path.src}/styles/js/main.js`],
  mode: isMode ? "development" : "production",
  output: {
    path: `${path.build}/js`,
    filename: "app.min.js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        },
        resolve: {
          fullySpecified: false
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
});
