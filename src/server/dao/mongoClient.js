module.exports = function inj(config, mongodb, Promise) {
  const MongoClient = mongodb.MongoClient;
  const url = config.mongodb;

  return async (callback) => {
    const db = await Promise.promisify(MongoClient.connect)(url);
    try {
      return await callback(db);
    } finally {
      db.close();
    }
  };
};
