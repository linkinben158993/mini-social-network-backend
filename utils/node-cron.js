const CronJob = require("node-cron");
const mAnswer = require("../models/mUsers");
const vnBadWords = require("../utils/vietnamese-badword.js");
const gmail = require("./../utils/gmail");

const regex = new RegExp(vnBadWords.join("|"));

module.exports = {
  autoFilterAnswer: () => {
    CronJob.schedule(
      "* * * * *",
      async () => {
        const allPendingAnswer = await mAnswer.allPendingAnswer();
        const acceptedAnswer = allPendingAnswer
          .filter((item) => {
            if (!regex.test(item.ans_content.toLowerCase())) {
              return true;
            }
            return false;
          })
          .map((item) => {
            return {
              ans_id: item.ans_id,
              ans_content: item.ans_content,
            };
          });
        console.log("Accepted Answer:", acceptedAnswer);

        // K cần await ở đây cũng được nêu k muốn xem kết quả.
        const result = await mAnswer.updatePendingAnswer(acceptedAnswer);

        console.log("ret:", result);

        if (result.length > 0) {
          const admin_email = "caovanducs@gmail.com";
          gmail.notifyAnswerToAdmin(admin_email, result.length, result);
        }
      },
      {
        schedule: true,
        timezone: "Asia/Ho_Chi_Minh",
      }
    );
  },
};
