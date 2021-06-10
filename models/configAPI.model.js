const db = require('../utils/db');

const tblName = 'configureAPI';
const model = {
  all() {
    const sql = `select * from ${tblName}  `;
    return db.load(sql);
  },

  async configAnswerInfo() {
    const sql = `select * from ${tblName} 
    where table_name = 'answers' `;
    const ret = await db.load(sql);

    if (ret.length === 0) {
      return null;
    }

    return ret[0];
  },

  async configUserInfo() {
    const sql = `
    select * from ${tblName}
    where table_name = 'users'
    `;
    const ret = await db.load(sql);
    if (ret.length === 0) return null;
    return ret[0];
  },
  async configQuestionQueueInfo() {
    const sql = `
    select * from ${tblName}
    where table_name = 'questionqueue'
    `;
    const ret = await db.load(sql);
    if (ret.length === 0) return null;
    return ret[0];
  }
};

module.exports = model;
