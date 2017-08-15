function Cavans(){
	this.cols = 31;
	this.rows = 31;
	this.detail = new Map();
	
	this.init = function(flow){
		//$(".flow").each(function(){
			//$(this).remove();
		//});
		$("#canvas").empty();
		this.detail = new Map();
		var root = flow.rootNode;
		this.viewFlowByDepth(root,new StringBuffer("#")); 
	}
	this.show = function(){
		var idsCatch = new StringBuffer();
		var jg_doc = new jsGraphics("canvas");
		jg_doc.clear();
		for(var y=this.rows; y>=1; y=y-0.25){
			if(y%1 ==0){
				jg_doc.setColor("#000000");
				jg_doc.drawString(y, 0,(this.rows - y)*40-15);
				jg_doc.setColor("#999999");
				jg_doc.drawLine(0,(y-1)*40,this.cols*80,(y-1)*40);
			}else{
				jg_doc.setColor("#dddddd");
				jg_doc.drawLine(0,(y-1)*40,this.cols*80,(y-1)*40);
			}
		}
		for(var x=1; x<=this.cols; x=x+0.25){
			if(x%1 == 0){
				jg_doc.setColor("#000000");
				jg_doc.drawString(x, (x)*80,0);
				jg_doc.setColor("#999999");
				jg_doc.drawLine((x-1)*80,0,(x-1)*80,(this.cols-1)*40);
			}else{
				jg_doc.setColor("#dddddd");
				jg_doc.drawLine((x-1)*80,0,(x-1)*80,(this.cols-1)*40);
			}
		}
		jg_doc.paint();
		for(var y=this.rows; y>=1; y=y-0.25){
			var print = "* ";
			//jg_doc.drawLine((x-1)*80,(y-1)*40,(x-1)*80,top);
			for(var x=1; x<=this.cols; x=x+0.25){
				var key = "COOR_" + x +"_" + y;
				var flowNode = this.detail.get(key);
				if(flowNode!=null){
					var flowName = flowNode.name;
					if(flowName.length <2){
						flowName = flowName +" ";
					}
					var left = x*80;
					var top = (this.rows-y)*40;
					//alert(flowNode.toString());
					$("#canvas").append("<div class='flow' nodeid='"+flowNode.id+"' xAxis='"+flowNode.xAxis+"' yAxis='"+flowNode.yAxis+"' onclick='clickToAddChild(this)' style='z-index:999;width:60px;height:20px;position:absolute;left:"+left+"px;top:"+top+"px;'>"+flowName+"</div>");
					jg_doc.setColor("#000000");
					jg_doc.drawString("["+x+","+y+":"+flowNode.id+"]", left, top-15);
					var cNodes = flowNode.cidArr;
					var curId = "#" + flowNode.id + "#";
					if(idsCatch.toString().indexOf(curId)<0){
						idsCatch.append(curId);
						for(var i=0; i<cNodes.length; i++){
							//var a = setTimeout(function(cNodes,i){
							var cXaxis = cNodes[i].xAxis;
							var cYaxis = cNodes[i].yAxis;
							var left2 = cXaxis*80;
							var top2 = (this.rows-cYaxis)*40;
							var x1 = left+35;
							var y1 = top+10;
							var x2 = left2+5;
							var y2 = top2+10;
							if(cNodes.length==1){
								jg_doc.setColor("#BF1E1B");
								jg_doc.drawLine(x1,y1,x2,y1);
								jg_doc.setColor("#BF1E1B");
								jg_doc.drawLine(x2,y1,x2,y2);
							}else{
								jg_doc.setColor("#BF1E1B");
								jg_doc.drawLine(x1,y2,x2,y2);
								//setTimeout(function(){jg_doc.paint();},1000);
								jg_doc.setColor("#BF1E1B");
								jg_doc.drawLine(x1,y1,x1,y2);
							}
								//jg_doc.paint();
							//},500);
						}
					}
				}else{
					//document.write(print);
				}
			}
			//document.write(y + "<br/>");
		}
		jg_doc.paint();
	}
	this.viewFlowByDepth = function(curNode,ids){
		var curId = "#" + curNode.id + "#";
		var coor = "COOR_" + curNode.xAxis +"_" + curNode.yAxis;
		if(ids.toString().indexOf(curId)<0){
			this.detail.put(coor, curNode);
			ids.append(curId);
			var cNodes = curNode.cidArr;
			for(var i=0; i<cNodes.length; i++){
				var nextCNode = cNodes[i];
				this.viewFlowByDepth(nextCNode,ids);
			}
		}
		return;
	}
}