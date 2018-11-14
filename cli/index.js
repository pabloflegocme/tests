#!/usr/bin/env node
const {version} = require('./package')
const program = require('commander');
const tasks = require('./tasks')
const {showVersion} = require('./lib/util');

showVersion(version);

program // Global
  .usage('[options] [command]')
  .version(version)
  .option('-v, --verbose', 'Show detailed output.')

program
  .command('list')
  .alias('ls')
  .option('-a, --all', 'Show private packages that are hidden by default.')
  .option('-l, --long', 'Show extended information.')
  .option('-p, --parseable', 'Show parseable output instead of columnified view.')
  .option('--json', 'Show information as a JSON array.')
  .description('Lists available packages')
  .action(tasks.list)

program
  .command('up <scopes...>')
  .description('Bring up local instance of a given package.')
  .action(tasks.up)

program
  .command('bootstrap')
  .alias('bs')
  .description('Installs dependencies for every package.')
  .action(tasks.bootstrap)

program
  .command('clean')
  .description('')
  .action(tasks.clean)

program.parse(process.argv);
