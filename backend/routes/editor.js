const express = require("express")
const router = express.Router()

const UserCode = require("../models/user_code")

router.post("/:course_code/UserCode", function (req, res, next) {
  var course_code = req.params.course_code
  var TabData = req.body.Tabdata
  var user_data = req.body.user_data

  UserCode.findOne({ email: user_data.email }, function (err, db_usercode) {
    if (db_usercode == null) {
      res.json({
        result: 0,
        message: "해당 이메일의 유저코드 db가 존재 하지 않음",
      })
      return
    }
    var isexist = false
    db_usercode.UserCodeData.forEach((element) => {
      if (element.course_id == course_code) {
        element.CodeDataArray.forEach((el) => {
          if (el.IdentificationNum == TabData._id) {
            isexist = true
            el.CodeData = TabData.data
          }
        })

        if (!isexist) {
          element.CodeDataArray.push({
            IdentificationNum: TabData._id,
            CodeData: TabData.data,
          })
        }
      }
    })

    db_usercode.save(function (err) {
      if (err) {
        console.error(err)
        res.json({ result: 0, message: "Failed to save newlecture" })
        return
      }

      res.json({
        result: 1,
        message: "수업코드저장완료",
      })
    })
  })
})

router.get("/:course_code/:TabId/:User_id", function (req, res, next) {
  var course_code = req.params.course_code
  var TabId = req.params.TabId
  var User_id = req.params.User_id

  // console.log("111")

  UserCode.findOne({ email: User_id }, function (err, db_usercode) {
    if (db_usercode == null) {
      res.json({
        result: 0,
        message: "해당 이메일의 유저코드 db가 존재 하지 않음",
      })
      return
    }

    var returndata = null

    db_usercode.UserCodeData.forEach((element) => {
      if (element.course_id == course_code) {
        element.CodeDataArray.forEach((el) => {
          if (el.IdentificationNum == TabId) {
            returndata = el.CodeData
          }
        })
      }
    })
    console.log("returndata", returndata)

    res.json({
      result: 1,
      message: "수업코드저장완료",
      codedata: returndata,
    })
  })
})

module.exports = router
