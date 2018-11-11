module.exports = {
  // Tell webpack to run babel on every file it runs through
  // test: only try to run babel on js files
  //exclude: don't run babel in node modules directory
  // stage-0: handles async code
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            'react',
            'stage-0',
            ['env', { targets: { browsers: ['last 2 versions']} }]
          ]
        }
      }
    ]
  }
};
