
module.exports = function inj(console, server, Q) {
  return async () => {
    const runPromise = Q.defer();

    process.on('SIGTERM', () => runPromise.resolve());
    process.on('SIGINT', () => runPromise.resolve());

    console.log('start');

    await server.start();

    await runPromise.promise;

    server.stop();

    console.log('end');
  };
};
