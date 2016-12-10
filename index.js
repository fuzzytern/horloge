#!/usr/bin/env node

/**
* Module dependencies
*/
const horloge = require('commander');
const chalk = require('chalk');

/**
* Methods
*/

const changableOutput = (s) => {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(s);
};

const oneMinute = 60;

const decideToOutput = (duration) => {
  const secondsOnly = (duration % oneMinute);
  if (duration <= 0) {
    console.log('\nTime is up');
    return 0;
  } else if (duration % oneMinute === 0) {
    if (duration / oneMinute <= 5) {
      if (duration / oneMinute > 0) {
        changableOutput(`${duration / oneMinute} min`);
      }
    }
  } else if (duration === oneMinute + (oneMinute / 2)) {
    changableOutput(`${(duration - secondsOnly) / oneMinute} min ${secondsOnly} sec`);
  } else if (duration === (oneMinute / 2)) {
    changableOutput(`${duration} sec`);
  } else if (duration === (oneMinute / 3)) {
    changableOutput(`${duration} sec`);
  } else if (duration <= (oneMinute / 6)) {
    changableOutput(`${duration} sec`);
  }
}

const runInterval = function (duration, interval = process.env.HORLOGE_UNIT_VALUE) {
  decideToOutput(duration);
  // calls runInterval after interval is elapsed with the updated parameters
  setTimeout(runInterval, interval, duration - 1, interval);
  return 0;
};

/**
 * Interface
 */
const controls = {
  start(duration) {
    if (duration === undefined) {
      duration = 25;
    } else if (duration === '' || (duration % 1) !== 0) {
      console.log(chalk.red.bold('<<<Please provide an integer value (ex. -> 5, 10, 12)>>>'));
      return;
    }
    runInterval(duration * oneMinute);

  },
};

/**
* Main
*/
process.env.HORLOGE_UNIT_VALUE = 1000;

horloge
  .command('start [duration]')
  .description('starts the horloge timer with a duration in minutes.')
  .action(controls.start);

horloge.parse(process.argv);
