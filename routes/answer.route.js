const router = require('express').Router();
const ansModel = require('../models/answer.model');
const randomstring = require('randomstring');
const moment = require('moment');
const configAPIModel = require('../models/configAPI.model');

router.get('/', async function (req, res) {
  const ret = await ansModel.all();

  if (ret.length === 0) {
    return res.json({
      message: 'Answer is not found!'
    });
  }
  return res.json({
    data: ret
  });
});

router.post('/', async function (req, res) {
  if (!req.body.ans_content || !req.body.que_id || !req.body.user_id) {
    return res.status(400).json({
      message: 'error'
    });
  }

  const configAPI = await configAPIModel.configAnswerInfo();

  if (configAPI === null) {
    // add cofig
  }

  // update config
  const columns = configAPI['column_name'].split(',');

  let entity = {
    ...columns
  };

  for (let i = 0; i < columns.length; ++i) {
    let field_i = columns[i];
    let { field_i } = req.body;
    entity[`${columns[i]}`] = field_i;
    console.log(field_i);
    console.log({ field_i });
  }

  console.log(entity);

  // const entity = {
  //   ans_id: randomstring.generate(10),
  //   ans_content: req.body.ans_content,
  //   ans_source_URL: req.body.ans_source_URL,
  //   ans_images: req.body.ans_images,
  //   createdAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
  //   que_id: req.body.que_id,
  //   user_id: req.body.user_id,
  //   is_accepted: req.body.is_accepted
  // };

  // const ret = await ansModel.add(entity);
  return res.json({
    ret: 1
  });
});

module.exports = router;
