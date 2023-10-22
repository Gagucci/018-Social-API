const router = require('express').Router();
const apiRouter = require('./api');

router.use('/api', apiRouter);

router.use((req, res) => res.send('Nothing found at this route!'));

module.exports = router;