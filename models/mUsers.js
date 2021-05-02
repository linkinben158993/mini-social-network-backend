const db = require("./../utils/db");

const users = `users`;

const userModel = {
    getAll() {
        const sql = `SELECT * FROM  ${users}`;
        return db.load(sql);
    },
    userByUsername(username) {
        const sql = `SELECT * FROM  ${users} WHERE user_name = '${username}'`;
        return db.load(sql);
    },
    userByUserId(userId) {
        const sql = `SELECT * FROM  ${users} WHERE user_id = '${userId}'`;
        return db.load(sql);
    }
};

module.exports = userModel;
