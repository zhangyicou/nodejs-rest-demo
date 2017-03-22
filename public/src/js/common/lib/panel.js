/*
 * panel 展开/收缩面板
 * 按钮：class="btn"
 * 面板：class="panel-con"
 */
define(['jquery'],function($){
	$.fn.panel = function(){
		var Panel = function(el){
			this.btn = '.btn';
			this.panel = '.panel-con';
			this.$box = $(el);
			this.status = true;
			this.init();
		};
		Panel.prototype = {
			constructor:Panel,
			init:function(){
				this.setStatus(true);
			},
			getWidth:function(){
				return this.$box.find(this.panel).width();
			},
			setStatus:function(status){
				this.status = status;
				var pos = this.status ? '0px':-this.getWidth()+'px';
				this.$box.animate({'margin-left':pos});
			},
			event:function(){
				var _self = this;
				this.$box.on('click',this.btn,function(){
					_self.status = !(_self.status);
					_self.setStatus(_self.status);
				});
			}
		};
		$(this).each(function(){
			var p = new Panel(this);
			p.event();
		});
	};
});
