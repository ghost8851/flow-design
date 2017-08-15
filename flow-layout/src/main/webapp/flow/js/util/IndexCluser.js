var curCluserIndex = 1;
function IndexCluser(){
	this.next = function(){
		curCluserIndex = curCluserIndex + 1;
		return curCluserIndex;
	}
}