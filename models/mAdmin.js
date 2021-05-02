const db = require("./../utils/db");

const tblQuestionQueue = `questionqueue`;

const adminModel = {
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
