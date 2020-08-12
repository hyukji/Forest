
module.exports = (id, input, lastCallBack) => {

  var Docker = require('dockerode')
  var fs     = require('fs')

  var socket = process.env.DOCKER_SOCKET || '/var/run/docker.sock';
  var stats  = fs.statSync(socket);

  if (!stats.isSocket()) {
    throw new Error('Are you sure the docker is running?');
  }


  var result = {
    id: null,
    data: ""
  }
  var { PassThrough } = require('stream')
  var inn = new PassThrough();
  var out = new PassThrough();
  var docker = new Docker({ socketPath: socket });
  var container = docker.getContainer(id);


      var attach_opts = {stream: true, stdin: true, stdout: true, stderr: true};
      result.id = container.id
      container.attach(attach_opts, function handler(err, stream) {
        inn.pipe(stream)

        inn.write(input+"\n")
      })


      // Exit container

}
