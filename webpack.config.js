const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index",
  output: {
    path: path.resolve(__dirname, ""),
    libraryTarget: "commonjs2",
    filename: "index.js"
  }
};
