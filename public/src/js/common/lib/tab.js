/*
 * panel 展开/收缩面板
 * 按钮：class="btn"
 * 面板：class="panel-con"
 */
define(['jquery'],function($){
	$.fn.tab = function(callback){
		var Tab = function(el){
			this.$box = $(el);
			this.$btn = this.$box.find('.tab-btn');
			this.$con = this.$box.find('.tab-con');
		};
		Tab.prototype = {
			constructor:Tab,
			event:function(){
				var _self = this;
				this.$btn.on('click','.item',function(){
					var index = $(this).index();
					_self.$btn.find('.item').removeClass('on');
					$(this).addClass('on');
					_self.$con.find('.item').removeClass('on');
					_self.$con.find('.item').eq(index).addClass('on');
					callback ? callback(index) : function(){};
				});
			}
		};
		$(this).each(function(){
			var p = new Tab(this);
			p.event();
		});
	};
});
