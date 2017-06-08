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

Notice that since our config is just JS we can do anything you would expect, for instance we're requiring a HTMLWebpackPlugin via an NPM package. We need to remember to add that package:

```shell
$ yarn add -D html-webpack-plugin
```

And lastly we need to create an `index.js` because thats what we specified for our entry:

```shell
$ mkdir src && touch src/index.js
```

Now inside that file we can do all the latest JS stuff:

```js
// index.js
import * as _ from 'lodash';
import { bar } from './bar';
import { foo } from './foo';

console.log(bar('haha'));
_.map(_.range(0, 4), (x) => console.log(foo(x)));
```

First we're importing lodash via NPM and assigning it to a reference of `_`
And then we import some of our own source, `foo` and `bar`. We will write those next.
Once we have a reference from an import we can use it as if it were local to the current file, as demonstrated on the remaining lines.

Now add the other files:

```shell
$ touch src/foo.js
```

Add the following content into foo:

```js
// foo.js
let foo = (x) => `foo ${x}`;

export { foo };
```

Create bar:

```shell
$ touch src/bar.js
```

And add this into bar:

```js
// bar.js
let bar = (x) => `bar ${x}`;

export { bar };
```

Notice that we're referencing lodash as an NPM dependency in `index.js`, we need to remember to add that package as a runtime dependency:

```shell
$ yarn add lodash
```

Also in our webpack config we reference Babel Loader and we haven't yet installed that, which also requires babel-core:

```shell
$ yarn add -D babel-loader babel-core
```

Now that we have some code, we can tell webpack to look at our config and then do what it takes to transform our source into a bundled JS file complete with an `index.html` file all linked up and drop those into our `dist` directory.

```shell
$ yarn webpack
```

You might see output that looks like this:

```shell
yarn webpack v0.21.3
$ "/Users/david/Desktop/webpack-easy/node_modules/.bin/webpack"
[BABEL] Note: The code generator has deoptimised the styling of "/Users/david/Desktop/webpack-easy/node_modules/lodash/lodash.js" as it exceeds the max of "500KB".
[BABEL] Note: The code generator has deoptimised the styling of "/Users/david/Desktop/webpack-easy/node_modules/lodash/lodash.js" as it exceeds the max of "500KB".
Hash: 98ac4bdbd813bada7774
Version: webpack 2.6.1
Time: 2697ms
     Asset       Size  Chunks                    Chunk Names
 bundle.js    1.54 MB       0  [emitted]  [big]  main
index.html  182 bytes          [emitted]
   [0] ./~/lodash/lodash.js 477 kB {0} [built]
   [1] ./src/bar.js 57 bytes {0} [built]
   [2] ./src/foo.js 57 bytes {0} [built]
   [3] (webpack)/buildin/global.js 487 bytes {0} [built]
   [4] (webpack)/buildin/module.js 500 bytes {0} [built]
   [5] ./src/index.js 161 bytes {0} [built]
Child html-webpack-plugin for "index.html":
       [0] ./~/lodash/lodash.js 477 kB {0} [built]
       [1] (webpack)/buildin/global.js 487 bytes {0} [built]
       [2] (webpack)/buildin/module.js 500 bytes {0} [built]
       [3] ./~/html-webpack-plugin/lib/loader.js!./~/html-webpack-plugin/default_index.ejs 538 bytes {0} [built]
✨  Done in 3.69s.
```

You'll want to ignore the `dist` directory:

```shell
$ echo "dist" >> .gitignore
```

Now we just need to open the `index.html` file in a browser and we're on our way!

```shell
$ open dist/index.html
```

Note that we'll need to have webpack create a new bundle every time we make changes to the source. Some people might prefer to have that happen automatically. Theres all kinds of fancy options automating that work, the simplest one is built into webpack:

```shell
$ yarn webpack -- -w
```
You might have noticed the double dash (`--`) arg and not be familiar. What we're doing here is actually calling `yarn` with the argument `webpack` which it takes to mean, look in the NPM `.bin` directory for an executable called `webpack`, everything that comes after the double dash is forwarded along to the referenced executable. So all said, yarn epxands this command to:

```shell
$ /full/path/to/project/webpack-easy/node_modules/.bin/webpack -w
```

Many people will alias these commands in their `package.json` under the `scripts` field:

```js
// ./package.json
{
  "name": "webpack-demo",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
      "build": "webpack",
      "watch": "webpack -w"
  },
  "devDependencies": {
    "babel-core": "^6.24.1",
    "babel-loader": "^7.0.0",
    "html-webpack-plugin": "^2.28.0",
    "webpack": "^2.6.1"
  },
  "dependencies": {
    "lodash": "^4.17.4"
  }
}
```

`package.json` will shim `node_modules/.bin` into your path so you can reference executables there by name instead of absolute path.

Adding those script entries allows you to build like so:

```shell
$ yarn build
```

And watch like so:

```shell
$ yarn watch
```
