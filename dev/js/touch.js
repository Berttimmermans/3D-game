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
		
		$('body').append('<div class="controls"></div>');
		$('.controls').append('<div id="dPad"><div id="dPad-stick"></div></</div>');
		
		$("body").bind("touchstart", function(event) { 
			 return event.preventDefault(); 
		});
		
		$("#dPad").bind("touchstart", function(){ 
		
		  self.update = setInterval(function(){
		    return self.game.dPad(self.pos); 
		  }, self.interval); 
			$(this).addClass('active');
			
		}).bind("touchmove", function(event) {
		
      var touchX = event.originalEvent.touches[0].pageX;
      var touchY = event.originalEvent.touches[0].pageY;
      
      var pos = $(this).position();
      
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
      
			 
		}).bind("touchend", function() { 
		
		  clearInterval(self.update);
			$('.controls .active').removeClass('active');
      self.pos = { x: 0, y: 0 };
			self.translate(0,0);
      return self.game.dPad(self.pos); 
			
		})
		
		return;
			
  });
		
	Touch.prototype.translate = (function(x,y){
	  object = document.getElementById('dPad-stick');
    object.style.webkitTransform = "translate("+x+"px,"+y+"px)";
	});

	window.Touch = Touch;
	
})();