itab
======

tab show

it can be show width some simple style if you use (`display:'fadein'|'push'`)
it can be auto show if you use (`auto:true`), the default time is 3000ms. you can change time to another with (`time: xxxx`)

### use

options

    {
        tabBar: '.bar', // 按钮选择器
        tabItem: '.item', // 内容选择器
        evt: 'click', // 切换事件，当鼠标 mouseover|click 按钮时进行切换
        className: 'active', // 当前展示项的class名称
        display: null, // fadein|overlay|[reveal|push] 切换效果，不设置为直接显示，[]为暂未实现
        position: null, // left|right 切换方向，当opts.display设置为overlay|[reveal|push]时生效
        tabTime: 400, // number 毫秒，切换时间
        time: 3000, // 停留时间，每隔n毫秒进行切换， opts.auto设置true时生效
        auto: false, // 是否自动执行
        callback: function(oldobj, obj) {} //切换之后执行的操作
    }


js

    (function($) {
        $(document).ready(function() {
            $('#auto1').itab({
                auto: true,
                display: 'push',
                callback: function(oldBar, newBar) {
                    console.log(newBar);
                }
            });
        });
    })(jQuery)


Good lucky～～


Oh, you nice!

Yes, I'm Bad To Better !!

Hello Hello, I come from master

