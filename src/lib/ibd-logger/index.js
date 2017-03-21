/**
 * Copyright (c) 2016-present www.shengjing360.com
 * Created by Justin on 2016/12/13.
 * Version:V.1.0.0
 * IDB日志记录器
 * 基于log4j 和 koa框架，结合ibd业务需求封装
 * bug fix:
 * 1、自动编译之后 单例日志记录器被清除，需要重新创建，故：添加loggerWatchDog.
 * 2、loggerWatchDog 去掉，使用了global全局对象来保存config信息，保证babel重新编译之后配置信息不丢失.
 */
import ibdLogger from "ibd-logger";
export {ibdLogger};