/**
 * Copyright (c) 2016-present www.shengjing360.com
 * Created by Justin on 2017/2/15.
 * Version:V.1.0.0
 * 全局唯一UUID算法：
 * 方式 1：
 * 39bit（时间）       8bit(mac低位8个bite)    8bit(pid低位8个bite)   8bit序列(一毫秒最大并发256)
 * 方式 2：
 * 39bit（时间）       12bit(IP低位12个bite)    4bit(pid低位4个bite)   8bit序列(一毫秒最大并发256)
 */
const os = require('os');
import {ibdLogger as logger} from "./../../lib/ibd-logger";
var _instance = null;
function ibdSnowFlake() {
    function Class() {
        this.epoch = 1483200000000;       // 2017/1/1 00:00:00
        // this.epoch = 0;       					// 2017/1/1 00:00:00
        // this.mac8Bit = this.getMac8Bit();
        this.ip12Bit = this.getIP12Bit();
        // this.pId8Bit = this.getPid8Bit();
        this.pId4Bit = this.getPid4Bit();
        // this.middleId = this.mac8Bit + this.pId8Bit;    // mac(8) + pid(8)      方式一
        this.middleId = this.ip12Bit + this.pId4Bit;    // ip(12)+pid(4)        方式二
        this.lastTimestamp = 0;
        this.seq = -1;
        this.maxSeq = 256;
        // logger.debug("-----------------------------------------------------------");
    }

    // Convert binary string to hex string.
    function binStr2HexStr(binStr) {
        var hexStr = "";
        for (var i = binStr.length; i >= 0; i -= 4) {
            var bStr = binStr.substring(i - 4, i);
            if (bStr.length > 0) {
                hexStr = parseInt(bStr, 2).toString(16) + hexStr;
            }
        }
        return hexStr;
    }

    // Convert hex string to bigint number string.
    function hexStr2BigIntStr(hexStr) {
        hexStr = hexStr.toLowerCase();
        return baseConvert(hexStr, 16, 10);
    }

    // hex conversion.
    function baseConvert(str, fromBase, toBase) {
        var digits = parseToNumArray(str, fromBase);
        if (digits === null) return null;
        var outArray = [];
        var power = [1];
        for (var i = 0; i < digits.length; i++) {
            if (digits[i]) {
                outArray = add(outArray, multiplyByNumber(digits[i], power, toBase), toBase);
            }
            power = multiplyByNumber(fromBase, power, toBase);
        }

        var out = '';
        for (var i = outArray.length - 1; i >= 0; i--) {
            out += outArray[i].toString(toBase);
        }
        return out;
    }

    function multiplyByNumber(num, x, base) {
        if (num < 0) return null;
        if (num == 0) return [];

        var result = [];
        var power = x;
        while (true) {
            if (num & 1) {
                result = add(result, power, base);
            }
            num = num >> 1;
            if (num === 0) break;
            power = add(power, power, base);
        }

        return result;
    }

    function add(x, y, base) {
        var z = [];
        var n = Math.max(x.length, y.length);
        var carry = 0;
        var i = 0;
        while (i < n || carry) {
            var xi = i < x.length ? x[i] : 0;
            var yi = i < y.length ? y[i] : 0;
            var zi = carry + xi + yi;
            z.push(zi % base);
            carry = Math.floor(zi / base);
            i++;
        }
        return z;
    }

    // Convert number string to number array.
    function parseToNumArray(numStr, base) {
        var digits = numStr.split('');
        var ary = [];
        for (var i = digits.length - 1; i >= 0; i--) {
            var n = parseInt(digits[i], base);
            if (isNaN(n)) return null;
            ary.push(n);
        }
        return ary;
    }

    // Convert binary string to bigint number string.
    function binStr2BigIntStr(binStr) {
        var hexStr = binStr2HexStr(binStr);
        return hexStr2BigIntStr(hexStr);
    }

    Class.prototype = {
        constructor: Class,
        gen: function () {
            logger.debug(__filename,"uuid","--------------------------------------------------------");
            var timestamp = this.getCurrentDateTime();
            if (this.lastTimestamp == timestamp) {
                this.seq++;
                if (this.seq == this.maxSeq) {
                    timestamp = this.untilNextMillis(this.lastTimestamp);
                    this.seq = 0;
                }
            } else {
                this.seq = 0;
            }
            logger.debug(__filename,"uuid","lastTimestamp:"+this.lastTimestamp+" timestamp:"+timestamp);
            if (timestamp < this.lastTimestamp) {
                // 服务器系统时钟回调，主键生成报错
                logger.error(__filename,"uuid","Clock moved backwards.Refusing to generate id.this.lastTimestamp:"+this.lastTimestamp+" timestamp:"+timestamp);
                throw new Error("Clock moved backwards.Refusing to generate id.this.lastTimestamp:"+this.lastTimestamp+" timestamp:"+timestamp);
            }
            this.lastTimestamp = timestamp;
            var bitSeq = this.seq.toString(2);
            while (bitSeq.length < 8) {
                bitSeq = "0" + bitSeq
            }
            var binStr = (timestamp-this.epoch).toString(2) + this.middleId + bitSeq;
            var uuidStr = binStr2BigIntStr(binStr);
            logger.debug(__filename,"uuid",uuidStr);
            logger.debug(__filename,"uuid","--------------------------------------------------------");
            return uuidStr;
        },
        untilNextMillis: function (lastTimestamp) {
            // Beyond the max number of sequence,waiting for next millisecond.
            var timestamp = this.getCurrentDateTime();
            while (timestamp <= lastTimestamp) {
                timestamp = this.getCurrentDateTime();
            }
            return timestamp;
        },
        getCurrentDateTime: function () {
            // get datetime offset.
            return new Date().getTime();
        },
        getMac8Bit: function () {
            var ifaces = os.networkInterfaces();
            // move 'loopback'
            for (var dev in ifaces) {
                if (dev.toLowerCase().indexOf('loopback') != -1) {
                    delete  ifaces[dev];
                    continue;
                }
            }
            var macAddress = null;
            for (var dev in ifaces) {
                var iface = ifaces[dev];
                for (var i = 0; i < iface.length; i++) {
                    var details = iface[i];
                    if (details.family.toUpperCase() === "IPV4" && details.address !== "127.0.0.1" && !details.internal) {
                        macAddress = details.mac;
                        break;
                    }
                }
                if (!!macAddress) {
                    break;
                }
            }
            var macNumArry = macAddress.split(/:|-/);
            var macBitStr = parseInt(macNumArry[macNumArry.length - 1], 16).toString(2);
            while (macBitStr.length < 8) {
                macBitStr = '0' + macBitStr
            }
            return macBitStr;
        },
        getIP12Bit: function () {
            var ifaces = os.networkInterfaces();
            // move 'loopback'
            for (var dev in ifaces) {
                if (dev.toLowerCase().indexOf('loopback') != -1) {
                    delete  ifaces[dev];
                    continue;
                }
            }
            var ip = null;
            for (var dev in ifaces) {
                var iface = ifaces[dev];
                for (var i = 0; i < iface.length; i++) {
                    var details = iface[i];
                    if (details.family.toUpperCase() === "IPV4" && details.address !== "127.0.0.1" && !details.internal) {
                        ip = details.address;
                        break;
                    }
                }
                if (!!ip) {
                    break;
                }
            }
            logger.debug("ip: "+ip);
            var ipNumArry = ip.split(".");
            var ip8BitStr = parseInt(ipNumArry[ipNumArry.length - 1]).toString(2).slice(-8);
            var ip4BitStr = parseInt(ipNumArry[ipNumArry.length - 2]).toString(2).slice(-4);
            while (ip8BitStr.length < 8) ip8BitStr = '0' + ip8BitStr;
            while (ip4BitStr.length < 4) ip4BitStr = '0' + ip4BitStr;
            var ip12BitStr = ip4BitStr + ip8BitStr;
            logger.debug("ip12BitStr: "+ip12BitStr);
            return ip12BitStr;
        },
        getPid8Bit: function () {
            // Take low 8 bit
            var pid = process.pid;
            var binPid = pid.toString(2).slice(-8);
            while (binPid.length < 8) {
                binPid = '0' + binPid
            }
            return binPid;
        },
        getPid4Bit: function () {
            // Take low 4 bit
            var pid = process.pid;
            logger.debug("pid:" + pid);
            var binPid = pid.toString(2).slice(-4);
            while (binPid.length < 4) {
                binPid = '0' + binPid
            }
            logger.debug("pid binary:" + binPid);
            return binPid;
        }
    }

    this.getInstance = function () {
        if (_instance == null) {
            _instance = new Class();
        }
        return _instance;
    }
}

exports.ibdSnowFlake = new ibdSnowFlake().getInstance();