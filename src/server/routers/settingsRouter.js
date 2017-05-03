module.exports = function inj(express, settingsDao, expressPromise) {
  const router = express.Router();

  router.get('/:key', expressPromise(async (req, res) => {
    const settings = await settingsDao.getSettings(req.params.key);
    res.json(settings);
  }));

  router.post('/:key', expressPromise(async (req, res) => {
    await settingsDao.saveSettings(req.params.key, req.body);
    res.end();
  }));

  return router;
};
