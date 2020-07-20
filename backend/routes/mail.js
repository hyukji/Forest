var nodemailer = require("nodemailer")
var smtpTransport = require("nodemailer-smtp-transport")
var arr = "0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z".split(
  ","
)
var randomPw = createCode(arr, 6)

//비밀번호 랜덤 함수
console.log(" back mail 성공")
function createCode(objArr, iLength) {
  var arr = objArr
  var randomStr = ""
  for (var j = 0; j < iLength; j++) {
    randomStr += arr[Math.floor(Math.random() * arr.length)]
  }
  return randomStr
}

var transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: "gsh06088@gmail.com",
      pass: "",
    },
  })
)

var mailOptions = {
  from: "gsh06088@gmail.com",
  to: "gsh06088@gmail.com",
  subject: "🌲Forest🌲 로그인 인증",
  html: "<h1>Forest에서 인증하세요</h1> <h2>" + randomPw + "</h2>",
}

function mailsend() {
  console.log(" 마지막 함수 성공")

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log("Email sent: " + info.response)
    }
  })
}

router.post("/mail", mailsend())
