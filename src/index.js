#!/usr/bin/env node

const program = require('commander')
const package = require('../package.json')
const commands = require('./commands')

program.version(package.version)
commands(program)
program.parse(process.argv)