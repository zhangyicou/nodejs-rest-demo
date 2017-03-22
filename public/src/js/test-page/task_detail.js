require(["jquery", "test-page/module/data", "test-page/module/util"], function ($, MYAPP, Util) {

    var procArr = [
        {
            id:".done-proc:eq(0)",//dom id
            init: 6,//原始值
            step: 1.24,//每轮增值
            max: 124,//上限
            bound: 1,//龙门高度
            sum: 0,//小水潭
            total: 157//工序总数
        },
        {
            id:".done-proc:eq(1)",//dom id
            init: 2,//原始值
            step: 0.56,//每轮增值
            max: 56,//上限
            bound: 1,//龙门高度
            sum: 0,//小水潭
            total: 75//工序总数
        },
        {
            id:".done-proc:eq(2)",//dom id
            init: 8,//原始值
            step: 0.25,//每轮增值
            max: 25,//上限
            bound: 1,//龙门高度
            sum: 0,//小水潭
            total: 30//工序总数
        },
    ];
    //制作页面
    (function () {
        var taskId = Util.getUrlPara("taskId"),
            taskItem = MYAPP.list[taskId],
            job, jobArr = [];
        console.dir(taskItem);
        //头部信息
        $("#ename").prepend(taskItem.ename);
        $("#task_status").text(taskItem.status);
        if(taskItem.info){
            $("#task_info").text(taskItem.info).show();
        }

        function getClassByJobStatus(status) {
            var cla = "no";//未开始
            if(status.indexOf("完工") != -1){
                cla = "done";
            }
            if(status === "暂停" || status === "已延误" || status === "延迟启动"){
                cla = "pause";
            }
            if(status === "生产中"){
                cla = "producing";
            }
            return cla;
        }
        //创作一个工单
        function makeItem(item, index) {
            var html = '<div class="item">' +
                '<div class="title">' +
                '<span class="order">'+ (parseInt(index) + 1) +'</span>' +
                '<span class="job-name">'+ item.pname +'</span>' +
                '<span class="status ' + getClassByJobStatus(item.status) + '">'+ item.status +'</span>' +
                '</div>' +
                '<div class="num">' +
                '<div>' +
                '<div class="left">' +
                '<span class="line1">已完成/计划-产品数</span><br>' +
                '<span class="line2"><span class="done done-num">'+ item.init +'</span><span>/</span><span>'+ item.planNum +'</span></span>' +
                '</div>' +
                '</div>' +
                '<div>' +
                '<div class="right">' +
                '<span class="line1">已完成/计划-工序数</span><br>' +
                '<span class="line2"><span class="done done-proc">'+ procArr[index].init +'</span><span>/</span><span class="total-proc">'+ procArr[index].total +'</span></span>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="date">' +
                '<div class="dumbbell"><div class="circle"></div><div class="circle"></div></div>' +
                '<div class="head"><span class="plan">计划</span><span class="real">实际</span></div>' +
                '<div class="body">' +
                '<div class="begin">' +
                '<span class="first">开始</span>' +
                '<span class="plan">'+ Util.getDate(-12) +' 09时</span>' +
                '<span class="real">'+ ((index === 0) ? Util.getDate(-10) : Util.getDate(-12)) +' 09时</span>' +
                '</div>' +
                '<div class="end">' +
                '<span class="first">完工</span>' +
                '<span class="plan">'+ Util.getDate(taskItem.deliveryDate) +' 18时</span>' +
                '<span class="real">'+ ((taskItem.status === "生产中") ? "" : Util.getDate(taskItem.deliveryDate + 1) + " 18时") +'</span>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';
            return html;
        }
        //制作工单列表
        for(var i in taskItem.jobs){
            job = taskItem.jobs[i];
            jobArr.push(makeItem(job, i));
        }
        $("#workshop").append(jobArr.join(""));

        //定时器开始
        setInterval(function () {
            for(var i in taskItem.jobs){
                job = taskItem.jobs[i];
                job.id = ".done-num:eq(" + i +")"
                Util.changeVal(job);
                Util.changeVal(procArr[i]);
            }
        }, 2000);
    })();


})
