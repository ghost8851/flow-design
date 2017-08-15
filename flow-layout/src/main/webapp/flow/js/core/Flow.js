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
		this.findBrotherBonds(curNode,yAxisBondsBranchBef);
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
			this.findBrotherBonds(curNode,yAxisBondsBranchAft);
			//$("#console").append("offset:["+offset+"]-->");
			//if(yAxisBondsBranchBef[0] - yAxisBondsBranchAft[0]>0){
			
			//}
			//if(yAxisBondsBranchAft[1] - yAxisBondsBranchBef[1]>0){
			if(rank == 0){
				offset[1] = yAxisBondsBranchBef[0] - yAxisBondsBranchAft[0];
			}else if(rank == brotherNodes.length-1){
				offset[0] = yAxisBondsBranchAft[1] - yAxisBondsBranchBef[1];
			}else{
				offset[0] = yAxisBondsBranchAft[1] - yAxisBondsBranchBef[1];
				offset[1] = yAxisBondsBranchBef[0] - yAxisBondsBranchAft[0];
			}
			//}
			$("#console").append("<b style='color:red;'>"+curNode.name +"移动后====["+branchStartNode.name+"],值域["+yAxisBondsBranchAft+"]</b><br/>");
			if(offset[0] + offset[1]>0){
				this.adjustBrotherYaxisNew(branchStartNode,offset);
			}
		}else{
			return;
		}
	} 
	/**
	 * 根据流程图结构动态的去调整各个节点Y轴坐标，去掉交叉及重复
	 * 遍历原则：按深度优先原则，从左侧遍历
	 * 条件：
	 * 1.该节点有多个子节点，且子节点坐标超出了改节点所在分支的，并且位置是处于该节点之前的节点的坐标范围
	 * 2.偏移量=超出范围个数*0.5
	 * 3.左（上）兄弟节点+偏移量，右（下）兄弟节点-偏移量
	 * 特殊情况：
	 * @param idsCatch 已处理的id节点缓存，防止一个节点多次处理
	 * @param curNode 当前节点
	 * @param flag false 代表第一次整体初始化整棵树，flag true 代表树已经初始化过，后来新增节点时，flag为true
	 * @param zttzCatch 记录已经整体调整过的节点id
	 */
	this.adjustYaxis = function (curNode,idsCatch,partIdsCatch,zttzCatch){
		if(curNode.type == -1){
			return;
		}
		var curId = "#" + curNode.id + "#";
		if(idsCatch.toString().indexOf(curId)<0){
			var cNodes = curNode.cidArr;
			var yAxisBonds = new Array();
			var yAxisBondsPart = new Array();
			//如果该节点有子节点，则找到该节点Y坐标范围，然后进行左右兄弟节点坐标的偏移调整
			if(cNodes.length>1 && curNode.type !=1){
				//最大分支Y轴坐标范围
				yAxisBonds[0] = curNode.yAxis;
				yAxisBonds[1] = curNode.yAxis;
				this.yaxisBond(curNode,yAxisBonds);
				var offsetBonds = this.getOffsetAllFlow(curNode,yAxisBonds);
				
				//该节点前面的坐标范围
				//该节点后面的坐标范围，该节点的子节点不能参与计算
				//if(curNode.pidArr.length>1){
				//	var branchEndNodeTemp = this.findBranchEnd(curNode);
				//	for(var k=0; k<curNode.cidArr.length; k++){
				//		var sunZi = curNode.cidArr[k].cidArr;
				//		for(var m=0; m<sunZi.length; m++){
				//			this.yaxisBondAfter(sunZi[m],branchEndNodeTemp,yAxisBonds);
				//		}
				//	}
				//}
				var pids = this.findPidsStrByNode(curNode);
				var cids = this.findCidsStrByNode(curNode);
				//超出坐标范围，需要整颗树调整
				var flag = false;
				if((offsetBonds[0] + offsetBonds[1] )>0){
					flag = true;
					zttzCatch.append(curId);
					$("#console").append("<b style='color:red;'>========" + curNode.name + "========开始整体调整：之前坐标范围：" + yAxisBonds +" 偏移量：[" + offsetBonds +"]</b><br/>");
					var cIdsCatch = new StringBuffer();
					var ccIdsCatch = new StringBuffer();
					//先整体调整
					this.adjustBrotherYaxis(curNode,offsetBonds,pids,cids,cIdsCatch,ccIdsCatch);
					$("#console").append("<b style='color:red;'>========"+curNode.name+"========整体调整完毕</b><br/>");
				}
				var branchStartNode = this.findNearestBrotherPnode(curNode,curNode,new StringBuffer());
				//找到当前分支的结束节点
				if(branchStartNode!=null){
					//当前最小分支Y轴坐标范围
					yAxisBondsPart[0] = curNode.yAxis;
					yAxisBondsPart[1] = curNode.yAxis;
					this.yaxisBondPart(curNode,branchStartNode,yAxisBondsPart);
					var partOffsetBonds = this.getOffsetAllFlow(curNode,yAxisBondsPart);
					partOffsetBonds[0] = partOffsetBonds[0] - offsetBonds[0];
					partOffsetBonds[1] = partOffsetBonds[1] - offsetBonds[1];
					if(partOffsetBonds[0]<0){
						partOffsetBonds[0] = 0;
					}
					if(partOffsetBonds[1]<0){
						partOffsetBonds[1] = 0
					}
					this.adjustBrotherYaxisPartNew(curNode,pids,cids,yAxisBondsPart,partOffsetBonds,new StringBuffer(),idsCatch, new StringBuffer(),flag,offsetBonds,zttzCatch);
				}
			}
			idsCatch.append(curId);
			for(var i=0; i<cNodes.length; i++){
				var nextCNode = cNodes[i];
				this.adjustYaxis(nextCNode,idsCatch,partIdsCatch,zttzCatch);
			}
		}
	}
	/**
	 * 调整兄弟节点Y轴坐标，该节点的父节点数量，决定如何调整该节点的兄弟节点偏移量，
	 * 跟该节点子节点无关，该节点子节点只决定偏移量，已计算出
	 * 节点类型
	 * 1.无父亲节点（开始节点）
	 * 2.一个父亲节点
	 * 3.多父亲节点 
	 * 
	 * 只有是当前节点的直接或间接父节点那么不进行偏移，否则必须进行偏移
	 * @param curNode 当前节点
	 * @param offset 偏移量
	 * @param pids 引发调整的节点所有父亲节点id串
	 * @param idsCatch 已处理的id节点缓存，防止一个节点多次处理
	 */
	this.adjustBrotherYaxis = function(curNode,offset,pids,cids,idsCatch,ccIdsCatch){
		if(curNode.type == 1){
			return;
		}
		var curId = "#" + curNode.id + "#";
		if(idsCatch.toString().indexOf(curId)<0){
			////$("#console").append(curNode.name+",直接或间接父节点，不需要调整==" + pids +"<br/>");
			idsCatch.append(curId);
			var pNodes = curNode.pidArr;
			for(var i=0; i<pNodes.length; i++){
				var pNode = pNodes[i];
					//找到兄弟节点
				var brotherNodes = pNode.cidArr;
				//当前节点在兄弟中的排行
				var curRank = brotherNodes.indexOf(curNode);
				var isLastOrFrist = false;
				if(curRank ==0 || curRank == (brotherNodes.length-1)){
					isLastOrFrist = true;
				}
				for(var j=0; j<brotherNodes.length; j++){
					var aBrother = brotherNodes[j];
					var brotherId = "#" + aBrother.id +"#";
					//当前节点是否间接为引发调整节点的父亲节点，如果是则不调整该节点
					if(pids.indexOf(brotherId)<0){
						if(isLastOrFrist){
							if(j<curRank){
								//左兄弟节点
								this.adjustBranchYaxis(aBrother,offset[0],cids,ccIdsCatch);
							}else if(j>curRank){
								//右兄弟节点
								this.adjustBranchYaxis(aBrother,0-offset[1],cids,ccIdsCatch);
							}
						}else{
							if(j<curRank){
								this.adjustBranchYaxis(aBrother,offset[0],cids,ccIdsCatch);
							}else if(j>curRank){
								//右兄弟节点
								this.adjustBranchYaxis(aBrother,0-offset[1],cids,ccIdsCatch);
							}
						}
					}
				}
				this.adjustBrotherYaxis(pNode,offset,pids,cids,idsCatch,ccIdsCatch);
			}
		}
	}
	this.adjustBrotherYaxisPartNew = function(curNode,pids,cids,yAxisBondsPart,partOffsetBonds,ccIdsCatch,outCatch,curCatch,flag,offsetBonds,zttzCatch){
		if(curNode.type == 1){
			return;
		}
		var curId = "#" + curNode.id + "#";
		if(curCatch.toString().indexOf(curId)<0){
			curCatch.append(curId);
			//找到当前分支的开始节点
			var branchStartNode = this.findNearestBrotherPnode(curNode,curNode,new StringBuffer());
			if(branchStartNode == null || branchStartNode.type ==1){
				return;
			}
			var branchEndNode = this.findNearestBrotherCnode(curNode,curNode,new StringBuffer());
			var branchStartNodeFather = this.findNearestBrotherPnode(branchStartNode,branchStartNode,new StringBuffer());
			var isRootFlag = false;
			if(branchStartNodeFather!=null && branchStartNodeFather.type == 1){
				isRootFlag = true;
			}
			/**
			* 记录当前分支的值边界
			**/
			$("#console").append("<b style='color:green;'>"+curNode.name +"分支开始"+branchStartNode.name+"，结束"+branchEndNode.name+" 偏移量：[" + partOffsetBonds+"]</b><br/>");
			$("#console").append("<b style='color:green;'>########"+curNode.name+"########开始局部调整：" + curNode.name +" 偏移量：[" + partOffsetBonds+"]</b><br/>");
			//方式2 ，原理同整体调整
			var branchBeginNode = this.findBranchStart(curNode);
			var branchBondsBefore = new Array();
			branchBondsBefore[0] = branchStartNode.yAxis;
			branchBondsBefore[1] = branchStartNode.yAxis;
			var branchOffsetBefore = new Array();
			this.yaxisBond(branchStartNode,branchBondsBefore);
			branchOffsetBefore = this.getOffsetAllFlow(branchStartNode,branchBondsBefore);
			$("#console").append("<b>" + curNode.name + "局部调整 前===["+branchStartNode.name+"] 的值域：" +  "[" + branchBondsBefore + "]，子节点：" + this.listToString(branchStartNode.cidArr) +",整体偏移量-->[" + branchOffsetBefore +"]</b><br/>");
			//调整前局部分支的局部调整偏移量
			var branchBondsPartBefore = new Array();
			branchBondsPartBefore[0] = branchStartNode.yAxis;
			branchBondsPartBefore[1] = branchStartNode.yAxis;
			var branchOffsetPartBefore = new Array();
			/**
			* 先开始局部范围调整
			**/
			if(branchStartNode != null && branchStartNode.type !=1){
				//return;
				//$("#console").append("<b style='color:green;'>"+curNode.name +"分支开始"+branchStartNode.name+"，结束"+branchEndNode.name+"</b><br/>");
				var brotherNodes = branchStartNode.cidArr;
				//当前节点在兄弟中的排行
				var curRank = brotherNodes.indexOf(curNode);
				if(curRank<0){
					for(var i=0;i<brotherNodes.length; i++){
						var tempNode = brotherNodes[i];
						var aflag = this.isChild(tempNode,curNode);
						if(aflag){
							curRank = i;
							break;
						}
					}
				}
				var isLastOrFrist = false;
				if(curRank ==0 || curRank == (brotherNodes.length-1)){
					isLastOrFrist = true;
				}
				/**
				* 开始局部调整
				**/
				for(var i=0; i<brotherNodes.length; i++){
					var aBrother = brotherNodes[i];
					var brotherId = "#" + aBrother.id +"#";
					if(pids.indexOf(brotherId)<0){
						if(isLastOrFrist){
							if(i<curRank){
								//左兄弟节点
								this.adjustBranchYaxisPart(aBrother,branchEndNode,cids,partOffsetBonds[0],ccIdsCatch,outCatch);
							}else if(i>curRank){
								//右兄弟节点
								this.adjustBranchYaxisPart(aBrother,branchEndNode,cids,0-partOffsetBonds[1],ccIdsCatch,outCatch);
							}
						}else{
							if(i<curRank){
								//左兄弟节点
								this.adjustBranchYaxisPart(aBrother,branchEndNode,cids,partOffsetBonds[0],ccIdsCatch,outCatch);
							}else if(i>curRank){
								//右兄弟节点
								this.adjustBranchYaxisPart(aBrother,branchEndNode,cids,0-partOffsetBonds[1],ccIdsCatch,outCatch);
							}
						}
					}
				}
			}
			/**
			* 记录局部调整后分支值域的范围，如果值域发生变化，则需要整体调整
			**/
			//方式2 原理同整体调整
			var branchBondsAfter = new Array();
			var branch
			branchBondsAfter[0] = branchStartNode.yAxis;
			branchBondsAfter[1] = branchStartNode.yAxis;
			this.yaxisBond(branchStartNode,branchBondsAfter);
			var branchOffsetAfter = new Array();
			branchOffsetAfter = this.getOffsetAllFlow(branchStartNode,branchBondsAfter);
			var branchOffsetReal = new Array();
			var tempId = "#" + branchStartNode.id + "#";
			$("#console").append("<b style='color:red'>整体调整节点缓存：" + zttzCatch.toString()+"</b><br/>");
			if(zttzCatch.toString().indexOf(tempId)>=0){
				branchOffsetReal[0] = branchOffsetAfter[0] - (branchOffsetBefore[0] + offsetBonds[0]);
				branchOffsetReal[1] = branchOffsetAfter[1] - (branchOffsetBefore[1] + offsetBonds[1]);
			}else{
				zttzCatch.append(tempId);
				branchOffsetReal[0] = branchOffsetAfter[0] - (offsetBonds[0]);
				branchOffsetReal[1] = branchOffsetAfter[1] - (offsetBonds[1]);
			}
			if(branchOffsetReal[0] < 0){
				branchOffsetReal[0] = 0;
			}
			if(branchOffsetReal[1] < 0){
				branchOffsetReal[1] = 0;
			}
			$("#console").append("<b>"+curNode.name + "局部调整 后===["+branchStartNode.name+"] 的值域：" +  "[" + branchBondsAfter + "]" +",子节点："+this.listToString(branchStartNode.cidArr)+"整体偏移量-->[" + branchOffsetAfter +"],已经进行的整体偏移量["+offsetBonds+"],需要整体偏移量：["+branchOffsetReal+"]</b><br/>");
			/**
			* 更新父节点的局部偏移量，判断父节点是否需要偏移
			**/
			if(branchOffsetReal[0] + branchOffsetReal[1] >0){
				if(isRootFlag){
					$("#console").append(branchStartNode.name + "分支的起始节点为跟节点，因此进行整体调整！<br/>");
					this.adjustBrotherYaxis(branchStartNode,branchOffsetReal,pids,cids,new StringBuffer(),new StringBuffer());
				}else{
					$("#console").append(branchStartNode.name + "分支的起始节点不是跟节点，因此只针对根节点【"+branchBeginNode.name+"】进行整体调整！<br/>");
					this.adjustBrotherYaxis(branchBeginNode,branchOffsetReal,pids,cids,new StringBuffer(),new StringBuffer());
				}
				flag = true;
				//if(offsetBonds[0] + offsetBonds[1] <=0){
				//	$("#console").append("<b style='color:yellow;'>更新总体偏移量,从["+offsetBonds+"]-->["+branchOffsetReal+"]</b><br/>");
				//	this.adjustBrotherYaxis(branchStartNode,branchOffsetReal,pids,cids,new StringBuffer(),new StringBuffer());
					//this.adjustBrotherYaxisPartNew(branchStartNode,pids,cids,yAxisBondsPart,partOffsetBonds,ccIdsCatch,outCatch,curCatch,flag,branchOffsetReal,zttzCatch);
				//}else{
					this.adjustBrotherYaxisPartNew(branchStartNode,pids,cids,yAxisBondsPart,partOffsetBonds,ccIdsCatch,outCatch,curCatch,flag,offsetBonds,zttzCatch);
				//}
				
			}else{
				if(flag){
					this.adjustBrotherYaxisPartNew(branchStartNode,pids,cids,yAxisBondsPart,partOffsetBonds,ccIdsCatch,outCatch,curCatch,flag,offsetBonds,zttzCatch);
				}
			}
			$("#console").append("<b style='color:green;'>########" + curNode.name+"########局部调整完毕</b><br/>");
		}
	}
	/**
	 * 当前节点所处最大分支，并且位置是处于该节点之前的节点的坐标范围
	 * @param curNode 当前处理节点
	 * @param rtArr    递归返回后，用来存储yAxisMax和yAxisMin 的数组，供其他代码调用
	 */
	this.yaxisBond = function(curNode, rtArr){
		if(curNode.type == 1){
			return;
		}
		var yAxis = curNode.yAxis;
		if(yAxis>rtArr[1]){
			rtArr[1] = yAxis;
		}
		if(yAxis<rtArr[0]){
			rtArr[0] = yAxis;
		}
		//递归退出条件，递归到起始节点，递归结束
		
		var pNodes = curNode.pidArr;
		for(var i=0; i<pNodes.length; i++){
			var pNode = pNodes[i];
			this.yaxisBond(pNode,rtArr);
		}
	}
	/**
	 * 当前节点所处最大分支，并且位置是处于该节点之前的节点的坐标范围
	 * @param curNode 当前处理节点
	 * @param rtArr    递归返回后，用来存储yAxisMax和yAxisMin 的数组，供其他代码调用
	 */
	this.yaxisBondNoneClueCurNode = function(curNode, rtArr){
		if(curNode.type == 1){
			return;
		}
		//递归退出条件，递归到起始节点，递归结束
		
		var pNodes = curNode.pidArr;
		for(var i=0; i<pNodes.length; i++){
			var pNode = pNodes[i];
			var yAxis = pNode.yAxis;
			if(yAxis>rtArr[1]){
				rtArr[1] = yAxis;
			}
			if(yAxis<rtArr[0]){
				rtArr[0] = yAxis;
			}
			this.yaxisBondNoneClueCurNode(pNode,rtArr);
		}
	}
	/**
	 * 当前节点所处最小分支，并且位置是处于该节点之前的节点的坐标范围
	 * @param curNode
	 * @param rtArr
	 */
	this.yaxisBondPart = function(curNode, endNode, rtArr){
		if(curNode.type == 1 || (curNode.id == endNode.id)){
			return;
		}
		var yAxis = curNode.yAxis;
		if(yAxis>rtArr[1]){
			rtArr[1] = yAxis;
		}
		if(yAxis<rtArr[0]){
			rtArr[0] = yAxis;
		}
		//递归退出条件，递归到起始节点，递归结束
		var pNodes = curNode.pidArr;
		for(var i=0; i<pNodes.length; i++){
			var pNode = pNodes[i];
			this.yaxisBondPart(pNode,endNode,rtArr);
		}
	}
	this.yaxisBondPartNew = function(curNode, rtArr){
		var branchStartNode = this.findNearestBrotherPnode(curNode,curNode,new StringBuffer());
		this.yaxisBondPart(curNode, branchStartNode, rtArr);
	}
	/**
	 * 计算节点子节点的偏移量
	 * @return
	 */
	this.getOffsetAllFlow = function(curNode, yAxisBonds){
		var offsetBonds = new Array();
		offsetBonds[0] = 0.0;
		offsetBonds[1] = 0.0;
		var offset = 0.0;
		var cNodes = curNode.cidArr;
		var maxY = curNode.yAxis;
		var minY = curNode.yAxis;
		for(var i=0; i<cNodes.length; i++){
			var aNode = cNodes[i];
			var cNodeYAxis = aNode.yAxis;
			if(cNodeYAxis>maxY){
				maxY = cNodeYAxis;
			}
			if(cNodeYAxis<minY){
				minY = cNodeYAxis;
			}
		}
		//$("#console").append(curNode.name+"子节点范围[" + minY + "," + maxY+"]<br/>");
		if(maxY>yAxisBonds[1]){
			offset = maxY-yAxisBonds[1];
			//offset =  maxY-curNode.yAxis;
			offsetBonds[0] = offset;
		} 
		if(minY<yAxisBonds[0]){
			offset = yAxisBonds[0]-minY;
			//offset = curNode.yAxis - minY;
			offsetBonds[1] = offset;
		}
		if(offsetBonds[0] == 0 && offsetBonds[1]== 0){
			return offsetBonds;
		}else{
			//if(offsetBonds[0] == 0){
				//var offsetBondsT = (offsetBonds[0] + offsetBonds[1])*0.5;
				//offsetBonds[0] = offsetBondsT;
				//offsetBonds[1] = offsetBondsT;
			//}
			//if(offsetBonds[1] == 0){
				//varoffsetBonds[1] =  (offsetBonds[0] + offsetBonds[1])*0.5;
			//}
			//if(offsetBonds[0]%0.5 != 0){
			//	offsetBonds[0] = offsetBonds[0] + 0.25;
			//}
			//if(offsetBonds[1]%0.5 != 0){
			//	offsetBonds[1] = offsetBonds[1] + 0.25;
			//}
			return offsetBonds;
		}
	}
	/**
	 * 计算一个节点的偏移量
	 * @return
	 */
	this.getOffsetByOneNode = function(curNode, yAxisBonds){
		var offsetBonds = new Array();
		offsetBonds[0] = 0.0;
		offsetBonds[1] = 0.0;
		var offset = 0.0;
		var aYaxis = curNode.yAxis;
		////$("#console").append(curNode.name+"子节点范围[" + minY + "," + maxY+"]<br/>");
		if(aYaxis>yAxisBonds[1]){
			offset = aYaxis-yAxisBonds[1];
			//offset =  maxY-curNode.yAxis;
			offsetBonds[0] = offset;
		} 
		if(aYaxis<yAxisBonds[0]){
			offset = yAxisBonds[0]-aYaxis;
			//offset = curNode.yAxis - minY;
			offsetBonds[1] = offset;
		}
		if(offsetBonds[0] == 0 && offsetBonds[1]== 0){
			return offsetBonds;
		}else{
			//if(offsetBonds[0] == 0){
			//	offsetBonds[0] = offsetBonds[1];
			//}
			//if(offsetBonds[1] == 0){
			//	offsetBonds[1] =  offsetBonds[0];
			//}
			//if(offsetBonds[0]%0.5 != 0){
			//	offsetBonds[0] = offsetBonds[0] + 0.25;
			//}
			//if(offsetBonds[1]%0.5 != 0){
			//	offsetBonds[1] = offsetBonds[1] + 0.25;
			//}
			return offsetBonds;
		}
	}
	/**
	 * 
	 * @param curNode
	 * @param offset
	 * @param idsCatch 记录已经遍历过的节点，防止重复操作
	 */
	this.adjustBranchYaxis = function(curNode,offset,cids,idsCatch){
		if(offset == 0){
			return;
		}
		if(curNode.type == -1){
			return;
		}
		var curNodeId = "#"+curNode.id+"#";
		//如果该节点有多个父节点，则在递归过程中，会被查找多次，因此要处理
		if(idsCatch.toString().indexOf(curNodeId)<0){
			idsCatch.append(curNodeId);
			if(cids.indexOf(curNodeId)<0){
				var newYaxis = curNode.yAxis + offset;
				//$("#console").append("整体调整：" + curNode.name + "[" + curNode.yAxis +"->" +  newYaxis +"]<br/>");
				curNode.yAxis = newYaxis;
				var cNodes = curNode.cidArr;
				for(var i=0; i<cNodes.length; i++){
					var aNode = cNodes[i];
					this.adjustBranchYaxis(aNode,offset,cids,idsCatch);
				}
			}
		}
	}
	
	this.adjustBranchYaxisPart = function(curNode, endNode, cids,offset, idsCatch,outCatch){
		if(offset==0){
			return;
		}
		if(curNode.id == endNode.id){
			return;
		}
		var curNodeId = "#"+curNode.id+"#";
		if(idsCatch.toString().indexOf(curNodeId)<0){
			idsCatch.append(curNodeId);
			if(cids.indexOf(curNodeId)<0){
				var newYaxis = curNode.yAxis + offset;
				//如果该节点有多个父节点，则在递归过程中，会被查找多次，因此要处理
				//$("#console").append("局部调整：" + curNode.name + "[" + curNode.yAxis +"->" +  newYaxis +"]<br/>");
				curNode.yAxis = newYaxis;
				//this.adjustYaxis(curNode,outCatch);
				var cNodes = curNode.cidArr;
				for(var i=0; i<cNodes.length; i++){
					var aNode = cNodes[i];
					this.adjustBranchYaxisPart(aNode,endNode,cids,offset,idsCatch,outCatch);
				}
			}
		}
	}
	//查找当前节点的所有父节点ID，格式为#ID#ID#ID#
	this.findPidsStrByNode = function(curNode){
		var pids = new StringBuffer("#");
		this.findPidsByNode(curNode,pids);
		return pids.toString();
	}
	//递归查找节点的父节点ID，并把结果存入pids中
	this.findPidsByNode = function(curNode,pids){
		var pNodes = curNode.pidArr;
		for(var i=0; i<pNodes.length; i++){
			var pNode = pNodes[i];
			var pid = "#" + pNode.id + "#";
			if(pids.toString().indexOf(pid)<0){
				pids.append(pNode.id + "#");
			}
			this.findPidsByNode(pNode,pids);
		}
	}
	//查找当前节点的所有子节点ID，格式为#ID#ID#ID#
	this.findCidsStrByNode = function(curNode){
		var cids = new StringBuffer("#");
		this.findCidsByNode(curNode,cids);
		return cids.toString();
	}
	//递归查找节点的子节点ID，并把结果存入cids中
	this.findCidsByNode = function(curNode,cids){
		var cNodes = curNode.cidArr;
		for(var i=0; i<cNodes.length; i++){
			var cNode = cNodes[i];
			var cid = "#" + cNode.id + "#";
			if(cids.toString().indexOf(cid)<0){
				cids.append(cNode.id + "#");
			}
			this.findCidsByNode(cNode,cids);
		}
	}
	//两个节点是否是父子关系
	this.isParent = function(cNode,pNode){
		var flag = false;
		var pNodes = cNode.pidArr;
		if(pNodes.indexOf(pNode)>=0){
			flag = true;
		}else{
			for(var i=0; i<pNodes.length; i++){
				var aNode = pNodes[i];
				return this.isParent(aNode,pNode);
			}
		}
		return flag;
	}
	//是否是儿子，跟是否为父子关系判断算法一样
	this.isChild = function(pNode, cNode){
		var flag = false;
		var cNodes = pNode.cidArr;
		if(cNodes.indexOf(cNode)>=0){
			flag = true;
		}else{
			for(var i=0; i<cNodes.length; i++){
				var aNode = cNodes[i];
				return this.isChild(aNode,cNode);
			}
		}
		return flag;
	}
	/**
	 * 查找最近的兄弟节点的父节点
	 * @param flowNode
	 * @return
	 */
	this.findNearestBrotherPnode = function(curNode,startNode, idsCatch){
		if(curNode.type ==1){
			return curNode;
		}
		var curId = "#" + curNode.id + "#";
		if(idsCatch.toString().indexOf(curId)<0){
			idsCatch.append(curId);
			var pNodes = curNode.pidArr;
			for(var i=0; i<pNodes.length ;i++){
				var aParent = pNodes[i];
				var bNodes = aParent.cidArr;
				if(bNodes.length>1){
					var flag = false;
					for(var j=0; j<bNodes.length; j++){
						//判断兄弟节点是否为当前节点间接父节点，如果是，则不是该节点兄弟节点
						var isParent = this.isParent(startNode,bNodes[j]);
						if(!isParent){
							flag = true;
							break;
						}
					}
					if(flag){
						return aParent;
					}
				}
				return this.findNearestBrotherPnode(aParent,startNode, idsCatch);
			}
		}
		return null;
	}
	this.findNearestBrother = function(curNode,pNode){
		if(pNode==null){
			pNode = this.findNearestBrotherPnode(curNode,curNode,new StringBuffer("#"));
		}
		var cNodes = pNode.cidArr;
		for(var i=0;i<cNodes.length; i++){
			if(cNodes[i].id != curNode.id){
				return cNodes[i];
			}
		}
		return null;
	}
	
	this.findNearestBrotherCnode = function(curNode,startNode,idsCatch){
		var curId = "#" + curNode.id + "#";
		if(idsCatch.toString().indexOf(curId)<0){
			idsCatch.append(curId);
			if(curNode.type == -1){
				return curNode;
			}
			var cNodes = curNode.cidArr;
			for(var i=0; i<cNodes.length; i++){
				var aChild = cNodes[i];
				var bNodes = aChild.pidArr;
				if(bNodes.length>1){
					var flag = false;
					for(var j=0; j<bNodes.length; j++){
						//判断兄弟节点是否为当前节点间接子节点，如果是，则不是该节点兄弟节点
						var isParent = this.isChild(startNode,bNodes[j]);
						if(!isParent){
							flag = true;
							break;
						}
					}
					if(flag){
						return aChild;
					}
				}
				return this.findNearestBrotherCnode(aChild,startNode, idsCatch);
			}
		}
		return null;
	}
	
	/**
	*查找当前节点所处分支的所有节点的Y轴最大，最小值
	**/
	this.findBranchBonds = function (aNode,bondsArr){
		if(aNode.type == 1 || aNode.type == -1){
			return;
		}
		var branchStartNode = this.findBranchStart(aNode);
		var branchEndNode = this.findBranchEnd(aNode);
		this.yaxisBranchBond(branchStartNode,branchEndNode,bondsArr);
	}
	this.findBranchBondsNewBef = function (aNode,bondsArr){
		if(aNode.type == 1 || aNode.type == -1){
			return;
		}
		var branchStartNode = this.findBranchStart(aNode);
		this.yaxisBondPart(aNode,branchStartNode,bondsArr);
		var branchEndNode = this.findBranchEnd(aNode);
		var cids = this.findCidsStrByNode(aNode);
		this.yaxisBranchBondNew(branchStartNode,branchEndNode,bondsArr,cids);
	}
	this.yaxisBranchBondNew = function(curNode,endNode,rtArr,cids){
		if(curNode.id == endNode.id){
			return;
		}
		var curId = "#" + curNode.id + "#";
		if(cids.indexOf(curId)<0){
			var yAxis = curNode.yAxis;
			if(yAxis>rtArr[1]){
				rtArr[1] = yAxis;
			}
			if(yAxis<rtArr[0]){
				rtArr[0] = yAxis;
			}
		}
		//递归退出条件，递归到结束节点，递归结束
		var cNodes = curNode.cidArr;
		for(var i=0; i<cNodes.length; i++){
			var cNode = cNodes[i];
			this.yaxisBranchBondNew(cNode,endNode,rtArr,cids);
		}
	}
	this.findBranchBondsNewAft = function (aNode,bondsArr){
		if(aNode.type == 1 || aNode.type == -1){
			return;
		}
		var branchStartNode = this.findBranchStart(aNode);
		var branchEndNode = this.findBranchEnd(aNode);
		var cids = this.findCidsStrByNode(aNode);
		this.yaxisBranchBondNew(branchStartNode,branchEndNode,bondsArr,cids);
		var cNodes = aNode.cidArr;
		for(var i=0; i<cNodes.length; i++){
			var cNode = cNodes[i];
			var yAxis = cNode.yAxis;
			if(yAxis>bondsArr[1]){
				bondsArr[1] = yAxis;
			}
			if(yAxis<bondsArr[0]){
				bondsArr[0] = yAxis;
			}
		}
	}
	this.yaxisBranchBond = function(curNode,endNode,rtArr,cids){
		if(curNode.id == endNode.id){
			return;
		}
		var yAxis = curNode.yAxis;
		if(yAxis>rtArr[1]){
			rtArr[1] = yAxis;
		}
		if(yAxis<rtArr[0]){
			rtArr[0] = yAxis;
		}
		//递归退出条件，递归到结束节点，递归结束
		var cNodes = curNode.cidArr;
		for(var i=0; i<cNodes.length; i++){
			var cNode = cNodes[i];
			this.yaxisBranchBond(cNode,endNode,rtArr);
		}
	}
	this.yaxisBondAfter = function(curNode,endNode, rtArr){
		if(curNode.id == endNode.id ||curNode.type == -1){
			return;
		}
		var yAxis = curNode.yAxis;
		if(yAxis>rtArr[1]){
			rtArr[1] = yAxis;
		}
		if(yAxis<rtArr[0]){
			rtArr[0] = yAxis;
		}
		//递归退出条件，递归到结束节点，递归结束
		var cNodes = curNode.cidArr;
		for(var i=0; i<cNodes.length; i++){
			var cNode = cNodes[i];
			this.yaxisBondAfter(cNode,endNode,rtArr);
		}
	}
	this.findBranchStart = function (aNode){
		if(aNode.type == 1){
			return null;
		}
		var pidArr = aNode.pidArr;
		for(var i=0; i<pidArr.length; i++){
			var pNode = pidArr[i];
			if(pNode.type == 1){
				return aNode;
			}else{
				return this.findBranchStart(pNode);
			}
		}
	}
	this.findBranchEnd = function(aNode){
		if(aNode.type == -1){
			return null;
		}
		var cidArr = aNode.cidArr;
		for(var i=0; i<cidArr.length; i++){
			var cNode = cidArr[i];
			if(cNode.type == -1){
				return aNode;
			}else{
				return this.findBranchEnd(cNode);
			}
		}
	}
	this.listToString = function(nodeList){
		var str = "";
		for(var i=0; i< nodeList.length; i++){
			str = str + nodeList[i].name + ":[" + nodeList[i].yAxis +"], ";
		}
		return str;
	}
	this.findBrotherBonds = function(aNode,bondsArr){
		if(aNode.type == 1 || aNode.type == -1){
			return;
		}
		var branchStartNode = this.findNearestBrotherPnode(aNode,aNode,new StringBuffer());
		var cNodes = branchStartNode.cidArr;
		for(var i=0; i<cNodes.length; i++){
			var cNode = cNodes[i];
			var yAxis = cNode.yAxis;
			if(yAxis>bondsArr[1]){
				bondsArr[1] = yAxis;
			}
			if(yAxis<bondsArr[0]){
				bondsArr[0] = yAxis;
			}
		}
	}
}
