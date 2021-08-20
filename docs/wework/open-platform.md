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
# 将下面的域名换成 api-server 对应的域名，其中https或http看你项目的实际配置情况
https://demoapi.mo.chat/dashboard/officialAccount/authEventCallback
```

消息与事件接收URL:
```
# 将下面的域名换成 api-server 对应的域名，其中https或http看你项目的实际配置情况
https://demoapi.mo.chat/dashboard/$APPID$/officialAccount/messageEventCallback
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

> 全网发布未通过，请将 redis 里面  `mc:easywechat.kernel.access_token.*` 的key删除掉

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

> 商户后台时公众号授权如果报错 component_verify_ticket does not exist in cache ，可以尝试主动让微信服务器发送一下ticket

```shell script
# 记得修改下面的 appid 和 secret之后再执行
curl --request POST \
  --url https://api.weixin.qq.com/cgi-bin/component/api_start_push_ticket \
  --header 'Content-Type: application/json' \
  --header 'cache-control: no-cache' \
  --data '{"component_appid": "wx76836ec4b5xxxx","component_secret": "4626018ce1d0785d5b1d86f3xxxx"}'
```

由于 `component_verify_ticket`  只能由微信服务器推送至我们的服务器，无法主动获取，且推送为每 10 分钟一次，如果执行后还是不行，则需要等待 10 分钟再测试，具体流程可参考[微信官方文档 component_verify_ticket排错指南](https://developers.weixin.qq.com/doc/oplatform/Third-party_Platforms/2.0/troubleshooting/component_verify_ticket_troubleshooting.html)
