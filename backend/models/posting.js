const mongoose = require("mongoose")
const moment = require("moment")

var ISODate = moment().format("YYYY-MM-DD")

const postingSchema = new mongoose.Schema({
  writer: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  hits: { type: Number, required: true, default: 0 },
  password: {type: Number, require: true},
  createdAt: { type: Date, default: Date.now }, // 2
  showdate: { type: String, default: String(ISODate) }, // 2
  attachment:{type:mongoose.Schema.Types.ObjectId, ref:'file'},
})

module.exports = mongoose.model("Posting", postingSchema)
