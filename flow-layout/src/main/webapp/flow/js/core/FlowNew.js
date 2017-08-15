Array.prototype.indexOf = function(aNode){
	for(var i=0; i<this.length; i++){
		if(this[i].id == aNode.id){
			return i;
		}
	}
	return -1;
}
function Flow(cavans,id){
	//this.rootNode = null;
	this.endNode = null;
	
	//this.creatFlowByCavans = function (canvas,id){
	this.rootNode = new FlowNode(id,"# ",1);
	this.rootNode.yAxis = (cavans.rows + 1) * 0.5;
	this.rootNode.xAxis = 1;
	this.rootNode.breadth = 1;
	this.rootNode.depth = 0;
	//}
	this.viewFlowByDepth = function(curNode,idsCatch){
		var curId = "#" + curNode.id + "#";
		if(idsCatch.toString().indexOf(curId)<0){
			//////$("#console").append(curNode.toString());
			idsCatch.append(curId);
			var cNodes = curNode.cidArr;
			for(var i=0; i<cNodes.length; i++){
				this.viewFlowByDepth(cNodes[i],idsCatch);
			}	
		}
	}
	/**
	 * 初步设定整棵树的Y轴坐标
	 */
	this.initFlow = function(){
		////$("#console").empty();
		$("#console").empty();
		this.setYaxis(this.rootNode);
		this.setXaxis(this.rootNode,new StringBuffer());
	}
	/**
	 * 调整整棵树Y轴坐标
	 */
	this.adjustFlow = function(){
		var idsCatch = new StringBuffer("#");
		var zttzCatch = new StringBuffer();//记录已经整体调整过的节点
		//this.adjustYaxis(this.rootNode,idsCatch,new StringBuffer(),zttzCatch);
		this.adjustYaxisNew(this.rootNode,idsCatch);
	}
	/**
	 * 设置当前节点子节点的Y轴坐标
	 * 遍历原则：按深度遍历原则，从左侧往右遍历
	 * 注意：不设置当前节点的坐标
	 * 此时节点情况有如下几种
	 * 1.开始节点 当前节点决定子节点坐标
	 * 2.一父一子
	 *   a.根据子节点所有父节点坐标决定子节点坐标
	 * 3.一父多子 当前节点决定子节点坐标
	 * 4.多父一子 当前节点决定子节点坐标
	 * 5.多父多子 当前节点决定子节点坐标
	 * @param curNode
	 */
	 this.setYaxis = function(curNode){
	 	if(curNode.type == -1){
			curNode.yAxis = this.rootNode.yAxis;
			return;
		}
		var cNode = curNode.cidArr;
		var pNode = curNode.pidArr;
		
		var yAxisArr = new Array();
		var nIndex = 0;
		if(cNode.length<=0){
			return;
		}
		if(pNode.length>=1 && cNode.length==1){
			var cNodeTemp = cNode[0];
			//找到子节点的所有父节点，该节点可能只是该子节点的父节点之一
			var ccNode = cNodeTemp.pidArr;
			var yAxisSum = 0.0;
			var N = 0;
			yAxisArr = new Array();
			for(var i=0; i<ccNode.length; i++){
				yAxisSum = yAxisSum + ccNode[i].yAxis;
				N++;
			}
			var yAxis = parseFloat((yAxisSum/N).toFixed(1));
			yAxisArr[0] = yAxis;
		}else{
			var N = cNode.length;
			var startY = curNode.yAxis;
			yAxisArr = new BasicFunction().processChildYaxis(N, startY);
		}
		for(var i=0; i<cNode.length; i++){
			var nextCNode = cNode[i];
			nextCNode.yAxis = yAxisArr[nIndex];
			nIndex ++;
		}
		for(var i=0; i<cNode.length; i++){
			var nextCNode = cNode[i];
			this.setYaxis(nextCNode);
		}
	 }
	 /**
	 *设置x轴坐标
	 **/
	 this.setXaxis = function(curNode,idsCatch){
		var cNodes = curNode.cidArr;
		var newXaxis = curNode.xAxis + 1.0;
		for(var i=0; i<cNodes.length; i++){
			if(newXaxis>=cNodes[i].xAxis){
				//////$("#console").append(cNodes[i].name + " x坐标调整[" +cNodes[i].xAxis +"-->" + newXaxis+"]<br/>");
				cNodes[i].xAxis = newXaxis;
				this.setXaxis(cNodes[i],idsCatch);
			}
		}
	}
	
	this.adjustYaxisNew = function(curNode,idsCatch){
		if(curNode.type == -1){
			return;
		}
		var curId = "#" + curNode.id + "#";
		if(idsCatch.toString().indexOf(curId)<0){
			var cNodes = curNode.cidArr;
			if(cNodes.length>1 && curNode.type !=1){
				var branchStartNode = this.findNearestBrotherPnode(curNode,curNode,new StringBuffer());
				//alert(branchStartNode);
				//当前分支的偏移量
				var yAxisBondsCurNode = new Array();
				yAxisBondsCurNode[0] = curNode.yAxis;
				yAxisBondsCurNode[1] = curNode.yAxis;
				this.yaxisBondPartNew(curNode,yAxisBondsCurNode);
				var yAxisOffsetCurNode = new Array();
				yAxisOffsetCurNode = this.getOffsetAllFlow(curNode,yAxisBondsCurNode);
				
				//alert(yAxisOffsetCurNode);
				if(yAxisOffsetCurNode[0] + yAxisOffsetCurNode[1]>0){
					var yAxisBondsBranchBef = new Array();
					yAxisBondsBranchBef[0] = curNode.yAxis;
					yAxisBondsBranchBef[1] = curNode.yAxis;
					this.findBranchBondsNew(curNode,yAxisBondsBranchBef);
					this.adjustBrotherYaxisNew(curNode,yAxisOffsetCurNode);
				}
			}
			idsCatch.append(curId);
			for(var i=0; i<cNodes.length; i++){
				var nextCNode = cNodes[i];
				this.adjustYaxisNew(nextCNode,idsCatch);
			}
		}else{
			return;
		}
	}
	this.adjustBrotherYaxisNew = function(curNode,offset){
		if(curNode.type ==1){
			return;
		}
		//当前分支的开始父节点
		var branchStartNode = this.findNearestBrotherPnode(curNode,curNode,new StringBuffer());
		//当前分支的偏移量
		/**
		var yAxisBondsCurNode = new Array();
		yAxisBondsCurNode[0] = curNode.yAxis;
		yAxisBondsCurNode[1] = curNode.yAxis;
		this.yaxisBondPartNew(curNode,yAxisBondsCurNode);
		var yAxisOffsetCurNode = offset;
		**/
		//yAxisOffsetCurNode = this.getOffsetAllFlow(curNode,yAxisBondsCurNode);
		var yAxisBondsBranchBef = new Array();
		yAxisBondsBranchBef[0] = curNode.yAxis;
		yAxisBondsBranchBef[1] = curNode.yAxis;
		this.findBranchBondsNew(curNode,yAxisBondsBranchBef);
		$("#console").append("<b style='color:red;'>"+curNode.name +"移动前====["+branchStartNode.name+"],值域["+yAxisBondsBranchBef+"]</b><br/>");
		//$("#console").append("<b>"+curNode.name +"当前偏移量["+offset+"],当前父节点值域["+yAxisBondsCurNode+"]</b><br/>");
		//进行分支的偏移
		if(offset[0] + offset[1]>0){
			//记录开始分支的偏移量
			/**var yAxisBondsStartNodeBef = new Array();
			yAxisBondsStartNodeBef[0] = branchStartNode.yAxis;
			yAxisBondsStartNodeBef[1] = branchStartNode.yAxis;
			this.yaxisBondPartNew(branchStartNode,yAxisBondsStartNodeBef);
			var yAxisOffsetStartNodeBef = new Array();
			yAxisOffsetStartNodeBef = this.getOffsetAllFlow(branchStartNode,yAxisBondsStartNodeBef);
			**/
			//$("#console").append("<b style='color:green;'>开始调整"+curNode.name +"，父节点"+branchStartNode.name+"值域["+yAxisBondsStartNodeBef+"],偏移量["+yAxisOffsetStartNodeBef+"]</b><br/>");
			//$("#console").append("节点" + branchStartNode.name +"子节点信息：" + this.listToString(branchStartNode.cidArr)+"<br/>");
			//确定当前节点在兄弟中的排位
			var cids = this.findCidsStrByNode(curNode);
			var brotherNodes = branchStartNode.cidArr;
			var rank = -1;
			rank = brotherNodes.indexOf(curNode);
			if(rank < 0){
				var flag = true;
				for(var i=0; i<brotherNodes.length; i++){
					var tempNode = brotherNodes[i];
					var aflag = this.isParent(curNode,tempNode);
					flag = flag && aflag;
				}
				if(!flag){
					for(var i=0; i<brotherNodes.length; i++){
						var tempNode = brotherNodes[i];
						var aflag = this.isChild(tempNode,curNode);
						if(aflag){
							rank = i;
						}
					}
				}
			}
			//alert(curNode.name + "-->"+branchStartNode.name+":"+rank);
			if(rank>-1){
				/**
				if(branchStartNode.type == 1){
					var yAxisBondsBranchAft = new Array();
					yAxisBondsBranchAft[0] = curNode.yAxis;
					yAxisBondsBranchAft[1] = curNode.yAxis;
					this.findBranchBonds(curNode,yAxisBondsBranchAft);
					$("#console").append("offset:["+offset+"]-->");
					if(yAxisBondsBranchBef[0] - yAxisBondsBranchAft[0]>0){
						offset[1] = yAxisBondsBranchBef[0] - yAxisBondsBranchAft[0];
					}
					if(yAxisBondsBranchAft[1] - yAxisBondsBranchBef[1]>0){
						offset[0] = yAxisBondsBranchAft[1] - yAxisBondsBranchBef[1];
					}
					$("#console").append(" ["+offset+"]<br/>");
					$("#console").append("<b>分支值域："+curNode.name +"，最初["+yAxisBondsBranchBef+"]，之后["+yAxisBondsBranchAft+"]</b><br/>");
				}**/
				$("#console").append("<b>调整："+curNode.name +"，偏移量["+offset+"]</b><br/>");
				for(var i=0; i<brotherNodes.length; i++){
					var aBrother = brotherNodes[i];
					//调整左兄弟节点
					if(i<rank){
						this.adjustBranchYaxis(aBrother,offset[0],cids,new StringBuffer("#"));
					}
					//调整右兄弟节点
					if(i>rank){
						this.adjustBranchYaxis(aBrother,0-offset[1],cids,new StringBuffer("#"));
					}
				}
			}
			
			//记录调整后开始分支的偏移量
			/**
			var yAxisBondsStartNodeAft = new Array();
			yAxisBondsStartNodeAft[0] = branchStartNode.yAxis;
			yAxisBondsStartNodeAft[1] = branchStartNode.yAxis;
			this.yaxisBondPartNew(branchStartNode,yAxisBondsStartNodeAft);
			var yAxisOffsetStartNodeAft = new Array();
			yAxisOffsetStartNodeAft = this.getOffsetAllFlow(branchStartNode,yAxisBondsStartNodeAft);
			//$("#console").append("<b style='color:red;'>"+curNode.name +"调整后父节点"+branchStartNode.name+"值域["+yAxisBondsStartNodeAft+"],偏移量["+yAxisOffsetStartNodeAft+"]</b><br/>");
			//$("#console").append("节点" + branchStartNode.name +"子节点信息：" + this.listToString(branchStartNode.cidArr)+"<br/>");
			var minusOffset = new Array();
			minusOffset[0] = yAxisOffsetStartNodeAft[0] - yAxisOffsetStartNodeBef[0];
			minusOffset[1] = yAxisOffsetStartNodeAft[1] - yAxisOffsetStartNodeBef[1];
			if(minusOffset[0] + minusOffset[1]>0){
				//if(minusOffset[0] ==0){
				//	minusOffset[0] = offset[0];
				//}
				//if(minusOffset[1] ==0){
				//	minusOffset[1] = offset[1];
				//}
				//if(branchStartNode.type==1){
				//	var branchBeginNode = this.findBranchStart(curNode);
				//	this.adjustBrotherYaxisNew(branchBeginNode,minusOffset);
				//}else{
					this.adjustBrotherYaxisNew(branchStartNode,minusOffset,yAxisBondsBranchBef);
				//}
			}
			**/
			var yAxisBondsBranchAft = new Array();
			yAxisBondsBranchAft[0] = curNode.yAxis;
			yAxisBondsBranchAft[1] = curNode.yAxis;
			this.findBranchBondsNewAft(curNode,yAxisBondsBranchAft);
			//$("#console").append("offset:["+offset+"]-->");
			//if(yAxisBondsBranchBef[0] - yAxisBondsBranchAft[0]>0){
			offset[1] = yAxisBondsBranchBef[0] - yAxisBondsBranchAft[0];
			//}
			//if(yAxisBondsBranchAft[1] - yAxisBondsBranchBef[1]>0){
			offset[0] = yAxisBondsBranchAft[1] - yAxisBondsBranchBef[1];
			//}
			$("#console").append("<b style='color:red;'>"+curNode.name +"移动后====["+branchStartNode.name+"],值域["+yAxisBondsBranchAft+"]</b><br/>");
			if(offset[0] + offset[1]>0){
				this.adjustBrotherYaxisNew(branchStartNode,offset);
			}
		}else{
			return;
		}
	}
}