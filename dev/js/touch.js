(function() {

	function Touch(game){
		
		this.game = game;
		this.pos = { x: 0, y: 0 };
		this.size = 160;
		this.buttonSize = 80;
		this.update;
		this.interval = 10;
		this.iPad = navigator.userAgent.match(/iPad/i) != null;
		this.iPhone = navigator.userAgent.match(/iPhone/i) != null;
		this.iPod = navigator.userAgent.match(/iPod/i) != null;
		this.android = navigator.userAgent.match(/Android/i) != null;
		
	};
	
	Touch.prototype.init = (function(){
		
		if(this.iPad == true || this.iPhone == true || this.iPod == true || this.android == true){
			this.build();
		}
		return;
		
  });
		
	Touch.prototype.build = (function(){
			
		var self = this;
		
		var controls = document.createElement("div");
		controls.className = "controls";
		document.body.appendChild(controls);
		
		var dPad = document.createElement("div");
		dPad.id = "dPad";
		var dPadStick = document.createElement("div");
		dPadStick.id = "dPad-stick";
		dPad.appendChild(dPadStick);
		controls.appendChild(dPad);
		
		var action = document.createElement("a");
		action.id = "actionButton";
		action.innerHTML = "A";
		controls.appendChild(action);
		
		document.body.addEventListener("touchstart", function() {
			 return event.preventDefault(); 
    }, false);
		
		dPad.addEventListener("touchstart", function(){ 
		
		  self.update = setInterval(function(){
		    return self.game.dPad(self.pos); 
		  }, self.interval); 
			dPad.classList.add('active');
			
		}, false);
		
		dPad.addEventListener("touchmove", function(event) {
		
      var touchX = event.changedTouches[0].pageX;
      var touchY = event.changedTouches[0].pageY;
      
      var pos = { left : dPad.offsetLeft, top : dPad.offsetTop }; 
      
      var x = (touchX - pos.left)-self.size/2;
      var y = (touchY - pos.top)-self.size/2;
      var space = (self.size-self.buttonSize)/2
      
      if(x < -space) x = -space;
      if(x > space) x = space;
      if(y < -space) y = -space;
      if(y > space) y = space;
      
      self.translate(x,y);
      
      self.pos.x = (x < -(self.size/8))? -1 : (x > (self.size/8))? 1 : 0;
      self.pos.y = (y < -(self.size/8))? -1 : (y > (self.size/8))? 1 : 0;
      
			 
		}, false);
		
		dPad.addEventListener("touchend", function(event) {
		
		  clearInterval(self.update);
			dPad.classList.remove('active');
      self.pos = { x: 0, y: 0 };
			self.translate(0,0);
      return self.game.dPad(self.pos); 
			
		}, false);
		
		action.addEventListener("touchstart", function(){
		  self.game.actionButton();
			action.classList.add('active');
		});
		
		action.addEventListener("touchend", function(){
			action.classList.remove('active');
		});
		
		return;
			
  });
		
	Touch.prototype.translate = (function(x,y){
	  object = document.getElementById('dPad-stick');
    object.style.webkitTransform = "translate("+x+"px,"+y+"px)";
	});

	window.Touch = Touch;
	
})();