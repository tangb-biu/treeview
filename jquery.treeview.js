/**
 *
 *  jquery 树形插件
 *
 */

(function($){

	/**
	 *
	 * opt: {
	 	data : {
			name:'',
			id: '', //内部生成
			children: [
				{
					name:'',
					id: '', //内部生成
					children: []
				}
			]
		},
		onClick: function(jqdom, name, id, status) {},
		
		onDel: function(jqdom, name, children){}
	 }
	 */
	var uuid = function(){
	    return "xxxxxxxx-xxxx-yxxx-xxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(v){
	        var w = Math.random()*16 | 0;
	        w = v == 'x' ? w : (w & 0x03 | 0x08);
	        return w.toString(16);
	    }).toUpperCase();
	}

	var treeView = function ( opt ) {
		// 树根
		var root = $("<ul class='tree'></ul>");
		// 是否配置了点击事件
		var onClick = opt.onClick;
		// 是否配置了删除事件
		var onDel = opt.onDel;

		// 树的内容
		var content = (function buildTree(data){
			
			var child = $('<li></li>');
			
			child.attr("data-id", uuid());
			var odiv = $("<div></div>");
			var ack = $("<a href='javascript:;'>" + data.name + "</a>"); // name
			ack.on('click', handlerClick);

			function handlerClick(e) {
				$(".tree div").removeClass("active");
				odiv.addClass("active");
				odiv.children(".tree-ctrl").toggleClass("tree-contract");
				var isContract = child.children().find("span").hasClass("tree-contract");
				child.children('ul').toggle();
				if(onClick) { // 处理点击事件
					onClick.call(child, child, data.name, child.attr("data-id"), isContract);
				}
			}
			var children = data.children;
			if(children && children.length>0) {
				// 点击展开图标
				var spanIco = $("<span class='tree-ctrl tree-contract'></span>");
				spanIco.on('click', handlerClick);
				odiv.append(spanIco);

				odiv.append(ack);

				// 删除
				var dele = $("<span class='tree-del' title='删除'></span>");
				dele.hide();
				odiv.append(dele);
				odiv.on('mouseover', function() {
					dele.show();
				})
				odiv.on('mouseout', function(){
					dele.hide();
				})
				dele.on('click', function () {
					if(onDel) {
						onDel.call(this, onDel, data.name, children);
					}
				});	
				var ul = $("<ul class='tree'></ul>");
				ul.hide();
				for(var i=0; i<children.length; i++) {
					ul.append(buildTree(children[i]));
				}
				child.append(odiv);
				child.append(ul);
			}else {
				var spanIco = $("<span class='tree-place'></span>");
				odiv.append(ack);
				odiv.append(spanIco);
				child.append(odiv);
			}

			return child;
		}(opt.data));

		root.append(content);
		this.append(root);
		return this;
	}

	$.fn.extend({
		treeView: treeView
	})
}(jQuery))