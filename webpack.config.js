const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  entry: './popup.js', // Entry point for your plugin
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Output directory
    publicPath: '/dist/', // Update to ensure the public path is correctly set
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'], // Removed 'style-loader' as we're using MiniCssExtractPlugin
      },
      {
        test: /\.(png|jpg|gif|svg|webp)$/i,
        type: 'asset/resource', // Use asset/resource to emit images as files
        generator: {
          filename: 'images/[name][ext]', // Save images in an 'images' folder in 'dist'
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'popup.css', // Output CSS filename
    }),
  ],
};
