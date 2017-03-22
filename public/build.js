({
    appDir:'src/js',
    baseUrl: './',
    paths: {
        common: 'common',
        lib:'common/lib',
        module:'module',
        jquery: 'common/core/jquery/jquery-1.8.3.min',
        "jquery/browser": 'common/core/jquery-plugins/jquery.browser.min',
        zepto:'common/core/zepto-build/zepto.min',
        wxapi: 'common/core/jweixin-1.0.0',
        'wxapi.default.config': 'common/core/wx.default.config',
        hammerjs: 'common/core/hammer-2.0.6/hammer.min',
        'jquery-hammer': 'common/core/hammer-2.0.6/jquery.hammer',
        echarts:'common/core/echarts',
        highcharts: 'common/core/highcharts/highcharts',
        io:'common/core/socket.io',
        fastclick:'common/core/jquery-plugins/fastclick',
        validform:'common/core/Validform_v5.3.2_min',
        fullPage:'common/core/jquery-plugins/jquery.fullpage.min',
        easings:'common/core/jquery-plugins/jquery.easings.min',
        iscroll:'common/core/scrolloverflow.min',
        paginate:'common/core/jquery-plugins/jquery.paginate',
        Layer:'common/layer/layer',
        Laydate:'common/laydate/laydate.dev',
        spellDictNoTone: 'common/core/pinyin_dict_notone',
        spellUtil: 'common/core/pinyinUtil',
        aniNumber: 'common/core/jquery.animateNumber.min'
    },
    shim: {
        highcharts: {
            exports: 'highcharts',
            deps: ['jquery']
        },
        io:{
            exports:'io'
        },
        iscroll:{
            exports:'iscroll'
        },
        fullPage:{
            exports:'fullPage',
            deps:['jquery','iscroll']
        },
        easings:{
            exports:'easings',
            deps:['jquery']
        },
        spellUtil:{
            deps:['spellDictNoTone']
        },
        validform:{
            deps:['jquery']
        },
        aniNumber:{
            deps: ['jquery'],
            exports: 'aniNumber'
        }
    },
    dir: 'dist/js',
    modules: [
        {
            name: 'test-page/index'
        },
        {
            name: 'test-page/task'
        },
        {
            name: 'test-page/task_detail'
        }
    ]
})