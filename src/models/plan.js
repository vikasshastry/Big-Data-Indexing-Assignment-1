const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  plan: {
    type: Object,
  },
});

module.exports = mongoose.model("Plans", planSchema);
