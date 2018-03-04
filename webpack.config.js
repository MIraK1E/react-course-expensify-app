// Require node path
const path = require('path');

module.exports = {
    // Where is app excute by default
    entry: './src/app.js',

    // Set where we put a big javascript file to run our application
    output: {

        // Use path join medthod to join 2 path together
        // __dirname is current path location
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },

    // setup module
    module: {
        rules: [{

            // set loader 
            loader: 'babel-loader',

            // flie type for loader to load
            test: /\.js$/,
            exclude: /node_modules/,
        }, 
        // second rule
        {
            // file type for load
           test: /\.s?css$/,

           // if file type match then load this 
           use: [
               'style-loader',
               'css-loader',
               'sass-loader'
           ] 
        }]
    },
    // setup devtool for track error
    devtool: 'cheap-module-eval-source-map',

    // Object for develop server
    devServer: {

        // set as public path for our app
        contentBase: path.join(__dirname, 'public'),

        // set client side route
        historyApiFallback: true
    }
};