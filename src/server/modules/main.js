
module.exports = function inj(log, web, Promise) {
  return async () => {
    const runPromise = Promise.pending();

    process.on('SIGTERM', () => runPromise.resolve());
    process.on('SIGINT', () => runPromise.resolve());
    process.on('exit', () => console.log('Exited.')); // eslint-disable-line no-console

    log.info('Starting...');

    await web.start();

    await runPromise.promise;

    web.stop();

    log.info('Ending...');

    process.exit(0); // TODO: not nice...
  };
};
