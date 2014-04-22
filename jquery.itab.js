(function($) {
    /*
     * author eylu <eylu@github.com>
     * email eyluwang@gmail.com
     * 轮播|切换
     * params option
     *
     */
    $.fn.extend({
        itab: function(options) {
            var opts = $.extend({
                tabBar: '.bar', // 按钮选择器
                tabItem: '.item', // 内容选择器
                evt: 'click', // 切换事件，当鼠标 mouseover|click 按钮时进行切换
                className: 'active', // 当前展示项的class名称
                display: null, // fadein|overlay|[reveal|push] 切换效果，不设置为直接显示，[]为暂未实现
                position: null, // left|right 切换方向，当opts.display设置为overlay|[reveal|push]时生效
                tabTime: 400, // number 毫秒，切换时间
                time: 3000, // 停留时间，每隔n毫秒进行切换， opts.auto设置true时生效
                auto: false, // 是否自动执行
                callback: function(oldobj, obj) {}
            }, options);
            var $this = $(this);
            var bars = $(opts.tabBar, $(this));
            var items = $(opts.tabItem, $(this));
            var modelBoxOnShow = {};
            var modelAuto = 0;
            var animate = {
                time: opts.tabTime || 400,
                display: opts.display,
                position: opts.position || 'left'
            };
            var Klass = {
                init: function() {
                    items.hide();
                    $(bars).bind(opts.evt, function() {
                        var me = $(this);
                        Klass.toggle(me);
                        Klass.setBoxOnShow(me);
                        opts.callback(modelBoxOnShow.btn, me);
                    });
                },
                run: function() {
                    Klass.init();
                    Klass.setFirstShow();
                    Klass.setAuto();
                },

                toggle: function(bar) {
                    Klass.clearAuto();
                    var item = $(items[bar.index()]);
                    switch (animate.display) {
                        case 'fadein':
                            Klass._fadeinAnimate(item);
                            break;
                        case 'push':
                            Klass._pushAnimate(item);
                            break;
                        default:
                            $(modelBoxOnShow.box).removeClass(opts.className).hide();
                            item.addClass(opts.className).show();
                    }
                    $(modelBoxOnShow.btn).removeClass(opts.className);
                    bar.addClass(opts.className);
                    Klass.setAuto();
                },
                setBoxOnShow: function(bar) {
                    modelBoxOnShow = {
                        box: items[bar.index()],
                        btn: bar,
                        i: bar.index()
                    }
                },
                setAuto: function() {
                    if (opts.auto) {
                        modelAuto = setInterval(function() {
                            if (modelBoxOnShow && modelBoxOnShow.i < (bars.length - 1)) {
                                (modelBoxOnShow.btn.next()).trigger(opts.evt, [true]);
                            } else {
                                Klass.setFirstShow();
                            }
                        }, opts.time);
                    }
                },
                clearAuto: function() {
                    clearInterval(modelAuto);
                    modelAuto = 0;
                },
                setFirstShow: function() {
                    $(bars[0]).trigger(opts.evt, [true]);
                },
                _fadeinAnimate: function(obj) {
                    $(modelBoxOnShow.box).hide();
                    obj.fadeIn(animate.time);
                },
                _pushAnimate: function(obj) {
                    var css = {'z-index':1};
                    var resetCss = {};
                    var oldBox = $(modelBoxOnShow.box);

                    if((obj.index() == oldBox.index())){
                        return false;
                    }
                    css[animate.position] = obj.width();
                    resetCss[animate.position] = 0;

                    $(modelBoxOnShow.box).css({
                        'z-index': 0
                    });
                    obj.css(css).show();
                    obj.animate(resetCss, 300,function(){
                        oldBox.hide();
                    });


                }
            };
            Klass.run();
        } //itab end
    })
})(jQuery)
