# 基于宝塔面板安装部署
   
> 感谢 MoChat 开发者群群友 @小天 提供的原始安装笔记。

## 安装前必看重要提示：

由于项目是前后端分离方式开发和部署的，所以安装演示过程中会用到三个域名：
* 商户后台：dashboard.test
* 聊天侧边栏：sidebar.test
* 后端API接口：backend.test
* 运营工具：operation.test

假设你自己的主域名是 mochat.com，那你可以分别配置为，以下域名可以自定义，下面只是举例：
* 商户后台：scrm.mochat.com
* 聊天侧边栏：h5.mochat.com
* 后端API接口：api.mochat.com
* 运营工具：op.mochat.com

## 安装宝塔面板
1. 阿里云ECS服务器,重新初始化操作系统 , 申请OSS ALiyunOS,安全组开放宝塔8888端口
2. 安装面板，执行以下命令
```
~# yum install -y wget && wget -O install.sh http://download.bt.cn/install/install_6.0.sh && sh install.sh
```

![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/bt-az.png)
3. 宝塔面板安装完成<br/>
![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/bt-user-password.png)

## 安装环境
1. 打开宝塔面板-登录<br/>
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/bt-dl.png)<br/>

2. **宝塔面板软件商店里面安装软件**：
    * nginx 1.18 <br/>
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/bt-nginx-one.png)<br/>
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/bt-nginx-two.png)<br/>
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/bt-nginx-three.png)
    * php74<br/>
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/bt-php-one.png)<br/>
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/bt-php-two.png)
    * mysql5.7<br/>
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/bt-mysql-one.png)<br/>
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/bt-mysql-two.png)<br/>
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/bt-mysql-three.png)
    * PM2管理器 -4.2<br/>
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/bt-pm2.png)
    * PM2管理器->模块管理->yarn 安装（绑定环境变量export PATH=$PATH:/www/server/nvm/versions/node/v14.16.0/bin）<br/>
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/bt-yarn.png)<br/>
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/bt-pm2-hj.png)
3. **安装Swoole**
    * 宝塔面板->软件商店->PHP-7.4->安装扩展->Swoole4<br/>
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/bt-swoole-one.png)
    * 宝塔面板->软件商店->PHP-7.4->配置文件-> 最后添加以下配置并保存
    ```
    [swoole]
    		extension = swoole.so
    		swoole.use_shortname = off
    ```
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/bt-swoole-pz.png)
4. **安装Redis**
    * 宝塔面板->软件商店->PHP-7.4->安装扩展->redis<br/>
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/bt-redis.png)
5. **安装php7-wxwork-finance-sdk**
    * 执行以下命令进行安装
    ```
    ~# cd /www
	/www# git clone https://github.com/pangdahua/php7-wxwork-finance-sdk.git
	/www# wget https://wwcdn.weixin.qq.com/node/wework/images/sdk_20200401.zip
	```
	![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/wxwork-finance-sdk-az.png)
	```
	/www# unzip sdk_20200401.zip
	```
	![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/unzip-sdk.png)
	```
	/www# cd php7-wxwork-finance-sdk
	/www/php7-wxwork-finance-sdk# /www/server/php/74/bin/phpize
	/www/php7-wxwork-finance-sdk# ./configure --with-php-config=/www/server/php/74/bin/php-config --with-wxwork-finance-sdk=/www/sdk_20200401/C_sdk
	/www/php7-wxwork-finance-sdk# make && make install
    ```
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/sdk-configure.png)<br/>
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/make-install.png)
   * 宝塔面板->软件商店->PHP-7.4->配置文件->最后面添加以下配置并保存
    
    ```
    [wxwork_finance_sdk]
    		extension=wxwork_finance_sdk.so
    ```
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/finance-sdk-pz.png)
6. **安装fileinfo**
    * 宝塔面板->软件商店->PHP-7.4->安装扩展->fileinfo<br/>
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/bt-fileinfo-az.png)
7. **安装ffmpeg**
    * 执行以下命令进行安装
        
    ```
    /www# cd /www
	/www# wget https://ffmpeg.org/releases/ffmpeg-snapshot.tar.bz2
	/www# tar -jxvf ffmpeg-snapshot.tar.bz2
	```
	![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/ffmpeg-az.png)
	```
	/www# yum install yasm -y
	/www# cd ffmpeg
	/www/ffmpeg# ./configure --enable-shared && make && make install
	```
	![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/ffmpeg-yum.png)<br/>
	![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/ffmpeg-configure.png)
	```
	## 验证
	/www/ffmpeg# ffmpeg -version
	
	## 提示错误
	ffmpeg: error while loading shared libraries: libavdevice.so.58: cannot open shared object file: No such file or directory
	
	## 查找错误原因
	/www/ffmpeg# ldd ffmpeg
	
	## 查找缺失文件
	/www/ffmpeg# find /usr -name 'libavdevice.so.58'
	
	## 得到文件路径
	/usr/local/lib/libavdevice.so.58
	```
	![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/ffmpeg-yz.png)
	```
	## 添加
	export LD_LIBRARY_PATH=/usr/local/lib/
	
	```
	![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/ffmpeg-export.png)
	```
	## 完成
	/www/ffmpeg# ffmpeg -version
    ```
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/ffmpeg-wc.png)
    
8. **确认相关环境正确安装（[https://mochat.wiki](https://mochat.wiki)）**
    * 查看 PHP 版本是否正确，需 >= 7.2，建议 7.4

    ```
    php -v
    ```
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/php-v.png)
    * 查看 Swoole 版本安装是否正确，并确定 `swoole.use_shortname` 参数值为 `Off`

    ```
    php --ri swoole
    ```
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/php-swoole-yz.png)
    
    * 查看 Reids wxwork_finance_sdk 扩展是否正确安装
    ```
    php --ri redis
	php --ri wxwork_finance_sdk
    ```
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/php-redis-yz.png)<br/>
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/finance-sdk-yz.png)
    * 查看FFMpeg
    
    ```
    ffmpeg -version
    ```
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/ffmpeg-yz.png)
    * 确保内存大于 1024M
    
    ```
    php -i | grep memory_limit
    ```
    
## 安装项目

1. **安装MoChat后端**
    * 宝塔面板->软件商店->PHP-7.4->禁用函数->删除symlink,putenv,proc_open,pcntl系列函数<br/>
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/bt-del-putenv.png)<br/>
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/bt-del-proc-open.png)
    * 执行以下命令安装项目
    ```
    # composer config -g repo.packagist composer https://mirrors.aliyun.com/composer
    # /usr/bin/composer self-update
    ```
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/composer-self-update.png)
    ```
    # cd /www/wwwroot
    # git clone https://github.com/mochat-cloud/mochat.git
    # cd /www/wwwroot/mochat/api-server
    # composer install
    # cp .env.example .env
    ```
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/composer-install.png)
    * 初始化项目，mysql数据库需要5.7版本及以上（5.7引入了json类型）执行以下命令：
    
    ```
    # php bin/hyperf.php mc:init
	# php bin/hyperf.php server:start -d
    ```
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/mc-init.png)<br/>
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/mc-init-pz.png)<br/>
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/mc-init-wc.png)<br/>
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/hyper-start.png)
    >  注：如果不知道宝塔面板mysql默认安装的密码，请查看<br/>
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/bt-mysql-password.png)
    
    >  注：如果没有mochat数据库，请链接数据库创建mochat数据库<br/>
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/create-mochat.png)
   
2. **配置前端**
    * **PC管理后台**

    > ### <font color=red>这里修改的域名一定要写成后端api接口的域名，不要写错了。
    > ### 比如，http://api.mochat.com 或 http://backend.test </font>
    
    
    ```
    # cd /www/wwwroot/mochat/dashboard
	# cp .env.example .env
	# 这里修改的域名一定要写成后端api接口的域名，不要写错了，比如，http://api.mochat.com 或 http://backend.test	# vi .env #修改配置文件，不会vi可以用其他编辑器打开该文件
	# yarn install
    # yarn run dll
	# yarn run build （2小时15分 # Screen -S dashboard）
    ```
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/dashbard-install.png)<br/>
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/dashbard-build.png)

    * **侧边栏**
    
    > ### <font color=red>这里修改的域名一定要写成后端api接口的域名，不要写错了。
    > ### 比如，http://api.mochat.com 或 http://backend.test </font>
    
    
    ```
    # cd /www/wwwroot/mochat/sidebar
	# cp .env.example .env
	# 这里修改的域名一定要写成你自己的后端api接口的域名，不要写错了，比如，http://api.mochat.com 或 http://backend.test
	# vi .env #修改配置文件，不会vi可以用其他编辑器打开该文件
	# yarn install
	# yarn run build
    ```
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/sidebar-install.png)<br/>
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/sidebar-build.png)
    > 注：如果再次修改.env配置文件重新构建项目时报如下错误，执行以下代码
    
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/yarn-error.png)
    ```
    执行以下命令
    # chattr -i /www/wwwroot/mochat/sidebar/dist/.user.ini  
    再进行删除
    # rm -f /www/wwwroot/mochat/sidebar/dist/.user.ini 
    再次进入目录编译
    # yarn run build
    ```
    
    * **运营工具**
        
        > ### <font color=red>这里修改的域名一定要写成后端api接口的域名，不要写错了。
        > ### 比如，http://api.mochat.com 或 http://backend.test </font>
        
        
    ```
    # cd /www/wwwroot/mochat/operation
    # cp .env.example .env
    # 这里修改的域名一定要写成你自己的后端api接口的域名，不要写错了，比如，http://api.mochat.com 或 http://backend.test
    # vi .env #修改配置文件，不会vi可以用其他编辑器打开该文件
    # yarn install
    # yarn run build
    ```
    
    > 注：如果再次修改.env配置文件重新构建项目时报如下错误，执行以下代码
    
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/yarn-error.png)
    ```
    执行以下命令
    # chattr -i /www/wwwroot/mochat/operation/dist/.user.ini  
    再进行删除
    # rm -f /www/wwwroot/mochat/operation/dist/.user.ini 
    再次进入目录编译
    # yarn run build
    ```
    
3. **宝塔面板配置站点**
    * 网站 ---添加站点 backend.test php版本 纯静态，数据库 不创建
		反向代理 目标URL：http://127.0.0.1:9501 发送域名 $host 开启代理 如图： <br/> 
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/bt-backend-zd.png)<br/>
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/bt-backend-one.png)<br/>
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/bt-backend-pz-two.png)
    
    配置完代理，点配置文件，增加跨域设置如下：
    ```nginx
    location ~* \.(gif|png|jpg|css|js|woff|woff2)$
    {
    	proxy_pass http://127.0.0.1:9501;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header REMOTE-HOST $remote_addr;
        
        # 设置跨域
        add_header Access-Control-Allow-Origin *;
        add_header Access-Control-Allow-Methods 'GET, POST, PUT, DELETE, PATCH, OPTIONS';
        add_header Access-Control-Allow-Headers 'Accept,Origin,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';
        expires 12h;
    }
    ```
    * 网站 ---添加站点 dashboard.test php版本 纯静态，数据库 不创建 
		网站目录 /www/wwwroot/mochat/dashboard/dist 如图：<br/>
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/bt-dashbar-zd.png)
    * 找到刚添加的网站，点右侧的设置，进入之后点配置文件，以如图所示的位置加上
    
    ```nginx
    location / {
          root /www/wwwroot/mochat/dashboard/dist;
          index  index.html index.htm;
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
   
    ```
   
   ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/nginx-404-2.png)
    
    * 网站 ---添加站点 sidebar.test php版本 纯静态，数据库 不创建 
		网站目录/www/wwwroot/mochat/sidebar/dist 如图：<br/>
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/bt-sidebar-zd.png)
    
    * 找到刚添加的网站，点右侧的设置，进入之后点配置文件，以如图所示的位置加上
        ```nginx
        location / {
              root /www/wwwroot/mochat/sidebar/dist;
              index  index.html index.htm;
              try_files $uri $uri/ /index.html;
            }
      
        location ^~ /*.txt {
            proxy_pass http://127.0.0.1:9501/;
        } 
        ```
      
      ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/nginx-404-2.png)
      
    * 网站 ---添加站点 operation.test php版本 纯静态，数据库 不创建 
    		网站目录/www/wwwroot/mochat/operation/dist 如图：<br/>
        ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/bt-sidebar-zd.png)
        
        * 找到刚添加的网站，点右侧的设置，进入之后点配置文件，以如图所示的位置加上
            ```nginx
            location / {
                  root /www/wwwroot/mochat/operation/dist;
                  index  index.html index.htm;
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
            ```
          
          ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/nginx-404-2.png)
4. **访问**
    * 后端接口访问 backend.test<br/>
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/fw-backend.png)
    * 管理后台 dashboard.test 如图：<br/>
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/fw-dashbard.png)<br/>
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/bt-sidebar.png)
    > 注意：如果后端接口访问成功,后端界面登录不成功报401的话，可能的原因是初始化管理员密码没成功，请登录mysql重置一下管理员密码
      
    * 首先查看.env中的默认密钥后缀配置，生成一下密码：<br/>
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/ck-env-password.png)
    ```
    php -r "var_dump(password_hash(md5('123456' . '3S6ybWbSy&23fFeq8'), PASSWORD_BCRYPT));"
    ```
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/create-password.png)
    * 登录mysql重新设置一下管理员登录密码：
    ```
    # mysql -u用户名 -p密码 
    # mysql> use mochat
    # mysql> update mc_user set password="密码";
    # mysql> select * from mc_user \G; 
    ```
    
    ![Image text](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/bt/update-password.png)
  
    * 浏览器再次打开dashboard.test，输入用户名密码登录
        * 如何授权绑定企业微信至MoChat系统 请查看：[https://mochat.wiki/wework/how-to-authorize.html](https://mochat.wiki/wework/how-to-authorize.html)
    
    * 侧边栏 sidebar.test
        * 如何添加侧边栏应用：[https://mochat.wiki/wework/add-sidebar-app.html](https://mochat.wiki/wework/add-sidebar-app.html)
  
    
## 常见问题

* nginx设置反向代理后，返回 502 bad gateway？

请检查后端 api-server 启动成功没有，命令如下：

```bash
ps aux | grep mochat
```

看看有没有对应的进程，如果没有，刚需执行如下命令启动
```shell script
cd /www/wwwroot/mochat/api-server
php bin/hyperf.php server:start -d
```

为了服务稳定，建议使用更专业的进程管理工具来启动，详见：[Supervisor 部署](https://hyperf.wiki/2.1/#/zh-cn/tutorial/supervisor)
     
    
    

    

 


    

