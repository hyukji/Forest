var mongoose = require("mongoose")
var Schema = mongoose.Schema

var dashSchema = new Schema({
  text: [String],
  Updated_date: { type: Date, default: Date.now },
})
var introSchema = new Schema({
  text: [String],
  Updated_date: { type: Date, default: Date.now },
})
var lectureSchema = new Schema({
  text: [String],
  uploaded_date: Date,
  iswatched: Boolean,
})
var assignSchema = new Schema({
  text: String,
  uploaded_date: Date,
  iswatched: Boolean,
})
var boardSchema = new Schema({
  text: String,
  uploaded_date: Date,
  iswatched: Boolean,
})

var courseSchema = new Schema({
  name: String,
  prof: [String],
  code: String,
  language: String,
  recommend: [String],
  dashboard: [dashSchema],
  introduction: [introSchema],
  lecture: [lectureSchema],
  assignment: [assignSchema],
  board: [boardSchema],
  create_date: { type: Date, default: Date.now },
  Updated_date: { type: Date, default: Date.now },
})

// model을 user로 만들면 특별한 이름을 지정하지 않으면
// mongoDB에서 알아서 Collection name을 알아서 복수형으로 해줍니다
// 그리하여 Collection name은 users로 됩니다

const model = mongoose.model("course", courseSchema)
module.exports = model
