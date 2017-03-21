/**
 * Created by libing on 16-11-15.
 */

var Redis = require("ioredis");
import config from "../../config";

// export var redis = new Redis.Cluster(config.cache.redis);


if(config.cache.isCluster === "true"){
    var rc = new Redis.Cluster(config.cache.redisc);
}else{
    var rc = new Redis(config.cache.redis);
}

// export var redis = new Redis.Cluster(config.cache.redis);
// export var redis = new Redis(config.cache.redis);
export var redis = rc