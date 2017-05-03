const SETTINGS_COLLECTION = 'settings';
const PRE_SETTING = 'pre';


module.exports = function inj(mongoClient, Promise) {
  async function getCollection(callback) {
    return mongoClient(async (db) => {
      const collection = db.collection(SETTINGS_COLLECTION);
      const collectionAsync = Promise.promisifyAll(collection);
      return callback(collectionAsync);
    });
  }

  function getPreSettings() {
    return getCollection(async (collection) => {
      const result = await collection.findOneAsync({ settings: PRE_SETTING });
      return result ? result.data : {};
    });
  }

  async function savePreSettings(settings) {
    return getCollection(async (collection) => {
      await collection.findOneAndReplaceAsync({ settings: PRE_SETTING }, { settings: PRE_SETTING, data: settings }, { upsert: true });
    });
  }

  return { getPreSettings, savePreSettings };
};
