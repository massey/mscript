const path = require('path')

module.exports = {
  entry: './src/mscript.ts',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'mscript.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use:['babel-loader', 'ts-loader']
      },
      {
        test: /\.js$/,
        use:['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devtool: 'source-map'
}
