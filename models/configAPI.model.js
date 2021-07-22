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
    select column_name from ${tblName}
    where table_name = 'users'
    `;
    const ret = await db.load(sql);

    if (ret.length === 0) return null;
    return ret[0].column_name;
  },
  async getDefaultUserFields() {
    const sql = `select column_default 
    from ${tblName}
    where table_name = 'users'`;
    const ret = await db.load(sql);

    return ret[0].column_default;
  },

  async configQuestionQueueInfo() {
    const sql = `
    select * from ${tblName}
    where table_name = 'questionqueue'
    `;
    const ret = await db.load(sql);
    if (ret.length === 0) return null;
    return ret[0];
  },

  patchColumnName(arrayColName, tableName) {
    const entity = {
      column_name: arrayColName
    };
    const condition = {
      table_name: `${tableName}`
    };
    return db.update(entity, condition, tblName);
  },
  async getToggleColName(tableName) {
    const sql = `select column_name 
    from ${tblName} 
    where  table_name = '${tableName}'`;
    const ret = await db.load(sql);

    if (ret.length === 0) {
      return [];
    }

    return ret[0].column_name;
  },

  async getColRemain(tableName) {
    const sql = `select column_remain 
    from ${tblName} 
    where  table_name = '${tableName}'`;
    const ret = await db.load(sql);
    if (ret.length === 0) {
      return [];
    }

    return ret[0].column_remain;
  },

  patchColumnRemain(arrayColRemain, tableName) {
    const entity = {
      column_remain: arrayColRemain
    };
    const condition = {
      table_name: `${tableName}`
    };
    return db.update(entity, condition, tblName);
  }
};

module.exports = model;
