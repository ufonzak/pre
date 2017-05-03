
module.exports = function inj(log, server, Promise) {
  return async () => {
    const runPromise = Promise.pending();

    process.on('SIGTERM', () => runPromise.resolve());
    process.on('SIGINT', () => runPromise.resolve());
    process.on('exit', () => console.log('Exited'));

    log.info('start');

    await server.start();

    await runPromise.promise;

    server.stop();

    log.info('end');

    process.exit(0); //TODO: remove
  };
};
