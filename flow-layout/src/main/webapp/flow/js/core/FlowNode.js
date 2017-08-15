Array.prototype.indexOf = function(aNode){
	for(var i=0; i<this.length; i++){
		if(this[i].id == aNode.id){
			return i;
		}
	}
	return -1;
}
Array.prototype.remove = function(dx) 
{ 
    if(isNaN(dx)||dx>this.length){
    	return false;
    } 
    this.splice(dx,1); 
} 
function FlowNode(id,name,type){
	this.id = id;
	this.name = name;
	this.pidArr = new Array();
	this.cidArr = new Array();
	this.type = type;
	this.xAxis = 0.0;
	this.yAxis = 0.0;
	this.depth = 0;
	this.breadth = 0;
	
	this.addChild = function(cNode){
		if(this.cidArr.indexOf(cNode)<0){
			this.cidArr.push(cNode);
		}
		if(cNode.pidArr.indexOf(this)<0){
			cNode.pidArr.push(this);
		}
	}
	this.removeChild = function(cNode){
		var indexA = this.cidArr.indexOf(cNode);
		if(indexA>=0){
			this.cidArr.splice(indexA,1);
		}
		var indexB = cNode.pidArr.indexOf(this);
		if(indexB>=0){
			cNode.pidArr.splice(indexB,1);
		}
	}
	this.addParent = function(pNode){
		if(this.pidArr.indexOf(pNode)<0){
			this.pidArr.push(pNode);
		}
		if(pNode.cidArr.indexOf(this)<0){
			pNode.cidArr.push(this);
		}
	}
	this.toString = function(){
		var pids = "";
		var cids = "";
		for(var i=0; i<this.pidArr.length; i++){
			pids = pids + this.pidArr[i].id + ",";
		}
		for(var i=0; i<this.cidArr.length; i++){
			cids = cids + this.cidArr[i].id + ",";
		}
		var result = "节点:[" + this.name + "],[y=" + this.yAxis.toFixed(1) + ",x=" + this.xAxis.toFixed(1) + ",id=" + this.id + "]," +
				"父节点:" + pids + 
				"子节点:" + cids + "<br/>";
		return result;
	}
}