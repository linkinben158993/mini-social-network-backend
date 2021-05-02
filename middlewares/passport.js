const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const dotenv = require('dotenv');
const Users = require('../models/mUsers');

dotenv.config();
const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies.access_token;
    }
    if (req && req.headers) {
        token = req.headers.access_token;
    }
    return token;
};

// Authorization
passport.use(
    'jwt',
    new JWTStrategy(
        {
            jwtFromRequest: cookieExtractor,
            secretOrKey: process.env.secretOrKey,
        },
        async (payload, done) => {
            const foundUser = await Users.userByUserId(payload.sub);
            if (foundUser.length == 0) {
                return done(null, false);
            } else {
                return done(null, foundUser[0]);
            }
            return done(null, false);
        },
    ),
);

// Local Strategy
passport.use(
    'local',
    new LocalStrategy(async (username, password, done) => {
        let foundUser = await Users.userByUsername(username);
        if (foundUser.length === 0 || foundUser[0].user_pass !== password) {
            return done({
                message: {
                    msgBody: 'Password/Username not match!',
                    msgError: true,
                },
                errCode: 'ERR_USER_NOT_FOUND',
            });
        } else {
            done(null, foundUser[0]);
        }
    }),
);


module.exports = {
    jwtStrategy: async (req, res, next) => {
        passport.authenticate('jwt', {session: false}, (err, callBack) => {
            if (err) {
                res.status(500).json({
                    message: {
                        msgBody: 'Something happened',
                        msgError: true,
                    }
                });
            }
            if (!callBack) {
                res.status(403).json({
                    message: {
                        msgBody: 'User not authorized for this asset!',
                        msgError: true,
                    }
                });
            } else {
                req.user = callBack;
                next();
            }
        })(req, res, next);
    }
}
