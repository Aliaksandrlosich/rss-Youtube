var path = require("path");
var chunk = require('lodash/chunk');

module.exports = {
  entry: "./src/app.js",
  optimization:{
  	minimize:false
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
  }
}