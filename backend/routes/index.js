const express = require("express")
const router = express.Router()
const Posting = require("../models/posting")
const User = require("../models/user")

/* GET main page. */
router.get("/", function (req, res, next) {
  Posting.find()
    .sort({ createdAt: -1 })
    .exec(function (err, postings) {
      res.send(postings)
    })
})

router.get("/mycourse", function (req, res, next) {
  //course_info
  console.log("back mycourse")
  User.findOne({ email: req.user.email }, function (err, db_user) {
    res.json({ position: db_user.position, course_info: db_user.mycourse })
    //console.log(res)
  })
})

router.get("/authentication", function (req, res, next) {
  //console.log(req.isAuthenticated())
  if (req.isAuthenticated()) {
    console.log("back: 인증권한 o")
    //console.log(req)

    res.json({
      isauth: 1,
      email: req.user.email,
      name: req.user.name,
      position: req.user.position,
    })
  } else {
    console.log("back: 인증권한 x")
    res.json({ isauth: 0, email: "", name: "", position: "" })
  }
})
module.exports = router
