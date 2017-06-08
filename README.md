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
