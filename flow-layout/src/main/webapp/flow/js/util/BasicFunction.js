function BasicFunction(){
	this.processChildYaxis = function(N, startY){
		var result = new Array();
		var tempn = 0.0;
		for(var n=N, i=0; n>=1; n--, i++){
			var aYaxis = processYaxis(n,N,startY);
			tempn = tempn + aYaxis;
			result[i]= aYaxis;
		}
		return result;
	}
}
function processYaxis(n, N, startY){
	var resultY = startY + n - 0.5*(N+1);
	var result = parseFloat(resultY.toFixed(1));
	return result;
}