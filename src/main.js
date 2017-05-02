

module.exports = function (console, utils, preApi) {
  async function main() {
    console.log('start');
    await utils.delay();

    let client = preApi.createClient({ loginName: 'martinzak73@gmail.com', passsword: 'brigada65' });

    await client.login();
    let plan = await client.loadTodaysHDO();
    console.log(plan);
    await client.logout();

    console.log('end');
  }

  return main;
}
