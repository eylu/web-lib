## gulp 压缩合并文件

### 安装

1、安装 node 略

2、安装 gulp

    $ npm install gulp

3、安装依赖工具

    $ npm install gulp-util
    $ npm install gulp-concat
    $ npm install gulp-minify-css
    $ npm install gulp-rename
    $ npm install gulp-uglify

### 使用

压缩合并任务已在 gulp.js 中写好，运行如下命令即可：

    $ gulp // 此命令运行默认的 task
    $ gulp minifyCss // 此命令运行名称为 minifyCss 的 task
    $ gulp watch // 监听文件改变，自动执行任务
