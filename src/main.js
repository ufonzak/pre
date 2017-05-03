

module.exports = function inj(console, utils, preApi) {
  async function main() {
    console.log('start');
    await utils.delay();

    const client = preApi.createClient({ loginName: 'martinzak73@gmail.com', passsword: 'qwerty' });

    await client.login();
    const plan = await client.getTodaysHDO();
    console.log(plan);
    await client.logout();

    console.log('end');
  }

  return main;
};
