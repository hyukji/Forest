var Docker = require('dockerode');
var fs     = require('fs');


var socket = process.env.DOCKER_SOCKET || '/var/run/docker.sock';
var stats  = fs.statSync(socket);

if (!stats.isSocket()) {
  throw new Error('Are you sure the docker is running?');
}

var docker = new Docker({host: 'http://127.0.0.1', port: 2375});

// create a container entity. does not query API
var container = docker.getContainer('71501a8ab0f8');

// query API for container info
container.inspect(function (err, data) {
  console.log(data);
});

container.start(function (err, data) {
  console.log(data);
});

container.remove(function (err, data) {
  console.log(data);
});

// docker.createContainer({Image: 'ubuntu', Cmd: ['/bin/bash']}, function (err, container) {
//   container.start(function (err, data) {
//     container.top({ps_args: 'aux'}, function(err, data) {
//       console.log(data);
//     });
//   });
// });

module.exports = container
