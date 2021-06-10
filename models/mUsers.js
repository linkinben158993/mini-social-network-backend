const db = require('./../utils/db');

const users = 'users';
const answer = 'answers';
const question = 'questionQueue';

const userModel = {
  add(entity) {
    return db.add(entity, users);
  },
  getAll() {
    const sql = `SELECT * FROM  ${users}`;
    return db.load(sql);
  },
  userByUsername(username) {
    const sql = `SELECT * FROM  ${users} WHERE user_name = '${username}'`;
    return db.load(sql);
  },
  userByUserId(userId) {
    const sql = `SELECT * FROM  ${users} WHERE user_id = '${userId}'`;
    return db.load(sql);
  },
  allPendingAnswer() {
    const sql = `SELECT * FROM ${answer} WHERE is_accepted = 0`;
    return db.load(sql);
  },
  createNewQuestion(questionQueue) {
    const sql = `INSERT INTO ${question} (que_id,que_content,que_title,createdAt,user_id,que_cate_id,is_accepted)
        VALUES
        ('${questionQueue.que_id}','${questionQueue.que_content}','${questionQueue.que_title}',current_timestamp(),'${questionQueue.user_id}','${questionQueue.que_cate_id}',false);
        `;
    return db.load(sql);
  },
  createNewAnswer(insertAnswer) {
    const sql = `INSERT INTO ${answer} (ans_id,ans_content,ans_source_URL,ans_images,createdAt,que_id,user_id,is_accepted)
        VALUES
        ('${insertAnswer.ans_id}','${insertAnswer.ans_content}','${insertAnswer.ans_source_URL}',null,current_timestamp(),'${insertAnswer.que_id}','${insertAnswer.user_id}',false);
        `;
    return db.load(sql);
  },
  updatePendingAnswer(acceptedAnswers) {
    return db.bulkUpdate(answer, acceptedAnswers);
  }
};

module.exports = userModel;
