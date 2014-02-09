(function() {
	
	function defaultData(){
  	return {
  	  pos: { x: 40, y: 320, z: 100 },
  	  speed: 1.5,
  	  size: 20,
  	  floor: 100,
  	  gravity: 3,
  	  jumpHeight: 30,
  	  jumpY: 0,
    	mode: "moving",
    	directory: "img/LVL-1-logic-map.png"
  	}
	};
	
	function Game(){
	
		this.d = defaultData();
		this.mode = "walk";
    this.charachter = document.getElementById('charachter');
    this.map = document.getElementById('map');
    this.buildLogicMap();
    
	};
	
	// Build logic map
	Game.prototype.buildLogicMap = (function(){
	
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
    
  });

  // Init game
	Game.prototype.init = (function() { this.updatePos(); });	
	
	// Buttons
	Game.prototype.dPad = (function(direction){ return this.controlDispatcher("dPad", direction); });
	Game.prototype.actionButton = (function(){ return this.controlDispatcher("actionButton"); });
	
	// Control Dispatcher
	Game.prototype.controlDispatcher = (function(event, direction){ 
	  if(this.mode == "walk") return this.controlReceiver(event, direction); 
  });
	
	// Control Receiver
	Game.prototype.controlReceiver = (function(event, direction) { 
	  if(event == "dPad") this.walk(direction) 
	  if(event == "actionButton") this.jump();  
  });
	
	// Walk through world if possible
	Game.prototype.walk = (function(direction){
	
	  // Remap controls -> TO DO: make this be based on rotation
	  direction = this.remap(direction.x, direction.y);
	  
	  // Check if X and Y are possible
    var check = this.readMap(direction.x, direction.y);
    
    // If X and Y are not possible check only Y
    check = (check != false)? check : this.readMap(0, direction.y);
    
    // If Y is not possible only check X
    check = (check != false)? check : this.readMap(direction.x, 0);
    
    // Check if we have a new destination
    if(check == false || check.x == 0 && check.y == 0) return false;
    
    // Smooth Z when difference is large
    var dif = check.z-this.d.pos.z;
    if(dif < -3 || dif > 3) {
      var s = (dif < 0)? -(dif*this.d.gravity) : dif*this.d.gravity;
      this.mode = "smooth";
      this.map.classList.add('transition');
      this.updateTiming(s/1000);
      var self = this;
      setTimeout(function(){
        self.map.classList.remove('transition');
        self.updateTiming(0);
        self.mode = "walk";
      }, s);
    }
    
    // Update and move player
    this.d.pos = check;
    this.updatePos();
    
	});
	

  // remap input to fit rotation	
	Game.prototype.remap = (function(x,y){
	
	  if(x == 0 && y == -1)   return { x:-1, y:-1 };
	  if(x == 0 && y == 1)    return { x:1,  y:1 };
	  if(x == 1 && y == 0)    return { x:1,  y:-1 };
	  if(x == 1 && y == -1)   return { x:0,  y:-1 };
	  if(x == -1 && y == 0)   return { x:-1, y:1 };
	  if(x == -1 && y == 1)   return { x:0,  y:1 };
	  if(y == -1 && x == -1)  return { x:-1, y:0 };
	  if(y == 1 && x == 1)    return { x:1,  y:0 };
    return {x:x, y:y};
	  
	});
	
	// Read map pixel and return false or new location
	Game.prototype.readMap = (function(x,y){
	  
	  // Check in front of real new destination
	  var frontX = this.d.pos.x+((x*(this.d.size/2))+(x*this.d.speed));
    var frontY = this.d.pos.y+((y*(this.d.size/2))+(y*this.d.speed));
		var frontData = this.logicMapContext.getImageData(frontX, frontY, 1, 1).data;
		var frontZ = parseInt(-frontData[0]/(2.55)+100);
		if(frontData[0] != frontData[1] || frontData[1] != frontData[2]) return false;
		
		// Check real new destination
		var desX = this.d.pos.x+(x*this.d.speed);
		var desY = this.d.pos.y+(y*this.d.speed); 
		var desData = this.logicMapContext.getImageData(desX, desY, 1, 1).data;
		var desZ = parseInt(-desData[0]/(2.55)+100);
		if(desData[0] != desData[1] || desData[1] != desData[2]) return false;
		
		// Check back of real new destination if new z is lower then old Z
		if((this.d.pos.z-desZ) > 0) {
  		var backX = desX-(this.d.size/2);
  		var backY = desY-(this.d.size/2);
      var backData = this.logicMapContext.getImageData(backX, backY, 1, 1).data;
      desZ = parseInt(-backData[0]/(2.55)+100); 
		}
		
		// Check if new z difference is lower then 10
    if( (frontZ-(this.d.pos.z+this.d.jumpY)) <= 10 &&  (desZ-(this.d.pos.z+this.d.jumpY)) <= 10) return { x:desX, y:desY, z:desZ } 
    
    // If new z is to high to move on to 
    return false; 
    
	});
	
	// Jump
	Game.prototype.jump = (function(){
	
	  if(this.d.jumpY != 0) return false;
	  
	  var self = this;
    var currentTime = 0;
    var time = self.d.jumpHeight*self.d.gravity*self.d.gravity;
    var speed = time/self.d.jumpHeight;

    var inter = setInterval(function () {
    
      self.d.jumpY = parseInt(getHeightAtX(currentTime));
      if (self.d.jumpY < 0) {
        self.d.jumpY = 0;
        clearInterval(inter);
      }
      currentTime += speed;
      self.translateCharachter(0,-self.d.jumpY,0);
      self.updatePos();
    
    }, speed);

    function getHeightAtX(current) {
      return self.d.jumpHeight*Math.sin(current*Math.PI/time)   
    }
	
	});
	
	// visually move map
	Game.prototype.updatePos = (function(){
	  this.map.style.webkitTransform = this.map.style.MozTransform  = "translate3D(-"+this.d.pos.x+"px,"+(this.d.floor+this.d.pos.z)+"px,-"+this.d.pos.y+"px)";
	});
	
	// set transition timing for map
	Game.prototype.updateTiming = (function(s){
	  this.map.style['-webkit-transition-duration']  = this.map.style['-moz-transition-duration']  = s+"s";
	});
	
	// visually jump charachter
	Game.prototype.translateCharachter = (function(x,y,z){
	  this.charachter.style.webkitTransform = this.charachter.style.MozTransform  = "translate3D("+x+"px,"+y+"px,"+z+"px)";
	});
	
	window.Game = Game;
	
})()

