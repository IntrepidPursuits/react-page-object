import CleanPlugin from 'clean-webpack-plugin'

export default {
  entry: {
    bundle: [
      './lib/react-page-object/index.js',
    ]
  },
  output: {
    path: './dist',
    filename: 'index.js',
    libraryTarget: 'umd'
  },
  externals: {
    'enzyme': {
      commonjs: 'enzyme',
      commonjs2: 'enzyme',
      amd: 'enzyme',
      root: 'enzyme'
    }
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
      }
    ],
  },
  plugins: [
    new CleanPlugin('dist')
  ]
}
