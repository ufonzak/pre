
const injector = require("../injector");

describe('hdoPageParser', () => {
  let loaded;

  it('loads', done => {
    injector().inject (function (hdoPageParser, fs, Promise) {
      loaded = { hdoPageParser, fs, Promise };

      expect(loaded.hdoPageParser).toBeDefined();
      done();
    });
  });


  it('parses test data', async () => {
    let { hdoPageParser, fs, Promise } = loaded;

    let testData = await Promise.promisify(fs.readFile)('./data/hdo_test_result.txt', 'utf-8');

    let parsed = await hdoPageParser(testData);

    expect(parsed).toEqual({
      lowPlan: [
        { from: '03:00', to: '08:00' },
        { from: '14:00', to: '17:00' }
      ]
    });
  });

});
