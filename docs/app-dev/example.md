---
title: 插件开发示例
---

# 插件开发

## 添加新插件

* 插件开发以[MoChat 插件](https://github.com/mochat-cloud/plugin-creater)的形式，来添加新功能(模块)。
* 开发完成之后，可以通过composer require 组件名称来安装，hyperf会通过 `ConfigProvider` 机制来自动加载

## MoChat 插件创建器使用方式

```shell script
# 先进入 api-server 目录
cd /www/wwwroot/mochat/api-server
# 比如要创建一个 maxincai/demo 的插件
# plugin/maxincai/demo
# plugin 表示插件目录
# maxincai 一般为开发者github账号/composer 作者名
# demo 为插件名称
# 执行命令根据提示一步步操作即可
composer create-project mochat/plugin-creater plugin/maxincai/demo
```

## 插件目录示例
```shell script
# 执行成功后就会得到一下如下结构的插件
plugin/maxincai/demo/
|-- composer.json
|-- LICENSE
|-- phpunit.xml
|-- README.md
|-- src
|   |-- ConfigProvider.php
|   |-- Action-------------------------------------- 动作目录(控制器)
|   |-- Constants----------------------------------- 常量目录
|   |-- Contract------------------------------------ 服务接口契约目录
|   |-- Event--------------------------------------- 事件目录
|   |-- Job----------------------------------------- 异步任务目录
|   |-- Listener------------------------------------ 事件监听器目录
|   |-- Logic--------------------------------------- 业务逻辑目录
|   |-- Model--------------------------------------- 模型目录
|   |-- Queue--------------------------------------- 异步队列目录
|   |-- Service------------------------------------- 服务目录
|   `-- Task---------------------------------------- 定时任务目录
`-- tests
    |-- bootstrap.php
    `-- Cases
```

## 修改原应用
如果有修改 `./app`下代码的需求，同样建议以插件(`hyperf组件`)的开发形式，通过[AOP 面向切面编程](https://hyperf.wiki/2.0/#/zh-cn/aop)、契约+指定依赖配置来对原应用进行改造，`hyperf`底层会自动生成替换后的代理

## 发布
* 如果您有意分享您的插件，您可以把您插件的git仓库发布到`https://packagist.org/`平台，其它同学可以直接通过composer来安装下载
* 当然，您也可以直接将代码归档打包，上传到我们的插件市场，来免费(或以有偿的形式)发布到我们的平台