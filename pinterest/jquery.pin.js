// JavaScript Document

(function($) {
  Array.prototype.min = function() {
    var i, index, tmp = this[0];
    for (i = 1; i < this.length; i++) {
      tmp = tmp < this[i] ? tmp : this[i];
    }
    return tmp;
  }
  Array.prototype.max = function() {
    var i, index, tmp = this[0];
    for (i = 1; i < this.length; i++) {
      tmp = tmp > this[i] ? tmp : this[i];
    }
    return tmp;
  }
  Array.prototype.indexof = function(v) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] == v) return i;
    }
  }

  $.fn.extend({
    PinTerest: function(opt) {
      var $this = $(this);
      var setting = {};
      var docW = $(document).width();
      var countCol = 4; // 列的数量，默认4列
      var heightCol = new Array(); // 最大高度
      var heightColMax, numCol, numColMin; // 列的高度数组|第几列|高度最小的列号
      var itemH; // 循环时item的高度
      var Klass = {
        init: function() {
          setting = $.extend({}, {
            item_selector: '.pinitem', // item选择器
            item_width: 250, // item宽度
            item_mb: 30, // item上下边距
            item_rb: 20, // item左右边距
            //item_c_width: 230,       //
            //item_c_border: true,     //
            column_change: false, // 列数量是否随窗口的变化而改变
            stamp_left_height: 0, // 左侧留空的高度
            stamp_right_height: 0 // 右侧留空的高度
          }, opt);

          //获取列数量
          if (setting.column_change) {
            countCol = parseInt(docW / setting.item_width);
            countCol = Math.min(6, countCol);
            countCol = Math.max(4, countCol);
          }

          //初始化列高度的数组
          heightCol[0] = setting.stamp_left_height;
          heightCol[countCol-1] = setting.stamp_right_height;
          for (var i = countCol-2; i >= 1; i--) {
            heightCol[i] = 0
          };

          //初始化pinterest的外层样式
          $this.css({
            width: countCol * setting.item_width - setting.item_rb,
            margin: '0 auto',
            overflow: 'hidden',
            position: 'relative'
          });
          //初始化pinterest每个item的样式
          $(setting.item_selector, $this).css({
            background: '#eee',
            width: setting.item_width - setting.item_rb,
            position: 'absolute',
            left: 0,
            top: 0,
          });


        },

        run: function() {
          var me = this;
          me.init();
          $(setting.item_selector, $this).each(function(ind, item) {
            me.setItemStyle(ind,$(item));
            me.setHeightCol();
          });
          this.setPinHeight();
        },

        setItemStyle: function(i,obj) {
          numCol = i % countCol;
          itemH = obj.height();
          if (i > countCol - 1) {
            numCol = heightCol.indexof(heightCol.min());
          }

          obj.css({
            left: setting.item_width * numCol,
            top: heightCol[numCol]
          });
        },

        setHeightCol: function() {
          if (heightCol[numCol]) {
            heightCol[numCol] += itemH + setting.item_mb;
          } else {
            heightCol[numCol] = itemH + setting.item_mb;
          }
        },

        setPinHeight: function() {
          $this.css({
            height: heightCol.max()
          });
        }
      };
      Klass.run();
    } //pin end


  });
})(jQuery)
