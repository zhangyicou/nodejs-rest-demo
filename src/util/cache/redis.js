/**
 * Created by libing on 16-12-7.
 */
import {redis} from "./redis-cluster";
import {ibdLogger as logger} from '../../lib/ibd-logger';

export var asyncRedis = {};

asyncRedis.set = async (key, value, PX) => {
    if(PX) {
        await redis.set(key, value, "EX", PX);
    } else {
        await redis.set(key, value);
    }
}

/**
 * 同步获取缓存value
 * @param key
 * @returns {*}
 */
asyncRedis.get = async(key) => {
    var redisPromise = new Promise(function (resolve, reject) {
        redis.get(key, function (err, result) {//获取当前序列
            resolve(result);
            if(err) {
                reject(err);
            }
        });
    });

    var ret;
    await redisPromise.then(function (result) {
        ret = result;
    }).catch(function (e) {
        logger.error(e);
    });

    return ret;
}

/**
 * 删除缓存
 * @param key
 */
asyncRedis.del = async(key) => {
    await redis.del(key);
}