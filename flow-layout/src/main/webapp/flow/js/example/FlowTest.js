var indexCluser = new IndexCluser();
var basicFunction = new BasicFunction();
var nameArray = ["A","B","C","D","E","F","G","H","I","G","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","g","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
function test(){
	var result = basicFunction.processChildYaxis(2,6.5);
	for(var i=0;i<10;i++){
		alert(indexCluser.next());
	}
}
function simple(){
	var cavans = new Cavans();
	var aFlow = new Flow(cavans,indexCluser.next());
	var rootNode = aFlow.rootNode;
	var endNode = new FlowNode(indexCluser.next(),"$ ",-1);
	rootNode.addChild(endNode);
	aFlow.initFlow();
	aFlow.adjustFlow();
	aFlow.viewFlowByDepth(aFlow.rootNode,new StringBuffer());
	cavans.init(aFlow);
	cavans.show();
	return aFlow;
}
function evenTest2(){
	var cavans = new Cavans();
	var aFlow = new Flow(cavans,indexCluser.next());
	var rootNode = aFlow.rootNode;
	
	var bNode = new FlowNode(indexCluser.next(),"B ",2);
	var cNode = new FlowNode(indexCluser.next(),"C ",2);
	rootNode.addChild(bNode);
	rootNode.addChild(cNode);
	
	var dNode = new FlowNode(indexCluser.next(),"D ",2);
	var eNode = new FlowNode(indexCluser.next(),"E ",2);
	var fNode = new FlowNode(indexCluser.next(),"F ",2);
	bNode.addChild(dNode);
	bNode.addChild(eNode);
	bNode.addChild(fNode);
	
	var gNode = new FlowNode(indexCluser.next(),"G ",2);
	dNode.addChild(gNode);
	eNode.addChild(gNode);
	fNode.addChild(gNode);
	
	var endNode = new FlowNode(indexCluser.next(),"$ ",-1);
	
	gNode.addChild(endNode);
	cNode.addChild(endNode);
	aFlow.initFlow();
	aFlow.adjustFlow();
	cavans.init(aFlow);
	cavans.show();
	return aFlow;
}
function evenTest(){
		var cavans = new Cavans();
		var aFlow = new Flow(cavans,indexCluser.next());
		var rootNode = aFlow.rootNode;
		
		var bNode = new FlowNode(indexCluser.next(),indexCluser.next(),"B ",2);
		var cNode = new FlowNode(indexCluser.next(),"C ",2);
		rootNode.addChild(bNode);
		rootNode.addChild(cNode);
		
		var dNode = new FlowNode(indexCluser.next(),"D ",2);
		var eNode = new FlowNode(indexCluser.next(),"E ",2);
		bNode.addChild(dNode);
		bNode.addChild(eNode);
		
		var fNode = new FlowNode(indexCluser.next(),"F ",2);
		dNode.addChild(fNode);
		eNode.addChild(fNode);
		
		var endNode = new FlowNode(indexCluser.next(),"$ ",-1);
		
		fNode.addChild(endNode);
		cNode.addChild(endNode);
		
		aFlow.initFlow();
		aFlow.adjustFlow();
		cavans.init(aFlow);
		cavans.show();
		return aFlow;
	}
	function oddTest(){
		var cavans = new Cavans();
		var aFlow = new Flow(cavans,indexCluser.next());
		var rootNode = aFlow.rootNode;
		
		var bNode = new FlowNode(indexCluser.next(),"B ",2);
		var cNode = new FlowNode(indexCluser.next(),"C ",2);
		var dNode = new FlowNode(indexCluser.next(),"D ",2);
		rootNode.addChild(bNode);
		rootNode.addChild(cNode);
		rootNode.addChild(dNode);
		
		var eNode = new FlowNode(indexCluser.next(),"E ",2);
		var fNode = new FlowNode(indexCluser.next(),"F ",2);
		var gNode = new FlowNode(indexCluser.next(),"G ",2);
		bNode.addChild(eNode);
		bNode.addChild(fNode);
		bNode.addChild(gNode);
		
		var hNode = new FlowNode(indexCluser.next(),"H ",2);
		eNode.addChild(hNode);
		fNode.addChild(hNode);
		gNode.addChild(hNode);
		
		var endNode = new FlowNode(indexCluser.next(),"$ ",-1);
		
		hNode.addChild(endNode);
		cNode.addChild(endNode);
		dNode.addChild(endNode);
		
		aFlow.initFlow();
		aFlow.adjustFlow();
		cavans.init(aFlow);
		cavans.show();
		return aFlow;
	}
	
	function oddTest2(){
		var cavans = new Cavans();
		var aFlow = new Flow(cavans,indexCluser.next());
		var rootNode = aFlow.rootNode;
		
		var bNode = new FlowNode(indexCluser.next(),"B ",2);
		var cNode = new FlowNode(indexCluser.next(),"C ",2);
		var dNode = new FlowNode(indexCluser.next(),"D ",2);
		rootNode.addChild(bNode);
		rootNode.addChild(cNode);
		rootNode.addChild(dNode);
		
		var eNode = new FlowNode(indexCluser.next(),"E ",2);
		var fNode = new FlowNode(indexCluser.next(),"F ",2);
		bNode.addChild(eNode);
		bNode.addChild(fNode);
		
		var gNode = new FlowNode(indexCluser.next(),"G ",2);
		eNode.addChild(gNode);
		fNode.addChild(gNode);
		
		var endNode = new FlowNode(indexCluser.next(),"$ ",-1);
		
		gNode.addChild(endNode);
		cNode.addChild(endNode);
		dNode.addChild(endNode);
		
		aFlow.initFlow();
		aFlow.adjustFlow();
		cavans.init(aFlow);
		cavans.show();
		return aFlow;
	}
	
	function test(){
		var cavans = new Cavans();
		var aFlow = new Flow(cavans,indexCluser.next());
		var rootNode = aFlow.rootNode;
		
		var aNode = new FlowNode(indexCluser.next(),"A ",2);
		var bNode = new FlowNode(indexCluser.next(),"B ",2);
		
		rootNode.addChild(aNode);
		rootNode.addChild(bNode);
		
		var a1Node = new FlowNode(indexCluser.next(),"A1",2);
		var a2Node = new FlowNode(indexCluser.next(),"A2",2);
		var a3Node = new FlowNode(indexCluser.next(),"A3",2);
		aNode.addChild(a1Node);
		aNode.addChild(a2Node);
		a1Node.addChild(a3Node);
		
		var a4Node = new FlowNode(indexCluser.next(),"A4",2);
		var a5Node = new FlowNode(indexCluser.next(),"A5",2);
		var a6Node = new FlowNode(indexCluser.next(),"A6",2);
		a3Node.addChild(a4Node);
		a3Node.addChild(a5Node);
		a4Node.addChild(a6Node);
		a5Node.addChild(a6Node);
		
		var cNode = new FlowNode(indexCluser.next(),"C ",2);
		a6Node.addChild(cNode);
		a2Node.addChild(cNode);
		
		var dNode = new FlowNode(indexCluser.next(),"D ",2);
		bNode.addChild(dNode);
		
		var endNode = new FlowNode(indexCluser.next(),"$ ",-1);
		cNode.addChild(endNode);
		dNode.addChild(endNode);
		aFlow.initFlow();
		aFlow.adjustFlow();
		cavans.init(aFlow);
		cavans.show();
		return aFlow;
	}
	
	function flow2(){
		var cavans = new Cavans();
		var aFlow = new Flow(cavans,indexCluser.next());
		var rootNode = aFlow.rootNode;
		
		var bNode = new FlowNode(indexCluser.next(),"B",2);
		var cNode = new FlowNode(indexCluser.next(),"C",2);
		var dNode = new FlowNode(indexCluser.next(),"D",2);
		rootNode.addChild(bNode);
		rootNode.addChild(cNode);
		rootNode.addChild(dNode);
		
		var eNode = new FlowNode(indexCluser.next(),"E",2);
		var fNode = new FlowNode(indexCluser.next(),"F",2);
		var gNode = new FlowNode(indexCluser.next(),"G",2);
		var hNode = new FlowNode(indexCluser.next(),"H",2);
		bNode.addChild(eNode);
		bNode.addChild(fNode);
		bNode.addChild(gNode);
		cNode.addChild(hNode);
		
		var iNode = new FlowNode(indexCluser.next(),"I",2);
		var jNode = new FlowNode(indexCluser.next(),"J",2);
		eNode.addChild(iNode);
		fNode.addChild(iNode);
		gNode.addChild(iNode);
		hNode.addChild(jNode);
		
		var endNode = new FlowNode(indexCluser.next(),"$ ",-1);
		iNode.addChild(endNode);
		jNode.addChild(endNode);
		dNode.addChild(endNode);
		aFlow.initFlow();
		aFlow.adjustFlow();
		cavans.init(aFlow);
		cavans.show();
		return aFlow;
	}
	//复杂的流程图测试
	function complexTest(){
		var cavans = new Cavans();
		var aFlow = new Flow(cavans,indexCluser.next());
		var rootNode = aFlow.rootNode;
		
		var bNode = new FlowNode(indexCluser.next(),"B",2);
		var cNode = new FlowNode(indexCluser.next(),"C",2);
		var cNode = new FlowNode(indexCluser.next(),"C",2);
		rootNode.addChild(bNode);
		rootNode.addChild(cNode);
		
		var dNode = new FlowNode(indexCluser.next(),"D",2);
		var eNode = new FlowNode(indexCluser.next(),"E",2);
		var fNode = new FlowNode(indexCluser.next(),"F",2);
		bNode.addChild(dNode);
		bNode.addChild(eNode);
		cNode.addChild(fNode);
		
		var gNode = new FlowNode(indexCluser.next(),"G",2);
		var hNode = new FlowNode(indexCluser.next(),"H",2);
		var iNode = new FlowNode(indexCluser.next(),"I",2);
		var jNode = new FlowNode(indexCluser.next(),"J",2);
		dNode.addChild(gNode);
		eNode.addChild(gNode);
		fNode.addChild(hNode);
		fNode.addChild(iNode);
		fNode.addChild(jNode);
		
		var kNode = new FlowNode(indexCluser.next(),"K",2);
		var lNode = new FlowNode(indexCluser.next(),"L",2);
		var mNode = new FlowNode(indexCluser.next(),"M",2);
		var nNode = new FlowNode(indexCluser.next(),"N",2);
		gNode.addChild(kNode);
		gNode.addChild(lNode);
		gNode.addChild(mNode);
		hNode.addChild(nNode);
		iNode.addChild(nNode);
		jNode.addChild(nNode);
		
		var O = new FlowNode(indexCluser.next(),"O",2);
		var P = new FlowNode(indexCluser.next(),"P",2);
		var Q = new FlowNode(indexCluser.next(),"Q",2);
		var R = new FlowNode(indexCluser.next(),"R",2);
		kNode.addChild(O);
		kNode.addChild(P);
		kNode.addChild(Q);
		nNode.addChild(R);
		
		var S = new FlowNode(indexCluser.next(),"S",2);
		var T = new FlowNode(indexCluser.next(),"T",2);
		var U = new FlowNode(indexCluser.next(),"U",2);
		O.addChild(S);
		P.addChild(S);
		Q.addChild(S);
		R.addChild(T);
		R.addChild(U);
		
		var V = new FlowNode(indexCluser.next(),"V",2);
		var W = new FlowNode(indexCluser.next(),"W",2);
		S.addChild(V);
		lNode.addChild(V);
		mNode.addChild(V);
		T.addChild(W);
		U.addChild(W);
		
		var X = new FlowNode(indexCluser.next(),"X",2);
		var Y = new FlowNode(indexCluser.next(),"Y",2);
		V.addChild(X);
		V.addChild(Y);
		
		var Z = new FlowNode(indexCluser.next(),"Z",2);
		X.addChild(Z);
		Y.addChild(Z);
		
		var endNode = new FlowNode(indexCluser.next(),"$ ",-1);
		Z.addChild(endNode);
		W.addChild(endNode);
		
		aFlow.initFlow();
		aFlow.adjustFlow();
		cavans.init(aFlow);
		cavans.show();
		return aFlow;
	}
	
	function complexTest2(){
		var cavans = new Cavans();
		var aFlow = new Flow(cavans,indexCluser.next());
		var rootNode = aFlow.rootNode;
		
		var bNode = new FlowNode(indexCluser.next(),"B",2);
		var cNode = new FlowNode(indexCluser.next(),"C",2);
		var C1 = new FlowNode(indexCluser.next(),"C1",2);
		var C2 = new FlowNode(indexCluser.next(),"C2",2);
		var C3 = new FlowNode(indexCluser.next(),"C3",2);
		rootNode.addChild(bNode);
		rootNode.addChild(cNode);
		cNode.addChild(C1);
		cNode.addChild(C2);
		cNode.addChild(C3);
		
		var dNode = new FlowNode(indexCluser.next(),"D",2);
		var eNode = new FlowNode(indexCluser.next(),"E",2);
		var fNode = new FlowNode(indexCluser.next(),"F",2);
		bNode.addChild(dNode);
		bNode.addChild(eNode);
		C1.addChild(fNode);
		C2.addChild(fNode);
		C3.addChild(fNode);
		
		var gNode = new FlowNode(indexCluser.next(),"G",2);
		var hNode = new FlowNode(indexCluser.next(),"H",2);
		var iNode = new FlowNode(indexCluser.next(),"I",2);
		var jNode = new FlowNode(indexCluser.next(),"J",2);
		dNode.addChild(gNode);
		eNode.addChild(gNode);
		fNode.addChild(hNode);
		fNode.addChild(iNode);
		fNode.addChild(jNode);
		
		var kNode = new FlowNode(indexCluser.next(),"K",2);
		var lNode = new FlowNode(indexCluser.next(),"L",2);
		var mNode = new FlowNode(indexCluser.next(),"M",2);
		var nNode = new FlowNode(indexCluser.next(),"N",2);
		gNode.addChild(kNode);
		gNode.addChild(lNode);
		gNode.addChild(mNode);
		hNode.addChild(nNode);
		iNode.addChild(nNode);
		jNode.addChild(nNode);
		
		var O = new FlowNode(indexCluser.next(),"O",2);
		var P = new FlowNode(indexCluser.next(),"P",2);
		var Q = new FlowNode(indexCluser.next(),"Q",2);
		var R = new FlowNode(indexCluser.next(),"R",2);
		mNode.addChild(O);
		mNode.addChild(P);
		mNode.addChild(Q);
		nNode.addChild(R);
		
		var S = new FlowNode(indexCluser.next(),"S",2);
		var T = new FlowNode(indexCluser.next(),"T",2);
		var U = new FlowNode(indexCluser.next(),"U",2);
		O.addChild(S);
		P.addChild(S);
		Q.addChild(S);
		R.addChild(T);
		R.addChild(U);
		
		var V = new FlowNode(indexCluser.next(),"V",2);
		var W = new FlowNode(indexCluser.next(),"W",2);
		S.addChild(V);
		kNode.addChild(V);
		lNode.addChild(V);
		T.addChild(W);
		U.addChild(W);
		
		var X = new FlowNode(indexCluser.next(),"X",2);
		var Y = new FlowNode(indexCluser.next(),"Y",2);
		V.addChild(X);
		V.addChild(Y);
		
		var X1 = new FlowNode(indexCluser.next(),"X1",2);
		var X2 = new FlowNode(indexCluser.next(),"X2",2);
		var X3 = new FlowNode(indexCluser.next(),"X3",2);
		var X4 = new FlowNode(indexCluser.next(),"X4",2);
		Y.addChild(X1);
		Y.addChild(X2);
		Y.addChild(X3);
		
		X1.addChild(X4);
		X2.addChild(X4);
		X3.addChild(X4);
		
		var Z = new FlowNode(indexCluser.next(),"Z",2);
		X4.addChild(Z);
		X.addChild(Z);
		
		var endNode = new FlowNode(indexCluser.next(),"$ ",-1);
		Z.addChild(endNode);
		W.addChild(endNode);
		
		aFlow.initFlow();
		//aFlow.viewFlowByDepth(rootNode,new StringBuffer());
		//cavans.init(aFlow);
		//cavans.show();
		aFlow.adjustFlow();
		aFlow.viewFlowByDepth(rootNode,new StringBuffer());
		return aFlow;
	}
	
	function clickToAddChild(obj){
		var key = "COOR_"+$(obj).attr("xAxis") +"_" + $(obj).attr("yAxis");
		var curNode = cavans.detail.get(key);
		if(curNode.type==-1){
			return;
		}
		var childNum = Number(prompt("输入一个5到100之间的数字", ""));
		var cidArr = curNode.cidArr;
		var newName = parseInt((Math.random()*51).toFixed(0));
		if(childNum>0){
			if(cidArr.length>1){
				var endFlow = flow.findNearestBrotherCnode(cidArr[0],cidArr[0],new StringBuffer());
				for(var i=1; i<=childNum; i++){
					var newNode = new FlowNode(indexCluser.next(),nameArray[newName]+i,2);
					newNode.addChild(endFlow);
					curNode.addChild(newNode);
				}
			}else{
				if(childNum==1){
					var endFlow = new FlowNode(indexCluser.next(),nameArray[newName],2);
					curNode.addChild(endFlow);
					var aCid = curNode.cidArr[0];
					curNode.removeChild(aCid);
					endFlow.addChild(aCid);
				}else{
					var endFlow = new FlowNode(indexCluser.next(),nameArray[newName],2);
					var aCid = curNode.cidArr[0];
					curNode.removeChild(aCid);
					endFlow.addChild(aCid);
					for(var i=1; i<=childNum; i++){
						var newNode = new FlowNode(indexCluser.next(),nameArray[newName]+i,2);
						newNode.addChild(endFlow);
						curNode.addChild(newNode);
					}
				}
			}
			flow.initFlow();
			flow.adjustFlow();
			flow.viewFlowByDepth(flow.rootNode,new StringBuffer());
			cavans = new Cavans();
			cavans.init(flow);
			cavans.show();
		}
			
	}
