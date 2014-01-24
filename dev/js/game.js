(function() {
	
	function defaultData(){
  	return {
  	  pos: { x: 460, y: 320, z: 0 },
  	  speed: 2,
    	mode: "moving",
    	directory: "img/LVL-1-logic-map.png"
  	}
	}
	
	function Game(){
	
		this.d = defaultData();
    this.charachter = document.getElementById('charachter');
    
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
	
	Game.prototype.controlReceiver = (function(event, direction) {
			
			if(event == "dPad"){
			  
			  var x = this.d.pos.x+direction.x;
			  var y = this.d.pos.y+direction.y;
			  var p = this.logicMapContext.getImageData(x, y, 1, 1).data; 
        var check = this.validateMap(p[0], p[1], p[2]);
        
			  if(check != "wall"){
			  
  			  this.d.pos.x += direction.x;
  			  this.d.pos.y += direction.y; 
  			  this.d.pos.z = check; 
      		$("#dev-data").html("x = " + this.d.pos.x + " - y = " + this.d.pos.y + " - z " + this.d.pos.z);
          this.updatePos();
    			  
			  } else {
			  
  			  x = this.d.pos.x+direction.x;
  			  y = this.d.pos.y
  			  p = this.logicMapContext.getImageData(x, y, 1, 1).data; 
          check = this.validateMap(p[0], p[1], p[2]);
          
           if(check != "wall"){
			  
    			  this.d.pos.x += direction.x;
            this.d.pos.z = check; 
            $("#dev-data").html("x = " + this.d.pos.x + " - y = " + this.d.pos.y + " - z " + this.d.pos.z);
            this.updatePos();
           
           } else {
           
    			  x = this.d.pos.x;
    			  y = this.d.pos.y+direction.y;
    			  p = this.logicMapContext.getImageData(x, y, 1, 1).data; 
            check = this.validateMap(p[0], p[1], p[2]);
           
            if(check != "wall"){
			  
      			  this.d.pos.y += direction.y;
              this.d.pos.z = check; 
      			  $("#dev-data").html("x = " + this.d.pos.x + " - y = " + this.d.pos.y + " - z " + this.d.pos.z);
              this.updatePos();
              
            }
            
          }
  			  
			  }
        
			}
			
	});	
	
	Game.prototype.updatePos = (function(){
	
	  var z = (this.d.pos.z+100)/100;
	  this.charachter.style.webkitTransform = "translate("+this.d.pos.x+"px,"+this.d.pos.y+"px) scale("+z+")";

	});
	
	Game.prototype.validateMap = (function(r, g, b){
  	
      if (r == g && g == b && r == b){
        return parseInt(-r/(2.55)+100);
      } else if(r == 255) {
        return "wall";
      }
  
	});
	
	// Direction buttons
	Game.prototype.dPad = (function(direction){ return this.controlDispatcher("dPad", direction); });
	
	// Control Dispatcher
	Game.prototype.controlDispatcher = (function(event, direction){
		return this.controlReceiver(event, direction);
	});
	
	window.Game = Game;
	
})()

