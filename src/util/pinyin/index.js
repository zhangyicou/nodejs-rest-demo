/**
 * Created by keep on 2016/11/6.
 */

var pinyin = require("pinyin");

export var hy2pinyin = function (name) {
    if(null === name || undefined === name){
        return ""
    }

    var ret = pinyin(name, {
        style: pinyin.STYLE_INITIALS, // 设置拼音风格
        heteronym: true
    });

    let pyname ="";
    for(let v of ret) {
        if(v!="") pyname += v[0]
    }
    console.log(pyname);
    return pyname;
};