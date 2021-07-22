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

router.get('/column-config', async function (req, res) {
  const ret = await configAPIModel.configUserInfo();

  if (ret === null) {
    return res.status(500).json({
      message: 'Database error!'
    });
  }

  const column_config = ret.split(',');

  return res.json({
    column_config
  });
});

router.get('/column-default', async function (req, res) {
  const ret = await configAPIModel.getDefaultUserFields();

  if (ret === null) {
    return res.status(500).json({
      message: 'Database error!'
    });
  }

  const column_default = ret.split(',');

  return res.json({
    column_default
  });
});

router.get('/column-remain', async function (req, res) {
  const ret = await configAPIModel.getRemainUserFields();

  if (ret === null) {
    return res.status(500).json({
      message: 'Database error!'
    });
  }

  const column_remain = ret.split(',');

  return res.json({
    column_remain
  });
});

router.post('/', async function (req, res) {
  const configAPI = await configAPIModel.configUserInfo();

  // database should have records default
  if (configAPI === null) {
    // no column was added
    // then add user like normal
    const entity = {
      user_id: randomstring.generate(10),
      ...req.body
    };

    const ret = await userModel.add(entity);

    return res.json({
      message: 'Add success!',
      status_added: ret.affectedRows
    });
  }
  // if has

  // let columns = configAPI['column_default'].split(',');

  // + check default
  var default_columns = await configAPIModel.getDefaultUserFields();
  default_columns = default_columns.split(',');
  // + check current fields added

  let columns = configAPI.split(',');

  let columns_from_body = [];
  const clientData = req.body;

  for (let e in clientData) {
    columns_from_body.push(e.toString());
  }
  console.log(columns_from_body);
  console.log(default_columns);

  for (let i = 0; i < 3; ++i) {
    if (default_columns[i] !== columns_from_body[i]) {
      return res.status(400).json({
        message: 'Column does not match!'
      });
    }
  }

  if (columns_from_body.length === 4) {
    const last_col = columns_from_body[3];
    // handle email
    if (last_col === 'email') {
      for (let i = 0; i < columns.length; ++i) {
        if (columns[i] === last_col) {
          const entity = {
            user_id: randomstring.generate(10),
            ...req.body
          };

          const ret = await userModel.add(entity);

          return res.json({
            message: 'Add success!',
            status_added: ret.affectedRows
          });
        }
      }
    }

    // handle toggle_send_notify_status
    if (last_col === 'toggle_send_notify_status') {
      for (let i = 0; i < columns.length; ++i) {
        if (columns[i] === last_col) {
          for (let i = 0; i < columns.length; ++i) {
            if (columns[i] === last_col) {
              const entity = {
                user_id: randomstring.generate(10),
                ...req.body
              };

              const ret = await userModel.add(entity);

              return res.json({
                message: 'Add success!',
                status_added: ret.affectedRows
              });
            }
          }
        }
      }
    }
  }

  if (columns_from_body.length === 5 && columns.length !== 2) {
    return res.status(400).json({
      message: 'Column does not match!'
    });
  }

  if (columns_from_body.length === 5) {
    var last_two_cols = [columns_from_body[3], columns_from_body[4]];
    var string_two_cols = last_two_cols.join(',');
    //email,toggle_send_notify_status
    if (string_two_cols.includes('email')) {
      if (string_two_cols.includes('toggle_send_notify_status')) {
        const entity = {
          user_id: randomstring.generate(10),
          ...req.body
        };

        const ret = await userModel.add(entity);

        return res.json({
          message: 'Add success!',
          status_added: ret.affectedRows
        });
      } else {
        const entity = {
          user_id: randomstring.generate(10),
          ...req.body
        };

        const ret = await userModel.add(entity);

        return res.json({
          message: 'Add success!',
          status_added: ret.affectedRows
        });
      }
    }

    if (string_two_cols.includes('toggle_send_notify_status')) {
      if (string_two_cols.includes('email')) {
        const entity = {
          user_id: randomstring.generate(10),
          ...req.body
        };

        const ret = await userModel.add(entity);

        return res.json({
          message: 'Add success!',
          status_added: ret.affectedRows
        });
      } else {
        const entity = {
          user_id: randomstring.generate(10),
          ...req.body
        };

        const ret = await userModel.add(entity);

        return res.json({
          message: 'Add success!',
          status_added: ret.affectedRows
        });
      }
    }
  }
  return res.status(400).json({
    message: 'Column does not match!'
  });
});

router.post(
  '/login',
  /* #swagger.parameters['loginUser'] = {
         in: 'body',
         description: 'Info for logging in.',
         required: true,
         schema: {
          $username: "an@gmail.com",
          $password: "123456"
         }
  } */
  userCtr.login
);

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
