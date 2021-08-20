---
title: 文件存储系统
---

> 强烈建议先阅读  [Hyperf 框架文件系统章节](https://hyperf.wiki/2.2/#/zh-cn/filesystem)

## 本地存储
默认存储在本地，无需修改

存储路径为 `api-server/storage/upload`


## 阿里云 OSS 存储
修改 api-server/.env 中以下配置
```shell script
## 这里改为oss
FILE_DRIVER=oss

## 修改以下配置
OSS_ACCESS_ID=
OSS_ACCESS_SECRET=
OSS_BUCKET=
OSS_ENDPOINT=
```

## 腾讯云 COS 存储
修改 api-server/.env 中以下配置
```shell script
## 这里改为cos
FILE_DRIVER=cos

## 增加以下配置
COS_APPID=
COS_SECRET_ID=
COS_SECRET_KEY=
COS_REGION=
COS_BUCKET=
```

## 七牛云存储
修改 api-server/.env 中以下配置
```shell script
## 这里改为qiniu
FILE_DRIVER=qiniu

## 增加以下配置
QINIU_ACCESS_KEY=
QINIU_SECRET_KEY=
QINIU_BUCKET=
QINIU_DOMAIN=
```

## S3云存储
修改 api-server/.env 中以下配置
```shell script
## 这里改为s3
FILE_DRIVER=s3

## 增加以下配置
S3_KEY=
S3_SECRET=
S3_REGION=
S3_ENDPOINT=
S3_BUCKET=
```