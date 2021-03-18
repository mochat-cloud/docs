---
title: 配置
---

# 配置

> 强烈建议先阅读  [Hyperf 框架配置章节](https://hyperf.wiki/2.1/#/zh-cn/config)

## 后端环境变量

文件位置  api-server/.env

| 变量名        | 变量说明         | 默认值  |
| ------------- |-------------| -----|
| APP_NAME      | 应用名称 | mochat  | 
| APP_ENV      | 应用环境 |  dev  | 
| DB_DRIVER      | 数据库驱动 | mysql  | 
| DB_HOST      | 数据库主机 |  127.0.0.1  | 
| DB_PORT      | 数据库端口 |  3306 | 
| DB_DATABASE      | 数据库名称 |    | 
| DB_USERNAME      | 数据库用户名 |   | 
| DB_PASSWORD      | 数据库密码 |    | 
| DB_CHARSET      | 数据库编码 | utf8mb4  | 
| DB_COLLATION      | 数据库字符集 | utf8mb4_unicode_ci   | 
| DB_PREFIX      | 数据库前缀 | mc_  | 
| REDIS_HOST      | Redis主机 |  127.0.0.1  | 
| REDIS_AUTH      | Redis密码 |   | 
| REDIS_PORT      | Redis端口 |  6379  | 
| REDIS_DB      | Redis数据库号 | 0  | 
| SIMPLE_JWT_SECRET  | jwt加密串 |    | 
| SIMPLE_JWT_PREFIX  | jwt缓存前缀 | mc_jwt_  | 
| FILE_DRIVER      | 文件驱动 | local，支持oss、qiniu、cos、s3、ftp  | 
| OSS_ACCESS_ID      | 阿里云OSS配置 |    | 
| OSS_ACCESS_SECRET  | 阿里云OSS配置 |    | 
| OSS_BUCKET      | 阿里云OSS配置 |    | 
| OSS_ENDPOINT    | 阿里云OSS配置 |    | 
| APP_DOMAIN      | 后端接口域名(需要加http或https) |  如：https://api.mo.chat | 
| JS_DOMAIN      | 侧边栏域名(需要加http或https) |  如：https://h5.mo.chat  | 

## 前端环境变量

文件位置  sidebar/.env

| 变量名        | 变量说明         | 默认值  |
| ------------- |:-------------:| -----:|
| VUE_APP_API_BASE_URL | 后端接口URL |  |

以下的4种都是正确的格工，请根据您的实际情况进行配置。

```shell script
# 1、HTTP协议方式
VUE_APP_API_BASE_URL=http://api.mochat.dev

# 2、HTTPS协议方式
VUE_APP_API_BASE_URL=https://api.mochat.dev

# 3、HTTP协议与HTTPS协议同时兼容方式
VUE_APP_API_BASE_URL=//api.mochat.dev

# 4、子目录模式(需根据实际 Nginx 配置来确定是否 URL中是否需要加 api )
VUE_APP_API_BASE_URL=http://scrm.mochat.dev/api
```