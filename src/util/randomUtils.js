/**
 * Created by libing on 2016/11/4.
 */
var r = {};
var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','!','@','#','$','%'];
var number = ['0','1','2','3','4','5','6','7','8','9'];
r.randomChars = function (n) {
    var res = "";
    for(var i=0;i<n;i++) {
        var index = Math.ceil(Math.random()*(chars.length-1));
        res += chars[index];
    }
    return res;
}

r.randomNumber = function (n) {
    var res = "";
    for(var i=0;i<n;i++) {
        var index = Math.ceil(Math.random()*(number.length -1));
        res += number[index];
    }
    return res;
}
module.exports = r;