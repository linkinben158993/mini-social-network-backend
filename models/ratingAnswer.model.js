const db = require('../utils/db');

const tblName = 'ratingsAnswer';
const model = {
  all() {
    const sql = `select * from ${tblName}  `;
    return db.load(sql);
  }
};

module.exports = model;
