const express = require("express")
const router = express.Router()

const UserCode = require("../models/user_code")
const Course = require("../models/course")

router.post("/:course_code/:TabId/:User_id", function (req, res, next) {
  var course_code = req.params.course_code
  var TabData = req.body.Tabdata
  var User_id = req.params.User_id

  UserCode.findOne({ email: User_id }, function (err, db_usercode) {
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
    //console.log("returndata", returndata)

    res.json({
      result: 1,
      message: "수업코드저장완료",
      codedata: returndata,
    })
  })
})

router.get("/:course_code/:TabId/:type/score", function (req, res, next) {
  var course_code = req.params.course_code
  var TabId = req.params.TabId.substr(0, 24)
  var type = req.params.type

  // console.log("course_code, TabId, type", course_code, TabId, type)
  Course.findOne({ code: course_code }, function (err, db_course) {
    if (db_course == null) {
      res.json({
        result: 0,
        message: "해당 수업db가 존재 하지 않음",
      })
      return
    }

    var returndata = null
    var items = type == "0" ? db_course.lecture : db_course.assignment

    items.forEach((element) => {
      element.subitems.forEach((el) => {
        //console.log("el._id", el, TabId)
        if (el._id == TabId) {
          if (!el.scoring) {
            el.scoring = "# " + el.subtitle + " scoring"

            //console.log("element", element)
            db_course.save()
          }
          returndata = el.scoring
        }
      })
    })

    //console.log("returndata", returndata)

    res.json({
      result: 1,
      message: "scoring db",
      codedata: returndata,
    })
  })
})

router.post("/:course_code/:TabId/:type/score", function (req, res, next) {
  var course_code = req.params.course_code
  var TabData = req.body.Tabdata

  var TabId = req.params.TabId.substr(0, 24)
  var type = req.params.type

  Course.findOne({ code: course_code }, function (err, db_course) {
    if (db_course == null) {
      res.json({
        result: 0,
        message: "해당 수업db가 존재 하지 않음",
      })
      return
    }

    var items = type == "0" ? db_course.lecture : db_course.assignment

    items.forEach((element) => {
      element.subitems.forEach((el) => {
        //console.log("el._id", el, TabId)
        if (el._id == TabId) {
          el.scoring = TabData.data
        }
      })
    })

    db_course.save(function (err) {
      if (err) {
        console.error(err)
        res.json({ result: 0, message: "Failed to save scoring data" })
        return
      }

      res.json({
        result: 1,
        message: "scoring data 저장완료",
      })
    })
  })
})

module.exports = router
