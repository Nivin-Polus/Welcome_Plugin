const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  entry: './popup.js', 
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), 
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'style-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        type: 'asset/inline', 
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[[popup.css]]', 
    }),
  ],
};
