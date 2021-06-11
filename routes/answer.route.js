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

router.get('/toggle-column-name', async function (req, res) {
  const table_name = `answers`;
  const columns = await configAPIModel.getToggleColName(table_name);

  if (columns === undefined) {
    return res.status(500).json({
      message: 'Some thing broke!'
    });
  }

  console.log(columns);
  const ret = columns.split(',');
  return res.json({
    toggle_column_name: ret
  });
});

router.patch('/column-name', async function (req, res) {
  if (!req.body.column_name || !req.body.table_name) {
    return res.status(400).json({
      message: 'Data from client is error!'
    });
  }

  const array_column_name = req.body.column_name;
  if (array_column_name.length === 1) {
    let col_name_when_len_is_1 = array_column_name[0];
    let table_name_when_len_is_1 = req.body.table_name;

    // patch column name
    const ret_patch_column_name_when_len_is_1 =
      await configAPIModel.patchColumnName(
        col_name_when_len_is_1,
        table_name_when_len_is_1
      );

    // remove column_remain

    const ret_patch_col_remain_when_len_is_1 =
      await configAPIModel.patchColumnRemain('', `answers`);

    return res.json({
      ret_patch_column_name_when_len_is_1,
      ret_patch_col_remain_when_len_is_1
    });
  }

  const column_name = req.body.column_name.join(','); // join array to string
  const table_name = req.body.table_name;

  // patch column name
  const ret_patch_column_name = await configAPIModel.patchColumnName(
    column_name,
    table_name
  );

  // remove column_remain
  let col_remain = await configAPIModel.getColRemain(`answers`);
  col_remain = col_remain.split(',');
  console.log(col_remain);

  for (let i = 0; i < array_column_name.length; ++i) {
    col_remain = col_remain.filter((e) => {
      return e !== array_column_name[i];
    });
  }

  col_remain = col_remain.join(',');

  console.log(col_remain);

  const ret_patch_col_remain = await configAPIModel.patchColumnRemain(
    col_remain,
    `answers`
  );

  return res.json({
    ret_patch_column_name,
    ret_patch_col_remain
  });
});

module.exports = router;
