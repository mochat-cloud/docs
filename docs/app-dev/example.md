---
title: 应用开发示例
---

# 应用开发

## 添加新应用
* 应用开发建议以插件的形式进行开发
* 插件开发以[hyperf组件](https://hyperf.wiki/2.0/#/zh-cn/component-guide/intro)的形式，来添加新功能(模块)。具体文档可参考hyperf组件开发文档，这里不在详述
* 开发完成之后，可以通过composer require 组件名称来安装，hyperf会通过`ConfigProvider`机制来自动加载
::: details 插件目录范例
一个组件包，包含了 ./app下所有的目录结构，只需通过注解与配置，就可以自动加载并运行，和在./app下写代码没有任何区别
```
├── composer.json
├── publish
│  ├── chat_tool.php
│  ├── migrations
│  │  └── 2020_12_04_180819_create_chat_tool_table.php
│  └── seeders
│     └── chat_tool_seeder.php
├── README.md
└── src
├── Action
│  └── Index.php
├── ConfigProvider.php
├── Constants
│  └── Status.php
├── Contract
│  └── ChatToolServiceInterface.php
├── Exception
│  └── ChatToolException.php
├── Functions.php
├── Model
│  └── ChatTool.php
└── Service
└── ChatToolService.php
```
:::

## 修改原应用
如果有修改 `./app`下代码的需求，同样建议以插件(`hyperf组件`)的开发形式，通过[AOP 面向切面编程](https://hyperf.wiki/2.0/#/zh-cn/aop)、契约+指定依赖配置来对原应用进行改造，`hyperf`底层会自动生成替换后的代理

## 发布
* 如果您有意分享您的插件，您可以把您插件的git仓库发布到`https://packagist.org/`平台，其它同学可以直接通过composer来安装下载
* 当然，您也可以直接将代码归档打包，上传到我们的插件市场，来免费(或以有偿的形式)发布到我们的平台