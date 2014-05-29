var cluster = require('cluster');
var http = require('http');

if (cluster.isMaster) {
    var numCPUs = require('os').cpus().length;
    var numReqs = 0;
    // 启动多个进程.
    for (var i = 0; i < numCPUs; i++) {
        //增加一个进程
        var worker_process = cluster.fork();
        //侦听子进程的message事件
        worker_process .on('message', function(msg) {
            if (msg.cmd && msg.cmd == 'notifyRequest') {
                numReqs++;
            }
        });
    }
    //输出变量值
    setInterval(function() {
        console.log("numReqs =", numReqs);
    }, 1000);
} else {

    // 每个子进程都有一个http server，他们共享一个8000端口，所以请求时会同时被调用
    http.Server(function(req, res) {
        console.info("workerid:" + cluster.worker.id);
        res.writeHead(200);
        res.end("hello world\n");
        //子进程发出一个消息
        process.send({ cmd: 'notifyRequest' });
    }).listen(8000);
}