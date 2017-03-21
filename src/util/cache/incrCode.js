/**
 * Created by libing on 16-12-7.
 */
import {redis} from "./redis-cluster";
var Command = require("../../../node_modules/ioredis/lib/command");
import {ibdLogger as logger} from "./../../lib/ibd-logger";
import {asyncRedis} from "./redis";
var moment = require("moment");

//定义序列的最大长度
const MAX_LEN = 6;
//生产任务编码，尾数最大长度
const TASK_CODE_LAST_MAX_LEN = 3;
var dateStr;//定义4位年月

/**
 * 获取编码key
 * 编码key:NS.[表名大写].[企业ID]
 */
var getIncrKey = (tableName, tenantId)=> {
    return "NS." + tableName.toUpperCase() + "." + tenantId;
}

/**
 * 获取识别码的key
 * type 01-人员, 02-设备， 03-产品， 04-物料， 05-工单， 06-工序
 * 识别码key：NS.[type][年月4位].[企业ID]
 * @param type
 * @param tenantId
 */
var getRecognizeKey = (type, tenantId) => {
    dateStr = moment().format("YYMM");
    return getRecKey(type, dateStr, tenantId);
}

var getRecKey = (type, yymm, tenantId) => {
    return "NS." + type + yymm + "." + tenantId;
}

/**
 * 从数据库中获取自增序列的最大值
 * @param tableName
 * @returns {Promise.<void>}
 */
var getMaxCodeIntab = async(tableName, tenantId, columnName) => {
    return 0;
}

/**
 * 获取缓存在redis中的自增序列
 * @param tableName
 * @param tenantId
 * @param currentNum 当前序列值 如果序列不存在默认从0开始
 * @returns {*} 000001
 */
export var getIncrPk = async(tableName, tenantId) => {
    let key = getIncrKey(tableName, tenantId);
    logger.debug("the key " + key + " request getIncrPk");
    incrCommand(key);//序列自增1
    let ret = await asyncRedis.get(key);

    if(!ret || null == ret) {
        let _currentNum = await getMaxCodeIntab(tableName, tenantId);
        await asyncRedis.set(key, _currentNum);
        incrCommand(key);//序列自增1
        ret = await asyncRedis.get(key);
    }
    let len = ret.length;
    for(let i=0;i<MAX_LEN - len;i++) {
        ret = "0" + ret;
    }
    return ret;
}
/**
 * 获取生产任务编码
 * @param tableName
 * @param tenantId
 * @returns {Promise.<*>}
 */
export var getTaskIncrPk = async(tableName, tenantId) => {
    let key = getIncrKey(tableName, tenantId);
    logger.debug("the key " + key + " request getTaskIncrPk");
    incrCommand(key);//序列自增1
    let ret = await asyncRedis.get(key);
    let len = ret.length;

    if(len > TASK_CODE_LAST_MAX_LEN) {//如果查过最大长度，重置
        await asyncRedis.set(key, 0);
        incrCommand(key);//序列自增1
        ret = await asyncRedis.get(key);
    }

    len = ret.length;//重新计算长度
    for(let i=0;i<TASK_CODE_LAST_MAX_LEN - len;i++) {
        ret = "0" + ret;
    }

    let TASK_DATE_STR = moment().format("YYMMDD");

    return TASK_DATE_STR + ret;
}

/**
 * 删除序列
 * @param tableName
 * @param tenantId
 */
export var deleteIncrPk = async(tableName, tenantId) => {
    let key = getIncrKey(tableName, tenantId);
    await asyncRedis.del(key);
}

/**
 * 返回识别码
 * @param type 01-人员, 02-设备， 03-产品， 04-物料， 05-工单， 06-工序
 * @param tenantId
 * @param currentNum
 * @returns {string} 01 1612 000008  业务类型+日期年月+序列
 */
export var getRecognizeCode = async(type, tenantId) => {
    let key = getRecognizeKey(type, tenantId);
    logger.debug("the key " + key + " request getRecognizeCode");
    incrCommand(key);//序列自增1
    let ret = await asyncRedis.get(key);

    if(!ret || null == ret) {
        let _currentNum = await getMaxCodeIntab(getTableNameByType(type), tenantId);
        await asyncRedis.set(key, _currentNum);
        incrCommand(key);//序列自增1
        ret = await asyncRedis.get(key);
    }

    return type + dateStr + ret;
}

/**
 * 删除识别码
 * @param type
 * @param 年月4位
 * @param tenantId
 */
export var deleteRecognizeCode = async(type, yymm, tenantId) => {
   let key = getRecKey(type, yymm, tenantId);
    await asyncRedis.del(key);
}

/**
 * 识别码根据业务编号获取表
 * @param type 01-人员, 02-设备， 03-产品， 04-物料， 05-工单， 06-工序, 07-打印履历
 */
var getTableNameByType = (type) => {
    let ret;
    switch(type) {
        case "01":
            ret = "user";
            break;
        case "02":
            ret = "machine";
            break;
        case "03":
            ret = "product";
            break;
        case "04":
            ret = "product";
            break;
        case "05":
            ret = "task_job";
            break;
        case "06":
            ret = "procedure_node";
        case "07":
            ret = "print_log";
            break;
        default:
            ret = "";
    }
    return ret;
}

/**
 * 执行incr
 * @param key
 */
var incrCommand = (key) => {
    var incr = new Command("incr", [key], "UTF-8");
    incr.promise.then(function (result) {
        logger.debug("incr command over:" + result);
    }).catch(function (e) {
       logger.error(e);
    });

    redis.sendCommand(incr);
}