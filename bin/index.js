#!/usr/bin/env node
const appRootPath = require('app-root-path');
const path = require('path');

const options = {
  compilerOptions: {
    allowSyntheticDefaultImports: true,
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
    lib: ['es2015', 'es2016', 'es2017'],
    module: 'commonjs',
    moduleResolution: 'node',
    skipLibCheck: true,
    target: 'es6',
    types: ['node'],
  },
};

// All typescript from here.
require('ts-node').register(options);
require('./sasquatch');
