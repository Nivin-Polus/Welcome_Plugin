const path = require('path');

module.exports = {
  entry: './popup.js', // Entry point for your plugin
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        type: 'asset/inline', // Inlines the image as Base64
      },
    ],
  },
};
