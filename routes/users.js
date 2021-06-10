const express = require('express');
const router = express.Router();
const passport = require('../middlewares/passport');
const userCtr = require('../controllers/users.controller');
const userModel = require('../models/mUsers');
const configAPIModel = require('../models/configAPI.model');
const randomstring = require('randomstring');

/* GET users listing. */
router.get('/', async function (req, res) {
  const ret = await userModel.getAll();

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
  const ret = await configAPIModel.configUserInfo();

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

router.post('/', async function (req, res) {
  const configAPI = await configAPIModel.configUserInfo();

  // database should have records default
  if (configAPI === null) {
    return res.status(500).json({
      message: 'Database error!'
    });
  }

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
    user_id: randomstring.generate(10),
    ...req.body
  };

  const ret = await userModel.add(entity);

  return res.json({
    message: 'Add success!',
    status_added: ret.affectedRows
  });
});

router.post('/login', userCtr.login);

router.get('/all', passport.jwtStrategy, userCtr.getAllUser);

router.post(
  '/create-question',
  passport.jwtStrategy,
  /*
   #swagger.parameters['loginUser'] = {
      in: 'header',
      description: 'Token From Login.',
      required: true,
      name: 'access_token',
      value : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJMaW5oRHVjQW4iLCJzdWIiOiJ1c2VyXzA2IiwiaWF0IjoxNjIxMDAyODM1LCJleHAiOjI4MzA2MDI4MzV9.Tni4TSBO5vX8qLmvumepwJ9QKIzUHocGXw8gzFKq-o4'
  },
*/
  userCtr.createQuestion
);

router.post(
  '/create-answer',
  passport.jwtStrategy,
  /*
   #swagger.parameters['loginUser'] = {
      in: 'header',
      description: 'Token From Login.',
      required: true,
      name: 'access_token',
      value : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJMaW5oRHVjQW4iLCJzdWIiOiJ1c2VyXzA2IiwiaWF0IjoxNjIxMDAyODM1LCJleHAiOjI4MzA2MDI4MzV9.Tni4TSBO5vX8qLmvumepwJ9QKIzUHocGXw8gzFKq-o4'
  },
*/
  userCtr.createAnswer
);

module.exports = router;
