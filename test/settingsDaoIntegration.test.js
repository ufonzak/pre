const injector = require("../injector");

describe('settingsDao', () => {
  let loaded;

  it('loads', done => {
    injector()
    .addDependency('config', {
      mongodb: 'mongodb://localhost:27017/test',
    }, true)
    .inject(function(settingsDao) {
      loaded = { settingsDao };

      expect(settingsDao).toBeDefined();
      done();
    });
  });


  it('gets and updates settings', async() => {
    const { settingsDao } = loaded;
    const testSettings = { name: 'xxx1' };

    await settingsDao.savePreSettings(testSettings);

    const retrievedSetting = await settingsDao.getPreSettings();
    expect(retrievedSetting).toEqual(testSettings);
  });

});
