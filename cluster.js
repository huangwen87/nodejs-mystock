/**
 * 集群版启动  适用于产品模式
 * 1、 当cluster 是master时，去创建与本机cpu核一样多的worker  并启动app.js服务
 * 2、 当cluster 是worker时 直接运行
 * */

var cluster = require('cluster');
var os = require('os');
var path = require('path');
var http = require('http');
var sock= require('./models/socket');

// 获取CPU的数量
var numCPUs = os.cpus().length;
var workers = {};

if(cluster.isMaster){
    //主进程分支
    cluster.on('death', function(worker){
        process.nextTick(function(){
                 //当一个工作进程结束时，重启工作进程
                 delete workers[worker.pid];
                 worker = cluster.fork();
                 workers[worker.pid] = worker;
        });
    });
    //初始开启与CPU数量相同的工作进程
    for(var i = 0; i < numCPUs; i++){
        var worker = cluster.fork();
        workers[worker.pid] = worker;
    }

    //因为存在socket.io问题，所以放入master中启动服务器
    var app = require('./app');
}else{
     //工作进程分支， 启动服务器   如果没有socket.io限制，就可以直接在这里启动
    //var app = require('./app');
    //app.listen(3000);
}

//当主进程被终止时，关闭所有工作进程
process.on('SIGTERM', function(){
   for(var pid in workers){
       process.kill(pid);
   }
    process.exit(0);
});