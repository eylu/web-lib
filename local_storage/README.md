## localStorage 封装类

### 介绍

  本地存储对象工厂类
    实例化时需传入工厂名称name
  提供的方法
    保存 save(key, val)
    读取 load(key)
    删除 remove(key)
    获取全部key keys()
    删除全部数据 removeAll()

### 使用方法

  实例化工厂

    var lsf = new LocalStorageFactory('com.github.eylu');

  数据保存

    lsf.save('name', 'Eylu')
    lsf.save('family', 'Wang')
    lsf.save('language', ['ruby','php','js', ... ])

  数据读取操作

    var name = lsf.load('name')            // => 'Eylu'
    var languageArr = lsf.load('language') // => ['ruby','php','js', ...]

  添加一个新数据到已存在的 key 中

    var newLanguage ＝ 'css';
    languageArr.push(newLanguage);
    lsf.save('language', languageArr);

  删除某key

    lsf.remove('family')

  遍历操作

    var keyArr = lsf.keys();
    for(i in keyArr) {
        var key = keyArr[i];
        var value = lsf.load(key);
        ...
        ...
    }