var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy

var User = require("../backend/models/user")

const bcrypt = require("bcrypt")

module.exports = () => {
  passport.serializeUser((userform, done) => {
    // Strategy 성공 시 호출됨
    //console.log("serializeUser" + userform)
    done(null, userform) // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
  })

  passport.deserializeUser((userform, done) => {
    //console.log("deserializeUser")
    // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
    done(null, userform) // 여기의 user가 req.user가 o
  })

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email", // 여기서 id,pw의 값은 index.html의 form에서 해당하는 name값이여야 합니다.
        passwordField: "password",
      },
      (email, password, done) => {
        // id, pw는 위에서 받은 값 입니다.
        //console.log("email = " + email, password)

        User.findOne({ email: email }, async (findError, user) => {
          if (findError) {
            console.log("find error")
            return done(findError)
          } // 서버 에러 처리
          if (!user) {
            console.log("존재하지 않ㅇ므")

            return done(null, false, {
              message: "존재하지 않는 아이디입니다!!!!",
            }) // 임의 에러 처리
          }

          //console.log("user = " + user)

          bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
              let userform = {
                email: user.email,
                name: user.name,
                position: user.position,
              }
              console.log("success")
              return done(null, userform) // 검증 성공
            }
            console.log("wrong")

            return done(null, false, {
              message: "비밀번호가 틀렸습니다!!!!!",
            }) // 임의 에러 처리
          })
        })
      }
    )
  )
}
