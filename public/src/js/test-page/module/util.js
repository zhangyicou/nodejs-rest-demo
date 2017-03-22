define(["jquery", "aniNumber"], function ($) {
    var Util = {
        //获取url中的指定key值的value
        getUrlPara: function (name) {
            var url = window.location.href,
                reg = new RegExp(name + "=[^&]*"),
                result = url.match(reg);
            return result[0].substr(name.length + 1);
        },
        //逐步增长，界面反馈
        changeVal: function (obj, callback) {
            obj.sum += obj.step;
            if(obj.sum > obj.bound){
                var $ele = $(obj.id),
                    curVal = parseInt($ele.text());//界面上现在的值(数值类型)
                if((curVal + obj.bound) > obj.max){
                    $ele.text(obj.init);
                }else {
                    if($ele.is("span.done")){//任务列表需要动画
                        //$ele.animateCss("pulse");
                        $ele.prop("number", curVal).animateNumber({number: curVal + obj.bound}, 800);
                    }else{//非任务列表
                        $ele.text(curVal + obj.bound);
                    }
                }
                //回调函数
                if(callback && typeof callback === "function"){
                    callback($ele);
                }
                obj.sum -= obj.bound;//小水潭清空
            }
        },
        //计算时间
        getDate: function (val) {
            val = val * 24 * 60 * 60 * 1000;
            var date = new Date(Date.now() + val),
                y = date.getFullYear(),
                m = (date.getMonth() <= 8) ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1),
                d = (date.getDate() < 10) ? "0" + date.getDate() : date.getDate();
            return [y, m, d].join("/");
        }
    };
    return Util;
})
