# Getting started with webpack is easy

Using webpack on smaller projects is simple. It can be very useful in situations where you just want to hack on some proof of concept but you need some dependencies from NPM and also want to use the latest ESNext or TypeScript features. Lets try it out!

Make a new directory for your project and change into that directory

```shell
$ mkdir webpack-easy && cd webpack-easy
```

Initialize NPM via Yarn

```shell
$ yarn init -y
```

If you don't already have yarn it's very easy to install: [https://yarnpkg.com/en/docs/install](https://yarnpkg.com/en/docs/install)

When managing JS dependencies with NPM and Yarn, you're going to be downloading a lot of files to your project directory. You want to ignore those in Git because Yarn is going to keep track of exactly which versions you're using with `yarn.lock` So now would be a good time to ignore the `node_modules` directory in Git:

```shell
$ echo 'node_modules' > .gitignore
```

Add webpack to your project as a development dependency

```shell
$ yarn add -D webpack
```


Write a webpack config file in your project root.
```js
// ./webpack.config.js

var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ],
    },
    devtool: 'inline-source-map',
    plugins: [new HtmlWebpackPlugin()]
};
```

The example above is pretty minimal but it's actually all you need to get hacking. The config covers four main concepts in webpack:
1. *Entry* is the top level of your dependency graph. That means, any modules required by this top level will also be parsed recursively. Any files that are not referenced in that graph will be ignored by webpack.
1. *Loaders* are instructions for special handling for any files that get parsed by webpack. In this example we're asking webpack to pass any JS files through babel before proceeding. Loaders handle all kinds of files, not just JavaScript.
1. *Plugins* can extend the core of webpack in any arbitrary way. HtmlWebpackPlugin will generate an index html file using passed in configuration and link the the built bundles in the head. This is convenient for our usecase but also a very useful tool for setting up a deployment strategy (being able to reference dynamically generated bundle names).
1. *Output* describes the directory and file name for generated bundles.

Notice that since our config is just JS we can do anything you would expect, for instance we're requiring a HTMLWebpackPlugin via an NPM package.
