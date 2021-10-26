---
title: 安装
---
# 安装

## 服务器要求

MoChat 对系统环境有一些要求，仅可运行于 Linux 和 Mac 环境下，但由于 Docker 虚拟化技术的发展，在 Windows 下也可以通过 Docker for Windows 来作为运行环境，通常来说 Mac 环境下，我们更推荐本地环境部署，以避免 Docker 共享磁盘缓慢导致 MoChat 启动速度慢的问题。 

::: warning 提示
MoChat 基于 Docker-compose 方式的安装视频 [https://www.bilibili.com/video/BV1Dy4y1n77N/](https://www.bilibili.com/video/BV1Dy4y1n77N/)  
:::

[mochat-cloud\mochat-docker](https://github.com/mochat-cloud/mochat-docker) 项目内已经为您准备好了各种版本的 Dockerfile ，或直接基于已经构建好的 [mochat\mochat](https://hub.docker.com/r/mochat/mochat) 镜像来运行。

> 以上 Github 暂未提交，请暂时参考项目中的 `api-server/Dockerfile`

当您不想采用 Docker 来作为运行的环境基础时，您需要确保您的运行环境达到了以下的要求：   

 - PHP >= 7.4  (推荐7.4版本)
 - MYSQL >= 5.7  
 - Swoole PHP 扩展 >= 4.5，并关闭了 `Short Name`  
 - OpenSSL PHP 扩展 
 - JSON PHP 扩展 
 - PDO PHP 扩展 
 - Redis PHP 扩展 
 - pcntl PHP 扩展 
 - Composer 
 - FFMpeg（会话存档功能需要）
 - wxwork_finance_sdk PHP 扩展 （会话存档功能需要）
 - Node.js >= 10


## 安装 MoChat

MoChat 使用 [Composer](https://getcomposer.org) 来管理项目的依赖，在使用 MoChat 之前，请确保你的运行环境已经安装好了 Composer。

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

### PHP接口环境安装

#### Shell 安装方式
* 为了方便非 `docker` 用户，我们额外提供了一个`install.sh` CentOS 下的环境安装脚本，你可以直接在相应的系统上运行。

```
# 安装linux软件如 php、swoole、FFMpeg、wxwork_finance_sdk等等(为避免软件冲突覆盖，本安装不会自动创建软链接，需要根据脚本提示手动创建，请放心执行)
cd /usr/local/src
wget https://mochatcloud.oss-cn-beijing.aliyuncs.com/deploy/CentOS-install.sh
chmod o+x ./CentOS-install.sh
sh ./CentOS-install.sh
```

如自行编译安装 PHP 相关环境，wxwork_finance_sdk 的安装可参考：[https://github.com/oh-stone/wework-chatdata-sdk](https://github.com/oh-stone/wework-chatdata-sdk)



##### 确认相关环境正确安装
    
```shell script
# 查看 PHP 版本是否正确，需 >= 7.4
php -v

# 查看 Swoole 版本安装是否正确，并确定 `swoole.use_shortname` 参数值为 `Off` 
php --ri swoole

# 查看 Reids wxwork_finance_sdk 扩展是否正确安装
php --ri redis
php --ri wxwork_finance_sdk

# FFMpeg
ffmpeg -version

# 确保内存大于 1024M
php -i | grep memory_limit

# 以下函数不能禁用
# symlink,putenv,proc_open,pcntl系列函数

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
# 或后台启动
php bin/hyperf.php server:start -d

# 或开发环境也可以使用 watch 命令来进行热更新
php bin/hyperf.php server:watch
```

- 如果 mc:init 执行失败，可参考：
```shell script
# 1、将 .env 中的 DB REDIS OSS DOMAIN 配置完成
# 2、将数据库文件导入初始化 api-server/storage/install/mochat.sql
# 3、执行初始租户和账号信息 SQL ，请注意修改下面的手机号和服务器IP，以下用户密码是 13412347867和123456
# 4、使用下面的命令生成新密码，然后用SQL替换到 user 表里的密码就可以。

php -r "var_dump(password_hash(md5('具体密码' . ".env中的SIMPLE_JWT_SECRET"), PASSWORD_BCRYPT));"

INSERT INTO `mc_user` (`phone`,`password`,`status`,`isSuperAdmin`) VALUES ('13412347867','这里填写生成的加密后的密码',1,1);

INSERT INTO `mc_tenant` (`server_ips`) VALUES ('["182.92.11.11"]');
```

由于 MoChat 是持久化的 CLI 框架，当您修改完您的代码后，通过 `CTRL + C` 终止当前启动的进程实例，并重新执行 `php bin/hyperf.php start` 启动命令即可。

#### Docker 方式安装
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

### 前端项目编译
* 项目安装前，需要安装 `Node.js`，目前已知 15.x 版本下项目编译会有问题。

* 修改 `.env` 中的配置 `VUE_APP_API_BASE_URL=接口地址`，以下的4种都是正确的格工，请根据您的实际情况进行配置。
```shell script
# 1、HTTP协议方式
VUE_APP_API_BASE_URL=http://api.mochat.com

# 2、HTTPS协议方式
VUE_APP_API_BASE_URL=https://api.mochat.com

# 3、HTTP协议与HTTPS协议同时兼容方式
VUE_APP_API_BASE_URL=//api.mochat.com

# 4、子目录模式(需根据实际 Nginx 配置来确定是否 URL中是否需要加 api )
VUE_APP_API_BASE_URL=http://scrm.mochat.com/api
```

#### H5侧边栏编译
```
cd /data/www/mochat/sidebar
cp .env.example .env
# 修改.env中的接口地址
vim .env
yarn install
yarn run build
```

#### 商户管理后台编译
```
cd /data/www/mochat/dashboard
cp .env.example .env
# 修改.env中的接口地址
vim .env
yarn install
yarn run dll
yarn run build
```

#### 运营工具H5编译
```
cd /data/www/mochat/operation
cp .env.example .env
# 修改.env中的接口地址
vim .env
yarn install
yarn run build
```

## Nginx 配置

在这里我们会用到三个域名

* api.mochat.com 后端接口域名 api-server 对应的域名
* scrm.mochat.com 商户后台域名 dashboard 对应的域名
* sidebar.mochat.com 聊天侧边栏域名 sidebar 对应的域名
* op.mochat.com 运营工具H5域名 operation 对应的域名

项目位置 `/data/www/mochat`
### 后端-接口配置
```
server {
    # 监听端口
    listen 80; 
    # 绑定的域名，填写您的域名
    server_name api.mochat.com;

    location / {
        # 设置跨域
        add_header Access-Control-Allow-Origin *;
        add_header Access-Control-Allow-Methods 'GET, POST, PUT, DELETE, PATCH, OPTIONS';
        add_header Access-Control-Allow-Headers 'Accept,Origin,,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';
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
    server_name scrm.mochat.com;

    access_log /var/log/nginx/scrm.mochat.com.log main;
    error_log /var/log/nginx/scrm.mochat.com.log.err error;
    fastcgi_intercept_errors off;
    rewrite_log off;

    location / {
        root /data/www/mochat/dashboard/dist;
        index index.html;
        try_files $uri $uri/ /index.html;  
    }

    location /authRedirect {
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        # http时使用下面的配置
        proxy_cookie_path / "/; HttpOnly; SameSite=strict";
        # https时使用下面的配置
        # proxy_cookie_path / "/; secure; HttpOnly; SameSite=strict";

        proxy_pass http://127.0.0.1:9501/dashboard/officialAccount/authRedirect/;
    }
    
    location ~* \.(?:jpg|jpeg|png|gif|ico|css|js)$ {
        # 缓存30天
        expires 30d;
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
    server_name sidebar.mochat.com;

    access_log /var/log/nginx/sidebar.mochat.com.log main;
    error_log /var/log/nginx/sidebar.mochat.com.log.err error;
    fastcgi_intercept_errors off;
    rewrite_log off;

    location / {
        root /data/www/mochat/sidebar/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    
    location ~* \.(?:jpg|jpeg|png|gif|ico|css|js)$ {
        # 缓存30天
        expires 30d;
    }
    location = /favicon.ico {
            log_not_found off;
            access_log off;
    }

    location ^~ /*.txt {
        proxy_pass http://127.0.0.1:9501/;
    } 
}
```

### 前端-运营工具栏配置
```
server {
    listen 80;
    server_name op.mochat.com;

    access_log /var/log/nginx/op.mochat.com.log main;
    error_log /var/log/nginx/op.mochat.com.log.err error;
    fastcgi_intercept_errors off;
    rewrite_log off;

    location / {
        root /data/www/mochat/operation/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    location ^~ /auth/ {
            proxy_set_header Host $http_host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            # http时使用下面的配置
            proxy_cookie_path / "/; HttpOnly; SameSite=strict";
            # https时使用下面的配置
            # proxy_cookie_path / "/; secure; HttpOnly; SameSite=strict";
    
            proxy_pass http://127.0.0.1:9501/operation/auth/;
       }
    
   location ^~ /openUserInfo/ {
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        # http时使用下面的配置
        proxy_cookie_path / "/; HttpOnly; SameSite=strict";
        # https时使用下面的配置
        # proxy_cookie_path / "/; secure; HttpOnly; SameSite=strict";

        proxy_pass http://127.0.0.1:9501/operation/openUserInfo/;
   }
    
    location ~* \.(?:jpg|jpeg|png|gif|ico|css|js)$ {
        # 缓存30天
        expires 30d;
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
* 在浏览器输入 http://scrm.mochat.com
* 进入项目，在系统设置 -> 授权管理 中点击 添加企业微信号
* 如果您没有企业微信号，您可以到企业微信官网网站注册调试用的企业微信号
* [如何授权绑定企业微信至MoChat系统](https://mochat.wiki/wework/how-to-authorize.html)
* [如何添加侧边栏应用](https://mochat.wiki/wework/add-sidebar-app.html)
* [如何配置开放平台&公众号配置](https://mochat.wiki/wework/open-platform.html)