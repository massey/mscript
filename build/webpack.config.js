const path = require('path')

module.exports = {
  entry: './src/mscript.ts',
  output: {
    path: path.join[__dirname, 'dist'],
    filename: 'mscript.js'
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
  }
}
