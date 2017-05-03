module.exports = function inj(express, expressPromise, preApi, settingsDao) {
  const router = express.Router();

  router.get('/today', expressPromise(async (req, res) => {
    const preSetting = await settingsDao.getSettings(settingsDao.constants.PRE);
    let client;
    try {
      client = preApi.createClient(preSetting);
      await client.login();
    } catch (er) {
      res.status(403).json({ error: 'Login to PRE failed.', detail: er.message });
      return;
    }

    const hdoData = await client.getTodaysHDO();
    await client.logout();

    res.json(hdoData);
  }));

  return router;
};
