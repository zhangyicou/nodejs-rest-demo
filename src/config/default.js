/**
 * Created at 17/03/20.
 * @Author zhangyc01.
 */
var pkJson = require("./../../package.json");
//ibd data api
const dataApiUri =  (process.env.data_svs || "http://192.168.93.9:9604" ) +  "/sapi/v1/dataApi";
export default {
    port:process.env.port || 4200,
    mysql: {
        host: process.env.mysql_host || '192.168.93.11',
        user: process.env.mysql_user || 'root',
        password: process.env.mysql_password || '123456',
        database: process.env.mysql_database || 'ibd_platform',
        port: process.env.mysql_port || 3306,
        connectionLimit: process.env.mysql_connectionLimit || 40,
        supportBigNumbers:true,
        bigNumberStrings:true,
        dateStrings:true
    },

    ibdlog:{
        logDirPath: process.env.log_file || 'logs',
        appLogLevel: process.env.log_leavel ||  'debug',
        appName:pkJson.name|| 'ibd_app',
        appVersion:pkJson.version || 'ibd_version'
    },

    alidayu:{
        appKey:"23377464",
        appSecret:"a240ec5f813930a59ef7cb43944ca87d",
        sms_free_sign_name:"盛景网联",
        vcode_template_code:"SMS_10215386"//您的验证码为：[vcode]
    },

    // 任务状态
    s_task: {
        UN_START: 1,
        UN_FINISH: 2,
        FINISH: 3,
        FINISH_C: 9
    },
    // 任务进度状态
    s_p_task: {
        DELAY: 1,//延误
        DELAY_START: 2,//延迟启动
        PRODUCING: 3,//生产中
        TODAY_FINISH: 4//今日完工
    },

    // 工单状态
    s_job: {
        UN_FINISH: 1,//未完工
        FINISH: 2,//完工
        UNUSUAL: 3,//异常完工
        // FORCE: 4,
        PAUSE: 5//暂停
    },
    // 工单进度状态
    s_p_job: {
        DELAY: 1,//延误
        DELAY_START: 2,//延迟启动
        PRODUCING: 3,//生产中
        TODAY_FINISH: 4//今日完工
    },

    // 微信第一个版本的进度状态标识，以后可能删除 todo
    p_task: {
        NORMAL: 1,
        DELAY: 2,
    },

    cache:{
        isCluster: process.env.isCluster || "true",
        redis:{
            port: process.env.redis_port1 || 6379,
            host: process.env.redis_host1 || '192.168.93.11',
            password: process.env.redis_pwd || "ibdGY123"
        },
        redisc:[{
            port: process.env.redis_port1 || 6379,
            host: process.env.redis_host1 || '192.168.93.11',
            password: process.env.redis_pwd || "ibdGY123",
            dropBufferSupport:true
        },{
            port: process.env.redis_port2 || 6380,
            host: process.env.redis_host2 || '192.168.93.11',
            password: process.env.redis_pwd || "ibdGY123",
            dropBufferSupport:true
        }, {
            port: process.env.redis_port3 || 6381,
            host: process.env.redis_host3 || '192.168.93.11',
            password: process.env.redis_pwd || "ibdGY123",
            dropBufferSupport:true
        },{
            port: process.env.redis_port4 || 6382,
            host: process.env.redis_host4 || '192.168.93.11',
            password: process.env.redis_pwd || "ibdGY123",
            dropBufferSupport:true
        },{
            port: process.env.redis_port5 || 6383,
            host: process.env.redis_host5 || '192.168.93.11',
            password: process.env.redis_pwd || "ibdGY123",
            dropBufferSupport:true
        },{
            port: process.env.redis_port6 || 6384,
            host: process.env.redis_host6 || '192.168.93.11',
            password: process.env.redis_pwd || "ibdGY123",
            dropBufferSupport:true
        }],
        vcode:{
            regPrefix:"vcode_reg_",
            fpwdPrefix:"vcode_fpwd_",
            expiration:300
        }
    },
    //接口url
    restUrl:{
        getProductNum:dataApiUri+"/getProcNumber"
    }
}