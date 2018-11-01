#!/usr/bin/env node
const path = require('path');

// All typescript from here.
require('ts-node').register({
  project: path.join(__dirname, '../tsconfig.json'),
});
require('./sasquatch');
