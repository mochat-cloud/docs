# 如何添加侧边栏应用

**第一步：** 登录【企业微信后台】-- 【应用管理】 -- 【应用】 处创建应用。

![img_13.png](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/img_13.png)

![img_14.png](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/img_14.png)

**第二步：** 在本系统【企微管理】--【聊天侧边栏】 -- 【用户画像】配置应用。

![img_18.png](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/img_18.png)

![img_19.png](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/img_19.png)

在【企业微信后台】--【应用】，点击自建的应用，看下图

![img_20.png](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/img_20.png)

![img_31.png](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/img_31.png)

将AgentId和Secret，复制这三个内容填入本系统对应位置即可（上图）

**第三步：** 【企业微信后台】-- 【应用管理】 -- 【应用】 -- 选择自建的应用配置点击【网页授权及JS-SDK】设置可信域名。

![img_23.png](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/img_23.png)

![img_24.png](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/img_24.png)

**第四步：** 【企业微信后台】-- 【客户联系】 -- 【客户】 点击API配置可调用应用。

![img_25.png](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/img_25.png)

![img_26.png](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/img_26.png)

**第五步：** 【企业微信后台】-- 【应用管理】 -- 【应用】 -- 选择自建的应用配置点击【配置到聊天工具栏】可设置访问页面。

![img_27.png](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/img_27.png)

![img_28.png](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/img_28.png)

![img_29.png](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/img_29.png)

<font color='red'> 注意：https://demoh5.mo.chat?agentId=1&pageFlag=customer url就是你所要访问页面,agentId(数据库表mc_work_agent里面存储的id)</font>

**第六步：** 登录【企业微信客户端】-- 选择客户右侧查看配置的聊天侧边栏。

![img_30.png](https://mochatcloud.oss-cn-beijing.aliyuncs.com/docs/img_30.png)

<font color='red'> 注意：如出现【此员工未关联子账户】提示查看本账号是否关联后台账号(数据库表mc_work_employee里面log_user_id字段绑定上关系即可) </font>
