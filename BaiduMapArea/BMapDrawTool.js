/**
 * 百度地图绘制多边形工具
 * @param {String} mapId 地图容器ID
 * @param {Object} opts  初始化时的一些选项
 *
 * 使用样例
 *
 * var tool = new BMapDrawTool('BaiduMap')
 * 或者
 * var overlayFinish = function(e){ console.log(e); 其他操作.... }
 * var tool = new BMapDrawTool('BaiduMap', {overlayFinish: overlayFinish, toolEnable: true|false}) *
 *
 * tool.enabledDraw()
 * tool.disabledDraw()
 * var list = [[{lng:xxx, lat:yyy}], ...] // 坐标点列表,二维数组
 * tool.addOverlays(list)
 * tool.clearAll()
 */
var BMapDrawTool = function(mapId, opts) {

    // 地图对象
    this.map = new BMap.Map(mapId);

    // 实例化鼠标绘制工具
    this.drawingManager = null;

    // 已完成的覆盖物的集合列表，[{BMap.Overlay对象1}, ...]
    this.overlayList = [];

    // 当前绘制或编辑的覆盖物的坐标点列表，[BMap.Point, ...]
    this.currentOverlayPointList = [];

    /**
     * 初始化时的一些选项
     * {
     *      toolEnable: true｜false,
     *      overlayFinish: function(){} // 多边形绘制完成时的回调函数，供外部使用
     * }
     */
    this.setting = {
        toolEnable: false,
        overlayFinish: null
    };

    // 自动执行初始化函数
    this._init(opts);
};

/**
 * 开启绘制模式
 *
 */
BMapDrawTool.prototype.enabledDraw = function() {
    //开启绘制模式
    var $this = this;
    if ($this.drawingManager) {
        $this.setting.toolEnable = true;
        $this.drawingManager.open();
        $this.drawingManager.setDrawingMode(BMAP_DRAWING_POLYGON);
        // this.drawingManager.setDrawingMode(BMAP_DRAWING_POLYLINE);
    }
};

/**
 * 关闭绘制模式
 *
 */
BMapDrawTool.prototype.disabledDraw = function() {
    //关闭绘制模式
    var $this = this;
    if ($this.drawingManager) {
        $this.setting.toolEnable = false;
        $this.drawingManager.close();
    }
};

/**
 * 添加覆盖物
 * @param {Array} list 覆盖物坐标点列表二维数组，每个覆盖物有一个坐标点列表 [[{lng:xxx,lat;xxx}, ...], ...]
 *
 */
BMapDrawTool.prototype.addOverlays = function(list) {
    var $this = this;
    for (var i = 0; i < list.length; i++) {
        var pointList = list[i];
        var bMapOverlay = $this._turnBMapOverlay(pointList);
        $this.map.addOverlay(bMapOverlay);
    }
};

/**
 * 清除所有覆盖物
 *
 */
BMapDrawTool.prototype.clearAll = function() {
    var $this = this;
    $this.map.clearOverlays();
};

/**
 * 百度地图点击事件
 *
 * @param  {Object} e 点击对象
 *
 */
BMapDrawTool.prototype._mapClick = function(e) {
    // console.log('-- 点击 -->');
    var $this = this;
    var bMapPoint = e.point;
    if (JSON.stringify(bMapPoint) == JSON.stringify($this.currentOverlayPointList[$this.currentOverlayPointList.length - 1])) {
        //如果点击的位置与上一个点相同，则为双击绘制完成。此时直接返回。
        return false;
    }
    if ($this.setting.toolEnable) {
        $this.currentOverlayPointList.push(bMapPoint);
    }
    // 判断自身是否有交叉线
    // 判断是否与其他覆盖物有交叉线
    // 判断是否包含
    if ($this._crossBySelf() || $this._crossByOthers() || $this._checkInside()) {
        $this.currentOverlayPointList = []; // 重置当前的覆盖物坐标点列表为空数组
        $this.disabledDraw(); // 禁用绘制
        $this.clearAll(); // 清除全部覆盖物
        $this.enabledDraw(); // 再次启用绘制
    }
};

/**
 * 判断当前正在设置或编辑的覆盖物是否交叉
 * @return {Boolean} true|false
 */
BMapDrawTool.prototype._crossBySelf = function() {
    var $this = this;
    var list = $this.currentOverlayPointList;
    var length = list.length;
    if (length <= 3) {
        return false;
    }

    // 只判断最后两个边是否与其他边相交与否
    // 线段1：line(points[0], points[length-1])
    // 线段2：line(points[length-1], points[length-2])

    var pointFirst = {
        x: list[0].lng,
        y: list[0].lat
    };
    var pointLast = {
        x: list[length - 1].lng,
        y: list[length - 1].lat
    };
    var pointLastTwo = {
        x: list[length - 2].lng,
        y: list[length - 2].lat
    };
    for (var i = 0; i < length - 2; i++) {
        var pa = {
            x: list[i].lng,
            y: list[i].lat
        };
        var pb = {
            x: list[i + 1].lng,
            y: list[i + 1].lat
        };
        // console.log('---------- 第',i+1,'条线 -------->');
        if (i == 0 && segmentsIntr(pa, pb, pointLastTwo, pointLast)) {
            // 只判断与倒数第二条线是否相交
            return true;
        }
        if (i == length - 2 && segmentsIntr(pa, pb, pointLast, pointFirst)) {
            // 只判断与最后一条线是否相交
            return true;
        }
        if (segmentsIntr(pa, pb, pointLast, pointFirst) || segmentsIntr(pa, pb, pointLastTwo, pointLast)) {
            // 倒数第二条线和最后一条线 都要判断
            return true;
        }
    }
    return false;
};

BMapDrawTool.prototype._crossByOthers = function() {
    var $this = this;
    var count = $this.overlayList.length; // 其他覆盖物的数量
    var list = $this.currentOverlayPointList; // 当前覆盖物的坐标点列表
    var length = list.length; // 当前覆盖物的坐标点数量


    if (length >= 2) { // 当前覆盖物的坐标点数量大于等于2时才与其他覆盖物做交叉比较
        var pointFirst = {
            x: list[0].lng,
            y: list[0].lat
        }; // 当前覆盖物的第一个坐标点
        var pointLast = {
            x: list[length - 1].lng,
            y: list[length - 1].lat
        }; // 当前覆盖物的最后坐标点
        var pointLastTwo = {
            x: list[length - 2].lng,
            y: list[length - 2].lat
        }; // 当前覆盖物的倒数第二个坐标点
        for (var i = 0; i < count; i++) {
            var overlay = $this.overlayList[i];
            var path = overlay.getPath();
            var pointList = $this._turnObjPointList(path); // 其他覆盖物的坐标点列表
            for (var j = 0; j < pointList.length; j++) {
                var end = j == pointList.length - 1 ? 0 : j + 1; // 线段的末端点索引，如果已循环到最后一个点，则末端点为起始点索引0
                var pa = {
                    x: pointList[j].lng,
                    y: pointList[j].lat
                };
                var pb = {
                    x: pointList[end].lng,
                    y: pointList[end].lat
                };
                if (length == 2) {
                    // 当前覆盖物只有一条线时，只判断最后一条线
                    if (segmentsIntr(pointFirst, pointLast, pa, pb)) {
                        return true;
                    }
                } else {
                    // 最后一跳线和倒数第二条线 都需要判断
                    if (segmentsIntr(pointFirst, pointLast, pa, pb) || segmentsIntr(pointLast, pointLastTwo, pa, pb)) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
};

/**
 * 判断覆盖物区域是否包含
 *   包括两方面：1、其他覆盖物是否包含当前覆盖物；2、当前覆盖物是否包含其他区域
 * @return {Boolean} true|false
 */
BMapDrawTool.prototype._checkInside = function() {
    var $this = this;
    var count = $this.overlayList.length; // 其他覆盖物的数量
    var list = $this.currentOverlayPointList; // 当前覆盖物的坐标点列表

    for (var i = 0; i < count; i++) {
        var overlay = $this.overlayList[i];
        var overlayPointList = overlay.getPath();

        // 判断其他覆盖物是否包含当前覆盖物的点
        for (var j = 0; j < list.length; j++) {
            var bMapPoint = list[j];
            var inside = $this._isInsidePolygon(bMapPoint, overlayPointList);
            if (inside) {
                return true;
            }
        }

        // 判断当前覆盖物是否包含其他覆盖物的点
        if (list.length > 2) {
            for (var k = 0; k < overlayPointList.length; k++) {
                var overlayPoint = overlayPointList[k];
                var inside = $this._isInsidePolygon(overlayPoint, list);
                if (inside) {
                    return true;
                }
            }
        }
    }

    return false;
};

/**
 * 计算一个点是否在多边形里
 * @param {Object} pt 标注点
 * @param {Object} poly 多边形数组
 */
BMapDrawTool.prototype._isInsidePolygon = function(pt, poly) {
    for (var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
        ((poly[i].lat <= pt.lat && pt.lat < poly[j].lat) || (poly[j].lat <= pt.lat && pt.lat < poly[i].lat)) && (pt.lng < (poly[j].lng - poly[i].lng) * (pt.lat - poly[i].lat) / (poly[j].lat - poly[i].lat) + poly[i].lng) && (c = !c);
    return c;
}

/**
 * 覆盖物绘制完成事件
 *   禁用鼠标绘制功能
 *   存储覆盖物到内存
 *   如果提供绘制完成事件，则执行，并将数据传出去 [{lng:xxx,lat:yyy}, ...]
 * @param  {Object} e 覆盖物对象
 *
 */
BMapDrawTool.prototype._overlaycomplete = function(e) {
    console.log('overlaycomplete');
    var $this = this;
    e.overlay.disableMassClear();
    $this.disabledDraw();
    $this.overlayList.push(e.overlay);
    $this.currentOverlayPointList = [];
    if ($this.setting.overlayFinish) {
        var list = e.overlay.getPath();
        $this.setting.overlayFinish($this._turnObjPointList(list));
    }
};

/**
 * 转化为百度坐标点
 * @param  {Float} lng  经度
 * @param  {Float} lat  纬度
 * @return {BMap.Point}     百度坐标点
 */
BMapDrawTool.prototype._turnBMapPoint = function(lng, lat) {
    return new BMap.Point(lng, lat);
};

/**
 * 将覆盖物的坐标点列表转化为 js 对象的对象数组
 * @param  {Array} list 坐标点列表 [BMap.Point, ...]
 * @return {Array} 返回 js 普通对象的对象数组 [{lng:xxx,lat:yyy}, ...]
 */
BMapDrawTool.prototype._turnObjPointList = function(list) {
    var $this = this;
    var result = [];
    for (var i = 0; i < list.length; i++) {
        var overlay = list[i];
        result.push({
            lng: overlay.lng,
            lat: overlay.lat
        });
    }
    return result;
};

/**
 * 将坐标点列表转化为覆盖物（多边形）
 * @param  {Array} list 坐标点列表 [{lng:xxx,lat:yyy}, ...]
 * @return {Polygon}    百度地图的覆盖物
 */
BMapDrawTool.prototype._turnBMapOverlay = function(list) {
    var $this = this;
    var bMapPointList = list.map(function(item) {
        return $this._turnBMapPoint(item.lng, item.lat);
    });
    var polygon = new BMap.Polygon(bMapPointList, styleOptions);

    return polygon;
};

/**
 * 初始化函数，默认调用
 *
 */
BMapDrawTool.prototype._init = function(opts) {
    var $this = this;
    $this.setting = extendsObject({}, $this.setting, opts);
    $this.map.centerAndZoom("保定", 14);
    $this.map.enableScrollWheelZoom();
    $this.map.addEventListener("tilesloaded", function() {
        console.log("百度地图加载完成");
        $this.drawingManager = new BMapLib.DrawingManager($this.map, {
            isOpen: false, //是否开启绘制模式，默认false
            enableDrawingTool: false, //是否显示工具栏, 默认false
            drawingToolOptions: {
                anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
                offset: new BMap.Size(5, 5), //偏离值
                scale: 0.8 //工具栏缩放比例
            },
            circleOptions: styleOptions, //圆的样式
            polylineOptions: styleOptions, //线的样式
            polygonOptions: styleOptions, //多边形的样式
            rectangleOptions: styleOptions //矩形的样式
        });
        $this.drawingManager.addEventListener('overlaycomplete', function(e) {
            $this._overlaycomplete(e)
        });
    });
    $this.map.addEventListener("click", function(e) {
        $this._mapClick(e)
    });
};


var styleOptions = {
    strokeColor: "blue", //边线颜色。
    fillColor: "blue", //填充颜色。当参数为空时，圆形将没有填充效果。
    strokeWeight: 2, //边线的宽度，以像素为单位。
    strokeOpacity: 0.8, //边线透明度，取值范围0 - 1。
    fillOpacity: 0.3, //填充的透明度，取值范围0 - 1。
    strokeStyle: 'solid' //边线的样式，solid或dashed。
};


/**
 * 计算两条线段是否相交
 * @param  {Object} a 线段1的点a
 * @param  {Object} b 线段1的点b
 * @param  {Object} c 线段2的点c
 * @param  {Object} d 线段2的点d
 * @return {Boolean}  true|false
 */
var segmentsIntr = function(a, b, c, d) {

    // 三角形abc 面积的2倍
    var area_abc = (a.x - c.x) * (b.y - c.y) - (a.y - c.y) * (b.x - c.x);

    // 三角形abd 面积的2倍
    var area_abd = (a.x - d.x) * (b.y - d.y) - (a.y - d.y) * (b.x - d.x);

    // 面积符号相同则两点在线段同侧,不相交 (对点在线段上的情况,本例当作不相交处理);
    if (area_abc * area_abd >= 0) {
        return false;
    }

    // 三角形cda 面积的2倍
    var area_cda = (c.x - a.x) * (d.y - a.y) - (c.y - a.y) * (d.x - a.x);
    // 三角形cdb 面积的2倍
    // 注意: 这里有一个小优化.不需要再用公式计算面积,而是通过已知的三个面积加减得出.
    var area_cdb = area_cda + area_abc - area_abd;
    if (area_cda * area_cdb >= 0) {
        return false;
    }

    // 其他情况返回true，即两条线段相交
    return true;

    //计算交点坐标
    // var t = area_cda / ( area_abd- area_abc );
    // var dx= t*(b.x - a.x),
    //     dy= t*(b.y - a.y);
    // return { x: a.x + dx , y: a.y + dy };
};

/**
 * 扩展合并 Object 对象
 * @param {Object} targetObj 需要扩展的对象
 * @example
 *   var user = {name: '小明'};
 *   var newUser = extendsObject({}, user, {age:20}, {tall:180,weight:80}, ...);
 */
var extendsObject = function(targetObj) {
    if (targetObj.constructor != Object) {
        return {};
    }
    for (var i = 1; i < arguments.length; i++) {
        if (arguments[i].constructor == Object) {
            for (k in arguments[i]) {
                targetObj[k] = arguments[i][k];
            }
        }
    };
    return targetObj;
};
