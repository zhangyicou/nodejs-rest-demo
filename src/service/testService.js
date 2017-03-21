/**
 * Created by zhangyc01 on 2017/03/20.
 * 企业信息操作
 */


import {pool} from "../db/mysql/pool";
import {ibdLogger as logger} from "../lib/ibd-logger";
import {errorMessage} from "../util/error/errorCode";
var util = require("util");
var assert = require("assert");
const file = "src/service/testService.js";
//添加热开关
export var sql_add_hotSwitch = async function sql_add_hotSwitch(hotSwitch) {
    let methodName = "sql_add_hotSwitch";
    let sql = 'INSERT  INTO  hot_switch set ?';
    try {
        hotSwitch.createTime = new Date().getMilliseconds();
        logger.debug(file, methodName, hotSwitch);

        var conn = await pool.getConnection();
    } catch (e) {
        return errorMessage("DbConnectError", e, e.message);
    }

    // execute SQL
    try {
        await conn.query(sql, hotSwitch);
        return errorMessage("success");
    } catch (e) {
        return errorMessage("SqlExcuteError", e, e.message);
    } finally {
        if (conn) conn.release();
    }
}

// 获取打印工单物料信息
export var sql_get_hotSwitch = async function (params) {
    let method="sql_get_task_job_record";
    logger.debug(file, method,"根据工单ID获取状态变更说明", params);
    let sql="SELECT `id`, `key`, `value`, `enable`, `envType`, `createTime` FROM hot_switch WHERE `key` = ? AND `envType` = ? AND `enable` = 1 ";
    let obj = [];

    try {
        var conn = await pool.getConnection();
    } catch (e) {
        return errorMessage("DbConnectError", e, e.message);
    }
    obj.push(params.key);
    obj.push(params.enable);

    // execute SQL
    try {
        let data = await conn.query(sql, obj);
        return errorMessage("success", data);
    } catch (e) {
        return errorMessage("SqlExcuteError", e, e.message);
    } finally {
        if (conn) conn.release();
    }
}

// 获取打印工单物料信息
export var sql_delete_hotSwitch = async function (params) {
    let method="sql_get_task_job_record";
    logger.debug(file, method, "删除热开关", params);
    let sql="DELETE FROM hot_switch WHERE `id` = ? ";

    try {
        var conn = await pool.getConnection();
    } catch (e) {
        return errorMessage("DbConnectError", e, e.message);
    }

    // execute SQL
    try {
        let data = await conn.query(sql, params.id);
        return errorMessage("success", data);
    } catch (e) {
        return errorMessage("SqlExcuteError", e, e.message);
    } finally {
        if (conn) conn.release();
    }
}