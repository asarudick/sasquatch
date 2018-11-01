#!/usr/bin/env node
const appRootPath = require('app-root-path');
const path = require('path');

const options = {
  compilerOptions: {
    lib: ['es2015', 'es2016', 'es2017'],
    allowSyntheticDefaultImports: true,
    module: 'commonjs',
    moduleResolution: 'node',
    skipLibCheck: true,
    experimentalDecorators: true,
    emitDecoratorMetadata: true,
  },
};

// All typescript from here.
require('ts-node').register(options);
require('./sasquatch');
