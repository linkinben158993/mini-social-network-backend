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
  // if (!req.body.ans_content || !req.body.que_id || !req.body.user_id) {
  //   return res.status(400).json({
  //     message: 'Data from client is error!'
  //   });
  // }

  const configAPI = await configAPIModel.configAnswerInfo();
  // database should have records default

  if (configAPI === null) {
    return res.status(500).json({
      message: 'Database error!'
    });
  }

  // update config
  // get column need to add

  let columns = configAPI['column_name'].split(',');

  let columns_from_body = [];
  const clientData = req.body;

  for (let e in clientData) {
    columns_from_body.push(e.toString());
  }

  if (columns_from_body.length !== columns.length) {
    return res.status(400).json({
      message: 'Column does not match!'
    });
  }

  let isMatch = true;

  columns = columns.sort();
  columns_from_body = columns_from_body.sort();

  for (let i = 0; i < columns.length; i++) {
    if (columns[i] !== columns_from_body[i]) {
      isMatch = false;
      break;
    }
  }

  if (isMatch === false) {
    return res.status(400).json({
      message: 'Column does not match!'
    });
  }

  // if match

  const entity = {
    ans_id: randomstring.generate(10),
    createdAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    ...req.body
  };

  const ret = await ansModel.add(entity);

  return res.json({
    message: 'Add success!',
    status_added: ret.affectedRows
  });
});

router.get('/column-default', async function (req, res) {
  const ret = await configAPIModel.configAnswerInfo();

  if (ret === null) {
    return res.status(500).json({
      message: 'Database error!'
    });
  }

  const column_added = ret['column_default'].split(',');

  return res.json({
    column_added
  });
});

router.get('/column-remain', async function (req, res) {
  const ret = await configAPIModel.configAnswerInfo();

  if (ret === null) {
    return res.status(500).json({
      message: 'Database error!'
    });
  }

  const column_remain = ret['column_remain'].split(',');

  return res.json({
    column_remain
  });
});

module.exports = router;
