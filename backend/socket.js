var io = {}

module.exports = (server) => {
  io = require('socket.io')(server);
  io.on('connection', function(socket) {
    console.log("Connect from Client: " + socket)
    socket.on('code', function (data) {
      console.log("Message from Client: " + data.code)
      require('./docker')(data.code, function(result) {
        io.emit('result', result)
      }, function() {
        io.emit('closeStdin')
      })

    socket.on('input', function(id, input) {
      //console.log('input', id, input)
      require('./dockerin')(id, input, function(result) {
        io.emit('result', result)
      })
    })

  })
  });
}
//
// var io = require("socket.io")(server)
// //pythonShell = require("./python.js")
//
// io.on("connection", function (socket) {
//   console.log("Connect from Client: " + socket)
//
//   socket.on("code", function (data) {
//     console.log("Message from Client: " + data.code)
//     io.emit('result', 'code result');
//     // pythonShell(
//     //   data.code,
//     //   function () {
//     //     // console.log("giveMe input")
//     //     // var input = ""
//     //     // socket.emit('input').then(
//     //     // socket.on('input', await function(data) {
//     //     //   console.log('Input from client:'+ data.input)
//     //     //   input = data.input
//     //     // })).then(
//     //     // console.log("before return@@", input))
//     //     // return 5465
//     //   },
//     //   function (result) {
//     //     console.log("result", result)
//     //     var rtnMessage = {
//     //       success: 1,
//     //       message: result,
//     //     }
//     //     io.emit("result", rtnMessage)
//     //   }
//     // )
//     // .then(function (result) {
//     //
//     // }).catch(function (err) {console.log(err)})
//
//   })
// })
