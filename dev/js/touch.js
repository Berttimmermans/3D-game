(function() {

	function Touch(game){
		
		this.game = game;
		this.dPad = "none";
		this.pos = {
  		x: 0,
  		y: 0
		};
		this.iPad = navigator.userAgent.match(/iPad/i) != null;
		this.iPhone = navigator.userAgent.match(/iPhone/i) != null;
		this.iPod = navigator.userAgent.match(/iPod/i) != null;
		this.android = navigator.userAgent.match(/Android/i) != null;
		
	};
	
	Touch.prototype = (function() {
		
		function init(){
		
			if(this.iPad == true || this.iPhone == true || this.iPod == true || this.android == true){
				this.build();
				return this.check();
			}
			return;
			
		};
		
		function build(){
			
			var self = this;
			
			$('body').append('<div class="controls"></div>');
			$('.controls').append('<div id="up"></div>');
			$('.controls').append('<div id="right"></div>');
			$('.controls').append('<div id="down"></div>');
			$('.controls').append('<div id="left"></div>');
			
			$("body").bind("touchstart", function(event) { 
				 return event.preventDefault(); 
			});
			
			$("#up").bind("touchstart, mousedown", function(){ 
				self.dPad = "up"; 
				$(this).addClass('active');
			}).bind("touchend, mouseup", function() { 
				self.dPad = "none"; 
				$('.controls .active').removeClass('active');
			});
			
			$("#right").bind("touchstart, mousedown", function(){ 
				self.dPad = "right"; 
				$(this).addClass('active'); 
				return;
			}).bind("touchend, mouseup", function() { 
				self.dPad = "none"; 
				$('.controls .active').removeClass('active');
				return;
			});
			
			$("#down").bind("touchstart, mousedown", function(){ 
				self.dPad = "down"; 
				$(this).addClass('active'); 
				return;
			}).bind("touchend, mouseup", function() { 
				self.dPad = "none";  
				$('.controls .active').removeClass('active');
				return;
			});
			
			$("#left").bind("touchstart, mousedown", function(){ 
				self.dPad = "left"; 
				$(this).addClass('active'); 
				return;
			}).bind("touchend, mouseup", function() { 
				self.dPad = "none"; 
				$('.controls .active').removeClass('active'); 
				return;
			});
			
			return;
			
		};
		
		function check(){
		
			switch(this.dPad){
				case "up" :
					this.game.dPad("up");
					break;
				case "right" :
					this.game.dPad("right");
					break;
				case "down" :
					this.game.dPad("down");
					break;
				case "left" :
					this.game.dPad("left");
					break;
			}
			var self = this;
			return setTimeout(function(){
				return self.check();
			}, 60);
			
		};

		return {
		
			constructor: Touch,
			init: function() { return this._(init)() },
			build: function() { return this._(build)() },
			check: function() { return this._(check)() },
			_: function(callback){
				var self = this;
				return function(){ return callback.apply(self, arguments); };
			}
			
		};
		
	})();

	window.Touch = Touch;
	
})();