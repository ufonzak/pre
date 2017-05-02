module.exports = function(console, https, querystring, _, hdoPageParser) {

  class Client {
    constructor(clientData) {
      this._clientData = clientData;
    }

    async login() {
      const bodyData = querystring.stringify({
        'login_name': this._clientData.loginName,
        'login_password': this._clientData.passsword,
        'login': '1',
        'toDashboard': '1',
      });

      let { response } = await this._request({
        path: '/cs/moje-pre/neprihlaseny-uzivatel/prihlaseni-uzivatele/',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(bodyData)
        }
      }, { bodyData, expectedResponse: 302 });

      this._session = response.headers['set-cookie'].join(';');
      console.log(`Session ${this._session}`);
    }

    async loadTodaysHDO() {
      let { response, data } = await this._request({
        path: '/Components/moje-pre/prehled-uctu/vase-odberne-misto/hdo/',
        headers: {
            'Cookie': this._session
        }
      });

      let plan = await hdoPageParser(data);
      return plan;
    }

    async logout() {
      await this._request({
        path: '/cs/moje-pre/neprihlaseny-uzivatel/prihlaseni-uzivatele/?logout=logout',
        headers: {
            'Cookie': this._session
        }
      }, { expectedResponse: 302 });
      this._session = null;
    }

    _request(options, { bodyData, expectedResponse } = {}) {
      return new Promise((resolve, reject) => {
          let requestOptions = _.merge({
            host: 'www.pre.cz',
            method: 'POST'
          }, options);

          let request = https.request(requestOptions, response => {
            console.log(`${requestOptions.method} ${requestOptions.path} - ${response.statusCode}`);

            if (response.statusCode !== (expectedResponse || 200)) {
              reject(new Error(`Unexpected response ${response.statusCode}.`));
              return;
            }
            //console.log('headers:', response.headers);

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
}
