const path = require('path')

module.exports = {
  entry: './src/mscript.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'mscript.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use:['babel-loader', 'ts-loader']
      }
    ]
  },
  resolve: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  }
}
