/**
 *
 * @author Eylu Wang (https://github.com/eylu)
 *
 *******************************************************************
 *    本地存储对象工厂类
 *      实例化时需传入工厂名称name
 *    提供的方法
 *      保存 save(key, val)
 *      读取 load(key)
 *      删除 remove(key)
 *      获取全部key keys()
 *      删除全部数据 removeAll()
 *
 *******************************************************************
 *
 *
 *    @example
 *
 *    var lsf = new LocalStorageFactory('com.github.eylu');
 *
 *    // 数据保存
 *    lsf.save('name', 'Eylu')
 *    lsf.save('family', 'Wang')
 *    lsf.save('language', ['ruby','php','js', ... ])
 *
 *    // 数据读取操作
 *    var name = lsf.load('name')            // => 'Eylu'
 *    var languageArr = lsf.load('language') // => ['ruby','php','js', ...]
 *
 *    // 添加一个新数据到已存在的 key 中
 *    var newLanguage ＝ 'css';
 *    languageArr.push(newLanguage);
 *    lsf.save('language', languageArr);
 *
 *    // 删除某key
 *    lsf.remove('family')
 *
 *    //遍历操作
 *    var keyArr = lsf.keys();
 *    for(i in keyArr) {
 *        var key = keyArr[i];
 *        var value = lsf.load(key);
 *        ...
 *        ...
 *    }
 *
 */

(function(win, storage) {
    var LocalStorageFactory = function(name) {
        if (!storage) {
            alert("该浏览器不支持本地存储");
            return false;
        }

        var keySplit = ',';
        var divide = '_';
        var keyName = name + "_keys";

        var init = function() {
            if (!storage.getItem(keyName)) {
                storage.setItem(keyName, '')
            }
        };

        var getKeys = function(){
            var keyStr = storage.getItem(keyName)||'';
            if(!keyStr){
                return [];
            }
            return keyStr.split(keySplit);
        };

        this.save = function(key, val) {
            var keys = getKeys();
            var isSaveed = keys.indexOf(divide + key + divide) > -1;
            if (!isSaveed) {
                keys.push(divide + key + divide);
                storage.setItem(keyName, keys.join(keySplit));
            }
            storage.setItem(name + divide + key, JSON.stringify(val));
        };

        this.load = function(key){
            return JSON.parse(storage.getItem(name+divide+key));
        };

        this.remove = function(key){
            var keys = getKeys();
            var index = keys.indexOf(divide + key + divide);
            var isSaveed = index > -1;
            if (isSaveed) {
                keys.splice(index, 1);
                storage.setItem(keyName, keys.join(keySplit));
                storage.removeItem(name+divide+key);
            }
        };

        this.removeAll = function(){
            var keys = getKeys();
            for (var i = 0; i < keys.length; i++) {
                var k = keys[i];
                var key = k.replace(new RegExp(divide,"gm"), '');
                storage.removeItem(name+divide+key);
            }
            storage.setItem(keyName, '');
        };

        this.keys = function(){
            var keys = getKeys();
            return keys.map(function(k){
                return k.replace(new RegExp(divide,"gm"), '');
            });
        };

        init();

    };

    win.LocalStorageFactory = LocalStorageFactory;
})(window, localStorage);
