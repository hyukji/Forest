var createError = require("http-errors")
var express = require("express")
var path = require("path")
var cookieParser = require("cookie-parser")
var logger = require("morgan")

var session = require("express-session")

const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const MongoStore = require("connect-mongo")
const Store = MongoStore(session)

var indexRouter = require("./routes/index")
var loginRouter = require("./routes/login")
var postingRouter = require("./routes/posting")
//var mailRouter = require("./routes/mail")

var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy
var User = require("../backend/models/user")

const passportConfig = require("./passport")

const history = require("connect-history-api-fallback")

const app = express()

app.use(history())
app.use(express.static("public"))

let url =
  //"mongodb+srv://seul:1234@cluster0-usnbq.mongodb.net/test?retryWrites=true&w=majority"
  "mongodb://127.0.0.1:27017/web_vue"
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((error) => {
    console.log(error)
  })
app.use(bodyParser.urlencoded({ extended: true }))

//app.use(require("connect-history-api-fallback")());

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "jade")

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser("#JDKLF439jsdlfsjl"))
app.use(express.static(path.join(__dirname, "public")))

app.use(
  session({
    //secret: process.env.COOKIE_ID,
    secret: "#JDKLF439jsdlfsjl",
    resave: false,
    saveUninitialized: false,
    store: new Store({ mongooseConnection: mongoose.connection }),
  })
)

app.use(passport.initialize()) // passport 초기화
app.use(passport.session())

passportConfig()

app.use("/api/login", loginRouter)
app.use("/api/posting", postingRouter)
app.use("/api/home", indexRouter)
//app.use("/api/mail", mailRouter)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

module.exports = app
