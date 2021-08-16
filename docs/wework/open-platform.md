# 如何配置微信开放平台

### 1、登录微信开放平台

打开 [https://open.weixin.qq.com/](https://open.weixin.qq.com/) ，输入账号密码登录平台。

![open-platform-01.jpg](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/open-platform-01.jpg)

### 2、点击菜单“第三方平台”-“创建第三方平台”，依次填写资料
![open-platform-02.jpg](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/open-platform-02.jpg)

#### 2.1 填写基本信息
![open-platform-03.jpg](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/open-platform-03.jpg)

#### 2.2 选择权限

为方便以后扩展其他功能，建议把公众号相关权限全部勾选。

![open-platform-04.jpg](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/open-platform-04.jpg)

#### 2.3 填写开发资料
授权事件接收URL:
```
# 将下面的域名换成 api-server 对应的域名
https://demoapi.mo.chat/dashboard/officialAccount/authEventCallback
```

消息与事件接收URL:
```
# 将下面的域名换成 api-server 对应的域名
https://demoapi.mo.chat/$APPID$/dashboard/officialAccount/messageEventCallback
```



生成消息校验Token:

```shell
php -r 'echo str_replace(["/", "+", "="], "", base64_encode(random_bytes(random_int(10, 24)))). "\n";'
```

生成加解密key:

```shell
php -r '$keyStrBase64 = "";while (strlen($keyStrBase64) !== 43) {$keyStr = random_bytes(32);$keyStrBase64 = str_replace(["/", "+", "="], "",base64_encode($keyStr));} echo $keyStrBase64 . "\n";'
```
![open-platform-05.jpg](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/open-platform-05.jpg)

#### 2.4 提交成功

![open-platform-06.jpg](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/open-platform-06.jpg)

#### 2.5 全网发布
回到列表 - 点击详情 - 点击全网发布
![open-platform-07.jpg](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/open-platform-07.jpg)
![open-platform-08.jpg](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/open-platform-08.jpg)
![open-platform-09.jpg](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/open-platform-09.jpg)

#### 2.6 获取开放平台配置信息
在详情页获取 APPID、APPSECRET、消息校验Token、消息加解密Key
![open-platform-15.jpg](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/open-platform-15.jpg)
![open-platform-16.jpg](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/open-platform-16.jpg)

将获取到的配置信息，填写在api-server/.env 中的相关配置中，填写完之后，需要重启api-server服务。
```shell script
## 微信开放平台第三方平台
WECHAT_OPEN_PLATFORM_APP_ID=wx7549750xxxxxx
WECHAT_OPEN_PLATFORM_SECRET=1c7228dfaaf485xxxx
WECHAT_OPEN_PLATFORM_TOKEN=3Ws39X
WECHAT_OPEN_PLATFORM_AES_KEY=wDlJSqn4xxxxxxxxxxxxxxxxxx
```

```shell
php bin/hyperf.php server:restart
```



### 3、将公众号绑定开放平台
此步为使用租户(商户配置)，非平台方配置。
不绑定到开放平台无法获取到unionid

### 3.1 点击菜单“公众账号-绑定公众号”

按提示一步步操作即可

![open-platform-11.jpg](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/open-platform-11.jpg)

![open-platform-12.jpg](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/open-platform-12.jpg)

### 4、配置公众号相关信息

#### 3.1、登录公众账号平台
[https://mp.weixin.qq.com/](https://mp.weixin.qq.com/)

### 3.2、找到左侧菜单 - 设置与开发 - 基本配置
![open-platform-10.jpg](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/open-platform-10.jpg)

在这里可以查看到绑定微信开放平台账号情况
 ![open-platform-13.jpg](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/open-platform-13.jpg)

### 3.3、找到左侧菜单 - 设置与开发 - 公众号设置
点击右侧的“功能设置”，依次配置相关的域名
![open-platform-14.jpg](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/open-platform-14.jpg)

