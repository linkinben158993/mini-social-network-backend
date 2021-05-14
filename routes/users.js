const express = require('express');
const router = express.Router();
const passport = require('../middlewares/passport');
const userCtr = require('../controllers/users.controller');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/login', userCtr.login);

router.get('/all', passport.jwtStrategy, userCtr.getAllUser);

router.post('/create-question', passport.jwtStrategy,
    /*
   #swagger.parameters['loginUser'] = {
      in: 'header',
      description: 'Token From Login.',
      required: true,
      name: 'access_token',
      value : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJMaW5oRHVjQW4iLCJzdWIiOiJ1c2VyXzA2IiwiaWF0IjoxNjIxMDAyODM1LCJleHAiOjI4MzA2MDI4MzV9.Tni4TSBO5vX8qLmvumepwJ9QKIzUHocGXw8gzFKq-o4'
  },
*/
    userCtr.createQuestion);

router.post('/create-answer', passport.jwtStrategy,
    /*
   #swagger.parameters['loginUser'] = {
      in: 'header',
      description: 'Token From Login.',
      required: true,
      name: 'access_token',
      value : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJMaW5oRHVjQW4iLCJzdWIiOiJ1c2VyXzA2IiwiaWF0IjoxNjIxMDAyODM1LCJleHAiOjI4MzA2MDI4MzV9.Tni4TSBO5vX8qLmvumepwJ9QKIzUHocGXw8gzFKq-o4'
  },
*/
    userCtr.createAnswer);

module.exports = router;
