var { PythonShell } = require("python-shell")

function writeFile(name, code) {
  if (name == "") return false
  var defaultpath = "C:" // 기록하고자 하는 경로. ex) C:\\Program Files\\logs
  var fileObject = new ActiveXObject("Scripting.FileSystemObject")
  var fullpath = defaultpath + "\\" + name

  // 파일이 생성되어있지 않으면 새로 만들고 기록

  if (!fileObject.FileExists(fullpath)) {
    var fWrite = fileObject.CreateTextFile(fullpath, false)
    fWrite.write(msg)
    fWrite.close()
  } else {
    // 파일이 이미 생성되어 있으면 appending 모드로 파일 열고 기록

    var fWrite = fileObject.OpenTextFile(fullpath, 8)
    fWrite.write(msg)
    fWrite.close()
  }
}

function run(code, getInput, callBack) {
  var fs = require("fs")
  var fileName = "script.py"
  var result = " "

  fs.writeFile(fileName, code, function (err) {
    if (err) console.log(err)
  })

  let pyshell = new PythonShell(fileName)
  pyshell.send("input must be implemented")
  pyshell.on("message", function (message) {
    console.log("mmess", message)
    callBack(message)
  })
  // console.log(result, 'resulttttt')
  // return new Promise(function(resolve, reject) {
  //   if (result) {
  //     console.log('result python', result)
  //     resolve(result);
  //   } else {
  //     resolve(result);
  //   }
  // })

  //
  // PythonShell.runString(code, null, function(err, result) {
  //   console.log('start', code)
  //   if (err) console.log(err);
  //   console.log('finished', result)
  //   callBack(result)
  // })
}

module.exports = run
