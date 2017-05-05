module.exports = function inj(express, settingsRouter, hdoRouter, noCache) {
  const router = express.Router();

  router.use('/settings', noCache, settingsRouter);
  router.use('/hdo', noCache, hdoRouter);

  return router;
};
