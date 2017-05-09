const injector = require("../src/server/injector");

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

    await settingsDao.saveSettings('testKey', testSettings);

    const retrievedSetting = await settingsDao.getSettings('testKey');
    expect(retrievedSetting).toEqual(testSettings);
  });

});
