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
		$("head").append("<style type='text/css'>ul.tree, .tree ul, .tree li{list-style:none;border:none;}.tree {color: #666666;margin: -2px 0 -2px 10px;padding: 0;}.tree li,.tree li a,.tree li span {padding: 1px 2px 1px 5px;border-radius: 4px;}.tree li a {color:#666666;text-decoration: none;line-height: 20pt;border-radius: 4px;}.tree span {cursor: pointer;}span.tree-ctrl{background: url('images/arrow_expand.png') no-repeat center;color: '#333333';}span.tree-ctrl.tree-contract{background: url('images/arrow_contract.png') no-repeat center;color: '#333333';}span.tree-del:before{content:'x';color: #f0733d;}.tree .active>span, .tree .active>a {color: #3db6fd;}</style>");
		// 树的内容
		var content = (function buildTree(data){
			
			var child = $('<li></li>');
			
			child.attr("data-id", uuid());
			var odiv = $("<div></div>");
			var ack = $("<a href='javascript:;'>" + data.name + "</a>"); // name
			ack.on('click', function(){
				if(onClick) { // 处理点击事件
				    $(".tree div").removeClass("active");
					odiv.addClass("active");
					var isContract = child.children().find("span").hasClass("tree-contract");
					if(onClick) {
						onClick.call(child, child, data.name, child.attr("data-id"), isContract);
					}
				}
			});

			var children = data.children;
			if(children && children.length>0) {
				// 点击展开图标
				var spanIco = $("<span class='tree-ctrl tree-contract'></span>");
				spanIco.on('click', function(){
					odiv.children(".tree-ctrl").toggleClass("tree-contract");
					child.children('ul').toggle();
				});
				odiv.append(spanIco);

				odiv.append(ack);

				// 删除
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
					onDel.call(this, child, data.name, children);
				}
			});	
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