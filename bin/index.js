#!/usr/bin/env node
const appRootPath = require('app-root-path');
const path = require('path');

// All typescript from here.
require('ts-node').register({
  project: path.join(appRootPath.toString(), 'tsconfig.json'),
});
require('./sasquatch');
