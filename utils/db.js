const mysql = require("mysql");
const util = require("util");

const pool = mysql.createPool({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "root",
    database: "mini_social_network",
    connectionLimit: 50,
    multipleStatements: true
});

// promisify bind pool to a promise and remove callback
const pool_query = util.promisify(pool.query).bind(pool);

module.exports = {
    findUserByEmail: (sql) => {

    },
    load: (sql) => {
        return pool_query(sql);
    },
    add: (entity, tblName) => {
        return pool_query(`insert into ${tblName} set ? `, entity);
    },
    update: (entity, condition, tblName) => {
        return pool_query(`update ${tblName} set ? where ?`, [entity, condition]);
    },
    del: (condition, tblName) => {
        return pool_query(`delete from ${tblName} where ? `, condition);
    },
    bulkUpdate: (tableName, items) => {
        let queries = '';
        items.forEach((value) => {
            queries += mysql.format('update answers set is_accepted=true where ans_id=?;', value.ans_id);
        })
        console.log(queries);
        return pool_query(queries);
    }
};
