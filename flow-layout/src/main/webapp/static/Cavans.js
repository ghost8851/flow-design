function Cavans(div, cols, rows, unit){
	this.jg_doc = null;
	this.cols = cols;
	this.rows = rows;
	this.unit = unit;
	this.cells = new Array();
	this.messageQueue = new Array();
	var originColor = "#000000";
	var inverseColor = "#FFFFFF";
	
	function Message(x,y,oldStatus,newStatus){
		this.x = x;
		this.y = y;
		this.oldStatus = oldStatus;
		this.newStatus = newStatus;
	}
	function Coord(x,y){
		this.x = x;
		this.y = y;
	}
	
	function Cell (x,y,status){
		this.x = x;
		this.y = y;
		this.status = status;
		//1.一个格子周围有三个格子为白，则该格子为白色
		//2.一个格子周围有两个格子为白，则该格子颜色不变
		//3.一个格子周围白色格子小于2个，格子为黑
		//4.格子周围白色格子超过3个，格子为黑
		
	}
	this.onCellMessage = function(cell,msg){
		var newStatus = true;
		var list = getAroundCell(cell.x, cell.y);
		var num =0;
		for(var i=0; i<list.length; i++){
			var x = list[i].x;
			var y = list[i].y;
			var aStatus = this.cells[x][y].status;
			if(!aStatus){
				num = num +1;
			}
		}
		if(num == 3){
			newStatus = false;
		}else if(num == 2){
			newStatus = cell.status;
		}else if(num <2){
			newStatus = true;
		}else if(num>3){
			newStatus = true;
		}
		if(cell.status == newStatus){
			
		}else{
			debugger;
			console.log("第[" + cell.x + "," + cell.y + " 格子颜色从" + cell.status + "--> " + newStatus + " 发生改变，发送消息。]");
			this.sendMessage(cell.x,cell.y, cell.status, newStatus);
			cell.status = newStatus;
			var bgColor = inverseColor;
			if(cell.status){
				bgColor = originColor;
			}
			$("#span" + cell.x +"_" + cell.y).css("backgroundColor",bgColor);
			var a = 1;
		}
	}
	function getAroundCell(x,y){
		var list = new Array();
		var coord_1L = new Coord(x-1, y-1);
		if(x-1>=0 && y-1 >=0){
			list.push(coord_1L);
		}
		var coord_1M = new Coord(x, y-1);
		if( y-1 >=0){
			list.push(coord_1M);
		}
		var coord_1R = new Coord(x+1, y-1);
		if(x+1<cols && y-1 >=0){
			list.push(coord_1R);
		}
		var coord_2L = new Coord(x-1, y);
		if(x-1>=0 ){
			list.push(coord_2L);
		}
		var coord_2R = new Coord(x+1, y);
		if(x+1 < cols){
			list.push(coord_2R);
		}
	
		var coord_3L = new Coord(x-1, y+1);
		if(x-1>=0 && y+1 <rows){
			list.push(coord_3L);
		}
		var coord_3M = new Coord(x, y+1);
		if( y+1 <rows){
			list.push(coord_3M);
		}
		var coord_3R = new Coord(x+1, y+1);
		if(x+1<cols && y+1 <rows){
			list.push(coord_3R);
		}
		return list;
	}
	this.onMessage = function(msg){
		var list = getAroundCell(msg.x, msg.y);
		for(var i=0; i<list.length; i++){
			var x = list[i].x;
			var y = list[i].y;
			this.onCellMessage(this.cells[x][y],msg);
		}
	}
	this.sendMessage = function(x,y,oldStatus,newStatus){
		var message = new Message(x,y,oldStatus, newStatus);
		this.messageQueue.push(message);
	}
	this.show = function(){
		$("#" + div).empty();
		this.jg_doc = new jsGraphics(div);
		this.jg_doc.clear();
		for(var x=0; x<cols; x=x+1){
			this.jg_doc.setColor("#FFFFFF");
			this.jg_doc.drawString(x, (x)*unit,0);
			if(x%2 == 0){
				this.jg_doc.setColor("#EEEEEE");
			}else{
				this.jg_doc.setColor("#AAAAAA");
			}
			var x1 = x*unit;
			var y1 = 0;
			var x2 = x*unit;
			var y2 = this.cols*unit;
			console.log("第 " + (x+1) + "个x坐标：[" + x1 + "," +y1+ "]-- [" + x2 + "," + y2 +"]");
			this.jg_doc.drawLine(x1,y1,x2,y2);
		}
		for(var y=0; y<this.rows; y=y+1){
			this.jg_doc.setColor("#000000");
			this.jg_doc.drawString(y, 0,y*unit);
			if(y%2 ==0){
				this.jg_doc.setColor("#EEEEEE");
			}else{
				this.jg_doc.setColor("#AAAAAA");
			}
			var x1 = 0;
			var y1 = y*unit;
			var x2 = this.cols*unit;
			var y2 = y*unit;
			this.jg_doc.drawLine(x1,y1,x2,y2);
			console.log("第 " + (y+1) + "个y坐标：[" + x1 + "," +y1+ "]-- [" + x2 + "," + y2 +"]");
		}
		this.jg_doc.paint();
	}
	this.evolute = function(obj){
//		if(this.jg_doc == null){
//			this.jg_doc = new jsGraphics(div);
//		}
		for(var x=0; x<cols; x= x+1){
			this.cells[x] = new Array(rows);
			for(var y=0; y<rows; y = y+1){
				this.cells[x][y] = new Cell(x,y,true);
			}
		}
		for(var i=0; i<cols; i= i+1){
			for(var j=0; j<rows; j = j+1){
				var x = i*unit;
				var y = j*unit;
				var status = this.cells[i][j].status;
				var bgColor = inverseColor;
				if(status){
					bgColor = originColor;
				}
				var html = "<span id='span"+i +"_" + j +"' style='background:" +bgColor +";position:absolute;left:" + x +"px;top:" +y+"px;width:"+(unit-1)+"px;height:"+(unit-1)+"px;'> </span>"
				$("#" + div).append(html);
//				this.jg_doc.fillRect(x,y,unit-1,unit-1);
//				this.jg_doc.paint();
			}
		}
		
		console.log("随机引起启动，初始容量："  + cols + ", " + rows);
		for(var i=0; i<cols*5; i++){
			var x_seed = Math.floor(Math.random()*cols);
			var y_seed = Math.floor(Math.random()*rows);
			console.log("种子坐标：" + x_seed + ", " + y_seed);
			this.cells[x_seed][y_seed].status = false;
			$("#span" + x_seed+"_" + y_seed).css("backgroundColor",inverseColor);
//			this.jg_doc.setColor(inverseColor);
//			this.jg_doc.fillRect(x_seed*unit,y_seed*unit,unit-1,unit-1);
			this.sendMessage(x_seed, y_seed, true, false);
//			this.jg_doc.paint();
		}
		var count = 0;
		var a = setInterval(function(){
			while(obj.messageQueue.length>0){
				count ++;
				if(count%100 == 0){
					break;
				}
				console.log("消费消息数量：" + count);
				console.log("消费消息，当前消息队列长度：" + obj.messageQueue.length);
				var msg = obj.messageQueue.shift();
				obj.onMessage(msg);
			}
		},30);
	}
}