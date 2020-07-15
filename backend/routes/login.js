const express = require("express")
const router = express.Router()
const User = require("../models/user")
const crypto = require("crypto") //Node.js 에서 제공하는 암호화 모듈
//const properties = require('../properties/key.js');
// mapping
// Login
router.get("/", function (req, res, next) {})

// Sign Up
// Post로만 받는다
router.post("/signUp", async function (req, res, next) {
  const new_user = new User()
  // setting values
  new_user.name = req.body.user.name
  new_user.student_id = req.body.user.student_id
  new_user.email = req.body.user.email
  new_user.password = req.body.user.password
  new_user.organization = req.body.user.organization

  var check_bool = 1
  try {
  await User.findOne({ email: new_user.email }, function (err, db_user) {
    if (db_user == null) {
      check_bool = 0
      console.log("낫 존재!" + check_bool)
    } else {
      console.log("존재! " + check_bool)
    }
  }) } catch (error) {
    console.log(error)
  }

  console.log("CHEK IS " + check_bool)
  if (check_bool) {
    res.json({ result: 0, message: "이미 존재하는 Email입니다." })
    return
  }

  new_user.save(function (err) {
    if (err) {
      console.error(err)
      res.json({ result: 0, message: "Failed to save" })
      return
    }
    res.json({ result: 1, message: "Forest에 오신 걸 환영합니다!" })
  })
})

router.post("/signIn", function (req, res, next) {
  User.findOne({ email: req.body.user.email }, function (err, db_user) {
    if (err) {
      console.error(err)
      res.json({ result: 0 })
      return
    }
    if (db_user == null) {
      res.json({ result: 0, message: "존재하지 않는 아이디 입니다." })
      console.log("아이디 낫 존재!" + check_bool)
    } else {
      if (db_user.password == req.body.user.password) {
        res.json({ result: 1, message: "Forest에 오신 걸 환영합니다!" })
      } else {
        res.json({
          result: 0,
          message: "비밀번호가 틀렸습니다. 다시 입력해 주세요!",
        })
      }
    }
  })
})

module.exports = router
