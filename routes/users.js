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

module.exports = router;
