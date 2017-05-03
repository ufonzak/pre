module.exports = function inj(express, settingsDao, expressPromise) {
  const router = express.Router();

  router.get('/pre', expressPromise(async (req, res) => {
    const settings = await settingsDao.getPreSettings();
    res.json(settings);
  }));

  router.post('/pre', expressPromise(async (req, res) => {
    await settingsDao.savePreSettings(req.body);
    res.end();
  }));

  return router;
};
