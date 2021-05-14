const db = require("./../utils/db");

const tblQuestionQueue = `questionqueue`;
const tblUsers = `users`;

const adminModel = {
  async getAdminInfo() {
    const sql = `SELECT * FROM ${tblUsers} u
    WHERE u.user_name ='admin'`;
    const ret = await db.load(sql);
    return ret[0];
  },
  allQuetionQueue() {
    const sql = `SELECT * FROM ${tblQuestionQueue} as q
    ORDER BY q.createdAt DESC`;
    return db.load(sql);
  },
  handleAcceptQuestion(entity, condition) {
    return db.update(entity, condition, tblQuestionQueue);
  },
};

module.exports = adminModel;
