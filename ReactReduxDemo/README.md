### 说明

这是一个 ReactNative + Redux 开发示例项目，它以 TODO 为案例展开。
这里不是完整的 ReactNative 项目，只是核心开发代码。

### 使用

1、安装 React Native

  英文 http://facebook.github.io/react-native/docs/getting-started.html

  中文 http://reactnative.cn/

2、初始化项目

    react-native init ReactReduxDemo
    cd ReactReduxDemo
    npm install

3、将所有文件复制到项目根目录下

4、运行项目

    react-native run-ios

5、入口说明

   在 index.ios.js 中引入不同步骤的入口文件，可以查看各步骤的效果。


   app_step0: 未使用 redux，单纯的 ReactNative 项目

   app_step1: 使用 redux、react-redux，使用了 Store、Provider、connect() ，并显示了初始数据。

   app_step2: 使用 dispatch(action)、reducer，完成了 TODO 状态切换、添加 TODO 项。

   app_step3: 将项目功能完善，完成了 TODO 状态过滤显示。




