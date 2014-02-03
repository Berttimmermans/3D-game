(function() {
	
	function defaultData(){
  	return {
  	  pos: { x: 460, y: 320, z: 0 },
  	  speed: 2,
  	  size: 20,
    	mode: "moving",
    	directory: "img/LVL-1-logic-map.png"
  	}
	};
	
	function Game(){
	
		this.d = defaultData();
    this.charachter = document.getElementById('charachter');
    this.map = document.getElementById('map');
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
  
  });	
	
	// Direction buttons
	Game.prototype.dPad = (function(direction){ return this.controlDispatcher("dPad", direction); });
	
	// Control Dispatcher
	Game.prototype.controlDispatcher = (function(event, direction){ return this.controlReceiver(event, direction); });
	
	// Control Receiver
	Game.prototype.controlReceiver = (function(event, direction) { if(event == "dPad") this.walk(direction) });
	
	// Walk through world if possible
	Game.prototype.walk = (function(direction){
	
	  direction = this.remap(direction.x, direction.y);
	  
    var check = this.readMap(direction.x, direction.y);
    check = (check != false)? check : this.readMap(0, direction.y);
    check = (check != false)? check : this.readMap(direction.x, 0);
    if(check == false || check.x == 0 && check.y == 0) return false;
    if((check.z-this.d.pos.z) > 10) return false;
    if((check.z-this.d.pos.z) < -10) ;
    this.d.pos = check;
    this.updatePos();
    
	});
	
	
	Game.prototype.remap = (function(x,y){
	
	  if(y == -1 && x == 0) return { x:-1, y:-1 };
	  if(y == 1 && x == 0) return { x:1, y:1 };
	  if(y == 0 && x == 1) return { x:1, y:-1 };
	  if(y == 0 && x == -1) return { x:-1, y:1 };
	  if(y == -1 && x == -1) return { x:-1, y:0 };
	  if(y == 1 && x == 1) return { x:1, y:0 };
	  if(y == -1 && x == 1) return { x:0, y:-1 };
	  if(y == 1 && x == -1) return { x:0, y:1 };
    return {x:x, y:y};
	  
	});
	
	// Read map pixel and return false or new location
	Game.prototype.readMap = (function(x,y){
	
	  var testX = this.d.pos.x+(x*(this.d.size/2));
    var testY = this.d.pos.y+(y*(this.d.size/2));
		var testP = this.logicMapContext.getImageData(testX, testY, 1, 1).data;
		var testZ = parseInt(-testP[0]/(2.55)+100);
		
		x = this.d.pos.x+x;
		y = this.d.pos.y+y; 
		z = this.logicMapContext.getImageData(x, y, 1, 1).data;
		z = parseInt(-z[0]/(2.55)+100);
		
    if(testP[0] == testP[1] && testP[1] == testP[2] && (testZ-this.d.pos.z) <= 10 ) return { x:x, y:y, z:z }  
    return false; 
    
	});
	
	// visually move charachter
	Game.prototype.updatePos = (function(){
	
	  this.map.style.webkitTransform = this.map.style.MozTransform  = "translate3D(-"+this.d.pos.x+"px,"+(100+this.d.pos.z)+"px,-"+this.d.pos.y+"px)";
	  
	});
	
	window.Game = Game;
	
})()

