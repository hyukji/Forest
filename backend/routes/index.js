const express = require("express")
const router = express.Router()
const Posting = require("../models/posting")

/* GET main page. */
router.get("/", function (req, res, next) {
  Posting.find()
    .sort({ createdAt: -1 })
    .exec(function (err, postings) {
      res.send(postings)
    })
})

router.get("/authentication", function (req, res, next) {
  console.log(req.isAuthenticated())
  if (req.isAuthenticated()) {
    console.log("back: 인증권한 o")

    res.json({ isauth: 1, username: req.user.email })
  } else {
    console.log("back: 인증권한 x")

    res.json({ isauth: 0, username: "" })
  }
})
module.exports = router
