const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/semantrisTests/index.js",
  output: {
    path: path.resolve(__dirname, "./public"),
    publicPath: "/",
    filename: "bundle.js",
  },
  devtool: "source-map",
  target: "web",
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: "file-loader",
          // options: {
          //   name: '[name].[contenthash].[ext]',
          //   outputPath: 'assets/videos/',
          //   publicPath: 'assets/videos/'
          // }
        },
      },
    ],
  },
};
