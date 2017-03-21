/**
 * Created by libing on 16-12-1.
 */

import {ibdLogger as logger} from '../../lib/ibd-logger';
/**
 * 根据分页数据返回mysql分页参数
 * @param pageRequest  {"page":1,"size":8,"orderBy":"createDate","order":"DESC"},page和size为必填字段
 * @returns {{countSql, listSql, start: number, end: number, orderBy: (_.orderBy|*), order: (string|Array|*)}}
 */
export var getPageModel = function getPageModel(pageRequest, sql) {
    var page = Number(pageRequest.page);
    var size = Number(pageRequest.size);
    var orderBy = pageRequest.orderBy;
    var order = pageRequest.order;
    var countSql = getTotalSql(sql);
    var listSql = getListSql(sql, orderBy, order);
    var pageModel = {
        countSql:countSql,
        listSql:listSql,
        start:(page - 1) * size,
        end:size,
        orderBy:orderBy,
        order:order
    }

    return pageModel;
}

/**
 * 分页查询工具
 * @param pageRequest {"page":1,"size":8,"orderBy":"createDate","order":"DESC"},page和size为必填字段
 * @param conn 数据库链接
 * @param sql 查询sql
 * @param params 参数
 * @returns {{status: string, errCode: number, count: number, data: *}}
 */
export var getPageResult = async function getPageResult(pageRequest, conn, sql, params) {
    var pageModel = getPageModel(pageRequest, sql);
    params.push(pageModel.start, pageModel.end, pageModel.orderBy, pageModel.order);
    let countSql = pageModel.countSql;
    let listSql = pageModel.listSql;
    logger.debug(listSql);
    logger.debug(countSql);
    let list = await conn.query(listSql, params);
    let count = await conn.query(countSql, params);

    let success = {
        status: "ok",
        errCode: 0,
        count:count.length > 0?count[0]._sql_count:0,
        data:list
    };
    return success;
}

/**
 * 返回查询总数sql
 * @param sql
 * @returns {string}
 */
function getTotalSql(sql) {
    var count_sql = "select count(1) as _sql_count from (".concat(sql).concat(") as _tmp_");
    return count_sql;
}

/**
 * 返回分页查询sql
 * @param sql
 * @returns {Array.<T>|*|string|Array|Buffer}
 */
function getListSql(sql, orderBy, order) {
    var list_sql = ("select * from (").concat(sql).concat(" limit ?, ?) as _tmp_");

    if(orderBy) {
        list_sql = ("select * from (").concat(sql).concat(" order by "+orderBy+" " + order).concat(" limit ?, ?) as _tmp_");
    }
    return list_sql;
}
