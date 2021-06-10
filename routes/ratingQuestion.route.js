const router = require('express').Router();
const ratingQuestion = require('../models/ratingQuestion.model');

router.get('/', async function (req, res) {
  const ret = await ratingQuestion.all();

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
