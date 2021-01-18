---
home: true
heroImage: /image/header.png
heroText: MoChat
tagline: 企业微信后台管理系统
actionText: 快速上手 →
actionLink: /quick-start/install
features:
- title: 开源、私有化部署
  details: 软件自由使用，开箱即用，定制运维。
- title: 高性能、稳定
  details: 依托于Hyperf生态圈、严格模式开发，历经多次迭代。
- title: 功能丰富
  details: 内置多企业和多套RBAC系统，集成基本的员工、客户管理等模块，以及其它客户引流、分流、统计、监控等模块
- title: Vant组件
  details: 前、后端分离，前端采用Vant框架，轻量、可靠、漂亮的页面风格
- title: 插件化
  details: 二次开发更便利，插件式扩展复杂需求，用最简单的方式，灵活分层开发
- title: 开发工具
  details: 内置丰富的命令行，自动生成文件代码。并且集成了各种环境一键安装脚本，省心省力，快速上手
  footer:  Licensed | Copyright © 2021-present Evan You
---


### hello mochat :tada:
```shell
# 安装环境
docker-compose up -d mochat
# PHP服务初始化项目
php bin/hyperf.php mc:init
# 运行PHP服务
php bin/hyperf.php start
```
