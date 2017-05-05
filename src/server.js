
const injector = require('./server/injector');

injector().inject(function inj(main) { // eslint-disable-line prefer-arrow-callback
  main().catch((er) => {
    /* eslint-disable no-console */
    console.log(`Error unhandled: ${er}.`);
    console.log(er);
    process.exit(1);
    /* eslint-enable no-console */
  });
});
