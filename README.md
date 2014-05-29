##  介绍

本教程是在已经的stock教程基础上改写， 其主要目的是通过一个完整的项目来学习nodejs的编程思想


##  cluster 说明

为了充分利用系统资源（因nodejs是单进程，通过插件cluster fork当前进程进而达到充分利用多核资源）
并且添加某个进程死掉重启的代码

##  shellCommand命令说明

为了类似nginx 服务器一样，例如使用/etc/init.d/nginx start 和/etc/init.d/nginx stop 可以启动
和关闭Nginx服务器。我们通过bash脚本实现类似功能，创建shellCommand(文件名可以任意改写并放置/etc/init.d/文件中)
并通过_chmod +x shellCommand_赋予其执行权限

ps: 不同系统 改写参数DAEMON 和 PIDFILE 路径

启动方式：
```bash
$ ./shellCommand start
```
停止方式：
```bash
$ ./shellCommand stop
```


##