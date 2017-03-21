/**
 * Created by keep on 2016/11/2.
 */

var uuid = require('node-uuid');
var randomUtils = require("../randomUtils");
import {numId} from "./numId";

export var v1 = function () {
    let v1 =  uuid.v1();
    var m = /-/g;//g代表全部替换
    var s = v1.replace(m, "");
    return s;
}

export var v4 = function () {
    /*let v4 =  uuid.v4();
    var m = /-/g;//g代表全部替换
    var s = v4.replace(m, "");
    return randomUtils.randomNumber(8);*/
    return numId.gen();
}

/*
// Generate a v1 (time-based) id
var a1 = uuid.v1(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a'

// Generate a v4 (random) id
var a2 = uuid.v4(); // -> '110ec58a-a0f2-4ac4-8393-c866d813b8d1'

console.log(a1)
console.log(a2)*/
