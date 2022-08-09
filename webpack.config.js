const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => ({
    mode: argv.mode || 'development',
    devtool: argv.mode !== 'production' ? "inline-source-map" : false,
    
    entry: './src/index.tsx',
    module: {
        rules: [
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },
        {
            test: /\.(s(a|c)ss)$/,
            use: ['style-loader','css-loader', 'sass-loader']
         }
        ],
    },
    devServer: {
        static: path.join(__dirname, 'build')
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, argv.mode === 'development' ? 'build' : 'dist'),
    },
    plugins: [
        new CopyPlugin({
            patterns: [
              { from: "public" }
            ],
          }),
    ],
  });