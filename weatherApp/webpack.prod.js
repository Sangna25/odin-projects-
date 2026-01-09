const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production", 
  
  // 1. ENTRY: Where Webpack starts looking
  entry: "./src/index.js",

  // 2. OUTPUT: Where the bundle goes
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true, // Deletes old files in 'dist' before bundling
  },

  // 3. DEV SERVER: Auto-refresh settings
  devtool: "source-map", // Shows correct error line numbers
  devServer: {
    watchFiles: ["./src/template.html"], // Also watch HTML for changes
  },

  // 4. PLUGINS: Extra powers (like handling HTML creation)
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html", // Use our HTML skeleton
    }),
  ],

  // 5. LOADERS: Teach Webpack how to read non-JS files
  module: {
    rules: [
      // CSS LOADER
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"], // Order matters! (Right to Left)
      },
      // HTML LOADER (for images in HTML)
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      // IMAGE ASSETS (fo--r images in JS)
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};