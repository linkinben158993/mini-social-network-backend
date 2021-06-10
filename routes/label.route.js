const router = require('express').Router();
const labelModel = require('../models/label.model');

router.get('/', async function (req, res) {
  const ret = await labelModel.all();

  if (ret.length === 0) {
    return res.json({
      message: 'Label is empty!'
    });
  }
  return res.json({
    data: ret
  });
});

module.exports = router;
