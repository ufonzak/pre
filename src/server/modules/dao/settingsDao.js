const SETTINGS_COLLECTION = 'settings';
const constants = {
  PRE: 'pre',
};

module.exports = function inj(mongoClient, Promise) {
  async function getCollection(callback) {
    return mongoClient(async (db) => {
      const collection = db.collection(SETTINGS_COLLECTION);
      const collectionAsync = Promise.promisifyAll(collection);
      return callback(collectionAsync);
    });
  }

  function getSettings(settingsKey) {
    return getCollection(async (collection) => {
      const result = await collection.findOneAsync({ settings: settingsKey });
      return result ? result.data : {};
    });
  }

  async function saveSettings(settingsKey, settings) {
    return getCollection(async (collection) => {
      await collection.findOneAndReplaceAsync({ settings: settingsKey }, { settings: settingsKey, data: settings }, { upsert: true });
    });
  }

  return { getSettings, saveSettings, constants };
};
