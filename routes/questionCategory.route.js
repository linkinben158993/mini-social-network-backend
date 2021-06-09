const router = require('express').Router();
const questionCategoryModel = require('../models/questionCategory.model');

router.get('/', async function (req, res) {
  const ret = await questionCategoryModel.all();

  if (ret.length === 0) {
    return res.json({
      message: 'Empty!'
    });
  }
  return res.json({
    questionCategories: ret
  });
});

module.exports = router;
