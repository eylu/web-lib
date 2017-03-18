
/***************************** Hash {} 扩展方法 *********************************/
/**
 * 反转Hash
 * 交换 Hash 的 key 与 val
 */
export function hashReverse (hash) {
    var _hash = {};
    for (var key in hash) {
        var val = hash[key];
        _hash[val] = key;
    }
    return _hash;
};

/**
 * 根据值获取key
 */
export function hashGetKey (hash, val) {
    return hashReverse(hash)[val] || '';
};

/**
 * 扩展 合并Hash
 */
export function hashExtend (targetObj){
    if(targetObj.constructor != Object){
        return {};
    }
    for (var i = 1; i < arguments.length; i++) {
        if(arguments[i].constructor == Object){
            for(k in arguments[i]){
                targetObj[k] = arguments[i][k];
            }
        }
    };
    return targetObj;
};