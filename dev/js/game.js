(function() {
	
	function defaultData(){
  	return {
  	  pos: { x: 460, y: 320, z: 0 },
  	  speed: 2,
    	mode: "moving",
    	directory: "img/LVL-1-logic-map.png"
  	}
	};
	
	function Game(){
	
		this.d = defaultData();
    this.charachter = $('.charachter')[0];
    
    this.logicMap = document.createElement('canvas');
    this.logicMapContext = this.logicMap.getContext('2d');	
    
    var image = new Image();
    var self = this;
    
    image.onload = function() {
  		self.logicMap.width = this.width;
			self.logicMap.height = this.height;
			self.logicMapContext.drawImage(this,0,0);
    }
    image.src = this.d.directory;
    
	};

	Game.prototype.init = (function() {
			
     this.updatePos();
     
     //console.log("width:" + Math.sqrt(Math.pow(76,2)+Math.pow(80,2)));
			
	});	
	
	// Walk through world if possible
	Game.prototype.walk = (function(direction){
	
    var check = this.readMap(direction.x, direction.y);
    check = (check != false)? check : this.readMap(0, direction.y);
    check = (check != false)? check : this.readMap(direction.x, 0);
    if(check.x == 0 && check.y == 0) return false;
    if((check.z-this.d.pos.z) > 10) return false;
    this.d.pos = check;
    this.updatePos();
    
	});
	
	// visually move charachter
	Game.prototype.updatePos = (function(){
	
	  this.charachter.style.webkitTransform = "translate3D("+this.d.pos.x+"px,"+this.d.pos.y+"px,"+this.d.pos.z+"px)";
	  
	});
	
	// Read map pixel and return false or new location
	Game.prototype.readMap = (function(x,y){
	
	  var x = this.d.pos.x+x;
    var y = this.d.pos.y+y;
		var pixel = this.logicMapContext.getImageData(x, y, 1, 1).data; 
    if(pixel[0] == pixel[1] && pixel[1] == pixel[2]) return { x:x, y:y, z:parseInt(-pixel[0]/(2.55)+100) }  
    return false; 
    
	});
	
	// Direction buttons
	Game.prototype.dPad = (function(direction){ return this.controlDispatcher("dPad", direction); });
	
	// Control Dispatcher
	Game.prototype.controlDispatcher = (function(event, direction){
	
		return this.controlReceiver(event, direction);
		
	});
	
	// Control Receiver
	Game.prototype.controlReceiver = (function(event, direction) {
			
			if(event == "dPad") this.walk(direction)
			
	});
	
	window.Game = Game;
	
})()

