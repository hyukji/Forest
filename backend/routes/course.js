const express = require("express")
const router = express.Router()
const Course = require("../models/course")
const User = require("../models/user")

router.get("/", function (req, res, next) {})

// Sign Up
// Post로만 받는다
router.get("/signUp", function (req, res, next) {})

router.post("/newcourse", function (req, res, next) {
  var user_course = {
    title: req.body.dialog_info.name,
    code: req.body.dialog_info.code,
    professor: [req.user.name],
    progress: 0, //percent
    logo_name: req.body.dialog_info.language, //img
    last_learned: "", //link
    isfinish: false,
  }

  User.findOne({ email: req.user.email }, function (err, db_user) {
    if (db_user == null) {
      console.log("낫 존재!")
      res.json({ result: 0, message: "유저 정보가 없습니다." })
      return
    }

    db_user.mycourse.push(user_course)

    db_user.save(function (err) {
      if (err) {
        console.error(err)
        res.json({ result: 0, message: "Failed to save in user" })
        return
      }
      console.log("유저에 저장 성공.")
    })
  })

  const new_course = new Course()
  new_course.name = req.body.dialog_info.name
  new_course.code = req.body.dialog_info.code
  new_course.language = req.body.dialog_info.language
  new_course.prof = req.user.name

  Course.findOne({ code: new_course.code, name: new_course.name }, function (
    err,
    db_course
  ) {
    if (db_course == null) {
      console.log("낫 존재!")
      new_course.save(function (err) {
        if (err) {
          console.error(err)
          res.json({ result: 0, message: "Failed to save" })
          return
        }
      })
      res.json({
        result: 1,
        message: "성공적으로 강의가 개설되었습니다! 세부사항을 기록해 주세요",
        code: new_course.code,
      })
    } else {
      res.json({ result: 0, message: "이미 존재하는 강의입니다." })
      return
    }
  })
})

module.exports = router
