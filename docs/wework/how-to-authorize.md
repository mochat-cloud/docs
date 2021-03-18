# 如何授权绑定企业微信

在使用 MoChat 系统，需要先在本系统绑定企业微信，完成一些基础配置后，方可使用。具体来看下，如何完成基础配置？

**第一步：** 进入【系统设置】--【授权管理】--【添加企业微信号】，填写如下参数：[如何获取 CorpId 和 Secret？](get-corpid-secret.md)

![img.png](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/img.png)
<p></p>

**第二步：** 登录【企业微信后台】--【管理工具】--【通讯录同步】-点击设置接收事件服务器。

![img_3.png](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/img_3.png)
<font color='red'> 注意：不要点击企业微信后台的随机获取按钮，那个点击是无效的 </font>

![img_5.png](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/img_5.png)

在本系统【系统设置】--【授权管理】，点击【查看】，看下图

![img_9.png](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/img_9.png)

将url（通讯录事件服务器URL）、token 和encodingAESKey，复制这三个内容填入企业微信后台对应入口即可（上图）

**第四步：** 登录【企业微信后台】--【客户联系人】--【客户】-- 点击API，设置接收事件服务器。

![img_6.png](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/img_6.png)

<font color='red'> 注意：不要点击企业微信后台的随机获取按钮，那个点击是无效的 </font>

![img_7.png](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/img_7.png)

在本系统【企业微信授权列表】，点击【查看】，看下图

![img_8.png](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/img_8.png)

将url（外部联系人事件服务器URL）、token 和encodingAESKey，复制这三个内容填入企业微信后台对应入口即可（上图）

**第五步：** 登录【企业微信后台】--【我的企业】--【外部沟通管理】-- 点击成员使用权限 -- 将对应的成员加上。
![img_12.png](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/img_32.png)

**第六步：** 登录【企业微信后台】--【客户联系】--【权限配置】-- 修改客户联系和客户群使用范围 -- 将对应的成员加上。
![img_12.png](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/img_33.png)




