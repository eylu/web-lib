(function($) {

    $.fn.extend({
        distSelector: function(options) {

            var setting = $.extend({}, {
                deep: 3,
                onSelect: $.noop
            }, options);

            var html = '';
            html += '<div class="dist-wrapper">';
            html += '    <div class="dist-wrapper-title">';
            html += '    </div>';
            html += '    <div class="dist-wrapper-content">';
            html += '        <div class="dist-data-list clearfix" keyLevel="province">';
            html += '        </div>';
            html += '        <div class="dist-data-list clearfix" keyLevel="city">';
            html += '        </div>';
            html += '        <div class="dist-data-list clearfix" keyLevel="dist">';
            html += '        </div>';
            html += '    </div>';
            html += '</div>';
            var currentData = {
                province: '',
                city: '',
                dist: ''
            };
            var deepList = ['province', 'city', 'dist'];

            $(this).each(function(i, selector) {
                var $this = $(selector);
                var $input = $('input', $this);
                var provinceData = cityJson[100000];
                var cityData = {};
                var distData = {};

                var init = function() {

                    initWrapper();

                    $input.on('click', function(){
                        showWrapper();
                        $('.dist-wrapper-title span[keyLevel="province"]', $this).trigger('click');
                    });
                };

                var showWrapper = function(){
                    $('.dist-wrapper', $this).show();
                    $this.addClass('active');
                };

                var hideWrapper = function(){
                    $('.dist-wrapper', $this).hide();
                    $this.removeClass('active');
                };

                var initWrapper = function() {
                    $this.append(html);
                    // 头部
                    var titleHtml = '';
                    for (var i = 0; i < setting.deep; i++) {
                        var level = deepList[i];
                        var css = i==0 ? 'active' : '';
                        titleHtml += '<span keyLevel="'+level+'" class="'+css+'">请选择</span>';
                    }
                    titleHtml += '<em class="dist-wrapper-close">&times;</em>';
                    $('.dist-wrapper-title', $this).html(titleHtml);
                    $('.dist-wrapper-title span', $this).on('click', function(){
                        $(this).siblings().removeClass('active')
                        $(this).addClass('active');
                        var level = $(this).attr('keyLevel');
                        $('.dist-data-list', $this).hide();
                        $('.dist-data-list[keyLevel="'+level+'"]', $this).show();
                    });
                    $('.dist-wrapper-title .dist-wrapper-close', $this).on('click', function(){
                        hideWrapper();
                    });
                    // 内容
                    initProvince();
                    // $('.dist-wrapper-title span[keyLevel="province"]', $this).trigger('click');

                };

                var initProvince = function(){
                    var provinceHtml = '';
                    for(id in provinceData){
                        var province = provinceData[id];
                        provinceHtml += '<span keyId="'+id+'">'+province+'</span>';
                    }
                    $('.dist-data-list[keyLevel="province"]', $this).html(provinceHtml);
                    $('.dist-data-list[keyLevel="province"] span', $this).on('click', function(){
                        var id = $(this).attr('keyId');
                        cityData = cityJson[id];
                        setCurrentData({province: $(this).html()});
                        initCity(cityData);
                        $('.dist-wrapper-title span[keyLevel="city"]', $this).trigger('click');
                        $('.dist-data-list[keyLevel="dist"]', $this).html('');
                        if(setting.deep==1){
                            setting.onSelect($this, currentData);
                        }
                    });
                };

                var initCity = function(data){
                    var cityHtml = '';
                    for(id in data){
                        var city = data[id];
                        cityHtml += '<span keyId="'+id+'">'+city+'</span>';
                    }
                    $('.dist-data-list[keyLevel="city"]', $this).html(cityHtml);
                    $('.dist-data-list[keyLevel="city"] span', $this).on('click', function(){
                        var id = $(this).attr('keyId');
                        distData = cityJson[id];
                        setCurrentData({city: $(this).html()});
                        initDist(distData);
                        $('.dist-wrapper-title span[keyLevel="dist"]', $this).trigger('click');
                        if(setting.deep==2){
                            setting.onSelect($this, currentData);
                        }
                    });
                };

                var initDist = function(data){
                    var distHtml = '';
                    for(id in data){
                        var dist = data[id];
                        distHtml += '<span keyId="'+id+'">'+dist+'</span>';
                    }
                    $('.dist-data-list[keyLevel="dist"]', $this).html(distHtml);
                    $('.dist-data-list[keyLevel="dist"] span', $this).on('click', function(){
                        var id = $(this).attr('keyId');
                        distData = cityJson[id];
                        setCurrentData({dist: $(this).html()});
                        hideWrapper();
                        if(setting.deep==3){
                            setting.onSelect($this, currentData);
                        }
                    });
                };

                var setCurrentData = function(data){
                    if(data.province){
                        currentData.province = data.province;
                        currentData.city = '';
                        currentData.dist = '';
                    }
                    if(data.city){
                        currentData.city = data.city;
                        currentData.dist = '';
                    }
                    if(data.dist){
                        currentData.dist = data.dist;
                    }
                };

                init();
            });
        }
    })
})(jQuery)
