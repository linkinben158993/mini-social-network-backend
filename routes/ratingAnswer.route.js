const router = require('express').Router();
const ratingAnswer = require('../models/ratingAnswer.model');

router.get('/', async function (req, res) {
  const ret = await ratingAnswer.all();

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
