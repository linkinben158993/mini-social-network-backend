const router = require('express').Router();
const ansModel = require('../models/answer.model');

router.get('/', async function (req, res) {
  const ret = await ansModel.all();

  if (ret.length === 0) {
    return res.json({
      message: 'Answer is not found!'
    });
  }
  return res.json({
    answers: ret
  });
});

module.exports = router;
