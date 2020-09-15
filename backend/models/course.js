var mongoose = require("mongoose")
var Schema = mongoose.Schema

var dashSchema = new Schema({
  text: [String],
  Updated_date: { type: Date, default: Date.now },
})

var introSchema = new Schema({
  Updated_date: { type: Date, default: Date.now },
  recommend: [String],
  difficulty: String,
  language: String,
  intro: String,
})

var sublecture = new Schema({
  subtitle: String,
  explanation: String,
  Updated_date: { type: Date, default: Date.now },
  iscomplete: Boolean,
  scoring: String,
})

var lectureSchema = new Schema({
  title: String,
  subitems: [sublecture],
  created_date: { type: Date, default: Date.now },
})

var subassign = new Schema({
  subtitle: String,
  explanation: String,
  scoring: String,
  score: { type: Number, default: 0 },
  perfect: { type: Number, default: 0 },
  Updated_date: { type: Date, default: Date.now },
})

var assignSchema = new Schema({
  title: String,
  subitems: [subassign],
  totalscore: { type: Number, default: 0 },
  totalperfect: { type: Number, default: 0 },
  uploaded_date: { type: Date, default: Date.now },
})

var boardSchema = new Schema({
  text: String,
  uploaded_date: Date,
  iswatched: Boolean,
})

var studCareSchema = new Schema({
  text: String,
  uploaded_date: Date,
  iswatched: Boolean,
})

var coursemanagementSchema = new Schema({
  text: String,
  name: String,
  prof: [String],
  uploaded_date: Date,
  iswatched: Boolean,
})

var courseSchema = new Schema({
  name: String,
  prof: [String],
  code: String,
  language: String,
  dashboard: [dashSchema],
  introduction: {
    Updated_date: { type: Date, default: Date.now },
    recommend: [String],
    difficulty: { title: String, icon: String },
    language: { title: String, icon: String },
    intro: String,
  },
  lecture: [lectureSchema],
  assignment: [assignSchema],
  board: [boardSchema],
  stud_care: [studCareSchema],
  course_management: {
    title: String,
    prof: [String],
    uploaded_date: Date,
    iswatched: Boolean,
    image: String,
  },
  create_date: { type: Date, default: Date.now },
  Updated_date: { type: Date, default: Date.now },
})

// model을 user로 만들면 특별한 이름을 지정하지 않으면
// mongoDB에서 알아서 Collection name을 알아서 복수형으로 해줍니다
// 그리하여 Collection name은 users로 됩니다

const model = mongoose.model("course", courseSchema)
module.exports = model
