const express = require("express")
const router = express.Router()
const User = require("../models/user")
var passport = require("passport")

const bcrypt = require("bcrypt") //Node.js 에서 제공하는 암호화 모듈
//const properties = require('../properties/key.js');
// Login
router.get("/", function (req, res, next) {})

// Sign Up
// Post로만 받는다
router.post("/signUp", async function (req, res, next) {
  const new_user = new User()
  // setting values
  new_user.name = req.body.user.name
  new_user.student_id = req.body.user.student_id
  new_user.email = req.body.user.email + "@dgist.ac.kr"
  new_user.organization = req.body.user.organization

  const salt = bcrypt.genSaltSync(10) // salt값 생성, 10이 default
  new_user.salt = salt
  new_user.password = bcrypt.hashSync(req.body.user.password, salt)

  await User.findOne({ email: new_user.email }, function (err, db_user) {
    if (db_user == null) {
      console.log("낫 존재!")
      new_user.save(function (err) {
        if (err) {
          console.error(err)
          res.json({ result: 0, message: "Failed to save" })
          return
        }
      })
      res.json({ result: 1, message: "Forest에 오신 걸 환영합니다!" })
    } else {
      res.json({ result: 0, message: "이미 존재하는 Email입니다." })
      return
    }
  })
})

const authenticateUser = (req, res, next) => {
  if (!req.isAuthenticated()) {
    console.log("로그인 x")
    next()
  } else {
    console.log("로그인 유저 정보" + req.user)
    res.json({ result: 0, message: "이미 로그인이 되어있씁니다." })
    return
  }
}

router.post(
  "/signIn",
  authenticateUser,
  passport.authenticate("local"),
  function (req, res) {
    res.json({ result: 1, message: "Forest에 오신 걸 환영합니다!" })
  }
)

router.get("/logOut", function (req, res) {
  if (!req.isAuthenticated()) {
    return
  }
  req.logout()
  console.log("로그아웃 1")
  req.session.destroy(function (err) {
    if (err) {
      console.log("로그아웃 에러 1")
      return next(err)
    }
    console.log("로그아웃 2")
    return
    // The response should indicate that the user is no longer authenticated.
  })
})

module.exports = router
