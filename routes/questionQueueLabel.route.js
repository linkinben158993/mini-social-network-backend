const router = require('express').Router();
const questionQueueLabel = require('../models/questionQueueLabel.model');

router.get('/', async function (req, res) {
  const ret = await questionQueueLabel.all();

  if (ret.length === 0) {
    return res.json({
      message: 'Empty!'
    });
  }
  return res.json({
    questionQueueLabel: ret
  });
});

module.exports = router;
