/**
 * 返回结果错误统一拦截提示
 * Created by libing on 17-2-20.
 */
import {errorMessage as resultMessage} from "../../utils/error/errorCode";
const errText = "系统错误";
/**
 * 返回结果统一错误提示,规则，status=“fail” && code < 20000 ,msg统一提示为:系统错误
 * @param ret
 * @returns {Promise.<void>}
 */
export var errorFilter = async(ret) => {
    aerrorFilter(ret);
}

export var aerrorFilter = (ret) => {
    if(ret && ret.status && ret.code && ret.msg) {
        if(ret.code > 500 && ret.code < 20000) {//<20000都为系统错误， 20000以上的为业务错误
            ret.msg = errText;
        }
    }
    return ret;
}

/**
 * 将系统错误码统一修改为统一格式码
 * @param err
 * @returns {Promise.<void>}
 */
export var errorToCustomerError = async(err) => {
    aerrorToCustomerError(err);
}

export var aerrorToCustomerError = (err) => {
    if(!err.status) {
        return resultMessage("SystemError", err, errText);
    }
    return err;
}
