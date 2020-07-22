var mongoose = require("mongoose")
var Schema = mongoose.Schema

var sessionlogdata = new Schema({
  ip: String,
  login_time: String,
  logout_time: String,
  //로그아웃하는 시간도 적을ㄲ?
})

var SessionLogSchema = new Schema({
  name: String,
  student_id: String,
  email: String,
  position: { type: String, default: "stud" }, //stud, prof, adimin
  access_data: [sessionlogdata],
})

// model을 user로 만들면 특별한 이름을 지정하지 않으면
// mongoDB에서 알아서 Collection name을 알아서 복수형으로 해줍니다
// 그리하여 Collection name은 users로 됩니다

//module.exports = mongoose.model("user", userSchema)
const model = mongoose.model("sessionlog", SessionLogSchema)
module.exports = model
