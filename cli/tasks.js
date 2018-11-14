const {command} = require('./lib/util');
const chalk = require('chalk');

const {log} = console;

const list = ({all, long, parseable, json, verbose}) =>
  command('lerna list')
    .setVerbose(verbose)
    .withFlags({all, long, parseable, json})
    .exec((code, stdout, stderr) =>
      log(chalk.italic.greenBright(stdout))
    );

const up = (scopes, {verbose}) => {
  const cmd = command('lerna run start')
    .setVerbose(verbose)
    .setOptions({async: true})
    .withFlags({stream: true})
    .withScopes(scopes)
    .exec()
    .listen('stdout', data => log(data));
  // On verbose mode output stderr
  verbose && cmd.listen('stderr', data => log(data));
}

const bootstrap = ({verbose}) =>
  command('lerna bootstrap')
    .setVerbose(verbose)
    .exec((code, stdout, stderr) => log(stdout));

const clean = ({verbose}) =>
  command('lerna clean')
    .setVerbose(verbose)
    // .withFlags({yes: true})
    .exec((code, stdout, stderr) => log(stderr));


module.exports = {
  list, up, bootstrap, clean
};
