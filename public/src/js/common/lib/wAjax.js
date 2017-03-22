/*
 * 前后端数据通讯方法
 */
define(['jquery','lib/showMsg'],function($,showError){
	var wAjax = function(settings) {
		function callback(obj) {
			//302
			if(obj.status && obj.status == 302) {
				top.location = obj.url;
			}
			//正常
			else{
				settings.success && settings.success(obj);
			}
		}
		$.ajax({
			url: settings.url || window.location.href,
			type: settings.type || "post",
			async: (settings.async == false) ? false : true,
			data: settings.data,
			cache:false,
			//timeout:30000,
			traditional:settings.traditional || true,
			dataType: "json",
			beforeSend:function(request){request.setRequestHeader("requestType", "ajax");},
			success: callback,
			error: function(xhr, status) {
				console.log(xhr,status);
				var map = {
					"abort": {
						code: -1,
						msg: "网络请求被取消。"
					},
					"parsererror": {
						code: -2,
						msg: "网络返回解析错误。"
					},
					"timeout": {
						code: -3,
						msg: "网络请求超时。"
					},
					"error": {
						code: -4,
						msg: "网络错误。"
					}
				};
				var result = map[status];
				if (!result) {
					result = {
						code: -5,
						msg: "未知的网络错误。"
					};
				}
				showError(result);
				settings.generalError&&settings.generalError(result);
				var error_callback = settings.error || function(){};
				error_callback();
				if(xhr.status > 500){
					document.write(xhr.responseText);
				}
			},
			complete: settings.complete	
		});	
	};
	return wAjax;
});
