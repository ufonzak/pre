
const injector = require("../injector");

describe('hdoPageParser', () => {
  let loaded;

  it('loads', done => {
    injector().inject (function (hdoPageParser, fs, Q) {
      loaded = { hdoPageParser, fs, Q };

      expect(hdoPageParser).toBeDefined();
      done();
    });
  });


  it('parses test data', async () => {
    let { hdoPageParser, fs, Q } = loaded;

    let testData = await Q.nfcall(fs.readFile, './test_data.txt', 'utf-8');

    let parsed = await hdoPageParser(testData);

    expect(parsed).toEqual({
      lowPlan: [
        { from: '03:00', to: '08:00' },
        { from: '14:00', to: '17:00' }
      ]
    });
  });

});
