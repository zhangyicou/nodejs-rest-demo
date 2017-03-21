/**
 * Created by keep on 2016/11/1.
 */


var mysql = require('../../lib/async-mysql');
// var config = require('../../config/index');
import config from '../../config/index'

var mysqlconfig = config.mysql;
export var pool = mysql.createPool(mysqlconfig);

// pool.query('select id, name, sts from sp').then(function (rows) {
//     // Logs out a list of hobbits
//     console.log(rows);
// });