const router = require("express").Router();
const adminModel = require("./../models/mAdmin");
const validator = require("validator").default;
const badWords = require("bad-words");
const vnBadwords = require("./../utils/vietnamese-badword.js");

// const a = "<p>Địt mẹ mày</p>";
// console.log(a.includes("Địt"));

router.get("/mini-q2a/admin/auto-accept-question", async function (req, res) {
  const qqs = await adminModel.allQuetionQueue();

  //   for (const i of vnBadwords) {
  //     console.log("địt mẹ mày mày mày".includes(i));
  //   }

  for (const i of qqs) {
    for (const j of vnBadwords) {
      if (i.que_content.includes(j) || i.que_title.includes(j)) {
        console.log("Nói bậy!");
        break;
      } else {
        const entity = {
          is_accepted: true,
        };
        const condition = {
          que_id: i.que_id,
        };
        adminModel.handleAcceptQuestion(entity, condition);
      }
    }
  }

  res.json(qqs);
});

module.exports = router;
