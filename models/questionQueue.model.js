const db = require('../utils/db');

const tblName = 'questionqueue';
const model = {
  all() {
    const sql = `select * from ${tblName}  `;
    return db.load(sql);
  },
  add(entity) {
    return db.add(entity, tblName);
  }
};

module.exports = model;
