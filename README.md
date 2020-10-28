>Easemob WebIM Live

# webim Live demo简介
webim-Live demo是基于环信webIM demo 进行二次开发的demo，具有拉流功能。

# 运行起来
``` bash
# install dependencies
npm install

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
# 项目结构

| 目录  | 说明|   |
|------|-----|------|
| build  | 打包后的文件 |
| config | 项目的配置 |
| node_modules | 项目依赖
| static | 资源文件 |
| travis | CI脚本 |
| src | 项目源文件|
|     | components| 项目组件
|     | config | 表情和项目中ui配置
|     | pages | 项目页面
|     | router | 路由
|     | store | vuex store
|     | utils | sdk 引入和配置

# 主要功能点说明
## 拉流组件
代码目录：src/components/videoPlayer
## sdk集成
代码目录：src/utils/WebIM.js

+ 引入sdk和配置文件，实例化。
+ 注册监听事件

## 发送消息
代码目录：src/components/chat/index.vue
+ 在chat组件里实现发消息以及消息上屏,index为发送消息，message为显示消息上屏
+ 具体发送消息的方法在 src/store/chat

## 消息存储
+ 消息存储在 store > chat > msgList
+ 关于持久化：这个demo采用的sdk消息漫游的增值服务，可以拉取历史消息，当然你也可以采用indexdb来做本地存储，同时也可以开通实时回调服务，将消息同步到自己的服务器。

# 关于拉流具体集成
demo使用的是字节跳动开源项目 西瓜播放器进行的拉流解析详细文档 http://h5player.bytedance.com/api/

# 拉流格式
hls格式，url后缀：m3u8

### 如何观看正在推流
请在官网下载 环信直播app Demo，找到对应的房间号即可进行拉流观看

# 写在最后
第一期demo还有很多需要完善的地方，有许多不足。后续会逐步完善用户体验
