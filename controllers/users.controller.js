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
                const {email, user_name, user_type, user_rank} = callBack;
                const token = signToken(JSON.stringify(callBack));
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
    },
    createQuestion: async (req, res) => {
        const {que_id, que_content, que_title, que_cate_id} = req.body;
        if (!que_id || !que_content || !que_title || !que_cate_id) {
            res.status(400).json({
                message: {
                    msgBody: 'Bad request!',
                    msgError: true,
                },
            })
        } else {
            const questionQueue = req.body;
            questionQueue.user_id = req.user.user_id;
            mUsers.createNewQuestion(questionQueue).then((response) => {
                res.status(200).json({
                    message: {
                        msgBody: 'Insert new question successful!',
                        msgError: false,
                    },
                    data: response,
                });
            }).catch((reason) => {
                res.status(500).json({
                    message: {
                        msgBody: 'Something happened',
                        msgError: true,
                    },
                    trace: reason,
                });
            });
        }
    },
    createAnswer: async (req, res) => {
    const {ans_id, ans_content, ans_source_URL, que_id} = req.body;
    if (!ans_id || !ans_content || !ans_source_URL || !que_id) {
        res.status(400).json({
            message: {
                msgBody: 'Bad request!',
                msgError: true,
            },
        })
    } else {
        const answer = req.body;
        answer.user_id = req.user.user_id;
        mUsers.createNewAnswer(answer).then((response) => {
            res.status(200).json({
                message: {
                    msgBody: 'Insert new answer successful!',
                    msgError: false,
                },
                data: response,
            });
        }).catch((reason) => {
            res.status(500).json({
                message: {
                    msgBody: 'Something happened',
                    msgError: true,
                },
                trace: reason,
            });
        });
    }
},
}
