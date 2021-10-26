---
title: 常见问题
---

# 常见问题
* 在出现各种问题前（如注解失效...），我们推荐您先阅读 [hyperf.常见问题](https://hyperf.wiki/2.0/#/zh-cn/quick-start/questions)
* 下面列出的常见问题未能解决您的问题，您可以搜索我们`git仓库`的`issue`，或者提交`issue`。
* 如果您是我们的商业授权客户，请您通过[交流方式](/introduction/communication)联系我们，我们将拉您进入技术讨论群，以优先解决您的棘手问题

## 会话内容未拉取
* 请检查当时聊天对象是否购买并设置了微信`会话内容`存档服务
* 请检查微信后台的`会话内容`的`版本号`是否与`mochat`后台配置的`版本号`一致。(微信后台每重置一次公钥，都会自动升级一个版本)
* 请检查服务器的IP地址，是否在微信后台`会话内容`配置页面的白名单内。查看服务实例的IP地址可用`curl https://www.cip.cc`命令

## 页面直接打开正常，但是刷新就会404，或是直接输入 URL 也会 404
这是 Vue 项目的 Nginx 配置 问题，解决办法有以下2种：

* 1、Vue官网推荐

```nginx
location / {
  root /data/www/mochat/dashboard/dist;
  index  index.html index.htm;
  try_files $uri $uri/ /index.html;
}
```

* 2、匹配 errpr_page
```nginx
location /{
  root /data/www/mochat/dashboard/dist;
  index  index.html index.htm;
  error_page 404 /index.html;
}
```

## 海报等无法生成二维码提示跨域

nginx增加以下规则

```nginx
# 设置跨域
add_header Access-Control-Allow-Origin *;
add_header Access-Control-Allow-Methods 'GET, POST, PUT, DELETE, PATCH, OPTIONS';
add_header Access-Control-Allow-Headers 'Accept,Origin,,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';
```

## 安装都正常，但是登陆一直提示账号密码错误

可能的原因有以下几种，请按此排查：
* 1、通过 chrome 的 开发者工具中 network 查看接口的请求地址、参数、响应是否对；

* 2、dashboard 和 sidebar 的 .env 中接口URL未修改或配置错误，请严格按 [前端项目配置修改](https://mochat.wiki/framework/config.html#%E5%89%8D%E7%AB%AF%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F) 进行配置；

* 3、后端接口服务 api-server 没有启动，输入如下命令看是否启动；

```bash
# 看到下面这样，有比较多进程的，是正常运行中，否则表示未启动成功
[root@mochat api-server]# ps aux | grep mochat
root     11478  104  4.2 767048 326884 pts/2   Sl   11:39   0:05 mochat.Master
root     11496  0.0  4.1 621460 316244 pts/2   S    11:39   0:00 mochat.Manager
root     11499  0.0  4.1 770608 317444 pts/2   Sl   11:39   0:00 mochat.Worker.0
root     11502  0.0  4.1 770608 317400 pts/2   Sl   11:39   0:00 mochat.Worker.1
root     11505  0.0  4.1 775260 318388 pts/2   Sl   11:39   0:00 mochat.queue.default.0
root     11508  0.0  4.1 775128 317712 pts/2   Sl   11:39   0:00 mochat.crontab-dispatcher.0
root     11509  0.0  4.1 775260 318384 pts/2   Sl   11:39   0:00 mochat.queue.room.0
root     11512  0.0  4.1 775260 318392 pts/2   Sl   11:39   0:00 mochat.queue.chat.0
root     11515  0.0  4.1 775260 318392 pts/2   Sl   11:39   0:00 mochat.queue.coOSS.0
root     11516  0.0  4.1 775260 318384 pts/2   Sl   11:39   0:00 mochat.queue.contact.0
root     11517  0.0  4.1 775260 318388 pts/2   Sl   11:39   0:00 mochat.queue.employee.0
root     11527  0.0  0.0 112820   980 pts/2    S+   11:39   0:00 grep --color=auto mochat
```

执行以下命令进行启动
```bash
# 确认目录正确
[root@mochat api-server]# pwd
/www/wwwroot/mochat/api-server
# 后台启动或直接使用  php bin/hyperf.php start 启动
[root@mochat api-server]# nohup php bin/hyperf.php start &
[1] 11478
[root@mochat api-server]# nohup: ignoring input and appending output to ‘nohup.out’
```

* 4、数据库初始化不成功，请查看数据库 `mc_user` 表中是否有数据；

* 5、检查 api-server/runtime/logs 目录下有没有的 error 日志，根据日志提示信息进行排查； 


