const express = require("express")
const router = express.Router()
const User = require("../models/user")
const SessionLog = require("../models/session_log")

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
  var new_mycourse = [
    {
      title: "교과목예시",
      code: "SE906",
      professor: "교수예시",
      progress: 30, //percent
      logo_name: "python", //img
      last_learned: "", //link
      isfinish: false,
    },
    {
      title: "수강종료예시",
      code: "SE907",
      professor: "교수예시2",
      progress: 100, //percent
      logo_name: "python", //img
      last_learned: "", //link
      isfinish: true,
    },
  ]
  new_user.mycourse = new_mycourse

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

      const nw_session_log = new SessionLog()

      nw_session_log.name = req.body.user.name
      nw_session_log.student_id = req.body.user.student_id
      nw_session_log.email = req.body.user.email + "@dgist.ac.kr"

      nw_session_log.save()

      res.json({ result: 1, message: "Forest에 오신 걸 환영합니다!" })
    } else {
      res.json({ result: 0, message: "이미 존재하는 Email입니다." })
      return
    }
  })
})

const authenticateUser = (req, res, next) => {
  if (!req.isAuthenticated()) {
    //console.log("로그인 x")
    next()
  } else {
    //console.log("로그인 유저 정보" + req.user)
    res.json({ result: 0, message: "이미 로그인이 되어있습니다." })
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

router.get("/logOut", async function (req, res) {
  if (!req.isAuthenticated()) {
    return
  }

  SessionLog.findOne(
    {
      name: req.user.name,
      email: req.user.email,
    },
    (finderror11, sessionlog) => {
      if (finderror11) {
        console.log("find error11")
      }

      var moment = require("moment")
      require("moment-timezone")
      moment.tz.setDefault("Asia/Seoul")
      var logout_time = moment().format("YYYY-MM-DD HH:mm:ss")

      var sizeofaccess = sessionlog.access_data.length - 1

      sessionlog.access_data[sizeofaccess].logout_time = logout_time

      sessionlog.save(function (err) {
        if (err) {
          console.error("sessionlog 저장에러")
          return done(null, false)
        }
      })
    }
  )

  req.logout()

  req.session.destroy(function (err) {
    if (err) {
      console.log("로그아웃 에러 1")
      return next(err)
    }

    res.json({ result: 1, message: "로그아웃 되었습니다!" })
    return
    // The response should indicate that the user is no longer authenticated.
  })
})

module.exports = router
