module.exports = function inj(winston) {
  const logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({ filename: 'mylog.log' }),
    ],
  });
  return logger;
};

