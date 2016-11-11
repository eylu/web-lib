## React Native Image Wrapper

React Native 图片封装

1、路径可以是变量值；

2、统一管理图片；

3、自定义大小、样式。


### 使用

1、引入文件

    import ImageWrapper from '/PATH/TO/ImageWrapper';

2、显示

    var icon = 'aaa' + '_xxx_yyy.png';
    <ImageWrapper icon={icon}  />
    <ImageWrapper icon={icon} width={20} height={20} />
    <ImageWrapper icon={icon} width={20} height={20} style={} />
