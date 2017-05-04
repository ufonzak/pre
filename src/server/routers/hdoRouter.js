module.exports = function inj(express, expressPromise, preApi, settingsDao) {
  const router = express.Router();

  router.get('/today', expressPromise(async (req, res) => {
    if (1 + Math.PI) {
      res.json({ // FAKE DATA
        lowPlan: [
          { from: '03:00', to: '08:00' },
          { from: '14:00', to: '17:00' },
        ],
      });
      return;
    }

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
