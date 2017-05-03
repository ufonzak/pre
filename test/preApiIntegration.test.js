const injector = require("../injector");

describe('hdoPageParser', () => {
  let loaded;

  it('loads', done => {
    injector().inject(function(preApi) {
      loaded = { preApi };

      expect(preApi).toBeDefined();
      done();
    });
  });


  it('get HDO data from pre.cz', async() => {
    let {
      preApi
    } = loaded;

    let client = preApi.createClient({ loginName: 'martinzak73@gmail.com', passsword: 'qwerty' });

    await client.login();
    let hdoData = await client.getTodaysHDO();
    await client.logout();

    expect(hdoData.lowPlan).toBeDefined();
  });

});
