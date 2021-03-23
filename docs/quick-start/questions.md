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

## 安装都正常，但是登陆一直提示账号密码错误

可能的原因有以下几种，请按此排查：
* 1、通过 chrome 的 开发者工具中 network 查看接口的请求地址、参数、响应是否对；

* 2、dashboard 和 sidebar 的 .env 中接口URL未修改或配置错误，请严格按 [前端项目配置修改](https://mochat.wiki/framework/config.html#%E5%89%8D%E7%AB%AF%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F) 进行配置；

* 3、数据库初始化不成功，请查看数据库 `mc_user` 表中是否有数据；

* 4、检查 api-server/runtime/logs 目录下有没有的 error 日志，根据日志提示信息进行排查； 


