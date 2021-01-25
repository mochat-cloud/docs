---
title: 安装
---
# 安装

## 服务器要求

MoChat 对系统环境有一些要求，仅可运行于 Linux 和 Mac 环境下，但由于 Docker 虚拟化技术的发展，在 Windows 下也可以通过 Docker for Windows 来作为运行环境，通常来说 Mac 环境下，我们更推荐本地环境部署，以避免 Docker 共享磁盘缓慢导致 MoChat 启动速度慢的问题。   

[mochat-cloud\mochat-docker](https://github.com/mochat-cloud/mochat-docker) 项目内已经为您准备好了各种版本的 Dockerfile ，或直接基于已经构建好的 [mochat\mochat](https://hub.docker.com/r/mochat/mochat) 镜像来运行。   

当您不想采用 Docker 来作为运行的环境基础时，您需要确保您的运行环境达到了以下的要求：   

 - PHP >= 7.2  (推荐7.4版本)
 - Swoole PHP 扩展 >= 4.5，并关闭了 `Short Name`
 - OpenSSL PHP 扩展
 - JSON PHP 扩展
 - PDO PHP 扩展
 - Redis PHP 扩展
 - FFMpeg PHP 扩展 （会话存档功能需要）
 - wxwork_finance_sdk PHP 扩展 （会话存档功能需要）


## 安装 MoChat

Hyperf 使用 [Composer](https://getcomposer.org) 来管理项目的依赖，在使用 MoChat 之前，请确保你的运行环境已经安装好了 Composer。

- 建议将 Composer 镜像设置为阿里云镜像，加速国内下载速度

> 视情况而定

```shell
composer config -g repo.packagist composer https://mirrors.aliyun.com/composer
```

### 项目下载

- 假设项目相关代码都放在 `/data/www` 目录

```shell script
cd /data/www
git clone https://github.com/mochat-cloud/mochat.git
```

### 环境安装

#### PHP后端接口

##### Shell 安装方式
* 为了方便非 `docker` 用户，我们额外提供了一个`install.sh` CentOS 下的环境安装脚本，你可以直接在相应的系统上运行。

```
# 安装linux软件如 php、swoole、FFMpeg、wxwork_finance_sdk等等(为避免软件冲突覆盖，本安装不会自动创建软链接，需要根据脚本提示手动创建，请放心执行)
cd /usr/local/src
wget https://mochatcloud.oss-cn-beijing.aliyuncs.com/deploy/CentOS-install.sh
chmod o+x ./CentOS-install.sh
sh ./CentOS-install.sh
```

如自行编译安装 PHP 相关环境，wxwork_finance_sdk 的安装可参考：https://github.com/oh-stone/wework-chatdata-sdk 



##### 确认相关环境正确安装
    
```shell script
# 查看 PHP 版本是否正确，需 >= 7.2，建议 7.4
php -v

# 查看 Swoole 版本安装是否正确，并确定 `swoole.use_shortname` 参数值为 `Off` 
php --ri swoole

# 查看 Reids FFMpeg wxwork_finance_sdk 扩展是否正确安装
php --ri reids
php --ri FFMpeg
php --ri wxwork_finance_sdk

# 确保内存大于 1024M
php -i | grep memory_limit

```

```
# 安装PHP依赖(./api-server目录下)
cd /data/www/mochat/api-server
composer install

# 初始化项目，执行项目初始化命令，设置MySQL、Redis、OSS、默认用户等信息
cp .env.example .env
php bin/hyperf.php mc:init

# 运行项目 (推荐使用Supervisor后台守护，具体使用可参考 Hyperf 官方文档-Supervisor部署)
php bin/hyperf.php start

# 或开发环境也可以使用 watch 命令来进行热更新
php bin/hyperf.php server:watch
```

- 如果 mc:init 执行失败，可参考：
```shell script
# 1、将 .env 中的 DB REDIS OSS DOMAIN 配置完成
# 2、将数据库文件导入初始化 api-server/storage/install/mochat.sql
# 3、执行初始租户和账号信息 SQL ，请注意修改下面的手机号和服务器IP，以下用户密码是 13412347867和123456

INSERT INTO `mc_user` (`phone`,`password`,`status`,`isSuperAdmin`) VALUES ('13412347867','$2y$10$6PedNV6SVNQNpUMjZgauvewh7wfFjbSWbh2k9yGJ9dhAIBVcL4gKm',1,1);

INSERT INTO `mc_tenant` (`server_ips`) VALUES ('["182.92.11.11"]');
```

由于 MoChat 是持久化的 CLI 框架，当您修改完您的代码后，通过 `CTRL + C` 终止当前启动的进程实例，并重新执行 `php bin/hyperf.php start` 启动命令即可。

### Docker 方式安装
* 为了节省复杂度，我们推荐您使用项目下已经编写好的 `Dockerfile` 环境
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

#### 存在兼容性问题的扩展

由于 Hyperf 基于 Swoole 协程实现，而 Swoole 4 带来的协程功能是 PHP 前所未有的，所以与不少扩展都仍存在兼容性的问题。   
以下扩展（包括但不限于）都会造成一定的兼容性问题，不能与之共用或共存：

- xhprof
- xdebug
- blackfire
- trace
- uopz

### 前端
* 项目安装前，需要安装 `Node.js`，目前已知 15.x 版本下项目编译会有问题。

* 修改 `.env` 中的配置 `VUE_APP_API_BASE_URL=接口地址`，以下的4种都是正确的格工，请根据您的实际情况进行配置。
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

#### H5侧边栏编译
```
cd /data/www/mochat/sidebar
yarn install
yarn run build
```
#### PC管理后台编译
```
cd /data/www/mochat/dashboard
yarn install
yarn run build
```

## Nginx 配置

在这里我们会用到三个域名

* api.mochat.dev 后端接口域名
* dashboard.mochat.dev 管理后台前端代码域名
* sidebar.mochat.dev H5聊天侧边栏前端代码域名

项目位置 `/data/www/mochat`
### 后端-接口配置
```
server {
    # 监听端口
    listen 80; 
    # 绑定的域名，填写您的域名
    server_name api.mochat.dev;

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
    
    server_name dashboard.mochat.dev;
    root /data/www/mochat/dashboard/dist;
    index index.html;

    access_log /var/log/nginx/dashboard.mochat.dev.log main;
    error_log /var/log/nginx/dashboard.mochat.dev.log.err error;
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
    server_name sidebar.mochat.dev;
    root /data/www/mochat/sidebar/dist;
    index index.html;

    access_log /var/log/nginx/sidebar.mochat.dev.log main;
    error_log /var/log/nginx/sidebar.mochat.dev.log.err error;
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

# 运行

## 登录
* 配置以上用到的三个域名对应的服务器IP至您的 host 文件
* 在浏览器输入 http://dashboard.mochat.dev
* 进入项目，在系统设置 -> 授权管理 中点击 添加企业微信号
* 如果您没有企业微信号，您可以到企业微信官网网站注册调试用的企业微信号