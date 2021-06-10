const router = require('express').Router();
const questionQueueModel = require('../models/questionQueue.model');

router.get('/', async function (req, res) {
  const ret = await questionQueueModel.all();

  if (ret.length === 0) {
    return res.json({
      message: 'Empty!'
    });
  }
  return res.json({
    data: ret
  });
});

module.exports = router;
