/**
 * Created by kevin on 2016/12/13.
 * 工单条码
 */

import {ibdLogger as logger} from "../lib/ibd-logger";
import {sql_add_hotSwitch,sql_get_hotSwitch,sql_delete_hotSwitch} from "../service/testService";
import {errorMessage} from "../util/error/errorCode";
var util = require("util");
const file = "src/controller/testController.js";
var assert = require("assert");
/**
 * @api {post} /receiveMsg  接收消息
 * @apiDescription 打印工单信息
 * @apiGroup barCodePrint APIs
 * @apiParam {Array} ids [工单id,工单id]
 * @apiParamExample {json} 请求参数格式:
 *     {
 *        "key": "testKey",
 *        "value": "testValue",
 *        "enable": "1",
 *        "envType":"1",
 *        "description":"测试描述",
 *        "createTime":"2017-03-20"
 *     }
 * @apiSuccessExample {json} 正确返回值:
 *    {
 *   "code": 0,
 *   "msg": "OK ",
 *   "status": "ok"
 *   }
 */
export var addHotSwitch = async(ctx) => {
    let methodName = "addHotSwitch";
    try{
        let hotSwitch = ctx.request.body;
        assert(hotSwitch.key, "添加热开关key不能为空");
        assert(hotSwitch.value, "添加热开关value不能为空");
        assert(hotSwitch.enable, "添加热开关enable不能为空");
        assert(hotSwitch.envType, "添加热开关envType不能为空");

        /*let valid = await canUseTempName(collectionTemplate.templateName, collectionTemplate.tenantId);
        assert(valid.data.result, "工序采集模板名称已经被使用");*/

        logger.debug(file, methodName, hotSwitch);
        let ret = await sql_add_hotSwitch(hotSwitch);
        logger.debug(file, methodName, ret);
        ctx.body = ret;
    } catch (e) {
        logger.error(file, methodName, e);
        let err = errorMessage("SystemError", e);
        ctx.body = err;
    }
}

/**
 * 根据工单ID获取工单状态变更记录
 * @param ctx
 */
exports.getHotSwitch=async ctx=>{
    let method="getHotSwitch";
    try{
    let params = ctx.params || {};
    logger.debug(file,method,"获取热开关",params);
    assert(params.key, "获取热开关key不能为空");
    assert(params.enable, "获取热开关envType不能为空");

    // sql execute and response
    ctx.body = await sql_get_hotSwitch(params);
    } catch (e) {
        logger.error(file, methodName, e);
        let err = errorMessage("SystemError", e);
        ctx.body = err;
    }
}

exports.deleteHotSwitch=async ctx=>{
    let method="getHotSwitch";
    try{
        let params = ctx.params || {};
        logger.debug(file,method,"删除热开关",params);
        assert(params.id, "删除热开关id不能为空");

        // sql execute and response
        ctx.body = await sql_delete_hotSwitch(params);
    } catch (e) {
        logger.error(file, methodName, e);
        let err = errorMessage("SystemError", e);
        ctx.body = err;
    }
}