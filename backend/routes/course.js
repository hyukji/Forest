const express = require("express")
const router = express.Router()
const Course = require("../models/course")
const User = require("../models/user")
const { db } = require("../models/course")

router.get("/", function (req, res, next) {})

router.put("/:course_code/intro", function (req, res, next) {
  var code = req.params.course_code

  Course.findOne({ code: code }, function (err, db_course) {
    if (db_course == null) {
      res.json({ result: 0, message: "존재하지 않는 강의입니다." })
      return
    }
    db_course.introduction = req.body.newIntro

    db_course.save(function (err) {
      if (err) {
        console.error(err)
        res.json({ result: 0, message: "Failed to save introduction" })
        return
      }

      res.json({
        result: 1,
        message: "intro 저장 성공",
      })
    })
  })
})
router.post("/:course_code/assign", function (req, res, next) {
  var code = req.params.course_code

  Course.findOne({ code: code }, function (err, db_course) {
    if (db_course == null) {
      res.json({ result: 0, message: "존재하지 않는 강의입니다." })
      return
    }

    db_course.assignment.push(req.body.newAssign)

    db_course.save(function (err) {
      if (err) {
        console.error(err)
        res.json({ result: 0, message: "Failed to save newlecture" })
        return
      }

      res.json({
        result: 1,
        message: "수업 생성",
      })
    })
  })
})

router.post("/:course_code/lecture", function (req, res, next) {
  var code = req.params.course_code
  console.log("find in new lecture", code)
  Course.findOne({ code: code }, function (err, db_course) {
    if (db_course == null) {
      res.json({ result: 0, message: "존재하지 않는 강의입니다." })
      return
    }

    db_course.lecture.push(req.body.newLecture)

    db_course.save(function (err) {
      if (err) {
        console.error(err)
        res.json({ result: 0, message: "Failed to save newlecture" })
        return
      }

      res.json({
        result: 1,
        message: "수업 생성",
      })
    })
  })
})

router.put("/:course_code/assign", function (req, res, next) {
  var code = req.params.course_code

  Course.findOne({ code: code }, function (err, db_course) {
    if (db_course == null) {
      res.json({ result: 0, message: "존재하지 않는 강의입니다." })
      return
    }

    db_course.assignment = req.body.newAssign

    db_course.save(function (err) {
      if (err) {
        console.error(err)
        res.json({ result: 0, message: "Failed to save newAssign" })
        return
      }

      res.json({
        result: 1,
        message: "과제 Edit 성공",
      })
    })
  })
})

router.put("/:course_code/lecture", function (req, res, next) {
  var code = req.params.course_code

  Course.findOne({ code: code }, function (err, db_course) {
    if (db_course == null) {
      res.json({ result: 0, message: "존재하지 않는 강의입니다." })
      return
    }

    db_course.lecture = req.body.newLecture

    db_course.save(function (err) {
      if (err) {
        console.error(err)
        res.json({ result: 0, message: "Failed to save newlecture" })
        return
      }

      res.json({
        result: 1,
        message: "수업 Edit 성공",
      })
    })
  })
})

router.get("/:course_code/assign", function (req, res, next) {
  var code = req.params.course_code

  Course.findOne({ code: code }, function (err, db_course) {
    if (db_course == null) {
      res.json({ result: 0, message: "존재하지 않는 강의입니다." })
      return
    }

    res.json({
      result: 1,
      assigndata: db_course.assignment,
    })
  })
})
router.put("/:course_code/course_management", function (req, res, next) {
  var code = req.params.course_code

  Course.findOne({ code: code }, function (err, db_course) {
    if (db_course == null) {
      res.json({ result: 0, message: "존재하지 않는 강의입니다." })
      return
    }
    db_course.course_management = req.body.newCM

    db_course.save(function (err) {
      if (err) {
        console.error(err)
        res.json({ result: 0, message: "Failed to save CM" })
        return
      }

      res.json({
        result: 1,
        message: "CM 저장 성공",
      })
    })
  })
})
router.get("/:course_code/coursedata", async function (req, res, next) {
  var code = req.params.course_code
  var user_isprof

  await User.findOne({ email: req.user.email }, function (err, db_user) {
    if (db_user == null) {
      console.log("낫 존재!")
      res.json({ result: 0, message: "유저 정보가 없습니다." })
      return
    }

    user_isprof = db_user.position
  })

  Course.findOne({ code: code }, function (err, db_course) {
    if (db_course == null) {
      console.log("낫 존재!")
      res.json({ result: 0, message: "존재하지 않는 강의입니다." })
      return
    }

    var allprof = "prof. "
    db_course.prof.forEach(function (p) {
      allprof = allprof + p
    })

    db_course.prof = allprof

    if (user_isprof == "stud") {
      delete db_course.stud_care
      delete db_course.course_management
    }

    res.json({
      result: 1,
      isprof: user_isprof,
      db_course: db_course,
    })
  })
})

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
