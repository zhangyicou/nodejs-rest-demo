define(function () {
    var MYAPP = {
        timer: 2000,//时间
        achieve:{
            id:"#achieve",//dom id
            init: 23,//原始值
            step: 0.84,//每轮增值
            max: 100,//上限
            bound: 1,//龙门高度
            sum: 0//小水潭
        },
        bad:{
            id:"#bad_num",//dom id
            init: 1,//原始值
            step: 0.14,//每轮增值
            max: 15,//上限
            bound: 1,//龙门高度
            sum: 0//小水潭
        },
        garbage:{
            id:"#dust_num",//dom id
            init: 0,//原始值
            step: 0.04,//每轮增值
            max: 3,//上限
            bound: 1,//龙门高度
            sum: 0//小水潭
        },
        list:[{//第一家企业
            ename: "欧佩化工",
            info: "延误4天",
            deliveryDate: -4,
            status: "生产中",
            type: 1,
            jobs:[
                {
                    pname: "聚丙乙烯",
                    planNum: 1500,
                    status: "生产中",
                    id:"",
                    init: 0,//原始值
                    step: 9,//每轮增值
                    max: 900,//上限
                    bound: 10,//龙门高度
                    sum: 0//小水潭
                },
                {
                    pname: "36#聚苯乙烯颜料",
                    planNum: 2000,
                    status: "生产中",
                    id:"",
                    init: 0,//原始值
                    step: 12,//每轮增值
                    max: 1200,//上限
                    bound: 10,//龙门高度
                    sum: 0//小水潭
                }
            ]
        },
        //第二家企业
        {
            ename: "万帮制造",
            info: "延误1天",
            deliveryDate: -1,
            status: "生产中",
            type: 1,
            jobs:[
                {
                    pname: "机头箱支架",
                    planNum: 200,
                    status: "生产中",
                    id:"",
                    init: 50,//原始值
                    step: 1,//每轮增值
                    max: 150,//上限
                    bound: 1,//龙门高度
                    sum: 0//小水潭
                }
            ]
        },
        //第三家企业
        {
            ename: "库存生产",
            info: "延迟启动1天",
            deliveryDate: 7,
            status: "生产中",
            type: 2,
            jobs:[
                {
                    pname: "线圈骨架",
                    planNum: 1000,
                    status: "生产中",
                    id:"",
                    init: 200,//原始值
                    step: 6,//每轮增值
                    max: 800,//上限
                    bound: 10,//龙门高度
                    sum: 0//小水潭
                },
                {
                    pname: "漆包线",
                    planNum: 2000,
                    status: "已延误",
                    id:"",
                    init: 1100,//原始值
                    step: 9,//每轮增值
                    max: 2000,//上限
                    bound: 10,//龙门高度
                    sum: 0//小水潭
                },
                {
                    pname: "机头箱护罩",
                    planNum: 100,
                    status: "延迟启动",
                    id:"",
                    init: 100,//原始值
                    step: 0,//每轮增值
                    max: 100,//上限
                    bound: 1,//龙门高度
                    sum: 0//小水潭
                }
            ]
        },
            //第四家企业
            {
                ename: "红祥新材料",
                info: "",
                deliveryDate: 5,
                status: "生产中",
                type: 3,
                jobs:[
                    {
                        pname: "白短纤维36#",
                        planNum: 5000,
                        status: "生产中",
                        id:"",
                        init: 500,//原始值
                        step: 31,//每轮增值
                        max: 3600,//上限
                        bound: 30,//龙门高度
                        sum: 0//小水潭
                    },
                    {
                        pname: "蓝黑短纤维36#",
                        planNum: 2000,
                        status: "生产中",
                        id:"",
                        init: 100,//原始值
                        step: 20,//每轮增值
                        max: 2100,//上限
                        bound: 20,//龙门高度
                        sum: 0//小水潭
                    },
                    {
                        pname: "聚丙乙烯",
                        planNum: 2000,
                        status: "生产中",
                        id:"",
                        init: 0,//原始值
                        step: 9,//每轮增值
                        max: 900,//上限
                        bound: 10,//龙门高度
                        sum: 0//小水潭
                    }
                ]
            },
            //第五家企业
            {
                ename: "欧佩化工",
                info: "",
                deliveryDate: 5,
                status: "生产中",
                type: 3,
                jobs:[
                    {
                        pname: "聚丙乙烯",
                        planNum: 5000,
                        status: "生产中",
                        id:"",
                        init: 500,//原始值
                        step: 30,//每轮增值
                        max: 3500,//上限
                        bound: 30,//龙门高度
                        sum: 0//小水潭
                    },
                    {
                        pname: "36#聚苯乙烯颜料",
                        planNum: 2500,
                        status: "生产中",
                        id:"",
                        init: 0,//原始值
                        step: 18,//每轮增值
                        max: 1800,//上限
                        bound: 20,//龙门高度
                        sum: 0//小水潭
                    },
                    {
                        pname: "45#聚苯乙烯颜料",
                        planNum: 2500,
                        status: "生产中",
                        id:"",
                        init: 0,//原始值
                        step: 15,//每轮增值
                        max: 1500,//上限
                        bound: 10,//龙门高度
                        sum: 0//小水潭
                    }
                ]
            },
            //第六家企业
            {
                ename: "红祥新材料",
                info: "",
                deliveryDate: 3,
                status: "生产中",
                type: 3,
                jobs:[
                    {
                        pname: "白短袖纤维36#",
                        planNum: 5000,
                        status: "生产中",
                        id:"",
                        init: 500,//原始值
                        step: 19,//每轮增值
                        max: 2400,//上限
                        bound: 20,//龙门高度
                        sum: 0//小水潭
                    },
                    {
                        pname: "蓝黑短纤维36#",
                        planNum: 2000,
                        status: "生产中",
                        id:"",
                        init: 100,//原始值
                        step: 11,//每轮增值
                        max: 1200,//上限
                        bound: 10,//龙门高度
                        sum: 0//小水潭
                    },
                    {
                        pname: "聚苯乙烯",
                        planNum: 2000,
                        status: "完工",
                        id:"",
                        init: 2000,//原始值
                        step: 0,//每轮增值
                        max: 2000,//上限
                        bound: 10,//龙门高度
                        sum: 0//小水潭
                    }
                ]
            },
            //第七家企业
            {
                ename: "万想制冷",
                info: "",
                deliveryDate: 3,
                status: "生产中",
                type: 3,
                jobs:[
                    {
                        pname: "扎钢板46*15",
                        planNum: 800,
                        status: "生产中",
                        id:"",
                        init: 2,//原始值
                        step: 7.48,//每轮增值
                        max: 750,//上限
                        bound: 7,//龙门高度
                        sum: 0//小水潭
                    }
                ]
            },
            //第十一家企业
            {
                ename: "库存生产",
                info: "",
                deliveryDate: 0,
                status: "完工",
                type: 4,
                jobs:[
                    {
                        pname: "36#聚乙丙烯颜料",
                        planNum: 2000,
                        status: "今日完工",
                        id:"",
                        init: 1200,//原始值
                        step: 0,//每轮增值
                        max: 1200,//上限
                        bound: 50,//龙门高度
                        sum: 0//小水潭
                    },
                    {
                        pname: "42#聚乙丙烯颜料",
                        planNum: 3000,
                        status: "完工",
                        id:"",
                        init: 3000,//原始值
                        step: 0,//每轮增值
                        max: 3000,//上限
                        bound: 50,//龙门高度
                        sum: 0//小水潭
                    }
                ]
            },
            //第十二家企业
            {
                ename: "荆州晋大",
                info: "",
                deliveryDate: 0,
                status: "异常完工",
                type: 4,
                jobs:[
                    {
                        pname: "扎钢板26*15",
                        planNum: 5,
                        status: "今日完工",
                        id:"",
                        init: 5,//原始值
                        step: 0,//每轮增值
                        max: 5,//上限
                        bound: 50,//龙门高度
                        sum: 0//小水潭
                    },
                    {
                        pname: "扎钢板46*15",
                        planNum: 5,
                        status: "异常完工",
                        id:"",
                        init: 2,//原始值
                        step: 0,//每轮增值
                        max: 2,//上限
                        bound: 50,//龙门高度
                        sum: 0//小水潭
                    }
                ]
            },
            //第十三家企业
            {
                ename: "库存生产",
                info: "",
                deliveryDate: 0,
                status: "完工",
                type: 4,
                jobs:[
                    {
                        pname: "扎钢板46*15",
                        planNum: 10,
                        status: "今日完工",
                        id:"",
                        init: 10,//原始值
                        step: 0,//每轮增值
                        max: 10,//上限
                        bound: 50,//龙门高度
                        sum: 0//小水潭
                    },
                    {
                        pname: "扎钢板26*15",
                        planNum: 10,
                        status: "异常完工",
                        id:"",
                        init: 10,//原始值
                        step: 0,//每轮增值
                        max: 10,//上限
                        bound: 50,//龙门高度
                        sum: 0//小水潭
                    }
                ]
            },
        ]
    };
    return MYAPP;
})
