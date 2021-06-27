const db = require('../utils/db');

const tbl_answers = 'answers';
const answerModel = {
  all() {
    const sql = `select * from ${tbl_answers}  `;
    return db.load(sql);
  },
  add(entity) {
    return db.add(entity, tbl_answers);
  }
};

module.exports = answerModel;
