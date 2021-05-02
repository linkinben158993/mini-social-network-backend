const passport = require('passport');
const JWT = require('jsonwebtoken');
const mUsers = require('../models/mUsers');
const passportConfig = require('../middlewares/passport');

const signToken = (userID) => {
    const token = JWT.sign(
        {
            iss: process.env.secretOrKey,
            sub: userID,
        },
        process.env.secretOrKey,
        // 2 Weeks 14 * 1000 * 60 * 60 * 24 Test Refresh Token Below
        {expiresIn: 14 * 1000 * 60 * 60 * 24},
    );
    return token;
};

module.exports = {
    login: async (req, res, next) => {
        passport.authenticate('local', {session: false}, (err, callBack) => {
            if (err && !err.errCode) {
                res.status(500).json({
                    message: {
                        msg: 'Something happened!',
                        msgError: true,
                    }
                });
            } else if (err && err.errCode) {
                res.status(400).json(err);
            } else {
                const token = signToken(callBack.user_id);
                const {email, user_name, user_type, user_rank} = callBack;
                res.status(200).json({
                    isAuthenticated: true,
                    user: {
                        email,
                        user_name,
                        user_type,
                        user_rank,
                    },
                    access_token: token,
                });
            }
        })(req, res, next);
    },
    getAllUser: async (req, res) => {
        const allUsers = await mUsers.getAll();
        const response = allUsers.map(user => {
            const {user_id, email, user_name, user_type, user_rank} = user;
            return {user_id, email, user_name, user_type, user_rank};
        })
        if (allUsers.length == 0) {
            res.status(200).json({
                message: {
                    msgBody: 'No user found!',
                    msgError: true
                }
            })
        } else {
            res.status(200).json({
                message: {
                    msgBody: 'Get all user successful!',
                    msgError: false,
                },
                data: response,
            });
        }
    }
}
