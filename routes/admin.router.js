const router = require("express").Router();
const adminModel = require("../models/mAdmin");
const validator = require("validator").default;
const badWords = require("bad-words");
const vnBadwords = require("../utils/vietnamese-badword.js");
const gmail = require("./../utils/gmail.js");

// const a = "<p>Địt mẹ mày</p>";
// console.log(a.includes("Địt"));

router.get("/auto-check-accept-question", async function (req, res) {
  const qqs = await adminModel.allQuetionQueue();
  const queInfo = req.query[0];
  const tagInfo = req.query[1];

  var error_flag = false;
  if (queInfo !== undefined) {
    for (const i of vnBadwords) {
      if (queInfo.que_content.includes(i) || queInfo.que_title.includes(i)) {
        error_flag = true;
        break;
      }

      if (tagInfo !== undefined) {
        for (const j of tagInfo) {
          if (j.label_name.includes(i)) {
            error_flag = true;
            break;
          }
        }
      }
    }
  }

  if (error_flag === true) {
    return res.json({ is_accepted: false, question_info: queInfo });
  }

  const entity = {
    is_accepted: true,
  };
  const condition = {
    que_id: queInfo.que_id,
  };

  const ret = await adminModel.handleAcceptQuestion(entity, condition);

  if (+ret.affectedRows === 1) {
    // notify
    const admin_email = "caovanducs@gmail.com";
    const que_title = queInfo.que_title;
    gmail.noTifyToAdmin(admin_email, que_title, {
      ...queInfo,
      is_accepted: true,
    });
    return res.json({
      is_accepted: true,
      question_info: queInfo,
    });
  }

  return res.json({ is_accepted: false, question_info: queInfo });
});

module.exports = router;
