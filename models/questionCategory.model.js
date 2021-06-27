const db = require('../utils/db');

const tblName = 'questioncategories';
const questionCategoryModel = {
  all() {
    const sql = `select * from ${tblName}  `;
    return db.load(sql);
  }
};

module.exports = questionCategoryModel;
