module.exports = (code, lastCallBack) => {

  var Docker = require('dockerode')
  var fs     = require('fs')

  var socket = process.env.DOCKER_SOCKET || '/var/run/docker.sock';
  var stats  = fs.statSync(socket);

  if (!stats.isSocket()) {
    throw new Error('Are you sure the docker is running?');
  }


  fs.writeFile('script/script.py', code, function (err) {
    if (err) console.log(err)
  })

  const { Transform, PassThrough } = require('stream');
  // class MyTransform extends Transform {
  //   constructor(options) {
  //     super(options);
  //     // ...
  //   }
  //   _transform(chunk, encoding, callback) {
  //     var data = chunk.toString()
  //     if (this._lastLineData) data = this._lastLineData + data
  //
  //     var lines = data.split('\n')
  //     this._lastLineData = lines.splice(lines.length-1,1)[0]
  //
  //     lines.forEach(this.push.bind(this))
  //     callback()
  //   }
  //   _flush(callback) {
  //     console.log('flush')
  //     if (this._lastLineData) this.push(this._lastLineData)
  //     this._lastLineData = null
  //     callback()
  //   }
  // }
  //
  // var output = new MyTransform({ objectMode: true })
  // var input = new MyTransform({ objectMode: true })

  var out = new PassThrough();
  // var inn = new PassThrough();
  out.setEncoding('utf8')


  var docker = new Docker({ socketPath: socket });
  var optsc = {
    AttachStdin: true,
    AttachStdout: true,
    AttachStderr: true,
    Tty: true,
    OpenStdin: true,
    StdinOnce: false,
    // Cmd: ['/hello'],
    // Image: 'hello-world'
    HostConfig: {
      AutoRemove: true,
      Binds: [
        `${process.cwd()}/script:/usr/src/script`
      ]
    },
    WorkingDir: '/usr/src/script',
    Cmd: [ 'python3', 'script.py'],
    // Cmd: [ `/bin/echo "${code}" > script.py`, 'python3 script.py'],
    Image: 'python'
  }
  var result = {
    id: null,
    data: ''
  }
  console.log(process.cwd())

    function handler(err, container) {
      var attach_opts = {stream: true, stdin: true, stdout: true, stderr: true};
      result.id = container.id
      container.attach(attach_opts, function handler(err, stream) {
        stream.pipe(out);

        out.on('readable', function() {
          while (data = this.read()) {
            if (data ==null) {
              console.log('nulllllll')
            }
            result.data = data
            process.stdout.write('@'+ data)
            lastCallBack(result)
          }
        })
        out.on('pause', function() {
          console.log('out pause')
        })
        out.on('end', function() {
          console.log('end')
          //lastCallBack(result)
        })

        container.start(function(err, data) {

          container.wait(function(err, data) {
            exit(stream);
            //container.remove()
          });
        });
      });
    }

    // Exit container
    function exit (stream, isRaw) {
      stream.end();
    }

  docker.createContainer(optsc, handler);





}
