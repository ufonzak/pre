module.exports = function inj(log, https, querystring, _, hdoPageParser) {
  class Client {
    constructor(clientData) {
      this._clientData = clientData;

      if (!this._clientData.loginName || !this._clientData.password) {
        throw new Error('credentials not provided');
      }
    }

    async login() {
      const bodyData = querystring.stringify({
        login_name: this._clientData.loginName,
        login_password: this._clientData.password,
        login: '1',
        toDashboard: '1',
      });

      const { response } = await Client.request({
        path: '/cs/moje-pre/neprihlaseny-uzivatel/prihlaseni-uzivatele/',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(bodyData),
        },
      }, { bodyData, expectedResponse: 302 });

      this._session = response.headers['set-cookie'].join(';');
    }

    async getTodaysHDO() {
      const { data } = await Client.request({
        path: '/Components/moje-pre/prehled-uctu/vase-odberne-misto/hdo/',
        headers: {
          Cookie: this._session,
        },
      });

      const plan = await hdoPageParser(data);
      return plan;
    }

    async logout() {
      await Client.request({
        path: '/cs/moje-pre/neprihlaseny-uzivatel/prihlaseni-uzivatele/?logout=logout',
        headers: {
          Cookie: this._session,
        },
      }, { expectedResponse: 302 });
      this._session = null;
    }

    static request(options, { bodyData, expectedResponse } = {}) {
      return new Promise((resolve, reject) => {
        const requestOptions = _.merge({
          host: 'www.pre.cz',
          method: 'POST',
        }, options);

        const request = https.request(requestOptions, (response) => {
          log.info(`${requestOptions.method} ${requestOptions.path} - ${response.statusCode}`);

          if (response.statusCode !== (expectedResponse || 200)) {
            reject(new Error(`Unexpected response ${response.statusCode}. (${JSON.stringify(requestOptions)})`));
            return;
          }

          let data = '';
          response.on('data', (chunk) => {
            data += chunk;
          });

          response.on('end', () => {
            resolve({ response, data });
          });
        }).on('error', reject);

        if (bodyData) {
          request.write(bodyData);
        }

        request.end();
      });
    }
  }

  function createClient(clientData) {
    return new Client(clientData);
  }

  return { createClient };
};
