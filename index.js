#!/usr/bin/env node

/**
 * Module dependencies
 */
const horloge = require('commander');

/**
 * Methods
 */
const runInterval = function (duration, interval = 60000) {
  console.log(`${duration}mn left`);
  if (duration === 0) {
    console.log("Time's up");
  } else {
    // calls runInterval after interval is elapsed with the updated parameters
    setTimeout(runInterval, interval, duration - 1, interval);
  }
};

/**
 * Interface
 */
const controls = {
  start(duration) {
    runInterval(duration);
  },
};

horloge
  .command('start <duration>')
  .description('starts the horloge timer with a duration in minutes.')
  .action(controls.start);

horloge.parse(process.argv);
