(function() {
	
	function defaultData(){
  	return {
  	  pos: { x: 30, y: 100, z: 320 },
  	  cam: { rx: 315, ry: 315, rz: 0},
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
    this.cam = document.getElementById('cam');
    this.map = document.getElementById('map');
    this.charachter = document.getElementById('charachter');
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
	Game.prototype.init = (function() { 
	  this.rotateCam();
	  this.updatePos(); 
  });	
	
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
	
	  // Remap controls based on camera rotation
	  direction = this.remap(direction.x, direction.y);
	  
	  // Check if X and Z are possible
    var check = this.checkPosition(direction.x, direction.z);
    
    // If X and Y are not possible check only Z
    check = (check != false)? check : this.checkPosition(0, direction.z);
    
    // If Y is not possible only check X
    check = (check != false)? check : this.checkPosition(direction.x, 0);
    
    // Check if we have a new destination
    if(check == false || check.x == 0 && check.z == 0) return false;
    
    // Smooth Y when difference is large
    var dif = check.y-this.d.pos.y;
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
	Game.prototype.remap = (function(x,z){
	
	  var dir = [{x:0,z:-1},{x:1,z:-1},{x:1,z:0},{x:1,z:1},{x:0,z:1},{x:-1,z:1},{x:-1,z:0},{x:-1,z:-1}];
	  var input = {x:x,z:z}
	  var shift = parseInt(this.d.cam.ry/45);
	  var index = 0;
	  for ( var i in dir ) if (dir[i].x == input.x && dir[i].z == input.z ) var index = parseInt(i);
	  index = ((index+shift) <= 7)? index+shift : (index+shift)-8;
	  return {x:dir[index].x, z:dir[index].z }; 
	  
  });
	
	
	// Check position
	Game.prototype.checkPosition = (function(x,z){
  	
  	x = this.d.pos.x+(x*this.d.speed); 
  	z = this.d.pos.z+(z*this.d.speed);
  	d = []; 
  	c = 0;
  	size = this.d.size/2;
  	
  	// Fetch all data + check for walls
  	for (var i=-1;i<2;i++){
    	for (var j=-1;j<2;j++){
    	  d[c] = { x : x+(j*size), z : z+(i*size) };
    	  p = this.logicMapContext.getImageData(d[c].x, d[c].z, 1, 1).data;
    	  if( p[0] != p[1] || p[1] != p[2]) return false;
    	  d[c].y = parseInt(-p[0]/(2.55)+100);
    	  c++;
    	}
  	}
  	
  	// Check for to high Y index
  	y = d[4].y
  	maxY = this.d.pos.y+this.d.jumpY;
  	for (var i in d) if ((d[i].y-maxY) >= 10) return false; 
  	
  	// Get The highest Y
  	yHolder = [];
  	for (var i in d) yHolder[i] = d[i].y;
  	y = Math.max.apply(Math, yHolder);
  	
  	return { x:x, y:y, z:z }
  	
	})
	
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
	  this.map.style.webkitTransform = this.map.style.MozTransform  = "translate3D(-"+this.d.pos.x+"px,"+(this.d.floor+this.d.pos.y)+"px,-"+this.d.pos.z+"px)";
	});
	
	// set transition timing for map
	Game.prototype.updateTiming = (function(s){
	  this.map.style['-webkit-transition-duration']  = this.map.style['-moz-transition-duration']  = s+"s";
	});
	
	// visually jump charachter
	Game.prototype.translateCharachter = (function(x,y,z){
	  this.charachter.style.webkitTransform = this.charachter.style.MozTransform  = "translate3D("+x+"px,"+y+"px,"+z+"px)";
	});
	
	// Rotate camera
	Game.prototype.rotateCam = (function(){
	  this.cam.style.webkitTransform = this.cam.style.MozTransform  = "rotateX("+this.d.cam.rx+"deg) rotateY("+this.d.cam.ry+"deg) rotateZ("+this.d.cam.rz+"deg)";
	});
	
	window.Game = Game;
	
})()

