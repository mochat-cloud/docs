---
title: 安装
---
# 安装

## 一、项目下载
* 需要您本地先下载`git`工具
* `https://github.com/mochat-cloud/mochat.git` 页面下载代码到本地

## 二、项目环境安装
### PHP后端接口
```shell
cd /path/to/mochat/api-server
cp .env.example .env
```
##### docker
* 为了节省复杂度，我们推荐您使用项目下已经编写好的`Dockerfile`环境
* 开发、测试环境下，您可以使用`docker-compose.sample.yml`来直接运行容器
* 线上正式环境，我们推荐使用K8S，使用滚动更新来应对系统的平滑重启
```shell
# 需要您在服务器上安装`docker/docker-compose`，并且开启了`docker`
cp docker-compose.sample.yml docker-compose.yml

# 初始化项目
docker-compose build

# 运行容器服务(如果要初始化项目，可以将启动命令改为`php bin/hyperf.php mc:init`)
docker-compose up
```

##### shell
* 为了方便非`docker`用户，我们额外提供了一个`linux-install.sh`环境安装脚本，你可以直接在相应的系统上运行
```
# 安装linux软件如 php、swoole等等(为避免软件冲突覆盖，本安装不会自动创建软链接，需要根据脚本提示手动创建，请放心执行)
chmod o+x ./linux-install.sh
sh ./linux-install.sh

# 安装PHP依赖(./api-server目录下)
composer install

# 初始化项目
cp .env.production .env
php bin/hyperf.php mc:init

# 运行项目 (推荐使用Supervisor后台守护，具体使用可参考hyperf官方文档-Supervisor部署)
php bin/hyperf.php start
```

### 前端
* 项目安装前，需要安装`node`
* `vue.config.js`修改`process.env.VUE_APP_API_BASE_URL = '接口地址'`

#### H5侧边栏编译
```
npm install
npm run build
```
#### PC后台编译
```
yarn install
yarn run build
```

## nginx配置
项目位置 `/opt/www/mochat`
### 后端-接口配置
```
server {
    # 监听端口
    listen 80; 
    # 绑定的域名，填写您的域名
    server_name api.mo.chat;

    location / {
        # 将客户端的 Host 和 IP 信息一并转发到对应节点  
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        # 转发Cookie，设置 SameSite
        proxy_cookie_path / "/; secure; HttpOnly; SameSite=strict";

        # 执行代理访问真实服务器
        proxy_pass http://127.0.0.1:9501;
    }
}

```
### 前端-PC后台配置
```
server {
    listen 80;
    
    server_name dashboard.mo.chat;
    root /opt/www/mochat/dashboard/dist;
    index index.html;

    access_log /var/log/nginx/dashboard.mo.chat.log main;
    error_log /var/log/nginx/dashboard.mo.chat.log.err error;
    fastcgi_intercept_errors off;
    rewrite_log off;

    location / {
        if (!-e $request_filename) {
            rewrite /(.*)$ /index.html last;
            break;
        }
    }

    location = /favicon.ico {
            log_not_found off;
            access_log off;
    }
}
```
### 前端-H5侧边栏配置
```
server {
    listen 80;
    server_name sidebar.mo.chat;
    root /opt/www/mochat/sidebar/dist;
    index index.html;

    access_log /var/log/nginx/sidebar.mo.chat.log main;
    error_log /var/log/nginx/sidebar.mo.chat.log.err error;
    fastcgi_intercept_errors off;
    rewrite_log off;

    location / {
        if (!-e $request_filename) {
            rewrite /(.*)$ /index.html last;
            break;
        }
    }

    location = /favicon.ico {
            log_not_found off;
            access_log off;
    }
    
}
```