const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  queTitle: {
    type: String,
    require: true,
  },
  queContent: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: new Date(new Date() + 7 * 24 * 60 * 60 * 1000),
  },
  isAccepted: {
    type: Boolean,
    require: true,
    default: false,
  },
  userId: {
    type: String,
    require: true,
  },
  queCat: {
    catName: {
      // Lowercase string
      type: String,
      require: true,
    },
  },
});


module.exports = mongoose.model('Question', QuestionSchema);
