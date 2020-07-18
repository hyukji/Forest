var mongoose = require("mongoose")
var passportLocalMongoose = require("passport-local-mongoose")
var Schema = mongoose.Schema

var notifiSchema = new Schema({
  text: String,
  uploaded_date: Date,
})

var mycourseSchema = new Schema({
  title: String,
  professor: [String],
  progress: Number, //percent
  logo_name: String, //img
  last_learned: String, //link
  isfinish: Boolean,
})

var userSchema = new Schema({
  name: String,
  student_id: String,
  email: String,
  salt: String,
  password: String,
  organization: String,
  position: { type: String, default: "stud" }, //stud, prof, adimin
  create_date: { type: Date, default: Date.now },
  Updated_date: { type: Date, default: Date.now },
  notification: [notifiSchema],
  mycourse: [mycourseSchema],
})

userSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
})

// model을 user로 만들면 특별한 이름을 지정하지 않으면
// mongoDB에서 알아서 Collection name을 알아서 복수형으로 해줍니다
// 그리하여 Collection name은 users로 됩니다

//module.exports = mongoose.model("user", userSchema)
const model = mongoose.model("user", userSchema)
module.exports = model
