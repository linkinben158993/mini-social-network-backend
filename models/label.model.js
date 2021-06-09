const db = require('../utils/db');

const tbl_labels = 'labels';
const labelModel = {
  all() {
    const sql = `select * from ${tbl_labels}  `;
    return db.load(sql);
  }
};

module.exports = labelModel;
