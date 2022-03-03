---
title: 快速开始
---

# 快速开始

::: warning 提示
因为 MoChat 构建在 Hyperf 之上，所以我们假定您对 Hyperf 已经基本熟悉
:::

## 控制器
快速生成 
```shell
php bin/hyperf.php mcGen:action Foo
```

命令行会帮你自动生成`Foo`相关的控制器，并生成相应的注解路由与继承等
```
./app
├── Action
│  ├── Foo
│  │  ├── Create.php
│  │  ├── Destroy.php
│  │  ├── Edit.php
│  │  ├── Index.php
│  │  ├── Show.php
│  │  ├── Store.php
│  │  └── Update.php
...
```
./app/Action/Foo/Index.php 如下
```php
<?php

declare(strict_types=1);


namespace App\Action\Foo;

use MoChat\Framework\Action\AbstractAction;
use Hyperf\HttpServer\Annotation\Controller;
use Hyperf\HttpServer\Annotation\RequestMapping;

/**
 * 查询 - 列表
 * @Controller()
 */
class Index extends AbstractAction
{
    /**
     * @RequestMapping(path="/foo/index", methods="GET")
     */
    public function handle(): array
    {
        return ['Index'];
    }
}
```

## 场景验证器
系统内置了场景验证器的trait，您可以直接引入，来进行数据格式验证
```php
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

## 模型层、服务层
在自己生成模型层前，请先配置好`./config/autoload/databases.php`
```php
use Hyperf\Database\Commands\ModelOption;
use MoChat\Framework\Model\AbstractModel;

...
'commands' => [
    'gen:model' => [
        'path'          => 'app/Model',
        'force_casts'   => true,
        'inheritance'   => 'AbstractModel',
        'uses'          => AbstractModel::class,
        'property_case' => ModelOption::PROPERTY_CAMEL_CASE,
    ],
],
```
`foo`表
```mysql
CREATE TABLE "mc_foo" (
  "id" int(11) unsigned NOT NULL AUTO_INCREMENT,
  "name" varchar(255) NOT NULL DEFAULT '' COMMENT '名称',
  "created_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp NULL DEFAULT NULL,
  "deleted_at" timestamp NULL DEFAULT NULL,
  PRIMARY KEY ("id")
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='foo';
```
`foo`模型层、服务层，快速生成
```shell
# path改为你自己的插件路径
php bin/hyperf.php mcGen:model foo --path=plugin/mochat/foo/src/Model
```
生成文件内已包含了基本的`增删改查分页`的基本方法，如下
```
./app
├── Contract
│  └── FooServiceInterface.php
├── Service
│  └── FooService.php
├── Model
│  └── Foo.php
...
```

## 层级调用
接口调用顺序默认 `控制器 -> 逻辑层（可选）-> 契约层 -> 服务层 -> 模型层`

::: tip 提示
契约与服务已在底层默认绑定，无需再在配置文件中依赖绑定

更详细的二次开发规范，请查看[开发规范](/framework/standards.md)
:::

::: warning 注意
我们强烈建议您通过插件的形式来进行二次开发，以达到灵活的开发、迭代与项目部署
:::
