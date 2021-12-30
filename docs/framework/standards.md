---
title: 代码开发规范
---

# 代码开发规范
---

### 1.1 路由
#### 1.1.1 类似 Restful 的路由规范

- 单动作类，命名仿下图
- 目录[大驼峰]、文件名[大驼峰]以单数为主。
- 两级（资源一级、动作一级）
- url小驼峰
- queryString字段，camel命名，ID带前缀，如userId
- body字段 - camel命名。

| HTTP | URI/路由名称 | 动作 | 文件路径 | 说明 |
| --- | --- | --- | --- | --- |
| GET | photo/index | index | app/Action/Photo/Index.php | 查询 - 多条 (列表 - 分页搜索) |
| GET | photo/show | show | app/Action/Photo/Show.php | 查询 - 单条 |
| POST | photo/create | create | app/Action/Photo/Create.php | 添加 - 页面 |
| POST | photo/store | store | app/Action/Photo/Store.php | 添加 - 动作 |
| PUT | photo/edit | edit | app/Action/Photo/Edit.php | 修改 - 页面 |
| PUT/PATCH | photo/update | update | app/Action/Photo/Update.php | 修改 - 动作 |
| DELETE | photo/destroy | destroy | app/Action/Photo/Destroy.php | 删除 - 动作 |



#### 
#### 1.1.3 路由位置
注解路由
```php
<?php
    /**
     * @RequestMapping(path="/user/index", methods="GET")
     * @Middleware(PermissionMiddleware::class)
     * @return array 返回数组
     */
    public function handle(): array
    {

    }
```

---

### 1.2 Request验证
验证基本的非业务类的数据类型验证，此层写在控制器层
```php
<?php
    /**
     * 验证规则.
     */
    public function rules(array $inputs): array
    {
        return [
            'id'   => 'required|int',
            'name' => 'required|max:25',
        ];
    }
        
    
    /**
     * 属性替换.
     * @return array|string[] ...
     */
    public function attributes(): array
    {
        return [
            'name' => '姓名',
        ];
    }
    
    /**
     * 验证场景.
     * @return array|array[] 场景规则
     */
    public function scene(): array
    {
        return [
             // 保存
            'store' => ['name'],
        ];
    }
```
---

### 1.3 Controller控制器层
#### 1.3.1 约束

- 参数不应该$this->all()，明确具体参数，建议使用$this-request->inputs(['字段名称'])
- 验证类在内

```php
<?php
use MoChat\Framework\Request\ValidateSceneTrait;

...
public function handle(): array
{
    // 接收参数
    $params = $this->request->inputs(['name'], ['name' => '']);
    // 验证
    $this->validated($params, 'store');
    return [];
}
```

#### 1.3.2 命名规范

- 类名与文件名称相同。
- 类名为大驼峰；属性、方法为小驼峰；静态变量为大写字母、"_"下划线组合

---

### 1.4 Model 与 Service 模型层命名规范

##### 基本约束

- 所有表、字段操作通过迁移文件
- 通过某种方式获取或者修改数据，要获取数据+By+方式 例如获取用户 `getUserByUid`；
- 修改表的某个字段： update+修改的表+字段 修改用户昵称，`updateUserNickname`；
- 查询：分页之外，所有查询方法不应该封装 `function(array $where){}`
- 修改：单字段修改，不应该使用全量修改方法
- 自定义写新方法；命名时 - 条件少时，如 `byNameAge`；条件多时，抽象功能，如 `bySortList`

#####  查询约束
- 获取单条数据命名：get+要获取的数据【单数】+ById 比如获取用户数据 `getUserById` [id, columns]
- 获取多条数据： get+要获取的数据【复数】+ById 比如获取用户数据 `getUsersById` [id、columns、orderBy、limit]
- 获取分页数据： get+要获取的数据【单数】+List 比如获取用户列表 `getUserList` 【where, page, pageSize, orderBy, columns】
- 自定义方法：get + 要获取的数据[单数为一条，复数为多条] + By...

##### 添加、修改、删除约束
- 单条添加 ： create+要添加的表 比如添加用户 `createUser`；
- 单条修改 ： update+要修改的表 比如修改用户 `updateUserById`；
- 单条删除：delete+要删除的表【单数】+ById 比如删除用户 `deleteUserById`；
- 多条删除：delete+要删除的表【复数】+ById 比如删除用户 `deleteUsersById`；
- 删除：只允许通过ID

#### 1.4.2 利用 Trait 来扩展数据模型
有时候数据模型里的代码会变得很臃肿，应该 利用 Trait 来精简逻辑代码量，提高可读性，类似于 Ruby China 源码。
```
借鉴于 Rails 的设计理念：「Fat Models, Skinny Controllers」。
```
所有模型相关的 Traits 必须存放于 /path/Models/Traits 目录下。

---

### 其它

- 基本的 PSR 规范
- 接口文档 - apidoc，项目接口文档存于 ./app/storage/apidoc
- 注释采用：phpdoc
- 格式化工具： **friendsofphp/php-cs-fixer**
- 类型提示必须；**declare**(strict_types=1);
- 枚举、契约。目录一级
