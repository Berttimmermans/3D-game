(function() {

	function Motion(game){
		
		this.game = game;
		this.pos = { x: 0, y: 0 };
		this.apos = { x: 0, y: 0, z: 0 };
		this.update;
		this.interval = 10;
		
	};
	
	Motion.prototype.init = (function(){
	
	  self = this;
		
		if (window.DeviceMotionEvent) {
    
    	window.ondevicemotion = function(event) {
    		self.apos.x = event.accelerationIncludingGravity.x;
    		self.apos.y = event.accelerationIncludingGravity.y;
    		self.apos.z = event.accelerationIncludingGravity.y;
    	}
     
    	setInterval(function() {
    		
    		self.pos.x = (self.apos.y > 0.5)? -1 : (self.apos.y < -0.5)? 1 : 0; 
    		self.pos.y = (self.apos.x > 0.5)? -1 : (self.apos.x < -0.5)? 1 : 0; 
		    
    		document.getElementById('#dev-data').innerHTML = "x= "+parseInt(self.pos.x)+" y= "+parseInt(self.pos.y);
    		
		    return self.game.dPad(self.pos); 
    		
    	}, self.interval);
    } 
		
		
		return;
		
  });
		
	window.Motion = Motion;
	
})();