/**
 * Created by libing on 2016/11/3.
 */
var Client = require('node-rest-client').Client;
var client = new Client();
import {ibdLogger} from "./../../lib/ibd-logger";
import {errorMessage} from "./../../utils/error/errorCode";
import {aerrorFilter, aerrorToCustomerError} from "../../utils/error/resultError";
import util from "util";
const reqConfig = {
    timeout: 30000,
    noDelay: true,
    keepAlive: true,
    keepAliveDelay: 1000
};
const resConfig = {
    timeout: 1000
};

export var post = function (url, params) {
    var promise = new Promise(function (resolve, reject) {
        var content_len = params.toString().length;
        var args = {
            data: params,
            headers: {
                'user-agent': 'web-node/ibd_tenant_web',
                'connection': 'keep-alive',
                'content-length': content_len,
                'content-type': 'application/json;charset=UTF-8'
            },
            requestConfig: reqConfig,
            responseConfig: resConfig
        };
        ibdLogger.debug(__filename,"post_req:",url,args);
        client.post(url, args, function (data) {
            resolve(aerrorFilter(data));
        })
            .on('requestTimeout', function (request) {
                let errMsg = errorMessage("CallServiceError", request, "Post请求超时");
                ibdLogger.error(__filename, "post:"+url, "请求超时", errMsg);
                request.abort();
                reject(aerrorToCustomerError(new Error(util.inspect(errMsg))));
            })
            .on('responseTimeout', function (response) {
                let errMsg = errorMessage("CallServiceError", response, "Post应答超时");
                ibdLogger.error(__filename, "post", "应答超时", errMsg);
                reject(aerrorToCustomerError(new Error(util.inspect(errMsg))));
            })
            .on('error', function (error) {
                let errMsg = errorMessage("CallServiceError",error, "请求发生错误");
                ibdLogger.error(__filename, "post", "请求发生错误", errMsg);
                reject(aerrorToCustomerError(new Error(util.inspect(errMsg))));
            });
    });
    return promise;
}

export var get = function (url) {
    var promise = new Promise(function (resolve, reject) {
        var args = {
            headers: {
                'user-agent': 'web-node/ibd_tenant_web',
                'connection': 'keep-alive',
                'content-type': 'application/json;charset=UTF-8'
            },
            requestConfig: reqConfig,
            responseConfig: resConfig
        };
        client.get(url, args, function (data, response) {
            resolve(aerrorFilter(data));
        })
            .on('requestTimeout', function (request) {
                let errMsg = errorMessage("CallServiceError", request, "Post请求超时");
                ibdLogger.error(__filename, "get:"+url, "请求超时", errMsg);
                request.abort();
                reject(aerrorToCustomerError(new Error(util.inspect(errMsg))));
            })
            .on('responseTimeout', function (response) {
                let errMsg = errorMessage("CallServiceError", response, "Post应答超时");
                ibdLogger.error(__filename, "get", "应答超时", errMsg);
                reject(aerrorToCustomerError(new Error(util.inspect(errMsg))));
            })
            .on('error', function (error) {
                let errMsg = errorMessage("CallServiceError",error, "请求发生错误");
                ibdLogger.error(__filename, "get", "请求发生错误", errMsg);
                reject(aerrorToCustomerError(new Error(util.inspect(errMsg))));
            });
    });
    return promise;
}

export var put = function (url, params) {
    var promise = new Promise(function (resolve, reject) {
        var content_len = params.toString().length;
        var args = {
            data: params,
            headers: {
                'user-agent': 'web-node/ibd_tenant_web',
                'connection': 'keep-alive',
                'content-length': content_len,
                'content-type': 'application/json;charset=UTF-8'
            }
        };
        ibdLogger.debug(__filename,"put_req:",url,args);
        client.put(url, args, function (data, response) {
            resolve(aerrorFilter(data));
        })
            .on('requestTimeout', function (request) {
                let errMsg = errorMessage("CallServiceError", request, "Post请求超时");
                ibdLogger.error(__filename, "put:"+url, "请求超时", errMsg);
                request.abort();
                reject(aerrorToCustomerError(new Error(util.inspect(errMsg))));
            })
            .on('responseTimeout', function (response) {
                let errMsg = errorMessage("CallServiceError", response, "Post应答超时");
                ibdLogger.error(__filename, "put", "应答超时", errMsg);
                reject(aerrorToCustomerError(new Error(util.inspect(errMsg))));
            })
            .on('error', function (error) {
                let errMsg = errorMessage("CallServiceError",error, "请求发生错误");
                ibdLogger.error(__filename, "put", "请求发生错误", errMsg);
                reject(aerrorToCustomerError(new Error(util.inspect(errMsg))));
            });
    });
    return promise;
}

export var del = function (url, params) {
    var promise = new Promise(function (resolve, reject) {
        var args = {
            data: params,
            headers: {
                'user-agent': 'web-node/ibd_tenant_web',
                'connection': 'keep-alive',
                'content-type': 'application/json;charset=UTF-8'
            },
            requestConfig: reqConfig,
            responseConfig: resConfig
        };
        ibdLogger.debug(__filename,"del_req:",url,args);
        client.delete(url, args, function (data, response) {
            resolve(aerrorFilter(data));
        })
        .on('requestTimeout', function (request) {
            let errMsg = errorMessage("CallServiceError", request, "Post请求超时");
            ibdLogger.error(__filename, "del:"+url, "请求超时", errMsg);
            request.abort();
            reject(aerrorToCustomerError(new Error(util.inspect(errMsg))));
        })
        .on('responseTimeout', function (response) {
            let errMsg = errorMessage("CallServiceError", response, "Post应答超时");
            ibdLogger.error(__filename, "del", "应答超时", errMsg);
            reject(aerrorToCustomerError(new Error(util.inspect(errMsg))));
        })
        .on('error', function (error) {
            let errMsg = errorMessage("CallServiceError",error, "请求发生错误");
            ibdLogger.error(__filename, "del", "请求发生错误", errMsg);
            reject(aerrorToCustomerError(new Error(util.inspect(errMsg))));
        });
    });
    return promise;
}

export var patch = function (url, params) {
    var promise = new Promise(function (resolve, reject) {
        var content_len = params.toString().length;
        var args = {
            data: params,
            headers: {
                'user-agent': 'web-node/ibd_tenant_web',
                'connection': 'keep-alive',
                'content-length': content_len,
                'content-type': 'application/json;charset=UTF-8'
            }
        };
        ibdLogger.debug(__filename,"patch_req:",url,data);
        client.patch(url, args, function (data, response) {
            resolve(aerrorFilter(data));
        })
        .on('requestTimeout', function (request) {
            let errMsg = errorMessage("CallServiceError", request, "Post请求超时");
            ibdLogger.error(__filename, "patch:"+url, "请求超时", errMsg);
            request.abort();
            reject(aerrorToCustomerError(new Error(util.inspect(errMsg))));
        })
        .on('responseTimeout', function (response) {
            let errMsg = errorMessage("CallServiceError", response, "Post应答超时");
            ibdLogger.error(__filename, "patch", "应答超时", errMsg);
            reject(aerrorToCustomerError(new Error(util.inspect(errMsg))));
        })
        .on('error', function (error) {
            let errMsg = errorMessage("CallServiceError",error, "请求发生错误");
            ibdLogger.error(__filename, "patch", "请求发生错误", errMsg);
            reject(aerrorToCustomerError(new Error(util.inspect(errMsg))));
        });
    });
    return promise;
}


