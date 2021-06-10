const express = require('express');
const router = express.Router();
const passport = require('../middlewares/passport');
const userCtr = require('../controllers/users.controller');
const userModel = require('../models/mUsers');

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
