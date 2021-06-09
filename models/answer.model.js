const db = require('../utils/db');

const tbl_answers = 'answers';
const answerModel = {
  all() {
    const sql = `select * from ${tbl_answers}  `;
    return db.load(sql);
  }
};

module.exports = answerModel;
