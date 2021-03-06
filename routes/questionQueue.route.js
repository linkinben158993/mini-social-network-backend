const router = require('express').Router();
const questionQueueModel = require('../models/questionQueue.model');
const randomstring = require('randomstring');
const configAPIModel = require('../models/configAPI.model');
const moment = require('moment');
const qqModel = require('../models/questionQueue.model');
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

router.get('/column-default', async function (req, res) {
  const ret = await configAPIModel.configQuestionQueueInfo();

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
  const ret = await configAPIModel.configQuestionQueueInfo();

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

router.post('/', async function (req, res) {
  const configAPI = await configAPIModel.configQuestionQueueInfo();

  // database should have records default
  if (configAPI === null) {
    return res.status(500).json({
      message: 'Database error!'
    });
  }

  let columns = configAPI['column_default'].split(',');

  let columns_from_body = [];
  const clientData = req.body;

  for (let e in clientData) {
    columns_from_body.push(e);
  }

  if (columns_from_body.length !== columns.length) {
    return res.status(400).json({
      message: 'Column does not match!'
    });
  }

  columns = columns.sort();
  columns_from_body = columns_from_body.sort();
  let isMatch = true;

  for (let i = 0; i < columns.length; ++i) {
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

  const entity = {
    que_id: randomstring.generate(10),
    createdAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    ...req.body
  };

  const ret = await qqModel.add(entity);

  return res.json({
    message: 'Add success!',
    status_added: ret.affectedRows
  });
});

module.exports = router;
