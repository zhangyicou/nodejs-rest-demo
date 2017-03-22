require(["jquery", "test-page/module/data", "test-page/module/util"], function ($, MYAPP, Util) {

    //当日、当周、当月-点击-色彩变化
    $('.tab-btn').on("click", "li", function () {
        $(this).siblings().removeClass()//兄弟们请变蓝
                .end().addClass("cur");//换我来变白色
    });

    //js绘制任务列表
    (function () {
        //计算日期
        // function getDate(val) {
        //     val = val * 24 * 60 * 60 * 1000;
        //     var date = new Date(Date.now() + val);
        //     return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("/");
        // }
        //一个任务下的工单列表
        function makeJobs(jobs) {
            var jobArr = [], jobHTML, job, i = 1;
            for(var index in jobs){
                 job = jobs[index];
                 jobHTML =
                    '       <div class="job">'+
                    '           <span class="order">'+(i++)+'</span>'+
                    '           <span class="job-name">'+job.pname+'</span>'+
                    '           <div class="progress">'+
                    '               <div class="num-part"><span class="done">'+job.init+'</span>/'+job.planNum+'</div>'+
                    '               <div class="bar-back"><div class="bar-face" style="width:'+ (job.init / job.planNum * 100) +'%"></div></div>'+
                    '           </div>'+
                    '       </div>';
                jobArr.push(jobHTML);
            }
            return '<div class="body">' + jobArr.join("") + '</div>';
        }
        //一个任务
        function makeTask(item, id) {
            var taskHTML =
                '<div class="item"><a href="task_detail.html?taskId=' + id + '">'+
                '   <div class="head">'+
                '       <span class="ename">'+ item.ename +'</span>' + (item.info ? '<span class="info">' + item.info + '</span>' : '') +
                '   </div>'+ makeJobs(item.jobs) +
                '   <div class="foot">'+
                '       <span class="delivery-date">交货日期:' + Util.getDate(item.deliveryDate) + '</span><span class="status">'+ item.status + '</span>'+
                '  </div>'+
                '</a></div>';
            return taskHTML;
        }
        //全部任务添加到页面
        var taskArr = [];
        for(var index in MYAPP.list){
            var item = MYAPP.list[index];
            taskArr.push(makeTask(item, index))
        }
        $("#list").append(taskArr.join(""));

    })();

    //良品汇总
    function sumGoodNum() {
        var goodSum = 1024,
            minus = 0,
            task, job;
        $(".done").each(function () {
            goodSum += parseInt($(this).text());
        })
        for(var i in MYAPP.list){
            task = MYAPP.list[i];
            for(var j in task.jobs){
                job = task.jobs[j];
                minus += job.init;
            }
        }
        $("#good_num").text(goodSum - minus);
    }
    //蓝色头部变化
    function headerChange() {
        Util.changeVal(MYAPP.bad);
        Util.changeVal(MYAPP.garbage);
        Util.changeVal(MYAPP.achieve, function ($ele) {
            $ele.parent().prev().find("i").width($ele.text() + "%");
        });
        //良品汇总
        sumGoodNum();
    }
    //任务列表的变化
    function taskListChange(list) {
        var counter = 0, task, job;
        for(var i in list){
            task = list[i];
            for(var j in task.jobs){
                job = task.jobs[j];
                job.id = ".done:eq(" + (counter++) + ")";
                Util.changeVal(job, function ($ele) {
                    $ele.parent().next().find(".bar-face").width(parseInt($ele.text()) / job.planNum * 100 + "%");
                })
            }
        }
    }
    //总定时
    setInterval(function () {
        headerChange();//头部变化
        taskListChange(MYAPP.list);//任务列表变化
    }, 2000)

})
