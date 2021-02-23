---
title: 日志
---

# PHP后端
`cd api-server`
## 配置
* 日志默认生成于项目 `runtime/logs`目录下， 如果需要手动指定，可以在`.env`中指定日志目录位置
```
WWW_LOG_DIR=/path/to/runtime
```
* 更详细的日志配置，详见`config/autoload/logger.php`
## 开发环境
* 为了方便开发调试，`APP_ENV=dev`时，日志默认会以`stdout`形式输出到终端，而不是存储到日志文件中

::: warning
`dev`环境下使用`supervisor`启动，并且 `supervisor` 配置了日志输出位置 `stdout_logfile=/path/to/runtime/stdout.log`，则所有类型日志会合并生成于`stdout.log`文件内，而不是`WWW_LOG_DIR`配置的目录下的`error.log`、`info.log`...
:::

* 如果需要于开发环境下的日志以文件形式存储将以下代码注释掉即可
```
# config/autoload/dependencies.php
...
$appEnv = env('APP_ENV', 'production');
if ($appEnv !== 'dev') {
    $dependencies[StdoutLoggerInterface::class] = StdoutLoggerFactory::class;
}
...
```
## 生产环境
推荐日志集成到`ELK`内，方便灰度环境与生产环境的日志监控

## 常见错误日志
* 一般的语法、逻辑等错误，会以`后台服务异常.error`或者`后台服务异常.hard`的提示信息返回给前端，而具体的错误信息`Exception`的`message`和`Trace`，会记录到后端内的`error`日志内
* 具体的`ErrorExceptionHandler`详见[这里](https://github.com/mochat-cloud/framework/blob/master/src/Exception/Handler/ErrorExceptionHandler.php)
* 除了一般的日志错误，其它的日志错误规则详见 [异常](/framework/exception.md)

# 前端
## 侧边侧工具
`cd sidebar`
* 在企业微信APP上打开H5调试（默认已打开）
```
# public/index.html 内添加以下代码，并重新编译即可
<script src="https://cdn.bootcss.com/vConsole/3.3.4/vconsole.min.js"></script>
<script>
  new VConsole();
</script>
```
